import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { Product } from '../data/products';
import { searchProducts } from '../utils/search';
import { containerVariants, cardVariants, INITIAL_HIDDEN } from '../utils/easings';
import ProductCard from './ProductCard';
import SearchBox from './SearchBox';
import EmptyResults from './EmptyResults';

const EAGER_COUNT = 4;
/** Below this a search field is furniture: the whole family fits on a screen. */
const MIN_FOR_SEARCH = 6;

interface CategoryGridProps {
  products: Product[];
  label: string;
}

/**
 * The grid on a category page, with its own search scoped to that family.
 * State is local and starts empty, so the prerendered HTML still ships every
 * product of the category — which is what Google reads.
 */
export default function CategoryGrid({ products, label }: CategoryGridProps) {
  const [query, setQuery] = useState('');
  const term = query.trim();

  const visible = useMemo(
    () => (term ? searchProducts(term, products).map((r) => r.product) : products),
    [term, products],
  );

  return (
    <>
      {products.length >= MIN_FOR_SEARCH && (
        <div className="category__search">
          <SearchBox
            id="category-search"
            value={query}
            onChange={setQuery}
            label={`Buscar en ${label.toLowerCase()}`}
            placeholder={`Buscar en ${label.toLowerCase()}…`}
            status={
              term
                ? `${visible.length} ${visible.length === 1 ? 'producto' : 'productos'}`
                : ''
            }
          />
          {term && visible.length > 0 && (
            <p className="catalog__count">
              {visible.length} de {products.length}
            </p>
          )}
        </div>
      )}

      {visible.length === 0 ? (
        <EmptyResults query={term} filtered={false} onClearFilter={() => setQuery('')} />
      ) : (
        <motion.div
          className="catalog__grid"
          variants={containerVariants}
          initial={INITIAL_HIDDEN}
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          {visible.map((product, index) => (
            <motion.div key={product.slug} variants={cardVariants}>
              <ProductCard product={product} eager={index < EAGER_COUNT} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
}
