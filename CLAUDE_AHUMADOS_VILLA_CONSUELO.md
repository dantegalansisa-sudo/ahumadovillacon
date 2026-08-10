# CLAUDE.md — AHUMADOS VILLA CONSUELO

**Client:** Ahumados Villa Consuelo
**Agency:** NEXIX Tech Studio
**Type:** Product catalog website (cured meats / embutidos distributor) — **NOT e-commerce**
**Locale:** `es-DO` (all UI copy in Dominican Spanish, all code in English)
**Status:** Phase 1 build

---

## 0. MANDATORY FIRST STEP

Before writing a single line of code, read the NEXIX Taste Skill:

```
https://github.com/Leonxlnx/taste-skill
```

Apply animation levels **2, 3, 4, 5** and the AnimatedCounter bonus.

> **EXPLICIT EXCEPTION — LEVEL 1 IS DISABLED ON THIS PROJECT.**
> Do **NOT** build `CustomCursor.tsx`. Do **NOT** add `* { cursor: none !important; }` anywhere.
> The site uses the browser's native cursor. Interactive feedback comes from hover states
> (scale, color, underline reveal, image zoom) — not from a custom cursor.

---

## 1. BUSINESS CONTEXT

Ahumados Villa Consuelo sells **embutidos** (salami, ham, sausage, longaniza, bacon, pepperoni)
in Santo Domingo, Dominican Republic. Two audiences, equal weight:

1. **Al por mayor (B2B)** — colmados, cafeterías, restaurantes, hoteles, food trucks, catering.
2. **Al detalle (B2C)** — families buying by the pound for home.

Everything on the site funnels to **WhatsApp**. There is no cart, no checkout, no prices.

**WhatsApp:** `849-352-9892` → link format `https://wa.me/18493529892?text=<encoded message>`

---

## 2. PENDING DATA — DO NOT INVENT

The following are not yet confirmed. Render them as the literal token `{{PENDIENTE}}` in a
`src/data/business.ts` config object so they can be swapped in one place later.
**Never fabricate an address, schedule, email, RNC, review, or years-in-business number.**

```ts
// src/data/business.ts
export const BUSINESS = {
  name: 'Ahumados Villa Consuelo',
  shortName: 'Ahumados VC',
  whatsapp: '18493529892',
  whatsappDisplay: '(849) 352-9892',
  address: '{{PENDIENTE}}',
  addressLocality: 'Santo Domingo',
  addressRegion: 'Distrito Nacional',
  country: 'DO',
  hours: '{{PENDIENTE}}',
  email: '{{PENDIENTE}}',
  instagram: '{{PENDIENTE}}',
  facebook: '{{PENDIENTE}}',
  mapEmbedUrl: '{{PENDIENTE}}',
} as const;
```

Any section that would depend on missing data (map embed, exact hours) renders a neutral
placeholder block — not invented text.

**Prohibited copy on this build:** no prices, no "desde $X", no fake testimonials, no
invented founding year, no health/nutrition claims, no delivery promises.

---

## 3. TECH STACK

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Animation | Framer Motion v10+ |
| Styling | **Vanilla CSS only** |
| Routing | React Router v6 (Phase 1: single route + hash anchors; structure ready for Phase 2) |
| SEO head | `react-helmet-async` |
| Icons | Inline SVG components only |
| Deploy | Vercel |

**TAILWIND CSS IS PROHIBITED.** No CSS frameworks, no UI libraries, no icon packages.
**No emoji anywhere** — not in UI, not in comments, not in copy.

```bash
npm create vite@latest . -- --template react-ts
npm install framer-motion react-router-dom react-helmet-async
```

---

## 4. DESIGN SYSTEM

### 4.1 Direction

The reference (My Meat, UK) supplies the **structure**: centered wordmark header, hero banner
with slider, "recommended products" card grid, dark footer. Keep that skeleton.

Reject its **execution**: wood-plank background texture, glossy orange buttons, drop shadows,
tight 2015 spacing. Replace with a **light editorial** treatment — generous whitespace, warm
cream canvas, one confident ember accent, big condensed uppercase type, real product photography
doing the heavy lifting.

