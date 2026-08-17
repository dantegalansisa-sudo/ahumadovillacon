import { useEffect, useRef } from 'react';
import { IconClose, IconSearch } from './Icons';

interface SearchBoxProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  /** Announced to screen readers as results change. */
  status?: string;
  autoFocus?: boolean;
}

/**
 * The search field. A plain controlled input: with 56 products the filtering
 * is instant, so there is nothing to debounce and no spinner to show.
 */
export default function SearchBox({
  id,
  value,
  onChange,
  label,
  placeholder,
  status,
  autoFocus = false,
}: SearchBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const clear = () => {
    onChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="searchbox">
      <label className="visually-hidden" htmlFor={id}>
        {label}
      </label>

      <span className="searchbox__icon">
        <IconSearch size={19} />
      </span>

      <input
        ref={inputRef}
        id={id}
        className="searchbox__input"
        type="search"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        // The browser's own X on type=search is unstyleable and absent on
        // Firefox; the button below replaces it.
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && value) {
            event.preventDefault();
            clear();
          }
        }}
      />

      {value && (
        <button type="button" className="searchbox__clear" onClick={clear}>
          <IconClose size={16} />
          <span className="visually-hidden">Borrar la búsqueda</span>
        </button>
      )}

      {/* Always in the DOM, empty or not. A live region inserted with its text
          already inside is usually not announced — the reader has to be
          watching the node before the content changes. */}
      <p className="visually-hidden" role="status" aria-live="polite">
        {status}
      </p>
    </div>
  );
}
