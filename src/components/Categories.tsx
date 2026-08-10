import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES, countByCategory } from '../data/products';
import { containerVariants, cardVariants } from '../utils/easings';
import RevealText from './RevealText';
import ProductImage from './ProductImage';
import { IconArrowRight } from './Icons';

/**
 * Since Phase 2 each card is a real link to its own indexable page, which is
 * both better for crawling and more useful than filtering in place.
 */
export default function Categories() {
  return (
    <section
      className="section section--cream categories"
      id="categorias"
      aria-labelledby="categorias-title"
    >
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">Nuestro catálogo</span>
          <RevealText tag="h2" id="categorias-title" center>
            Cinco familias de producto
          </RevealText>
        </div>

        <motion.div
          className="categories__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
            >
              <Link className="category-card" to={`/productos/${category.id}`}>
                <div className="category-card__media">
                  <ProductImage
                    className="category-card__img"
                    src={category.image}
                    alt={`Categoría ${category.label}`}
                    width={1200}
                    height={900}
                    tone="deep"
                  />
                </div>

                <div className="category-card__body">
                  <span className="category-card__meta">
                    {countByCategory(category.id)} productos
                  </span>
                  <h3 className="category-card__title">{category.label}</h3>
                  <p className="category-card__blurb">{category.blurb}</p>
                  <span className="category-card__arrow">
                    <IconArrowRight size={22} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