Mental reference: an artisan butcher brand's site — appetizing and premium, not a supermarket flyer.

### 4.2 Color tokens

```css
:root {
  /* Base — light editorial, never dark on content sections */
  --cream:        #FAF6F0;  /* page background */
  --cream-deep:   #F2EBE1;  /* alternating section bands */
  --paper:        #FFFFFF;  /* cards */

  /* Ink */
  --ink:          #1C1815;  /* headings, footer bg, hero overlay */
  --ink-soft:     #4A423C;  /* body text */
  --ink-muted:    #8B8078;  /* captions, meta */

  /* Accent — ember / smoked paprika */
  --ember:        #B23A20;
  --ember-deep:   #8C2B15;
  --ember-rgb:    178, 58, 32;

  /* Support */
  --tan:          #C9A87C;  /* rules, small details, hover underlines */
  --border:       #E5DCD1;

  /* Layout constants — NEXIX standard */
  --section-pad:  120px;
  --container:    1320px;
  --container-pad: 64px;
  --radius:       20px;
  --radius-sm:    12px;
}
```

**Dark background rule:** only the hero overlay and the footer may be dark. Every content
section uses `--cream`, `--cream-deep`, or `--paper`. No exceptions.

### 4.3 Typography

Google Fonts, preconnect + `display=swap`:

- **Display / headings / wordmark:** `Anton` — uppercase only, letter-spacing `0.02em`,
  line-height `0.95`. This carries the butcher-shop weight without cliché.
- **Body / UI:** `Inter` — weights 400 / 500 / 600.

```css
--font-display: 'Anton', 'Arial Narrow', sans-serif;
--font-body: 'Inter', system-ui, sans-serif;

/* Fluid scale */
--fs-hero:    clamp(3rem, 8vw, 6.5rem);
--fs-h2:      clamp(2.25rem, 4.5vw, 3.75rem);
--fs-h3:      clamp(1.375rem, 2vw, 1.75rem);
--fs-body:    1.0625rem;
--fs-small:   0.875rem;
--fs-eyebrow: 0.75rem; /* uppercase, letter-spacing 0.18em, --ember */
```

Body line-height `1.7`. Max paragraph width `62ch`.

### 4.4 Wordmark (no logo yet)

There is no logo file. Build a **typographic wordmark component** (`src/components/Wordmark.tsx`)
that is genuinely designed, not just text — it must look intentional enough to survive until a
real logo exists, and be swappable in one file when it arrives.

Composition, centered, three stacked lines:

```
        ——————  ✦  ——————
           A H U M A D O S
          VILLA CONSUELO
      EMBUTIDOS · SANTO DOMINGO
```

- Line 1: hairline rule 1px `--tan`, 48px each side, with a small 6px rotated square (diamond) centered.
- Line 2: `AHUMADOS` — Anton, letter-spacing `0.32em`, `--ember`, font-size `0.72em` of line 3.
- Line 3: `VILLA CONSUELO` — Anton, letter-spacing `0.06em`, `--ink`, the dominant line.
- Line 4: `EMBUTIDOS · SANTO DOMINGO` — Inter 500, `--fs-eyebrow`, uppercase, `--ink-muted`.

Props: `variant: 'light' | 'dark'` (dark variant swaps `--ink` for `--cream` in the footer),
and `size: 'header' | 'hero' | 'footer'`.

**Do not draw a pig, cow, flame, or any illustrative mark.** Type only.

### 4.5 Component rules

- Cards: `--paper` bg, `1px solid --border`, `--radius`, **no box-shadow at rest**; on hover
  lift `y: -6` + border shifts to `--tan` + product image scales `1.04` (image inside
  `overflow: hidden`).
- Buttons: square-ish `--radius-sm`, uppercase Inter 600, `0.08em` tracking.
  - Primary: `--ember` bg, cream text → hover `--ember-deep`.
  - Ghost: transparent, `1.5px solid --ink` → hover fills `--ink`.
