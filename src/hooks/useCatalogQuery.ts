import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CATEGORIES, type Category } from '../data/products';

export type Filter = Category | 'todos';

const VALID = new Set<string>(CATEGORIES.map((c) => c.id));

/**
 * Keeps the catalog's search term and category chip in `?q=` and `?cat=`.
 *
 * Two reasons it is worth the wiring: the back button starts behaving like a
 * visitor expects, and an ad can point straight at `/?cat=quesos` instead of
 * dropping everyone on the home page to hunt.
 *
 * The URL is read in an effect, never during render. The prerendered `/` was
 * built with no parameters, so reading them on the first client render would
 * produce different markup than the HTML being hydrated. One frame of the full
 * catalog is the price of not breaking hydration.
 */
export function useCatalogQuery() {
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('todos');
  const [ready, setReady] = useState(false);
  // Our own writes come back through `location`; without this they would be
  // read straight back in as if the visitor had navigated.
  const ownWrite = useRef<string | null>(null);

  useEffect(() => {
    if (ownWrite.current === location.search) {
      ownWrite.current = null;
      return;
    }

    const params = new URLSearchParams(location.search);
    const cat = params.get('cat');
    setQuery(params.get('q') ?? '');
    setFilter(cat && VALID.has(cat) ? (cat as Category) : 'todos');
    setReady(true);
  }, [location.search]);

  // Mirror state back into the URL, replacing history so a search does not
  // bury the previous page under one entry per keystroke.
  useEffect(() => {
    if (!ready) return;

    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (filter !== 'todos') params.set('cat', filter);

    const next = params.toString() ? `?${params}` : '';
    if (next === location.search) return;

    ownWrite.current = next;
    navigate(`${location.pathname}${next}${location.hash}`, { replace: true });
  }, [ready, query, filter, location.pathname, location.search, location.hash, navigate]);

  return { query, setQuery, filter, setFilter };
}
