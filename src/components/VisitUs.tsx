import { BUSINESS, HOURS, NEARBY_AREAS, isPending } from '../data/business';
import { WA_GENERAL } from '../utils/whatsapp';
import RevealText from './RevealText';
import { IconClock, IconPhone, IconPin, IconWhatsApp } from './Icons';

export default function VisitUs() {
  const mapReady = !isPending(BUSINESS.mapEmbedUrl);

  return (
    <section
      className="section section--cream visit"
      id="visitanos"
      aria-labelledby="visitanos-title"
    >
      <div className="container visit__inner">
        <div className="visit__copy">
          <span className="eyebrow">Visítanos</span>
          <RevealText tag="h2" id="visitanos-title">
            Estamos en Villa Consuelo
          </RevealText>

          <ul className="visit__list">
            <li className="visit__item">
              <span className="visit__icon">
                <IconPin size={20} />
              </span>
              <span>
                <strong className="visit__label">Dirección</strong>
                <span className="visit__value">{BUSINESS.address}</span>
                <span className="visit__value muted">
                  {BUSINESS.addressLocality}, {BUSINESS.addressRegion}{' '}
                  {BUSINESS.postalCode}
                </span>
                {/* The Maps listing carries a different name; saying so here
                    saves the trip of looking for one that does not exist. */}
                <span className="visit__value muted">
                  En Google Maps aparecemos como {BUSINESS.mapsName}
                </span>
                <a
                  className="visit__maplink"
                  href={BUSINESS.mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cómo llegar
                </a>
              </span>
            </li>

            <li className="visit__item">
              <span className="visit__icon">
                <IconClock size={20} />
              </span>
              <span>
                <strong className="visit__label">Horario</strong>
                {HOURS.map((block) => (
                  <span className="visit__value" key={block.label}>
                    {block.label}: {block.display}
                  </span>
                ))}
              </span>
            </li>

            <li className="visit__item">
              <span className="visit__icon">
                <IconPhone size={20} />
              </span>
              <span>
                <strong className="visit__label">Teléfono y WhatsApp</strong>
                <a className="visit__value visit__phone" href={`tel:${BUSINESS.phoneE164}`}>
                  {BUSINESS.whatsappDisplay}
                </a>
                <a
                  className="visit__value visit__phone-alt"
                  href={`tel:${BUSINESS.landlineE164}`}
                >
                  {BUSINESS.landlineDisplay}
                </a>
              </span>
            </li>
          </ul>

          {/* Naming the surrounding barrios is the strongest local signal the
              page can carry, and it answers the real question a neighbour has:
              "¿me queda cerca?". Phrased as distance, not as coverage. */}
          <div className="visit__areas">
            <strong className="visit__label">Estamos cerca de ti</strong>
            <p>
              A minutos de {NEARBY_AREAS.slice(1, -1).join(', ')} y{' '}
              {NEARBY_AREAS[NEARBY_AREAS.length - 1]}. Si estás por la zona, pasa
              por el negocio o coordina la entrega por WhatsApp.
            </p>
          </div>

          <a
            className="btn btn--primary visit__cta"
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsApp size={16} />
            Escríbenos por WhatsApp
          </a>
        </div>

        <div className="visit__map">
          {mapReady ? (
            <iframe
              className="visit__iframe"
              src={BUSINESS.mapEmbedUrl}
              title={`Ubicación de ${BUSINESS.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            // No confirmed address, so no map: a neutral block, never an iframe
            // pointing at a guessed location.
            <div className="visit__map-placeholder" role="img" aria-label="Mapa pendiente de confirmar">
              <span className="visit__map-diamond" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