- Every primary CTA wraps in `<MagneticButton>` (Taste Skill Level 4).
- Section rhythm: `padding: var(--section-pad) 0`, container `max-width: var(--container);
  margin: 0 auto; padding: 0 var(--container-pad)`.
- Mobile: container padding drops to `24px`, section padding to `72px`.

---

## 5. SITE STRUCTURE — PHASE 1

**Phase 1 is a single page** (`/`) with in-page anchor navigation, plus a `NotFound` route.
Build the router shell now so Phase 2 category routes drop in without refactoring.

Build order — **stop for approval after Section 2 (Hero)**:

| # | Section | Notes |
|---|---|---|
| 1 | Header | Topbar + centered wordmark + nav |
| 2 | **Hero** | ← **CHECKPOINT: screenshot + wait for approval** |
| 3 | Franja de valor | 4 value props |
| 4 | Categorías | 5 category cards |
| 5 | Catálogo | Filterable grid, all 34 products |
| 6 | Sobre nosotros | Split + parallax + counters |
| 7 | Al por mayor | B2B block |
| 8 | Cómo pedir | 3 steps |
| 9 | Visítanos | Location + hours |
| 10 | FAQ | Accordion, SEO |
| 11 | CTA final | Full-width ember band |
| 12 | Footer | Dark |
| 13 | WhatsApp FAB | Floating, always visible |

### Section 1 — Header

Sticky on scroll (adds `1px` bottom border + `backdrop-filter: blur(12px)` + cream at 92% alpha
after 40px scroll; the wordmark shrinks to the `header` size variant).

Layout mirrors the reference: a slim **topbar** (cream-deep, `--fs-small`) with social links left
and `WhatsApp (849) 352-9892` right; below it, the **centered wordmark**; below that, a
horizontal nav rule with links split evenly:

`INICIO · PRODUCTOS · AL POR MAYOR` | `NOSOTROS · CÓMO PEDIR · CONTACTO`

Mobile: hamburger → full-screen overlay menu, staggered link entrance, wordmark centered on top.

### Section 2 — Hero  ← CHECKPOINT

Full-bleed image, `min-height: 88vh`.

- Background image `/images/hero.jpg` with Taste Skill Level 3 scroll-zoom
  (`scale 1 → 1.12`, `opacity 1 → 0` on content, `y 0 → 80`).
- Overlay: `linear-gradient(180deg, rgba(28,24,21,0.35) 0%, rgba(28,24,21,0.78) 100%)`.
- Content, centered, max-width 900px:
  - Eyebrow: `EMBUTIDOS · AL POR MAYOR Y AL DETALLE`
  - H1 via `<RevealText tag="h1">`: **`SABOR AHUMADO QUE TU NEGOCIO NECESITA`**
  - Subline (Inter, 1.125rem, cream at 88%): *Salamis, jamones, salchichas y longanizas de las
    mejores marcas del país. Servimos colmados, cafeterías y restaurantes en todo Santo Domingo.*
  - Two CTAs: `VER PRODUCTOS` (primary, MagneticButton, anchors to #catalogo) and
    `PEDIR POR WHATSAPP` (ghost light).
- Bottom-center scroll indicator: thin vertical line with a dot animating downward on a 2s loop.

**No slider in Phase 1.** The reference's carousel exists to rotate price promos; with no prices
it adds nothing. A single strong hero converts better. (Structure the component so a slider can
be added later without a rewrite.)

**STOP HERE. Screenshot the hero at 1440px and 390px widths, report, and wait for approval
before continuing to Section 3.**

### Section 3 — Franja de valor

Cream-deep band, `padding: 72px 0`. Four items in a row (2×2 on tablet, stacked on mobile),
separated by `1px` vertical `--border` rules. Each: inline SVG line-icon (24px, `--ember`,
1.5 stroke) + short label + one line.

1. **Marcas reconocidas** — Induveca, El Cerro, Agrofem, Moyeta y más.
2. **Al por mayor y al detalle** — Compra por libra o por caja completa.
3. **Cadena de frío** — Manejo y refrigeración adecuada del producto.
4. **Pedidos por WhatsApp** — Cotiza en minutos, sin vueltas.

### Section 4 — Categorías

Cream bg. Eyebrow `NUESTRO CATÁLOGO` + H2 via RevealText: **`CINCO FAMILIAS DE PRODUCTO`**.

Five cards, asymmetric grid (`grid-template-columns: repeat(6, 1fr)`; cards 1–2 span 3 columns,
cards 3–5 span 2). Each card: category photo (4:3, `overflow:hidden`, hover scale 1.04),
category name in Anton, product count, and a `--tan` arrow that slides right on hover.
Level 5 stagger reveal on the grid. Clicking scrolls to the catalog and pre-selects that filter.

### Section 5 — Catálogo

The core section. Cream-deep bg.

- Sticky filter bar (sticks under the header): pill chips — `TODOS · SALAMIS · JAMONES Y
  JAMONETAS · SALCHICHAS · LONGANIZAS · ESPECIALIDADES`. Active chip: `--ember` bg, cream text.
  Chips scroll horizontally on mobile.
- Grid: 4 columns desktop / 3 tablet / 2 mobile (yes, two on mobile — these are simple product
  cards and two-up scans much better than one-up).
- Card anatomy: square image area (`--cream` bg, product photo `object-fit: contain`, 24px
  inset padding), then a small `--ember` category tag, product name in Anton (max 2 lines,
  clamped), a one-line description in `--ink-muted`, and a full-width ghost button
  `PEDIR POR WHATSAPP`.
- Each button opens WhatsApp with the product name pre-filled:
  ```ts
  const waLink = (name: string) =>
    `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
      `Hola Ahumados Villa Consuelo, me interesa: ${name}. ¿Me pueden dar precio y disponibilidad?`
    )}`;
  ```
