import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES, PRODUCTS, type Category } from '../data/products';
import { containerVariants, cardVariants, INITIAL_HIDDEN } from '../utils/easings';
import { breadcrumbSchema, itemListSchema } from '../utils/schema';
import { WA_GENERAL } from '../utils/whatsapp';
import Seo from '../components/Seo';
import Header from '../components/Header';
import Footer from '../components/Footer';
import WhatsAppFab from '../components/WhatsAppFab';
import Breadcrumbs from '../components/Breadcrumbs';
import RevealText from '../components/RevealText';
import MagneticButton from '../components/MagneticButton';
import ProductCard from '../components/ProductCard';
import FinalCta from '../components/FinalCta';
import { IconArrowRight, IconWhatsApp } from '../components/Icons';

const EAGER_COUNT = 4;

/**
 * Phase 2 route: /productos/:categoria — one indexable page per family, each
 * with its own title, description, H1 and intro copy.
 */
export default function CategoryPage() {
  const { categoria } = useParams<{ categoria: string }>();
  const meta = CATEGORIES.find((c) => c.id === categoria);

  // Unknown slug: send it to the 404 rather than rendering an empty grid.
  if (!meta) return <Navigate to="/404" replace />;

  const category = meta.id as Category;
  const products = PRODUCTS.filter((p) => p.category === category);
  const others = CATEGORIES.filter((c) => c.id !== category);
  const path = `/productos/${category}`;

  return (
    <>
      <Seo
        title={meta.metaTitle}
        description={meta.metaDescription}
        path={path}
        schemas={[
          breadcrumbSchema([
            { name: 'Inicio', path: '/' },
            { name: meta.label, path },
          ]),
          itemListSchema(products, meta.label),
        ]}
      />

      <a className="skip-link" href="#productos">
        Saltar a los productos
      </a>

      <Header />

      <main id="main" className="category">
        <section className="section section--cream category__head">
          <div className="container">
            <Breadcrumbs
              trail={[
                { name: 'Inicio', path: '/' },
                { name: meta.label, path },
              ]}
            />

            <span className="eyebrow">
              {products.length} {products.length === 1 ? 'producto' : 'productos'}
            </span>

            <RevealText tag="h1" className="category__title">
              {meta.h1}
            </RevealText>

            <div className="category__intro">
              {meta.intro.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <div className="category__actions">
              <MagneticButton href={WA_GENERAL} className="btn btn--primary">
                <IconWhatsApp size={16} />
                Pedir por WhatsApp
              </MagneticButton>
              <Link className="btn btn--ghost" to="/#catalogo">
                Ver catálogo completo
              </Link>
            </div>
          </div>
        </section>

        <section
          className="section section--deep category__grid-section"
          id="productos"
          aria-labelledby="productos-title"
        >
          <div className="container">
            <div className="section-head">
              <RevealText tag="h2" id="productos-title">
                {meta.gridHeading}
              </RevealText>
            </div>

            <motion.div
              className="catalog__grid"
              variants={containerVariants}
              initial={INITIAL_HIDDEN}
              whileInView="visible"
              viewport={{ once: true, amount: 0.05 }}
            >
              {products.map((product, index) => (
                <motion.div key={product.slug} variants={cardVariants}>
                  <ProductCard product={product} eager={index < EAGER_COUNT} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="section section--cream category__others" aria-labelledby="otras-title">
          <div className="container">
            <div className="section-head section-head--center">
              <span className="eyebrow">Seguir viendo</span>
              <RevealText tag="h2" id="otras-title" center>
                Otras familias de producto
              </RevealText>
            </div>

            <ul className="category__links">
              {others.map((other) => (
                <li key={other.id}>
                  <Link to={`/productos/${other.id}`}>
                    <span>{other.label}</span>
                    <IconArrowRight size={20} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <FinalCta />
      </main>

      <Footer />
      <WhatsAppFab />
    </>
  );
}
