import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import App from './App';

import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';

const container = document.getElementById('root')!;

const tree = (
  <StrictMode>
    <HelmetProvider>
      {/* reducedMotion="user" drops every transform animation to an opacity
          fade when the visitor asks for reduced motion. */}
      <MotionConfig reducedMotion="user">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MotionConfig>
    </HelmetProvider>
  </StrictMode>
);

// The build prerenders every route, so in production there is markup to
// hydrate. `npm run dev` serves the empty shell and takes the other branch.
if (container.hasChildNodes()) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