- Filter transitions use `<AnimatePresence mode="popLayout">` with `layout` on the cards.
- Level 5 stagger on first reveal only (`viewport={{ once: true }}`) — filter changes use a
  faster 0.25s fade so it doesn't feel sluggish on repeat.
- **Do not paginate.** 34 products render fine; a "load more" adds friction and hurts SEO.

**Image handling:** photos land later in `/public/products/`. Build a `<ProductImage>` component
that renders `/products/{slug}.jpg` and, on `onError`, falls back to a designed placeholder —
cream square, centered wordmark diamond in `--tan` at 30% opacity, no broken-image icon, no
"coming soon" text. `loading="lazy"` + `decoding="async"` on every product image except the
first row.

### Section 6 — Sobre nosotros

Cream bg, two columns (55/45). Left: eyebrow `QUIÉNES SOMOS`, H2 **`DEL MERCADO A TU NEGOCIO`**,
two short paragraphs, then three `<AnimatedCounter>` stats.

> Copy for the paragraphs and the three stat figures is **`{{PENDIENTE}}`** — client must supply.
> Render the layout with a visible placeholder note in the code comment; do not write invented history.

Right: image `/images/local.jpg` inside `<ClipRevealImage>` (Level 3), with a `--tan` offset
frame behind it (absolute, translated 20px x/y).

### Section 7 — Al por mayor

Full-width `--ink` band? **No** — dark is prohibited outside hero and footer. Use `--cream-deep`
with a `4px` top border in `--ember`.

Two columns. Left: H2 **`PRECIOS ESPECIALES PARA NEGOCIOS`** + copy targeting colmados,
cafeterías, restaurantes, hoteles y catering + a 4-item checklist (cotización por volumen,
factura con comprobante fiscal, pedidos recurrentes, atención directa por WhatsApp).
Right: a simple contact card — `<MagneticButton>` `SOLICITAR COTIZACIÓN` (WhatsApp, message
pre-filled: *"Hola, soy un negocio y quiero cotizar al por mayor"*), phone displayed large in
Anton, and hours (`{{PENDIENTE}}`).

**Note:** "factura con comprobante fiscal" stays in the checklist only if the client confirms
they issue NCF. Flag it in your checkpoint report for Dante to confirm; if unconfirmed, drop the line.

### Section 8 — Cómo pedir

Three numbered steps, horizontal, large `01 / 02 / 03` in Anton at `--tan` 40% opacity behind
each step's text.

