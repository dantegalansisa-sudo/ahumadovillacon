import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { BUSINESS, NAV } from '../data/business';
import { EASINGS } from '../utils/easings';
import { WA_GENERAL } from '../utils/whatsapp';
import Wordmark from './Wordmark';
import { IconClose, IconWhatsApp } from './Icons';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled])';

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-menu"
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          ref={panelRef}
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: EASINGS.premium }}
        >
          <div className="mobile-menu__top">
            <Wordmark size="header" compact />
            <button
              type="button"
              ref={closeRef}
              className="mobile-menu__close"
              aria-label="Cerrar menú"
              onClick={onClose}
            >
              <IconClose size={26} />
            </button>
          </div>

          <nav aria-label="Navegación móvil">
            <ul className="mobile-menu__list">
              {NAV.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.08 + i * 0.06,
                    ease: EASINGS.premium,
                  }}
                >
                  <Link to={link.href} onClick={onClose}>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="mobile-menu__foot">
            <a
              className="btn btn--primary btn--block"
              href={WA_GENERAL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
            >
              <IconWhatsApp size={16} />
              Pedir por WhatsApp
            </a>
            <span className="mobile-menu__phone">{BUSINESS.whatsappDisplay}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
