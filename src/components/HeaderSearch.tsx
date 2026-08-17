import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { CATEGORY_LABEL, photoSrc } from '../data/products';
import { searchProducts } from '../utils/search';
import { waMissingProduct } from '../utils/whatsapp';
import { EASINGS } from '../utils/easings';
import { IconClose, IconSearch, IconWhatsApp } from './Icons';
import ProductImage from './ProductImage';

const MAX_SUGGESTIONS = 6;

/**
 * Search from anywhere on the site. The suggestions are a shortcut, not a
 * destination: every one of them lands on the home catalog with the term
 * already applied, which is the only place with the Agregar buttons.
 */
export default function HeaderSearch() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const term = query.trim();
  const results = term ? searchProducts(term) : [];

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  const go = (value: string) => {
    close();
    navigate(`/?q=${encodeURIComponent(value)}#catalogo`);
  };

  useEffect(() => {
    if (!open) return;

    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      close();
      buttonRef.current?.focus();
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || buttonRef.current?.contains(target)) {
        return;
      }
      close();
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  return (
    <div className="header-search">
      <button
        ref={buttonRef}
        type="button"
        className="header-search__toggle"
        aria-expanded={open}
        aria-controls="header-search-panel"
        onClick={() => (open ? close() : setOpen(true))}
      >
        {open ? <IconClose size={22} /> : <IconSearch size={22} />}
        <span className="visually-hidden">
          {open ? 'Cerrar la búsqueda' : 'Buscar productos'}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="header-search-panel"
            className="header-search__panel"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: EASINGS.snappy }}
          >
            <div className="container">
              <form
                className="header-search__form"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (term) go(term);
                }}
              >
                <IconSearch size={20} className="header-search__form-icon" />
                <input
                  ref={inputRef}
                  className="header-search__input"
                  type="search"
                  value={query}
                  autoComplete="off"
                  placeholder="Buscar: salami, queso de freír, jamón…"
                  aria-label="Buscar productos en el catálogo"
                  onChange={(event) => setQuery(event.target.value)}
                />
                <button type="submit" className="btn btn--primary header-search__submit">
                  Buscar
                </button>
              </form>

              {term && (
                <div className="header-search__results">
                  {results.length === 0 ? (
                    <div className="header-search__none">
                      <p>
                        No encontramos <strong>«{term}»</strong> en el catálogo.
                      </p>
                      <a
                        className="btn btn--primary"
                        href={waMissingProduct(term)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconWhatsApp size={16} />
                        Preguntar por WhatsApp
                      </a>
                    </div>
                  ) : (
                    <>
                      <ul className="header-search__list">
                        {results.slice(0, MAX_SUGGESTIONS).map(({ product }) => (
                          <li key={product.slug}>
                            <button type="button" onClick={() => go(product.name)}>
                              <span className="header-search__thumb">
                                <ProductImage
                                  src={photoSrc(product)}
                                  alt={product.name}
                                  width={56}
                                  height={56}
                                  tone="cream"
                                />
                              </span>
                              <span className="header-search__text">
                                <strong>{product.name}</strong>
                                <span>{CATEGORY_LABEL[product.category]}</span>
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>

                      <button
                        type="button"
                        className="header-search__all"
                        onClick={() => go(term)}
                      >
                        Ver {results.length}{' '}
                        {results.length === 1 ? 'resultado' : 'resultados'} en el catálogo
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
