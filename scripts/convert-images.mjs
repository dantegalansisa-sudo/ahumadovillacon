/**
 * Turns the client's raw photos in /IMAGENES into the square WebP files the
 * site serves from /public/products.
 *
 * Requires Playwright (its bundled Chromium does the decoding and encoding, so
 * there is no image dependency in the project itself):
 *
 *   npm i -g playwright && playwright install chromium
 *   node scripts/convert-images.mjs
 *
 * When new photos arrive: drop them in /IMAGENES, add the file → slug pair to
 * MAP below, run the script, and set `hasPhoto: true` on those products in
 * src/data/products.ts.
 */
import http from 'node:http';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(ROOT, 'IMAGENES');
const OUT_DIR = path.join(ROOT, 'public', 'products');
const PORT = 4176;

/** Cards render at roughly 244 CSS px, so 560 still covers 2x screens. */
const MAX_SIDE = 560;
const QUALITY = 0.86;

/** Explicit file → slug mapping so nothing is matched by guesswork. */
const MAP = {
  'JAMON CASERIO.png': 'jamon-caserio',
  'JAMON CERRO PICNI.png': 'jamon-picnic-del-cerro',
  'JAMON COCIDO CORRIENTE.png': 'jamon-cocido-corriente',
  'JAMON DE PAVO CHECO.png': 'jamon-de-pavo-checo',
  'JAMON PICNI COCIDO.png': 'jamon-picnic-cocido',
  'JAMON PICNI DEL CERRO ECON.png': 'jamon-picnic-del-cerro-economico',
  'JAMONETA DE POLLO DUCARNES.png': 'jamoneta-de-pollo-ducarnes',
  'JAMONETA LA CRIOLLA.png': 'jamoneta-la-criolla',
  'JAMONETA LA MOYETA MORTADELA.png': 'jamoneta-mortadela-la-moyeta',
  'JAMONETA MOYETA.png': 'jamoneta-moyeta',
  'JAMONETA.png': 'jamoneta',

  'SALAMIS/SALAMI INDUVECA SUPREMO.png': 'salami-induveca-supremo',
  'SALAMIS/SALAMI INDUVECA SUPER ESPECIAL.png': 'salami-induveca-super-especial',
  'SALAMIS/SALAMI CHEF SUPER ESPECIAL.png': 'salami-chef-super-especial',
  'SALAMIS/SALAMI DEL CERRO NEGRO LB.png': 'salami-del-cerro-negro',
  'SALAMIS/SALAMI ESTELAR.png': 'salami-estelar',
  'SALAMIS/SALAMI DON CIBAO FINO.png': 'salami-don-cibao-fino',
  'SALAMIS/SALAMI PRADO CAMPO ESPECIAL.png': 'salami-prado-campo-especial',
  'SALAMIS/SALAMI PRADO CAMPO FINO.png': 'salami-prado-campo-fino',
  'SALAMIS/SALAMI SUPER ESP. EL MOCANO.png': 'salami-el-mocano-super-especial',
  'SALAMIS/SALAMI TOLENTINO AHUMADO GRADO SUPERIOR.png': 'salami-tolentino-ahumado',
  'SALAMIS/SALAMI NARANJAL LATINO.png': 'salami-naranjal-latino',
  'SALAMIS/SALAMI TIPO ARGENTINO.png': 'salami-tipo-argentino',
  'SALAMIS/SALAMI DE POLLO AGROFEM LIB.png': 'salami-de-pollo-agrofem',

  'SALCHICHAS/SALCHICHA CHEF HOT DOG SUPERIOR.png': 'salchicha-chef-hot-dog-superior',
  'SALCHICHAS/SALCHICHA CHEF.png': 'salchicha-chef',
  'SALCHICHAS/SALCHICHA HOT DOG AGROFEN.png': 'salchicha-hot-dog-agrofem',
  'SALCHICHAS/SALCHICHA PIGGY LINKS PREMIUN CHEFF.png':
    'salchicha-piggy-links-premium-chef',
  // Byte-identical to 'SALCHICHA CHEF HOT DOG SUPERIOR.png'. The client asked
  // for it to be used anyway, so both products show the same picture.
  'SALCHICHAS/SALCHICHA HOGT DOD.png': 'salchicha-hot-dog',

  'LONGANIZAS/LONGANIZA GRUESA.png': 'longaniza-gruesa',
  'LONGANIZAS/LONGANIZA FINA.png': 'longaniza-fina',
  'LONGANIZAS/LONGANIZA PARRILLERA LB.png': 'longaniza-parrillera',

  // Delivered inside the LONGANIZAS folder, but they are especialidades.
  'LONGANIZAS/TOCINETA REBANADA.png': 'tocineta-rebanada',
  'LONGANIZAS/PEPERONI.png': 'pepperoni',
};

