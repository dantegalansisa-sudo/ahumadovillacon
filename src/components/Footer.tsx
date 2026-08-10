import { Link } from 'react-router-dom';
import {
  AGENCY,
  BUSINESS,
  HOURS_SHORT,
  LEGAL,
  NAV,
  PENDING,
  isPending,
} from '../data/business';
import { CATEGORIES } from '../data/products';
import { WA_GENERAL } from '../utils/whatsapp';
import Wordmark from './Wordmark';
import { IconFacebook, IconInstagram, IconPin, IconWhatsApp } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Wordmark variant="dark" size="footer" />
          <p className="footer__desc">
            Distribuidor de embutidos en el Mercado de Villa Consuelo, Santo
            Domingo. Venta al por mayor y al detalle para colmados, cafeterías,
            restaurantes y hogares.
          </p>
        </div>

        <nav className="footer__col" aria-label="Productos">
          <h2 className="footer__title">Productos</h2>
          <ul className="footer__links">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <Link to={`/productos/${category.id}`}>{category.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Enlaces">
          <h2 className="footer__title">Enlaces</h2>
          <ul className="footer__links">
            {NAV.map((link) => (
              <li key={link.href}>
                <Link to={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h2 className="footer__title">Contacto</h2>
          <ul className="footer__links footer__contact">
            <li>
              <a href={WA_GENERAL} target="_blank" rel="noopener noreferrer">
                <IconWhatsApp size={15} />
                WhatsApp {BUSINESS.whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={BUSINESS.mapLinkUrl} target="_blank" rel="noopener noreferrer">
                <IconPin size={15} />
                {BUSINESS.address}
              </a>
            </li>
            <li>
              <span className="footer__muted">
                {BUSINESS.addressLocality}, {BUSINESS.addressRegion}
              </span>
            </li>
            <li>
              <span className="footer__muted">{HOURS_SHORT}</span>
            </li>
          </ul>

          <div className="footer__socials">
            {isPending(BUSINESS.instagram) ? (
              <span className="footer__muted">Redes: {PENDING}</span>
            ) : (
              <>
                <a
                  href={BUSINESS.instagram}
                  aria-label="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconInstagram size={18} />
                </a>
                {!isPending(BUSINESS.facebook) && (
                  <a
                    href={BUSINESS.facebook}
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconFacebook size={18} />
                  </a>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="container footer__bottom">
        <span>
          &copy; {year} {BUSINESS.name}
        </span>
        <span className="footer__legal">
          Nombre comercial registrado en {LEGAL.registryOffice} No.{' '}
          {LEGAL.registryNumber}
        </span>
        <span>
          Diseño web por{' '}
          <a href={AGENCY.url} target="_blank" rel="noopener noreferrer">
            {AGENCY.name}
          </a>
        </span>
      </div>
    </footer>
  );
}
