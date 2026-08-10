import { motion } from 'framer-motion';
import { containerVariants, cardVariants } from '../utils/easings';
import RevealText from './RevealText';

const STEPS = [
  {
    number: '01',
    title: 'Elige tus productos',
    line: 'Revisa el catálogo y anota lo que necesitas.',
  },
  {
    number: '02',
    title: 'Escríbenos por WhatsApp',
    line: 'Te confirmamos precio y disponibilidad al momento.',
  },
  {
    number: '03',
    title: 'Recoge o coordina entrega',
    // Delivery is confirmed; zones, costs and times are not, so nothing here
    // promises any of that.
    line: 'Pasa por el mercado o coordinamos la entrega por WhatsApp.',
  },
];

export default function HowToOrder() {
  return (
    <section
      className="section section--cream how"
      id="como-pedir"
      aria-labelledby="como-pedir-title"
    >
      <div className="container">
        <div className="section-head section-head--center">
          <span className="eyebrow">Cómo pedir</span>
          <RevealText tag="h2" id="como-pedir-title" center>
            Tres pasos y listo
          </RevealText>
        </div>

        <motion.ol
          className="how__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {STEPS.map((step) => (
            <motion.li className="how__step" key={step.number} variants={cardVariants}>
              <span className="how__number" aria-hidden="true">
                {step.number}
              </span>
              <h3 className="how__title">{step.title}</h3>
              <p className="how__line">{step.line}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