/**
 * Category covers. These are cropped to 4:3 and land in /public/categories.
 *
 * Note on 'SALAMI PORTADA.png': the source carries a repeated "Envato
 * Elements" watermark, so it is a stock preview. Published at the client's
 * explicit instruction; replace it with the licensed version when available.
 */
const COVERS = {
  'PORTADA/SALAMI PORTADA.png': 'salamis',
  'PORTADA/JAMONES Y JAMONETAS PORTADA.png': 'jamones',
  'PORTADA/LONGANIZAS PORTADA.png': 'longanizas',
  'PORTADA/SALCHICHA PORTADA.png': 'salchichas',
  'PORTADA/TOCINETA PORTADA.png': 'especialidades',
};

const COVER_DIR = path.join(ROOT, 'public', 'categories');
const COVER_MAX_WIDTH = 1200;
const COVER_RATIO = 4 / 3;

async function loadChromium() {
  try {
    return (await import('playwright')).chromium;
  } catch {
    const global = path.join(
      process.env.APPDATA ?? '',
      'npm/node_modules/playwright/index.mjs',
    );
    if (existsSync(global)) {
      return (await import('file:///' + global.split(path.sep).join('/'))).chromium;
    }
    throw new Error('Playwright no encontrado. Instala con: npm i -g playwright');
  }
}

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

// The sources are served over HTTP so the canvas is not tainted by file://.
const server = http
  .createServer((req, res) => {
    let body;
    try {
      body = readFileSync(path.join(SRC_DIR, decodeURIComponent(req.url.slice(1))));
    } catch {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { 'content-type': 'image/*' });
    res.end(body);
  })
  .listen(PORT);

const chromium = await loadChromium();
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`http://localhost:${PORT}/`).catch(() => {});
await page.setContent('<body></body>');

for (const [file, slug] of Object.entries(MAP)) {
  if (!existsSync(path.join(SRC_DIR, file))) {
    console.log(`falta el archivo: ${file}`);
    continue;
  }

  const result = await page.evaluate(
    async ({ url, maxSide, quality }) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      await img.decode();

      const source = Math.max(img.naturalWidth, img.naturalHeight);
      // Never upscale: a small source stays small rather than turning blurry.
      const side = Math.min(maxSide, source);
      const scale = side / source;
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);

      const canvas = document.createElement('canvas');
      canvas.width = side;
      canvas.height = side;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      // Transparent canvas: JPEG sources bring their own background and any
      // PNG with alpha keeps it.
      ctx.drawImage(img, (side - w) / 2, (side - h) / 2, w, h);

      return { dataUrl: canvas.toDataURL('image/webp', quality), side };
    },
    {
      // Encoded per segment so files inside subfolders keep their slash.
      url: `http://localhost:${PORT}/${file.split('/').map(encodeURIComponent).join('/')}`,
      maxSide: MAX_SIDE,
      quality: QUALITY,
    },
  );

  const buffer = Buffer.from(result.dataUrl.split(',')[1], 'base64');
  writeFileSync(path.join(OUT_DIR, `${slug}.webp`), buffer);
  console.log(`${slug.padEnd(34)} ${result.side}²  ${Math.round(buffer.length / 1024)} KB`);
}

if (!existsSync(COVER_DIR)) mkdirSync(COVER_DIR, { recursive: true });

for (const [file, id] of Object.entries(COVERS)) {
  if (!existsSync(path.join(SRC_DIR, file))) {
    console.log(`falta la portada: ${file}`);
    continue;
  }

  const result = await page.evaluate(
    async ({ url, maxWidth, ratio, quality }) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = url;
      await img.decode();

      // Largest 4:3 box that fits inside the source, centred (a cover crop).
      const cropW = Math.min(img.naturalWidth, img.naturalHeight * ratio);
      const cropH = cropW / ratio;
      const sx = (img.naturalWidth - cropW) / 2;
      const sy = (img.naturalHeight - cropH) / 2;

      const outW = Math.round(Math.min(maxWidth, cropW));
      const outH = Math.round(outW / ratio);

      const canvas = document.createElement('canvas');
      canvas.width = outW;
      canvas.height = outH;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, sx, sy, cropW, cropH, 0, 0, outW, outH);

      return {
        dataUrl: canvas.toDataURL('image/webp', quality),
        outW,
        outH,
        sourceW: img.naturalWidth,
      };
    },
    {
      url: `http://localhost:${PORT}/${file.split('/').map(encodeURIComponent).join('/')}`,
      maxWidth: COVER_MAX_WIDTH,
      ratio: COVER_RATIO,
      quality: QUALITY,
    },
  );

  const buffer = Buffer.from(result.dataUrl.split(',')[1], 'base64');
  writeFileSync(path.join(COVER_DIR, `${id}.webp`), buffer);
  console.log(
    `portada ${id.padEnd(24)} ${result.outW}x${result.outH}  ${Math.round(buffer.length / 1024)} KB`,
  );
}

await browser.close();
server.close();
