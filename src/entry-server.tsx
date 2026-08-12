import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import { MotionConfig } from 'framer-motion';
import App from './App';

import './styles/tokens.css';
import './styles/base.css';
import './styles/components.css';

export interface RenderResult {
  html: string;
  head: string;
}

/**
 * Renders one route to static HTML at build time. Without this every URL ships
 * the same empty shell, so a crawler sees no h1, no copy and no structured
 * data until it decides to run the JavaScript.
 */
export function render(url: string): RenderResult {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        {/* Static output should not carry the pre-animation styles: the copy
            must be readable in the raw HTML, not sitting at opacity 0. */}
        <MotionConfig isStatic>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </MotionConfig>
      </HelmetProvider>
    </StrictMode>,
  );

  const { helmet } = helmetContext;
  if (!helmet) throw new Error(`Helmet no produjo etiquetas para ${url}`);

  const head = [
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
  ]
    .filter(Boolean)
    .join('\n    ');

  return { html, head };
}
