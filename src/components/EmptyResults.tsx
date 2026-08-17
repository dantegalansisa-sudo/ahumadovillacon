import { waMissingProduct } from '../utils/whatsapp';
import { IconSearch, IconWhatsApp } from './Icons';

interface EmptyResultsProps {
  query: string;
  /** A category chip is narrowing the search on top of the query. */
  filtered: boolean;
  onClearFilter: () => void;
}

/**
 * A search that found nothing is the one moment the catalog can lose a sale.
 * Instead of an apology it offers the question already written: the visitor
 * gets a real answer from a person, and the client learns what he is being
 * asked for that he does not carry.
 */
export default function EmptyResults({
  query,
  filtered,
  onClearFilter,
}: EmptyResultsProps) {
  return (
    <div className="empty">
      <span className="empty__icon">
        <IconSearch size={28} />
      </span>

      <p className="empty__title">
        No encontramos {query ? <strong>«{query}»</strong> : 'productos'}
        {filtered && ' en esta categoría'}.
      </p>

      <p className="empty__hint">
        Puede que lo tengamos sin estar en el catálogo. Pregúntanos y te
        respondemos al momento.
      </p>

      <div className="empty__actions">
        {query && (
          <a
            className="btn btn--primary"
            href={waMissingProduct(query)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWhatsApp size={16} />
            Preguntar por WhatsApp
          </a>
        )}
        {filtered && (
          <button type="button" className="btn btn--ghost" onClick={onClearFilter}>
            Buscar en todo el catálogo
          </button>
        )}
      </div>
    </div>
  );
}
