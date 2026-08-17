import {
  CATEGORY_LABEL,
  PRODUCTS,
  UNIT_LABEL,
  type Product,
} from '../data/products';

/**
 * Catalog search. Written by hand instead of pulling in a library: 56 products
 * is small enough that a scan costs nothing, and the two things that actually
 * matter here — Dominican typing habits and the client's own inventory names —
 * are exactly what an off-the-shelf matcher does not know about.
 *
 * The rules it has to survive:
 *   "jamon"      → Jamón            (nobody types accents on a phone)
 *   "mozarela"   → Mozzarella       (two edits away)
 *   "quesos"     → Queso            (plural)
 *   "queso freir"→ Queso Blanco de Freír   (tokens in any order)
 *   "induveca"   → the two Induveca salamis (brand lives inside the name)
 */

/** Lowercase, strip accents, drop punctuation, collapse spaces. */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    // Combining diacritical marks: á → a, ñ → n.
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Levenshtein distance, abandoned as soon as the whole row exceeds `max`.
 * The early exit is what keeps the fuzzy pass cheap across every word of
 * every product.
 */
function editDistance(a: string, b: string, max: number): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;

  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  let curr = new Array<number>(b.length + 1);

  for (let i = 1; i <= a.length; i += 1) {
    curr[0] = i;
    let rowMin = curr[0];

    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      if (curr[j] < rowMin) rowMin = curr[j];
    }

    if (rowMin > max) return max + 1;
    [prev, curr] = [curr, prev];
  }

  return prev[b.length];
}

/** Short words must match almost exactly; long ones can afford two slips. */
function toleranceFor(token: string): number {
  if (token.length <= 3) return 0;
  if (token.length <= 6) return 1;
  return 2;
}

/**
 * Filler words the descriptions are full of. They stay in the haystack, so an
 * exact phrase still matches, but they are kept out of the fuzzy pass: "para"
 * sits one edit away from "papa" and would have dragged every product whose
 * description says "para cocinar" into a search for potatoes.
 */
const STOPWORDS = new Set([
  'para', 'por', 'con', 'sin', 'del', 'las', 'los', 'una', 'uno', 'unidad',
  'que', 'como', 'mas', 'muy', 'ideal', 'lista', 'listo', 'viene', 'vienen',
  'venta', 'marca', 'tipo', 'the', 'and',
]);

interface Indexed {
  product: Product;
  /** Everything searchable, normalized and joined. */
  haystack: string;
  /** The product name on its own — a hit here outranks one in the description. */
  name: string;
  /** Identity words (name, inventory ref, family) — the full fuzzy pass. */
  strong: string[];
  /** Every word including descriptions — stem matching only. */
  all: string[];
}

const usable = (words: string[]) =>
  Array.from(new Set(words)).filter((w) => w.length > 2 && !STOPWORDS.has(w));

/**
 * Built once at module load. `ref` is in here on purpose: it is the name the
 * client uses on his own inventory sheet, so it catches the spellings a
 * neighbour who has bought there before would use.
 */
const INDEX: Indexed[] = PRODUCTS.map((product) => {
  const name = normalize(product.name);
  const identity = normalize(
    [product.name, product.ref, CATEGORY_LABEL[product.category]].join(' '),
  );
  const haystack = normalize(
    [
      product.name,
      product.ref,
      product.description,
      CATEGORY_LABEL[product.category],
      // Both forms, so "libra" and "libras" each find the same products.
      UNIT_LABEL[product.unit].one,
      UNIT_LABEL[product.unit].many,
    ].join(' '),
  );

  return {
    product,
    name,
    haystack,
    strong: usable(identity.split(' ')),
    all: usable(haystack.split(' ')),
  };
});

/** Score one query token against one product. 0 means no match at all. */
function scoreToken(entry: Indexed, token: string): number {
  // Whole-name prefix: "sala" → Salami …
  if (entry.name.startsWith(token)) return 100;
  // Any word in the name starting with the token: "indu" → Salami Induveca.
  if (entry.name.includes(` ${token}`)) return 80;
  if (entry.name.includes(token)) return 60;
  // Description, category, unit or the internal ref.
  if (entry.haystack.includes(` ${token}`) || entry.haystack.startsWith(token)) return 40;
  if (entry.haystack.includes(token)) return 30;

  // Plural typed against a singular catalog: "quesos" → queso.
  if (token.length > 3 && token.endsWith('s')) {
    const singular = token.slice(0, -1);
    if (entry.haystack.includes(singular)) return 28;
  }

  // Near-miss against a word that names the product: "tosineta" → Tocineta.
  const max = toleranceFor(token);
  if (max === 0) return 0;

  let best = 0;
  for (const word of entry.strong) {
    const distance = editDistance(token, word, max);
    if (distance <= max) {
      const score = 24 - distance * 8;
      if (score > best) best = score;
      if (distance === 0) break;
    }
  }
  if (best > 0) return best;

  // Stem match against any longer word, anywhere. This is what lets "pizza"
  // reach "pizzería" — a real query for the pizzerías the client supplies.
  // Only the head of the word is compared, and only within one edit, so it
  // cannot pull in the loose matches the pass above already rejected.
  // Four-letter tokens have to match the head exactly: at one edit "chef"
  // reaches "cheddar" and "saco" reaches "salami". From five letters up the
  // stem is distinctive enough to spend an edit on.
  if (token.length < 4) return 0;
  const stemMax = token.length >= 5 ? 1 : 0;

  for (const word of entry.all) {
    if (word.length <= token.length) continue;
    if (editDistance(token, word.slice(0, token.length), stemMax) <= stemMax) return 14;
  }

  return 0;
}

export interface SearchResult {
  product: Product;
  score: number;
}

/**
 * Every token has to match something (AND, not OR) — with a catalog this small
 * an OR would return half of it for any two-word query. Results come back
 * ordered by score, ties broken by catalog order so the grid stays stable.
 */
export function searchProducts(query: string, pool: Product[] = PRODUCTS): SearchResult[] {
  const tokens = normalize(query).split(' ').filter(Boolean);
  if (tokens.length === 0) return pool.map((product) => ({ product, score: 0 }));

  const allowed = pool === PRODUCTS ? null : new Set(pool.map((p) => p.slug));
  const results: SearchResult[] = [];

  INDEX.forEach((entry, index) => {
    if (allowed && !allowed.has(entry.product.slug)) return;

    let total = 0;
    for (const token of tokens) {
      const score = scoreToken(entry, token);
      if (score === 0) return;
      total += score;
    }

    // Fractional tiebreak: keeps the original catalog order inside one score.
    results.push({ product: entry.product, score: total - index / 1000 });
  });

  return results.sort((a, b) => b.score - a.score);
}
