# Ahumados Villacon — sitio web

Catálogo de embutidos con todos los pedidos hacia WhatsApp. Sin carrito, sin checkout, sin precios.

**Rutas:**

| Ruta | Qué es |
|---|---|
| `/` | Home de una sola página con navegación por anclas |
| `/productos/:categoria` | 6 páginas indexables: `salamis`, `jamones`, `salchichas`, `longanizas`, `quesos`, `especialidades` |
| cualquier otra | 404 con `noindex` |

**Stack:** React 18 + TypeScript + Vite + Framer Motion + CSS vanilla (sin Tailwind).
**Deploy:** Vercel (`vercel.json` ya incluye el rewrite de SPA).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build  →  dist/
npm run preview
```

## Lista de pedido

Es el "carrito" del sitio, sin precios ni checkout: el cliente agrega productos con
cantidad y envía **un solo mensaje** de WhatsApp con todo. Vive en
`src/hooks/useOrderList.tsx` (estado + `localStorage`) y `src/components/OrderListBar.tsx`
(barra fija + panel). Sobrevive recargas y cambios de ruta.

Cada producto tiene un campo `unit` (`libra`, `unidad` o `paquete`) que define cómo se
cuenta y cómo se escribe en el mensaje.

> **Por confirmar con el cliente:** en los embutidos la unidad sale de la descripción
> cuando la dice (5 de 34) y en los otros 29 se asumió `libra` por categoría. En los
> quesos viene de la hoja de inventario (LIB / UDS / LAT), salvo el Yaquelin que no la
> traía y quedó en `libra`.

### Precios

`Product.price` ya existe y está vacío a propósito — no se inventó ninguno. Al poner un
número (DOP, por unidad de venta) aparece solo en la ficha, en el panel de la lista y en
el mensaje de WhatsApp. No hay que tocar componentes.

## Buscador

`src/utils/search.ts`. Escrito a mano en vez de traer una librería: con 56 productos el
escaneo no cuesta nada, y lo que hay que resolver aquí —cómo escribe la gente en el celular
y los nombres del inventario del cliente— es justo lo que un matcher genérico no sabe.

Cuatro pasadas, de la más exacta a la más suelta: nombre → resto del texto (descripción,
categoría, unidad y el `ref` interno) → plural → distancia de edición. Resuelve `jamon`,
`mozarela`, `longanisa`, `quesos`, `queso freir` e `induveca`.

Dos decisiones que parecen detalles y no lo son:

- Las descripciones **no** entran en la pasada difusa, solo en la de subcadena. `para`
  está a una edición de `papa` y arrastraba nueve productos a una búsqueda de papas.
  Hay además una lista corta de palabras vacías en `STOPWORDS`.
- La coincidencia por raíz (la que hace que `pizza` llegue a `pizzería`) exige raíz exacta
  hasta cuatro letras. Con una edición de margen, `chef` alcanza `cheddar` y `saco`
  alcanza `salami`.

El buscador del catálogo vive **fuera** de la barra pegajosa a propósito: compartiendo
esa fila dejaba tres chips detrás de un scroll horizontal, y apilar ambos dentro ponía
250px de mobiliario fijo sobre una pantalla de portátil. Cuando se va con el scroll, la
lupa del header toma el relevo.

`?q=` y `?cat=` en el home (`src/hooks/useCatalogQuery.ts`) sirven para mandar un anuncio
directo a la vista ya filtrada. **Se leen en un `useEffect`, nunca durante el render:** el
`/` prerenderizado se generó sin parámetros y leerlos en el primer render del cliente
produciría un HTML distinto al que se está hidratando.

Una búsqueda sin resultados no es un callejón sin salida — ofrece la pregunta ya escrita
por WhatsApp (`waMissingProduct`). Es lo único que le dice al cliente qué le están pidiendo
que no vende.

## Datos del negocio

Todo vive en `src/data/business.ts` y se propaga solo al header, footer, Visítanos,
mayorista y al structured data.

| Dato | Valor |
|---|---|
| Nombre comercial | Ahumados Villacon (registrado en ONAPI No. 924865) |
| Titular | Franklin Starlin Olaverría Casado |
| Ubicación | Mercado de Villa Consuelo, Santo Domingo, D.N. |
| Dominio | https://www.ahumadosvillacon.com (el apex redirige a www) |
| WhatsApp | (829) 909-3606 |
| Horario | Lun a sáb 7:00 a.m. – 6:30 p.m. · Dom 7:00 a.m. – 5:00 p.m. |
| Delivery | Sí, coordinado por WhatsApp |
| Pedido mínimo | No hay |

> La dirección que aparece en el certificado ONAPI es el domicilio legal del titular,
> **no** el punto de venta. No se publica en el sitio ni se guarda en este repositorio.

## Qué falta completar

### 1. En `src/data/business.ts`

`email` · `instagram` · `facebook` siguen como `{{PENDIENTE}}`. Al llenar
`instagram` / `facebook` aparecen solos los iconos en el topbar y el footer.

El dominio ya está puesto: canonical, `og:url`, el JSON-LD y el BreadcrumbList están activos.

### 2. Número de puesto en el mercado

El mapa apunta al Mercado de Villa Consuelo completo. Falta el número de local o puesto
para que el cliente llegue directo: se agrega en `ADDRESS` dentro de `business.ts`.

### 3. Sección Nosotros — `src/components/About.tsx`

Los tres contadores usan cifras reales del catálogo (44 productos, 6 familias, 9 marcas
de salami). Si el cliente da años en el mercado o clientes atendidos, se sustituyen ahí.

### 4. Fotos

**Listas:** los 44 productos y las 6 portadas de categoría.
**Faltan:** el hero, el local y la tarjeta social (`og-image.jpg`). Cuando exista esta
última hay que poner `HAS_OG_IMAGE = true` en `src/utils/schema.ts`: mientras sea false
no se anuncia un `og:image` que daría 404 al compartir por WhatsApp.

> `SALCHICHA HOGT DOD.png` es byte a byte idéntico a
> `SALCHICHA CHEF HOT DOG SUPERIOR.png`. Por indicación del cliente se usa en los dos
> productos, así que ambas fichas muestran la misma imagen.

> `PORTADA/SALAMI PORTADA.png` **no se usa**: trae la marca de agua de Envato Elements,
> o sea es un preview de banco de imágenes sin licencia. La portada de salamis sale de
> `SALAMIS/SALAMI TOLENTINO AHUMADO GRADO SUPERIOR.png`, que es foto del cliente; el
> recorte a 4:3 además elimina el texto publicitario que traía encima.

```
public/images/hero.jpg        2400x1400  fondo del hero
public/images/local.jpg       1200x1500  el puesto, sección Nosotros
public/images/og-image.jpg    1200x630   tarjeta para compartir
public/categories/{id}.webp   4:3       generada por el script
public/products/{slug}.webp   cuadrada   generada por el script, no a mano
```

Mientras una foto no exista se muestra un bloque de marca diseñado; nunca una imagen
rota ni una foto de stock.

**Flujo para agregar fotos nuevas:**

1. Deja los originales en `/IMAGENES` (cualquier formato y tamaño).
2. Agrega el par `'ARCHIVO.png': 'slug-del-producto'` en `scripts/convert-images.mjs`.
3. `node scripts/convert-images.mjs` — recorta a cuadrado, no agranda las pequeñas y
   exporta WebP a `public/products/`.
4. Pon `hasPhoto: true` en esos productos en `src/data/products.ts`.

El paso 4 es lo que evita que el navegador pida archivos que no existen. Los originales
se quedan versionados para poder regenerar a otro tamaño cuando haga falta.

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
- Todos los mensajes de WhatsApp salen de `src/utils/whatsapp.ts` y cierran con la misma
  línea: "Vengo de la página web: https://www.ahumadosvillacon.com". Es la única forma que
  tiene el cliente de saber si un mensaje vino del sitio o de otro lado, y de paso el enlace
  queda tocable en el chat. Va en `waLinkWithMessage`, así que cualquier mensaje nuevo la
  hereda solo.
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

## Prerender (SEO)

`npm run build` corre tres pasos: el bundle del navegador, un bundle SSR
(`src/entry-server.tsx`) y `scripts/prerender.mjs`, que escribe un HTML real por
ruta dentro de `dist/`. Sin esto las 7 URLs servían el mismo shell vacío: sin `h1`,
sin texto de producto, sin JSON-LD y todas con el mismo `<title>`.

Vercel revisa el sistema de archivos **antes** de aplicar los rewrites, así que
`/productos/quesos` se sirve desde `dist/productos/quesos/index.html` y el rewrite
solo atrapa las URLs que no tienen archivo.

Tres cosas que hay que respetar al tocar componentes:

- Usa `INITIAL_HIDDEN` (en `utils/easings.ts`) en vez de `initial="hidden"`. En el
  servidor vale `false`, así el HTML estático no queda con `opacity:0`: contenido
  que un rastreador leería como oculto.
- Nada de `localStorage` ni `window` durante el primer render. La lista de pedido
  arranca vacía y carga lo guardado en un `useEffect`, porque el HTML prerenderizado
  no puede saber qué tiene ese visitante y la diferencia rompería la hidratación.
- `AnimatedCounter` imprime la cifra final en el servidor y cuenta desde cero en el
  navegador; lleva `suppressHydrationWarning` a propósito.

`scripts/prerender.mjs` falla el build si alguna ruta sale por debajo de 12 KB,
que es la señal de que volvió a generarse un shell vacío.