1. **Elige tus productos** — Revisa el catálogo y anota lo que necesitas.
2. **Escríbenos por WhatsApp** — Te confirmamos precio y disponibilidad al momento.
3. **Recoge o coordina entrega** — {{PENDIENTE — confirmar si hacen delivery}}.

### Section 9 — Visítanos

Cream bg. Left: address, hours, phone — all `{{PENDIENTE}}` except phone.
Right: map. If `mapEmbedUrl` is `{{PENDIENTE}}`, render a `--cream-deep` block at the same
aspect ratio with a centered `--tan` diamond — never an iframe pointing at a guessed address.

### Section 10 — FAQ

Cream-deep. Accordion, single-open, height animated with Framer Motion. Six questions written
for search intent (these also power the FAQPage JSON-LD):

1. ¿Venden embutidos al por mayor en Santo Domingo?
2. ¿Cuál es el pedido mínimo para negocios?  → answer `{{PENDIENTE}}`
3. ¿Qué marcas de salami manejan?  → Induveca, El Cerro, Don Cibao, Prado Campo, El Mocano, Tolentino, Naranjal Latino, Estelar, Agrofem.
4. ¿Puedo comprar por libra o solo por caja?
5. ¿Hacen entregas a colmados y restaurantes?  → answer `{{PENDIENTE}}`
6. ¿Cómo hago un pedido?

Answers that are `{{PENDIENTE}}` must not be invented — leave the token visible so Dante fills it.

### Section 11 — CTA final

Full-width `--ember` band, `padding: 96px 0`, cream text, centered.
H2 **`¿LISTO PARA HACER TU PEDIDO?`** + one line + white `<MagneticButton>` `ESCRÍBENOS AHORA`.
Subtle diagonal repeating-linear-gradient at 4% white opacity as texture.

### Section 12 — Footer

`--ink` bg, cream text. Four columns: dark-variant Wordmark + one-line description | Productos
(the 5 categories) | Enlaces (nav items) | Contacto (WhatsApp, address, hours, socials).
Bottom bar: `© 2026 Ahumados Villa Consuelo` + `Diseño web por NEXIX Tech Studio` (linked to
`https://instagram.com/nexixstudio`).

### Section 13 — Floating WhatsApp button

**Non-negotiable NEXIX element.** Fixed `bottom: 28px; right: 28px`, 60px circle, WhatsApp green
`#25D366`, inline SVG glyph, `z-index: 900`. Enters with a spring after 1.2s. On desktop hover,
expands to a pill revealing `Escríbenos`. Soft pulsing ring every 4s (`box-shadow` keyframe,
respects `prefers-reduced-motion`).

---

## 6. PRODUCT CATALOG — 34 ITEMS

Source: client's physical inventory sheet. Names below are the **cleaned display names**;
`ref` holds the original inventory string for the client's internal matching.
Photo path is always `/public/products/{slug}.jpg`.

Create `src/data/products.ts`:

```ts
export type Category = 'salamis' | 'jamones' | 'salchichas' | 'longanizas' | 'especialidades';

export interface Product {
  slug: string;
  name: string;
  ref: string;
  category: Category;
  description: string;
}
```

### SALAMIS (13)

| slug | name | description |
|---|---|---|
| `salami-induveca-supremo` | Salami Induveca Supremo | Salami de cerdo, calidad supremo. Venta por libra. |
| `salami-induveca-super-especial` | Salami Induveca Super Especial | Corte clásico dominicano, ideal para desayuno y sándwich. |
| `salami-chef-super-especial` | Salami Chef Super Especial | Salami super especial, presentación por libra. |
| `salami-del-cerro-negro` | Salami del Cerro Negro | Salami de cerdo, marca El Cerro. Por libra. |
| `salami-estelar` | Salami Estelar | Salami de consumo diario, rendidor. |
| `salami-don-cibao-fino` | Salami Don Cibao Fino | Corte fino, textura suave. |
| `salami-prado-campo-especial` | Salami Prado Campo Especial | Salami especial de la línea Prado Campo. |
| `salami-prado-campo-fino` | Salami Prado Campo Fino | Corte fino, marca Prado Campo. |
| `salami-el-mocano-super-especial` | Salami El Mocano Super Especial | Salami super especial, venta por libra. |
| `salami-tolentino-ahumado` | Salami Tolentino Ahumado Grado Superior | Salami ahumado grado superior. |
| `salami-naranjal-latino` | Salami Naranjal Latino | Salami de la línea Naranjal Latino. |
| `salami-tipo-argentino` | Salami Tipo Argentino | Salami curado tipo argentino, sabor intenso. |
| `salami-de-pollo-agrofem` | Salami de Pollo Agrofem | Salami de pollo, alternativa más liviana. Por libra. |

