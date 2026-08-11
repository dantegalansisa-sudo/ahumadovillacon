import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { PRODUCTS, type Product } from '../data/products';

const STORAGE_KEY = 'villacon.pedido.v1';
const MAX_QTY = 99;

export interface OrderLine {
  slug: string;
  qty: number;
}

export interface OrderItem extends OrderLine {
  product: Product;
}

interface OrderListValue {
  items: OrderItem[];
  /** Number of distinct products, which is what the bar reports. */
  count: number;
  qtyOf: (slug: string) => number;
  add: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
}

const OrderListContext = createContext<OrderListValue | null>(null);

/** Reads the saved list, dropping anything that is no longer in the catalog. */
function readStored(): OrderLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (line): line is OrderLine =>
          typeof line === 'object' &&
          line !== null &&
          typeof (line as OrderLine).slug === 'string' &&
          Number.isFinite((line as OrderLine).qty),
      )
      .filter((line) => PRODUCTS.some((p) => p.slug === line.slug))
      .map((line) => ({
        slug: line.slug,
        qty: Math.min(MAX_QTY, Math.max(1, Math.round(line.qty))),
      }));
  } catch {
    // Private mode, disabled storage or corrupt JSON: start empty.
    return [];
  }
}

/**
 * The order list is a cart without prices or checkout: it collects products
 * and quantities so the customer sends one WhatsApp message instead of one
 * per product. It survives reloads and route changes through localStorage.
 */
export function OrderListProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<OrderLine[]>(readStored);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Storage unavailable: the list still works for this session.
    }
  }, [lines]);

  // Lifts the footer clear of the fixed bar while the list has items.
  useEffect(() => {
    document.body.classList.toggle('has-order-bar', lines.length > 0);
    return () => document.body.classList.remove('has-order-bar');
  }, [lines.length]);

  const add = useCallback((slug: string) => {
    setLines((current) =>
      current.some((line) => line.slug === slug)
        ? current
        : [...current, { slug, qty: 1 }],
    );
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((current) => {
      if (qty < 1) return current.filter((line) => line.slug !== slug);
      const capped = Math.min(MAX_QTY, Math.round(qty));
      return current.map((line) =>
        line.slug === slug ? { ...line, qty: capped } : line,
      );
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((current) => current.filter((line) => line.slug !== slug));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<OrderListValue>(() => {
    const items = lines.flatMap((line) => {
      const product = PRODUCTS.find((p) => p.slug === line.slug);
      return product ? [{ ...line, product }] : [];
    });
    return {
      items,
      count: items.length,
      qtyOf: (slug) => lines.find((line) => line.slug === slug)?.qty ?? 0,
      add,
      setQty,
      remove,
      clear,
    };
  }, [lines, add, setQty, remove, clear]);

  return (
    <OrderListContext.Provider value={value}>{children}</OrderListContext.Provider>
  );
}

export function useOrderList(): OrderListValue {
  const context = useContext(OrderListContext);
  if (!context) {
    throw new Error('useOrderList must be used inside an OrderListProvider');
  }
  return context;
}
