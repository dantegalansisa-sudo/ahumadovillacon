import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FAQ } from '../data/faq';
import { EASINGS } from '../utils/easings';
import RevealText from './RevealText';
import { IconPlus } from './Icons';

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(FAQ[0].id);

  return (
    <section
      className="section section--deep faq"
      id="preguntas"
      aria-labelledby="faq-title"
    >
      <div className="container faq__inner">
        <div className="faq__head">
          <span className="eyebrow">Preguntas frecuentes</span>
          <RevealText tag="h2" id="faq-title">
            Lo que más nos preguntan
          </RevealText>
        </div>

        <ul className="faq__list">
          {FAQ.map((item) => {
            const open = openId === item.id;
            return (
              <li className={`faq__item ${open ? 'is-open' : ''}`} key={item.id}>
                <h3 className="faq__question">
                  <button
                    type="button"
                    className="faq__trigger"
                    aria-expanded={open}
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-trigger-${item.id}`}
                    onClick={() => setOpenId(open ? null : item.id)}
                  >
                    <span>{item.question}</span>
                    <span className={`faq__icon ${open ? 'is-open' : ''}`} aria-hidden="true">
                      <IconPlus size={20} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      className="faq__panel"
                      id={`faq-panel-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASINGS.premium }}
                    >
                      <p className="faq__answer">{item.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
