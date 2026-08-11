import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import NotFound from './pages/NotFound';
import OrderListBar from './components/OrderListBar';
import { OrderListProvider } from './hooks/useOrderList';

/**
 * React Router keeps the scroll position across navigations. Route changes go
 * to the top; a hash lands on its section (the element can mount a frame after
 * the effect runs, hence the single retry).
 */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const jump = () => {
        const target = document.querySelector(hash);
        if (target) target.scrollIntoView();
        return Boolean(target);
      };
      if (jump()) return;
      const retry = window.setTimeout(jump, 120);
      return () => window.clearTimeout(retry);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <OrderListProvider>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/productos/:categoria" element={<CategoryPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Outside Routes so the list survives navigation between pages. */}
      <OrderListBar />
    </OrderListProvider>
  );
}
