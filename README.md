# Ahumados Villacon — sitio web

Catálogo de embutidos con todos los pedidos hacia WhatsApp. Sin carrito, sin checkout, sin precios.

**Rutas:**

| Ruta | Qué es |
|---|---|
| `/` | Home de una sola página con navegación por anclas |
| `/productos/:categoria` | 5 páginas indexables: `salamis`, `jamones`, `salchichas`, `longanizas`, `especialidades` |
| cualquier otra | 404 con `noindex` |

**Stack:** React 18 + TypeScript + Vite + Framer Motion + CSS vanilla (sin Tailwind).
**Deploy:** Vercel (`vercel.json` ya incluye el rewrite de SPA).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build  →  dist/
npm run preview
```

## Datos del negocio

Todo vive en `src/data/business.ts` y se propaga solo al header, footer, Visítanos,
mayorista y al structured data.

| Dato | Valor |
|---|---|
| Nombre comercial | Ahumados Villacon (registrado en ONAPI No. 924865) |
| Titular | Franklin Starlin Olaverría Casado |
| Ubicación | Mercado de Villa Consuelo, Santo Domingo, D.N. |
| WhatsApp | (849) 352-9892 |
| Horario | Lun a sáb 7:00 a.m. – 6:30 p.m. · Dom 7:00 a.m. – 5:00 p.m. |
| Delivery | Sí, coordinado por WhatsApp |
| Pedido mínimo | No hay |

> La dirección que aparece en el certificado ONAPI es el domicilio legal del titular,
> **no** el punto de venta. No se publica en el sitio ni se guarda en este repositorio.

## Qué falta completar

### 1. En `src/data/business.ts`

`email` · `instagram` · `facebook` · `domain` siguen como `{{PENDIENTE}}`.

- Al llenar `instagram` / `facebook` aparecen solos los iconos en el topbar y el footer.
- Al llenar `domain` se activan canonical, `og:url` y las URLs absolutas del JSON-LD.
  También hay que reemplazar `{{DOMINIO}}` en `public/robots.txt` y `public/sitemap.xml`.

### 2. Número de puesto en el mercado

El mapa apunta al Mercado de Villa Consuelo completo. Falta el número de local o puesto
para que el cliente llegue directo: se agrega en `ADDRESS` dentro de `business.ts`.

### 3. Sección Nosotros — `src/components/About.tsx`

Los tres contadores usan cifras reales del catálogo (34 productos, 5 familias, 9 marcas
de salami). Si el cliente da años en el mercado o clientes atendidos, se sustituyen ahí.

### 4. Fotos

Van en `public/`, con estos nombres exactos:

```
public/images/hero.jpg        2400x1400  fondo del hero
public/images/local.jpg       1200x1500  el puesto, sección Nosotros
public/images/og-image.jpg    1200x630   tarjeta para compartir
public/categories/{salamis|jamones|salchichas|longanizas|especialidades}.jpg   1200x900
public/products/{slug}.jpg    1200x1200  un archivo por producto
```

Los `slug` exactos están en `src/data/products.ts`. Mientras una foto no exista se
muestra un bloque de marca diseñado; nunca una imagen rota ni una foto de stock.

## Notas de implementación

- El Nivel 1 del Taste Skill (cursor personalizado) está **desactivado** en este proyecto
  por indicación del CLAUDE.md. El sitio usa el cursor nativo.
- `RevealText` dispara la animación desde el elemento padre: un `whileInView` sobre la
  palabra enmascarada nunca se activa, porque el `overflow:hidden` la deja fuera de la
  intersección observada.
- El header es `position: fixed` con un espaciador (`.header-spacer`). El topbar se
  colapsa al hacer scroll y, en flujo normal, ese cambio de altura movería toda la página.
  Si se cambia la altura del header hay que actualizar `--header-h` y `--header-h-compact`
  en `src/styles/tokens.css`.
- Las familias `Anton Fallback` e `Inter Fallback` en `src/styles/base.css` llevan métricas
  medidas contra las fuentes reales para que la carga de las webfonts no mueva el layout.
- `vercel.json` reescribe hacia `/index.html` todo path sin extensión, para que React Router
  maneje `/productos/:categoria` al entrar directo o al recargar. La condición excluye los
  paths con punto para que `robots.txt` y `sitemap.xml` se sigan sirviendo tal cual.
  El esquema de Vercel rechaza cualquier clave que no reconozca dentro de `rewrites`
  (incluida una llamada `comment`), así que ese archivo no admite notas: van aquí.
- El mapa usa el embed de Google Maps sin API key (`maps?q=...&output=embed`). Si algún día
  deja de resolver, se cambia por Maps Embed API con key en `business.ts`.
- Los `<title>` y `<meta>` estáticos de `index.html` llevan `data-rh="true"` a propósito:
  así react-helmet-async los reemplaza en vez de dejar dos descripciones distintas en las
  rutas de categoría. Sirven de respaldo para los scrapers que no ejecutan JS (WhatsApp,
  Facebook) y por eso no se borran.
- Nunca uses `ch` para limitar el ancho de un titular en la fuente display: el ancho del
  glifo "0" difiere mucho entre Anton y su fallback, cambia el número de líneas y dispara
  el CLS. Usa `em`.
- El texto de cada página de categoría (h1, meta, intro, h2 de la grilla) vive en
  `CATEGORIES` dentro de `src/data/products.ts`.
