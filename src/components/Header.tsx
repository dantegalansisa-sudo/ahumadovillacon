import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BUSINESS, NAV, isPending } from '../data/business';
import { useScrolled } from '../hooks/useScrolled';
import Wordmark from './Wordmark';
import MobileMenu from './MobileMenu';
import {
  IconFacebook,
  IconInstagram,
  IconMenu,
  IconWhatsApp,
} from './Icons';
import { WA_GENERAL } from '../utils/whatsapp';

export default function Header() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);

  const leftLinks = NAV.slice(0, 3);
  const rightLinks = NAV.slice(3);
  // Social handles are still unconfirmed; the icons appear on their own once
  // business.ts has real URLs. Nothing is linked to a guessed profile.
  const hasSocials = !isPending(BUSINESS.instagram) || !isPending(BUSINESS.facebook);

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header__topbar">
          <div className="container header__topbar-inner">
            <div className="header__socials">
              {hasSocials ? (
                <>
                  {!isPending(BUSINESS.instagram) && (
                    <a
                      href={BUSINESS.instagram}
                      aria-label="Instagram de Ahumados Villacon"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconInstagram size={16} />
                    </a>
                  )}
                  {!isPending(BUSINESS.facebook) && (
                    <a
                      href={BUSINESS.facebook}
                      aria-label="Facebook de Ahumados Villacon"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <IconFacebook size={16} />
                    </a>
                  )}
                </>
              ) : (
                <span className="header__tagline">
                  Embutidos al por mayor y al detalle
                </span>
              )}
            </div>

            <a
              className="header__wa"
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconWhatsApp size={14} />
              <span className="header__wa-label">WhatsApp</span>
              <span>{BUSINESS.whatsappDisplay}</span>
            </a>
          </div>
        </div>

        <div className="container header__main">
          <button
            type="button"
            className="header__burger"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <IconMenu size={26} />
          </button>

          <Link to="/#inicio" className="header__brand">
            <Wordmark size="header" compact={scrolled} />
          </Link>

          <a
            className="header__cta btn btn--primary"
            href={WA_GENERAL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pedir
          </a>
        </div>

        <nav className="header__nav" aria-label="Navegación principal">
          <div className="container header__nav-inner">
            <ul className="header__nav-group">
              {leftLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
            <span className="header__nav-diamond" aria-hidden="true" />
            <ul className="header__nav-group">
              {rightLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Holds the at-rest height of the fixed header. */}
      <div className="header-spacer" aria-hidden="true" />

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
