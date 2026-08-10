import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CATEGORIES,
  PRODUCTS,
  countByCategory,
  type Category,
} from '../data/products';
import { containerVariants, cardVariants, EASINGS } from '../utils/easings';
import RevealText from './RevealText';
import ProductCard from './ProductCard';

export type Filter = Category | 'todos';

const EAGER_COUNT = 4;

export default function Catalog() {
  const [filter, setFilter] = useState<Filter>('todos');
  // First reveal staggers; later filter changes use a quick fade so repeat
  // clicks never feel sluggish.
  const [interacted, setInteracted] = useState(false);

  const select = (next: Filter) => {
    setInteracted(true);
    setFilter(next);
  };

  const visible =
    filter === 'todos' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter);

  const chips: { id: Filter; label: string; count: number }[] = [
    { id: 'todos', label: 'Todos', count: PRODUCTS.length },
    ...CATEGORIES.map((category) => ({
      id: category.id as Filter,
      label: category.chipLabel,
      count: countByCategory(category.id),
    })),
  ];

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
            Escríbenos por WhatsApp con los productos que necesitas y te confirmamos
            precio y disponibilidad al momento.
          </p>
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
        <motion.div
          className="catalog__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((product, index) => (
              <motion.div
                key={product.slug}
                // Layout measurement is only worth its cost once the visitor
                // starts filtering; on first paint it is 34 extra measures.
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
      </div>
    </section>
  );
}
