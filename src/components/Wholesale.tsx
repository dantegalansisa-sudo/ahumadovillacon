import { motion } from 'framer-motion';
import { BUSINESS, HOURS_SHORT } from '../data/business';
import { WA_WHOLESALE } from '../utils/whatsapp';
import { containerVariants, cardVariants, INITIAL_HIDDEN } from '../utils/easings';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { IconCheck, IconClock, IconWhatsApp } from './Icons';

/**
 * "Factura con comprobante fiscal" was dropped from this checklist: the client
 * has not confirmed they issue NCF. Add it back only after confirmation.
 * Every line below is client-confirmed.
 */
const CHECKLIST = [
  'Cotización por volumen',
  'Sin pedido mínimo',
  'Entrega coordinada por WhatsApp',
  'Pedidos recurrentes',
];

export default function Wholesale() {
  return (
    <section
      className="section wholesale"
      id="al-por-mayor"
      aria-labelledby="mayorista-title"
    >
      <div className="container wholesale__inner">
        <div className="wholesale__copy">
          <span className="eyebrow">Al por mayor</span>
          <RevealText tag="h2" id="mayorista-title">
            Precios especiales para negocios
          </RevealText>

          <p className="lead">
            Si tienes un colmado, una cafetería, un restaurante, un hotel o haces
            catering, trabajamos contigo con precios de mayorista y disponibilidad
            constante de las marcas que más rotan.
          </p>

          <motion.ul
            className="wholesale__list"
            variants={containerVariants}
            initial={INITIAL_HIDDEN}
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {CHECKLIST.map((item) => (
              <motion.li key={item} variants={cardVariants}>
                <span className="wholesale__check">
                  <IconCheck size={18} />
                </span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <aside className="wholesale__card" aria-label="Contacto para mayoristas">
          <span className="wholesale__card-eyebrow">Cotiza hoy mismo</span>

          <a className="wholesale__phone" href={`tel:${BUSINESS.phoneE164}`}>
            {BUSINESS.whatsappDisplay}
          </a>

          <p className="wholesale__card-line muted">
            Escríbenos con tu lista de productos y la cantidad aproximada.
          </p>

          <MagneticButton href={WA_WHOLESALE} className="btn btn--primary btn--block">
            <IconWhatsApp size={16} />
            Solicitar cotización
          </MagneticButton>

          <div className="wholesale__hours">
            <IconClock size={18} />
            <span>{HOURS_SHORT}</span>
          </div>
        </aside>
      </div>
    </section>
  );
}