### JAMONES Y JAMONETAS (11)

| slug | name | description |
|---|---|---|
| `jamon-picnic-del-cerro` | Jamón Picnic del Cerro | Jamón picnic, marca El Cerro. Por libra. |
| `jamon-picnic-del-cerro-economico` | Jamón Picnic del Cerro Económico | Presentación económica del jamón picnic. |
| `jamon-picnic-cocido` | Jamón Picnic Cocido | Jamón picnic cocido, listo para servir. |
| `jamon-cocido-corriente` | Jamón Cocido Corriente | Jamón cocido de uso diario, rendidor. |
| `jamon-caserio` | Jamón Caserío | Jamón marca Caserío, venta por libra. |
| `jamon-de-pavo-checo` | Jamón de Pavo Checo | Jamón de pavo, opción más liviana. |
| `jamoneta` | Jamoneta | Jamoneta clásica, por libra. |
| `jamoneta-la-criolla` | Jamoneta La Criolla | Jamoneta marca La Criolla. |
| `jamoneta-de-pollo-ducarnes` | Jamoneta de Pollo Ducarnes | Jamoneta de pollo, marca Ducarnes. |
| `jamoneta-moyeta` | Jamoneta Moyeta | Jamoneta marca La Moyeta. |
| `jamoneta-mortadela-la-moyeta` | Jamoneta Mortadela La Moyeta | Mortadela de la línea La Moyeta. |

### SALCHICHAS (5)

| slug | name | description |
|---|---|---|
| `salchicha-chef-hot-dog-superior` | Salchicha Chef Hot Dog Superior | Salchicha hot dog superior, venta por unidad. |
| `salchicha-chef` | Salchicha Chef | Salchicha marca Chef, por unidad. |
| `salchicha-hot-dog` | Salchicha Hot Dog | Salchicha hot dog clásica. |
| `salchicha-hot-dog-agrofem` | Salchicha Hot Dog Agrofem | Salchicha hot dog marca Agrofem. |
| `salchicha-piggy-links-premium-chef` | Salchicha Piggy Links Premium Chef | Salchicha premium tipo links, por paquete. |

### LONGANIZAS (3)

| slug | name | description |
|---|---|---|
| `longaniza-gruesa` | Longaniza Gruesa | Longaniza gruesa, por libra. |
| `longaniza-fina` | Longaniza Fina | Longaniza fina, por libra. |
| `longaniza-parrillera` | Longaniza Parrillera | Longaniza para parrilla, por libra. |

### ESPECIALIDADES (2)

| slug | name | description |
|---|---|---|
| `tocineta-rebanada` | Tocineta Rebanada | Tocineta en rebanadas, lista para cocinar. |
| `pepperoni` | Pepperoni | Pepperoni por libra, ideal para pizzería. |

> **Descriptions above are provisional.** They describe product type only and make no claims
> about origin, quality grade, or nutrition beyond what the product name states. Dante will
> validate with the client before launch. Do not expand them or add marketing claims.

---

## 7. PHOTO INVENTORY

Client delivers photos later. Create the folders now with a `.gitkeep` in each.

