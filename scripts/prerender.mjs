/**
 * Writes one real HTML file per route into /dist, using the SSR bundle that
 * `vite build --ssr` produced. Vercel checks the filesystem before applying
 * the SPA rewrite, so /productos/quesos/index.html is served as-is and the
 * rewrite only catches URLs that have no file.
 *
 * Run through `npm run build`; it is not meant to be called on its own.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');

if (!existsSync(SSR_ENTRY)) {
  throw new Error('Falta dist-ssr/entry-server.js. Corre antes: vite build --ssr');
}

const { render } = await import('file:///' + SSR_ENTRY.split(path.sep).join('/'));

const template = readFileSync(path.join(DIST, 'index.html'), 'utf8');

/** Must match the routes in src/App.tsx and public/sitemap.xml. */
const ROUTES = [
  '/',
  '/productos/salamis',
  '/productos/jamones',
  '/productos/salchichas',
  '/productos/longanizas',
  '/productos/quesos',
  '/productos/especialidades',
];

let smallest = Infinity;

for (const route of ROUTES) {
  const { html, head } = render(route);

  // Helmet owns every tag it emits, and the template's placeholders carry
  // data-rh so they are dropped here rather than duplicated.
  const page = template
    .replace(/\n?\s*<(title|meta|link)\b[^>]*data-rh="true"[^>]*>(<\/title>)?/g, '')
    .replace(/<title>[\s\S]*?<\/title>/, '')
    .replace('</head>', `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  const outDir = route === '/' ? DIST : path.join(DIST, route);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, 'index.html'), page);

  const kb = Buffer.byteLength(page) / 1024;
  smallest = Math.min(smallest, kb);
  console.log(`${route.padEnd(30)} ${kb.toFixed(1)} KB`);
}

// A shell that slipped through unrendered would be ~3 KB; every real page is
// far larger. Fail the build rather than ship empty HTML again.
if (smallest < 12) {
  throw new Error(`Una ruta quedó sin contenido (${smallest.toFixed(1)} KB)`);
}

rmSync(path.join(ROOT, 'dist-ssr'), { recursive: true, force: true });
