import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NAV } from '../data/business';
import { useScrolled } from '../hooks/useScrolled';
import Wordmark from './Wordmark';
import MobileMenu from './MobileMenu';
import HeaderSearch from './HeaderSearch';
import { IconMenu } from './Icons';

/**
 * One row: three links, the wordmark, three links. The old topbar is gone so
 * the hero starts higher; the phone number lives in the floating WhatsApp
 * button, the hero CTA, Visítanos and the footer.
 */
export default function Header() {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);

  const leftLinks = NAV.slice(0, 3);
  const rightLinks = NAV.slice(3);

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header__row">
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

          <nav className="header__nav header__nav--left" aria-label="Navegación principal">
            <ul>
              {leftLinks.map((link) => (
                <li key={link.href}>
                  <Link to={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* No aria-label: the wordmark text is the accessible name, and a
              shorter label would not contain the visible string. */}
          <Link to="/#inicio" className="header__brand">
            <Wordmark size="header" compact={scrolled} />
          </Link>

          <div className="header__end">
            <nav className="header__nav header__nav--right" aria-label="Navegación secundaria">
              <ul>
                {rightLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <HeaderSearch />
          </div>
        </div>
      </header>

      {/* Holds the at-rest height of the fixed header. */}
      <div className="header-spacer" aria-hidden="true" />

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