```
/public
  /images
    hero.jpg              — hero background. Wide shot: display case, cutting board, or
                            product spread. 2400×1400 minimum, warm tones.
    local.jpg             — storefront or interior, for "Sobre nosotros". 1200×1500 (portrait).
    og-image.jpg          — 1200×630 social share card.
  /products
    {slug}.jpg            — one per product, exact slugs from Section 6.
                            Square 1200×1200, product centered on plain light background.
  /categories
    salamis.jpg
    jamones.jpg
    salchichas.jpg
    longanizas.jpg
    especialidades.jpg    — 4:3, 1200×900.
  favicon.svg             — the wordmark diamond in --ember on --cream.
```

Until files exist, `<ProductImage>` fallback handles it silently. Hero and category sections use
a `--cream-deep` block with the diamond mark if their image is missing — **never a stretched
placeholder service URL, never a stock photo pulled from the web.**

---

## 8. SEO — TREAT AS A FIRST-CLASS REQUIREMENT

### 8.1 Head

`<html lang="es-DO">`. Use `react-helmet-async` with a `<Seo>` component.

- **Title:** `Ahumados Villa Consuelo | Embutidos al por mayor y detalle — Santo Domingo`
  (under 60 chars where possible)
- **Meta description:** `Salamis, jamones, salchichas, longanizas y tocineta de las mejores
  marcas. Venta al por mayor y al detalle para colmados, cafeterías y restaurantes en Santo
  Domingo. Pide por WhatsApp.` (~155 chars)
- Canonical, `og:*` (type `website`, locale `es_DO`), `twitter:card summary_large_image`,
  `theme-color #B23A20`.

### 8.2 Target keywords

Primary: `embutidos Santo Domingo`, `embutidos al por mayor República Dominicana`,
`ahumados Villa Consuelo`.
Secondary: `salami al por mayor RD`, `distribuidor de embutidos Santo Domingo`,
`jamón y salchichas al por mayor`, `longaniza dominicana al por mayor`,
`proveedor de embutidos para colmados`.

Work these into H1/H2s and body copy naturally. **No keyword stuffing, no hidden text,
no doorway paragraphs.**

### 8.3 Semantics

- Exactly one `<h1>` (the hero). Section titles are `<h2>`, card titles `<h3>`.
- `<header>`, `<nav>`, `<main>`, `<section aria-labelledby>`, `<footer>`.
- Every image has a descriptive Spanish `alt` — e.g. `alt="Salami Induveca Supremo"`.
- Every anchor link has real href; buttons that aren't links use `<button>`.
- `RevealText` splits words into spans — verify with a DOM check that the heading still reads
  as one continuous accessible string. If it doesn't, add `aria-label` with the full text on
  the parent tag and `aria-hidden="true"` on the spans.

### 8.4 Structured data

Two JSON-LD blocks in `index.html` or injected via Helmet:

1. **`Store`** — name, `@id`, url, telephone `+18493529892`, `image`, `address` (PostalAddress,
   fields `{{PENDIENTE}}` — **omit the property entirely rather than emitting a placeholder
   string into schema**), `areaServed: "Santo Domingo, República Dominicana"`,
   `priceRange` omitted (no prices published).
2. **`FAQPage`** — built from the six FAQ items in Section 10, skipping any whose answer is
   still `{{PENDIENTE}}`.

Do **not** emit `Product` schema without `offers` — it triggers Search Console warnings.
Products are covered by an `ItemList` of names only.

### 8.5 Technical

- `/public/robots.txt` → allow all, `Sitemap: https://{{DOMINIO}}/sitemap.xml`
- `/public/sitemap.xml` → full absolute URLs (Phase 1: the homepage; Phase 2 adds category routes).
- Preconnect to `fonts.googleapis.com` and `fonts.gstatic.com`; `font-display: swap`.
- Hero image gets `fetchpriority="high"`; everything else lazy-loads.
- Explicit `width`/`height` on all images to prevent CLS.
- Target Lighthouse ≥ 92 on Performance, ≥ 95 on SEO and Accessibility (mobile).

---

## 9. ACCESSIBILITY

- Contrast: `--ember` on `--cream` passes AA for large text; for body-size text on ember
  backgrounds always use `--cream`, never `--ink`.
- Visible focus ring on every interactive element: `2px solid var(--ember); outline-offset: 3px`.
  (Especially important here — with no custom cursor, keyboard users get no other affordance.)
