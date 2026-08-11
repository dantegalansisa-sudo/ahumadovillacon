import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { UNIT_LABEL } from '../data/products';
import { useOrderList } from '../hooks/useOrderList';
import { waOrderLink } from '../utils/whatsapp';
import { EASINGS } from '../utils/easings';
import {
  IconBag,
  IconClose,
  IconMinus,
  IconPlus,
  IconTrash,
  IconWhatsApp,
} from './Icons';

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * Fixed summary of the order list plus the panel that reviews it. Rendered
 * once at the app root so it survives route changes.
 */
export default function OrderListBar() {
  const { items, count, setQty, remove, clear } = useOrderList();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // The panel is meaningless once the list empties.
  useEffect(() => {
    if (count === 0) setOpen(false);
  }, [count]);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

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
  }, [open]);

  const sendLink = count > 0 ? waOrderLink(items) : '#';
  const label = `${count} ${count === 1 ? 'producto' : 'productos'}`;

  return (
    <>
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            className="order-bar"
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.35, ease: EASINGS.premium }}
          >
            <div className="container order-bar__inner">
              <button
                type="button"
                className="order-bar__summary"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                aria-expanded={open}
              >
                <span className="order-bar__icon">
                  <IconBag size={22} />
                  <span className="order-bar__count" aria-hidden="true">
                    {count}
                  </span>
                </span>
                <span className="order-bar__text">
                  <strong>{label} en tu lista</strong>
                  <span>Ver y ajustar cantidades</span>
                </span>
              </button>

              <a
                className="btn btn--primary order-bar__send"
                href={sendLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IconWhatsApp size={16} />
                Enviar pedido
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="order-panel__scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="order-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="order-panel-title"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.4, ease: EASINGS.premium }}
            >
              <div className="order-panel__head">
                <h2 id="order-panel-title">Tu lista de pedido</h2>
                <button
                  type="button"
                  ref={closeRef}
                  className="order-panel__close"
                  aria-label="Cerrar lista"
                  onClick={() => setOpen(false)}
                >
                  <IconClose size={24} />
                </button>
              </div>

              <p className="order-panel__note muted">
                Ajusta las cantidades y envíalo todo en un solo mensaje. Te
                confirmamos precio y disponibilidad por WhatsApp.
              </p>

              <ul className="order-panel__list">
                {items.map((item) => {
                  const unit = UNIT_LABEL[item.product.unit];
                  return (
                    <li className="order-panel__item" key={item.slug}>
                      <div className="order-panel__info">
                        <span className="order-panel__name">{item.product.name}</span>
                        {item.product.price !== undefined && (
                          <span className="order-panel__price">
                            RD${item.product.price.toLocaleString('es-DO')} / {unit.one}
                          </span>
                        )}
                      </div>

                      <div
                        className="stepper"
                        role="group"
                        aria-label={`Cantidad de ${item.product.name}`}
                      >
                        <button
                          type="button"
                          className="stepper__btn"
                          aria-label={`Quitar una ${unit.one} de ${item.product.name}`}
                          onClick={() => setQty(item.slug, item.qty - 1)}
                        >
                          <IconMinus size={16} />
                        </button>
                        <span className="stepper__value" aria-live="polite">
                          {item.qty} {item.qty === 1 ? unit.one : unit.many}
                        </span>
                        <button
                          type="button"
                          className="stepper__btn"
                          aria-label={`Agregar una ${unit.one} de ${item.product.name}`}
                          onClick={() => setQty(item.slug, item.qty + 1)}
                        >
                          <IconPlus size={16} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="order-panel__remove"
                        aria-label={`Quitar ${item.product.name} de la lista`}
                        onClick={() => remove(item.slug)}
                      >
                        <IconTrash size={18} />
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div className="order-panel__foot">
                <button type="button" className="order-panel__clear" onClick={clear}>
                  Vaciar lista
                </button>
                <a
                  className="btn btn--primary btn--block"
                  href={sendLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  <IconWhatsApp size={16} />
                  Enviar pedido por WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
