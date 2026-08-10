import RevealText from './RevealText';
import MagneticButton from './MagneticButton';
import { IconWhatsApp } from './Icons';
import { WA_GENERAL } from '../utils/whatsapp';

export default function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="cta-title">
      <div className="container final-cta__inner">
        <RevealText tag="h2" id="cta-title" className="final-cta__title" center>
          ¿Listo para hacer tu pedido?
        </RevealText>

        <p className="final-cta__line">
          Mándanos tu lista por WhatsApp y te respondemos con precio y disponibilidad.
        </p>

        <MagneticButton href={WA_GENERAL} className="btn btn--white">
          <IconWhatsApp size={16} />
          Escríbenos ahora
        </MagneticButton>
      </div>
    </section>
  );
}
