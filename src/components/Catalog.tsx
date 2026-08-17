import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CATEGORIES,
  PRODUCTS,
  countByCategory,
} from '../data/products';
import { useCatalogQuery, type Filter } from '../hooks/useCatalogQuery';
import { searchProducts } from '../utils/search';
import { containerVariants, cardVariants, EASINGS, INITIAL_HIDDEN } from '../utils/easings';
import RevealText from './RevealText';
import ProductCard from './ProductCard';
import SearchBox from './SearchBox';
import EmptyResults from './EmptyResults';

export type { Filter };

const EAGER_COUNT = 4;

export default function Catalog() {
  const { query, setQuery, filter, setFilter } = useCatalogQuery();
  // First reveal staggers; later filter changes use a quick fade so repeat
  // clicks never feel sluggish.
  const [interacted, setInteracted] = useState(false);

  const searching = query.trim().length > 0;

  // Category first, then the query, so the chip counts stay honest: they
  // describe the whole catalog, not the current search.
  const visible = useMemo(() => {
    const pool =
      filter === 'todos' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);
    if (!searching) return pool;
    return searchProducts(query, pool).map((result) => result.product);
  }, [filter, query, searching]);

  const select = (next: Filter) => {
    setInteracted(true);
    setFilter(next);
  };

  const search = (next: string) => {
    setInteracted(true);
    setQuery(next);
  };

  const chips: { id: Filter; label: string; count: number }[] = [
    { id: 'todos', label: 'Todos', count: PRODUCTS.length },
    ...CATEGORIES.map((category) => ({
      id: category.id as Filter,
      label: category.chipLabel,
      count: countByCategory(category.id),
    })),
  ];

  const status = searching
    ? `${visible.length} ${visible.length === 1 ? 'producto' : 'productos'} para "${query.trim()}"`
    : '';

  return (
    <section
      className="section section--deep catalog"
      id="catalogo"
      aria-labelledby="catalogo-title"
    >
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">{PRODUCTS.length} productos disponibles</span>
          <RevealText tag="h2" id="catalogo-title" center>
            Catálogo de embutidos
          </RevealText>
          <p className="lead catalog__lead">
            Busca lo que necesitas y agrégalo a tu lista. Te confirmamos precio y
            disponibilidad por WhatsApp al momento.
          </p>

          {/* Deliberately outside the sticky bar below. Sharing that row left
              the last three chips behind a horizontal scroll, and stacking both
              inside it put 250px of fixed furniture over a laptop screen. Once
              this scrolls away the header magnifier takes over. */}
          <SearchBox
            id="catalog-search"
            value={query}
            onChange={search}
            label="Buscar en el catálogo"
            placeholder="Buscar: salami, queso de freír, induveca…"
            status={status}
          />
        </div>
      </div>

      <div className="catalog__filters">
        <div className="container">
          <div
            className="catalog__chips"
            role="group"
            aria-label="Filtrar productos por categoría"
          >
            {chips.map((chip) => (
              <button
                key={chip.id}
                type="button"
                className={`chip ${filter === chip.id ? 'is-active' : ''}`}
                aria-pressed={filter === chip.id}
                onClick={() => select(chip.id)}
              >
                {chip.label}
                <span className="chip__count">{chip.count}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        {searching && visible.length > 0 && (
          <p className="catalog__count">
            {visible.length} {visible.length === 1 ? 'resultado' : 'resultados'} para{' '}
            <strong>{query.trim()}</strong>
          </p>
        )}

        {visible.length === 0 ? (
          <EmptyResults
            query={query.trim()}
            filtered={filter !== 'todos'}
            onClearFilter={() => select('todos')}
          />
        ) : (
          <motion.div
            className="catalog__grid"
            variants={containerVariants}
            initial={INITIAL_HIDDEN}
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((product, index) => (
                <motion.div
                  key={product.slug}
                  // Layout measurement is only worth its cost once the visitor
                  // starts filtering; on first paint it is 56 extra measures.
                  layout={interacted}
                  variants={interacted ? undefined : cardVariants}
                  initial={interacted ? { opacity: 0, scale: 0.98 } : undefined}
                  animate={interacted ? { opacity: 1, scale: 1 } : undefined}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: EASINGS.snappy }}
                >
                  <ProductCard product={product} eager={index < EAGER_COUNT} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
}
