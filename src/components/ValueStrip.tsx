import { motion } from 'framer-motion';
import { containerVariants, cardVariants, INITIAL_HIDDEN } from '../utils/easings';
import { IconAward, IconChat, IconScale, IconSnow } from './Icons';

const VALUES = [
  {
    icon: <IconAward />,
    title: 'Marcas reconocidas',
    line: 'Induveca, El Cerro, Agrofem, Moyeta y más.',
  },
  {
    icon: <IconScale />,
    title: 'Al por mayor y al detalle',
    line: 'Compra por libra o por caja completa.',
  },
  {
    icon: <IconSnow />,
    title: 'Cadena de frío',
    line: 'Manejo y refrigeración adecuada del producto.',
  },
  {
    icon: <IconChat />,
    title: 'Pedidos por WhatsApp',
    line: 'Cotiza en minutos, sin vueltas.',
  },
];

export default function ValueStrip() {
  return (
    <section className="value-strip" aria-label="Por qué comprarnos">
      <motion.ul
        className="container value-strip__grid"
        variants={containerVariants}
        initial={INITIAL_HIDDEN}
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {VALUES.map((value) => (
          <motion.li className="value-strip__item" key={value.title} variants={cardVariants}>
            <span className="value-strip__icon">{value.icon}</span>
            {/* Labels, not section headings — an h3 here would jump the
                document outline straight from the hero h1 to h3. */}
            <p className="value-strip__title">{value.title}</p>
            <p className="value-strip__line">{value.line}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
