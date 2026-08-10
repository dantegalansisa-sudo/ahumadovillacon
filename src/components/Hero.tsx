import { useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { IconWhatsApp } from './Icons';
import { WA_GENERAL } from '../utils/whatsapp';

/**
 * Single-slide hero. Phase 1 has no prices, so a rotating promo carousel would
 * carry nothing — the shell below stays slider-ready for Phase 2.
 */
export default function Hero() {
  const [hasImage, setHasImage] = useState(true);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, 80]);

  return (
    <section className="hero" id="inicio">
      <motion.div
        className="hero__media"
        style={reduceMotion ? undefined : { scale }}
      >
        {hasImage ? (
          <img
            className="hero__image"
            src="/images/hero.jpg"
            alt="Surtido de embutidos de Ahumados Villacon"
            width={2400}
            height={1400}
            fetchpriority="high"
            decoding="async"
            onError={() => setHasImage(false)}
          />
        ) : (
          // Photo not delivered yet — neutral block, never a stock image.
          <div className="hero__fallback" aria-hidden="true">
            <span className="hero__fallback-diamond" />
          </div>
        )}
      </motion.div>

      <div className="hero__overlay" aria-hidden="true" />

      <motion.div
        className="container hero__content"
        style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <span className="eyebrow hero__eyebrow">
          Embutidos &middot; Al por mayor y al detalle
        </span>

        <RevealText tag="h1" className="hero__title" center>
          Sabor ahumado que tu negocio necesita
        </RevealText>

        <p className="hero__subline">
          Salamis, jamones, salchichas y longanizas de las mejores marcas del país.
          Servimos colmados, cafeterías y restaurantes en todo Santo Domingo.
        </p>

        <div className="hero__actions">
          <MagneticButton href="#catalogo" className="btn btn--primary" newTab={false}>
            Ver productos
          </MagneticButton>
          <MagneticButton href={WA_GENERAL} className="btn btn--ghost-light">
            <IconWhatsApp size={16} />
            Pedir por WhatsApp
          </MagneticButton>
        </div>
      </motion.div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-line">
          <span className="hero__scroll-dot" />
        </span>
      </div>
    </section>
  );
}
