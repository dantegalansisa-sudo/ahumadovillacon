import { motion } from 'framer-motion';
import { LEGAL, PENDING } from '../data/business';
import { CATEGORIES, PRODUCTS, SALAMI_BRANDS } from '../data/products';
import { EASINGS, INITIAL_HIDDEN } from '../utils/easings';
import { useParallax } from '../hooks/useParallax';
import RevealText from './RevealText';
import AnimatedCounter from './AnimatedCounter';
import ProductImage from './ProductImage';

/**
 * Every figure is counted from the catalog itself, so none of it is invented
 * and none of it can drift. Years in business and customers served are still
 * unknown — add them here only once the client states them.
 */
const STATS: { value: number | null; suffix?: string; label: string }[] = [
  { value: PRODUCTS.length, label: 'Productos en catálogo' },
  { value: CATEGORIES.length, label: 'Familias de producto' },
  { value: SALAMI_BRANDS.length, label: 'Marcas de salami' },
];

export default function About() {
  const { ref, y } = useParallax(40);

  return (
    <section
      className="section section--cream about"
      id="nosotros"
      aria-labelledby="nosotros-title"
    >
      <div className="container about__inner">
        <div className="about__copy">
          <span className="eyebrow">Quiénes somos</span>
          <RevealText tag="h2" id="nosotros-title">
            Del mercado a tu negocio
          </RevealText>

          {/* No founding year, no invented story, and no owner name: the
              client asked that his own not appear anywhere on the site.
              "Comercialización", never "elaboración" — the catalog is other
              people's brands and the site cannot claim to make them. */}
          <p className="lead">
            Lo nuestro es atender bien. Estamos en el Mercado de Villa Consuelo, en
            Santo Domingo, con embutidos, jamones, quesos y productos ahumados de
            res, cerdo y aves: al por mayor para el negocio y al detalle para la
            casa.
          </p>

          <p className="about__text">
            Aquí se compra hablando. Nos dices por WhatsApp lo que necesitas, te
            confirmamos precio y disponibilidad al momento y coordinamos la entrega.
            Sin pedido mínimo y sin dar vueltas.
          </p>

          <p className="about__text">
            Atendemos colmados, cafeterías, restaurantes y hogares de Villa Consuelo
            y de los barrios de alrededor. Nuestro nombre comercial está registrado
            en {LEGAL.registryOffice} bajo el número {LEGAL.registryNumber}.
          </p>

          <ul className="about__stats">
            {STATS.map((stat, i) => (
              <li className="about__stat" key={i}>
                <span className="about__stat-value">
                  {stat.value === null ? (
                    <span className="about__stat-pending">{PENDING}</span>
                  ) : (
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  )}
                </span>
                <span className="about__stat-label">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* The in-view trigger sits on the wrapper: a clipped element reports
            no intersection, so a whileInView on the clip itself never fires. */}
        <motion.div
          className="about__media"
          ref={ref}
          initial={INITIAL_HIDDEN}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="about__frame" aria-hidden="true" />
          <motion.div
            className="about__clip"
            variants={{
              hidden: { clipPath: 'inset(0 100% 0 0)' },
              visible: {
                clipPath: 'inset(0 0% 0 0)',
                transition: { duration: 1.2, ease: EASINGS.premium },
              },
            }}
          >
            {/* Scaled up so the parallax travel never exposes an edge. */}
            <motion.div style={{ y, scale: 1.14 }}>
              <ProductImage
                className="about__img"
                src="/images/local.jpg"
                alt="Local de Ahumados Villacon en el Mercado de Villa Consuelo"
                width={1200}
                height={1500}
                tone="deep"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
