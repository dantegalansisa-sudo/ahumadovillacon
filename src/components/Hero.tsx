import { useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { IconWhatsApp } from './Icons';
import { WA_GENERAL } from '../utils/whatsapp';

/**
 * Split hero: the copy sits on a dark panel on the left, the photo owns the
 * right. The panel colour is sampled from the photo's own slate background so
 * the two meet without a seam, and keeping the image to roughly half the
 * viewport means it is barely scaled up.
 */
export default function Hero() {
  const [hasImage, setHasImage] = useState(true);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 1.1]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.4], [0, 60]);

  return (
    <section className="hero" id="inicio">
      <div className="hero__media">
        {hasImage ? (
          <motion.div
            className="hero__media-inner"
            style={reduceMotion ? undefined : { scale }}
          >
            <img
              className="hero__image"
              src="/images/hero.webp"
              alt="Tabla de quesos, uvas y frutos secos de Ahumados Villacon"
              width={526}
              height={360}
              fetchpriority="high"
              decoding="async"
              onError={() => setHasImage(false)}
            />
          </motion.div>
        ) : (
          <div className="hero__fallback" aria-hidden="true">
            <span className="hero__fallback-diamond" />
          </div>
        )}
        {/* Fades the photo into the copy panel instead of cutting it off. */}
        <span className="hero__fade" aria-hidden="true" />
      </div>

      <motion.div
        className="container hero__content"
        style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <div className="hero__copy">
          <span className="eyebrow hero__eyebrow">
            Embutidos y quesos &middot; Al por mayor y al detalle
          </span>

          <RevealText tag="h1" className="hero__title">
            Sabor ahumado que tu negocio necesita
          </RevealText>

          <p className="hero__subline">
            Salamis, jamones, salchichas, longanizas y quesos de las mejores marcas
            del país. Servimos colmados, cafeterías y restaurantes en todo Santo
            Domingo.
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
        </div>
      </motion.div>
    </section>
  );
}