- Full `prefers-reduced-motion: reduce` block: kill parallax, scroll-zoom, magnetic buttons,
  and the FAB pulse; keep opacity fades at 0.15s.
- Accordion uses `aria-expanded` + `aria-controls`. Mobile menu traps focus and closes on Escape.
- Filter chips are real `<button>` elements with `aria-pressed`.

---

## 10. FILE STRUCTURE

```
src/
  components/
    Wordmark.tsx
    Header.tsx
    MobileMenu.tsx
    Hero.tsx
    ValueStrip.tsx
    Categories.tsx
    Catalog.tsx
    ProductCard.tsx
    ProductImage.tsx
    About.tsx
    Wholesale.tsx
    HowToOrder.tsx
    VisitUs.tsx
    Faq.tsx
    FinalCta.tsx
    Footer.tsx
    WhatsAppFab.tsx
    RevealText.tsx          // Taste Skill L2
    MagneticButton.tsx      // Taste Skill L4
    AnimatedCounter.tsx     // Taste Skill bonus
    Seo.tsx
  hooks/
    useParallax.ts          // Taste Skill L3
    useScrolled.ts
  data/
    business.ts
    products.ts
    faq.ts
  utils/
    easings.ts
    whatsapp.ts
  styles/
    tokens.css
    base.css
    components.css
  App.tsx
  main.tsx
```

**No `CustomCursor.tsx`.** If you find yourself creating it, stop — it is disabled on this project.

---

## 11. WORKING PROTOCOL

1. Read the Taste Skill first.
2. Scaffold: Vite + deps + tokens.css + base.css + `business.ts` + `products.ts`.
3. Build Header, then Hero. **STOP.** Screenshot 1440px and 390px. Report and wait.
4. After approval, build Sections 3 → 13 in order. Report after Section 5 (Catálogo) and
   again after Section 9.
5. Run `npm run build` — must pass with **zero TypeScript errors**.
6. Final report must list: every `{{PENDIENTE}}` token still in the code, every missing image
   path, Lighthouse scores, and any copy you were unsure about.

### Hard constraints — verify before every checkpoint

- [ ] No Tailwind, no CSS framework, no UI library
- [ ] No custom cursor; native cursor intact
- [ ] No emoji anywhere
- [ ] No prices, anywhere, in any form
- [ ] No invented address, hours, testimonials, stats, or history
- [ ] No dark backgrounds outside hero overlay and footer
- [ ] Floating WhatsApp button present and working
- [ ] Section padding `120px 0`, container `1320px`, container padding `0 64px`
- [ ] All UI copy in Spanish; all code, variables, and comments in English

---

## 12. PHASE 2 — DO NOT BUILD YET

Listed so the Phase 1 architecture accommodates it without refactoring. Build only when Dante
explicitly approves.

- React Router category routes: `/productos/salamis`, `/productos/jamones`,
  `/productos/salchichas`, `/productos/longanizas`, `/productos/especialidades` — each an
  indexable page with its own title, description, H1, and intro copy.
- Individual product detail pages (`/productos/:categoria/:slug`) — only worth it once real
  photos and descriptions exist.
- Search bar with fuzzy match across product names.
- Hero slider (multi-slide), reusing the existing Hero component shell.
- Real logo swap inside `Wordmark.tsx`.
- Google Business Profile + Search Console setup, sitemap resubmission.

---

## 13. FIRST PROMPT FOR CLAUDE CODE

> Read the NEXIX Taste Skill at https://github.com/Leonxlnx/taste-skill and this entire
> CLAUDE.md before writing any code. Note that Level 1 (CustomCursor) is explicitly disabled
> on this project — the site uses the native browser cursor.
>
> Scaffold the project (React 18 + TypeScript + Vite + Framer Motion + vanilla CSS, no Tailwind),
> create the design tokens, `business.ts`, and `products.ts` with all 34 products from Section 6,
> then build **only** the Header and the Hero.
>
> When the Hero is done, take screenshots at 1440px and 390px width, report what you built, and
> stop. Do not continue to Section 3 until I approve.
