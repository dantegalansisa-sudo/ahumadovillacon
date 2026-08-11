/**
 * Product catalog. Source: the client's physical inventory sheet.
 * `name` is the cleaned display name, `ref` keeps the original inventory
 * string so the client can match items internally.
 * Photos live at /products/{slug}.webp and are opt-in through `hasPhoto`;
 * products without one render the designed placeholder.
 *
 * Descriptions are provisional: product type only, no origin, quality grade,
 * nutrition or marketing claims. Do not expand them without client sign-off.
 */

export type Category =
  | 'salamis'
  | 'jamones'
  | 'salchichas'
  | 'longanizas'
  | 'quesos'
  | 'especialidades';

/** How the product is sold. Drives the quantity wording in the order list. */
export type Unit = 'libra' | 'unidad' | 'paquete' | 'lata';

export interface Product {
  slug: string;
  name: string;
  ref: string;
  category: Category;
  description: string;
  unit: Unit;
  /**
   * Price per unit in DOP. Left undefined until the client supplies real
   * figures — nothing is ever guessed. Fill it in and the price shows on the
   * card and in the WhatsApp order automatically.
   */
  price?: number;
  /**
   * True when /public/products/{slug}.webp exists. Set it when the photo is
   * added; without it the card renders the designed placeholder instead of
   * firing a request that 404s.
   */
  hasPhoto?: true;
}

/** Public path of a product photo, or undefined while there is none. */
export function photoSrc(product: Product): string | undefined {
  return product.hasPhoto ? `/products/${product.slug}.webp` : undefined;
}

export const UNIT_LABEL: Record<Unit, { one: string; many: string }> = {
  libra: { one: 'libra', many: 'libras' },
  unidad: { one: 'unidad', many: 'unidades' },
  paquete: { one: 'paquete', many: 'paquetes' },
  lata: { one: 'lata', many: 'latas' },
};

export function formatQty(qty: number, unit: Unit): string {
  const label = UNIT_LABEL[unit];
  return `${qty} ${qty === 1 ? label.one : label.many}`;
}

export interface CategoryMeta {
  id: Category;
  label: string;
  chipLabel: string;
  blurb: string;
  /** 4:3 cover in /public/categories. Undefined while there is no usable one. */
  image?: string;
  /** Phase 2 category route: /productos/{id} */
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: [string, string];
  /** h2 above the product grid — keeps the heading outline h1 → h2 → h3. */
  gridHeading: string;
}

/** Shared closing paragraph for every category page. All of it is confirmed. */
const ORDER_LINE =
  'Vendemos por libra para el hogar y por caja completa para colmados, cafeterías y restaurantes, sin pedido mínimo. Escríbenos por WhatsApp con tu lista y te confirmamos precio y disponibilidad al momento.';

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'salamis',
    label: 'Salamis',
    chipLabel: 'Salamis',
    blurb: 'Supremo, super especial, fino y ahumado. Las marcas que ya pide tu cliente.',
    // Foto propia (Tolentino en plato). La portada de Envato no se usa: marca de agua.
    image: '/categories/salamis.webp',
    h1: 'Salami al por mayor en Santo Domingo',
    metaTitle: 'Salami al por mayor en Santo Domingo | Ahumados Villacon',
    metaDescription:
      'Trece salamis de cerdo y de pollo: supremo, super especial, fino y ahumado. Venta por libra o por caja en el Mercado de Villa Consuelo. Pide por WhatsApp.',
    intro: [
      'Trece salamis en catálogo, de cerdo y de pollo, en presentaciones supremo, super especial, fino y ahumado.',
      ORDER_LINE,
    ],
    gridHeading: "Todos nuestros salamis",
  },
  {
    id: 'jamones',
    label: 'Jamones y jamonetas',
    chipLabel: 'Jamones y jamonetas',
    blurb: 'Jamón picnic, cocido, de pavo y jamonetas para sándwich y picadera.',
    image: '/categories/jamones.webp',
    h1: 'Jamón y jamoneta al por mayor en Santo Domingo',
    metaTitle: 'Jamón y jamoneta al por mayor | Ahumados Villacon',
    metaDescription:
      'Once jamones y jamonetas: picnic, cocido, de pavo, de pollo y mortadela. Al por mayor y al detalle en el Mercado de Villa Consuelo. Pide por WhatsApp.',
    intro: [
      'Once jamones y jamonetas: jamón picnic, jamón cocido, jamón de pavo, jamoneta de pollo y mortadela, para sándwich, picadera y desayuno.',
      ORDER_LINE,
    ],
    gridHeading: "Todos nuestros jamones y jamonetas",
  },
  {
    id: 'salchichas',
    label: 'Salchichas',
    chipLabel: 'Salchichas',
    blurb: 'Hot dog superior, premium y de consumo diario, por unidad o por paquete.',
    image: '/categories/salchichas.webp',
    h1: 'Salchichas al por mayor en Santo Domingo',
    metaTitle: 'Salchichas al por mayor en Santo Domingo | Villacon',
    metaDescription:
      'Salchicha hot dog superior, premium tipo links y de consumo diario, por unidad o por paquete. Al por mayor y al detalle en Santo Domingo. Pide por WhatsApp.',
    intro: [
      'Cinco presentaciones de salchicha: hot dog superior, premium tipo links y de consumo diario, por unidad o por paquete.',
      ORDER_LINE,
    ],
    gridHeading: "Todas nuestras salchichas",
  },
  {
    id: 'longanizas',
    label: 'Longanizas',
    chipLabel: 'Longanizas',
    blurb: 'Gruesa, fina y parrillera. Venta por libra.',
    image: '/categories/longanizas.webp',
    h1: 'Longaniza dominicana al por mayor',
    metaTitle: 'Longaniza dominicana al por mayor | Ahumados Villacon',
    metaDescription:
      'Longaniza gruesa, fina y parrillera, por libra. Venta al por mayor y al detalle en el Mercado de Villa Consuelo, Santo Domingo. Pide por WhatsApp.',
    intro: [
      'Tres cortes de longaniza, todos por libra: gruesa, fina y parrillera, para freír o para la parrilla.',
      ORDER_LINE,
    ],
    gridHeading: "Todas nuestras longanizas",
  },
  {
    id: 'quesos',
    label: 'Quesos',
    chipLabel: 'Quesos',
    blurb: 'Amarillo, de freír, gouda, danés y mozzarella. Por libra, unidad o lata.',
    image: '/categories/quesos.webp',
    h1: 'Quesos al por mayor en Santo Domingo',
    metaTitle: 'Quesos al por mayor en Santo Domingo | Ahumados Villacon',
    metaDescription:
      'Queso amarillo cheddar, blanco de freír, gouda, danés y mozzarella. Al por mayor y al detalle en el Mercado de Villa Consuelo. Pide por WhatsApp.',
    intro: [
      'Diez quesos en catálogo: amarillo cheddar, blanco de freír, gouda, danés, mozzarella y las marcas de la casa, por libra, por unidad o en lata.',
      ORDER_LINE,
    ],
    gridHeading: 'Todos nuestros quesos',
  },
  {
    id: 'especialidades',
    label: 'Especialidades',
    chipLabel: 'Especialidades',
    blurb: 'Tocineta rebanada y pepperoni para pizzería y desayuno.',
    image: '/categories/especialidades.webp',
    h1: 'Tocineta y pepperoni al por mayor',
    metaTitle: 'Tocineta y pepperoni al por mayor | Ahumados Villacon',
    metaDescription:
      'Tocineta rebanada y pepperoni por libra para pizzerías, cafeterías y hogares. Al por mayor y al detalle en Santo Domingo. Pide por WhatsApp.',
    intro: [
      'Tocineta rebanada lista para cocinar y pepperoni por libra, para pizzería, cafetería y desayuno.',
      ORDER_LINE,
    ],
    gridHeading: "Nuestras especialidades",
  },
];

export const PRODUCTS: Product[] = [
  // SALAMIS (13)
  {
    slug: 'salami-induveca-supremo',
    name: 'Salami Induveca Supremo',
    ref: 'SALAMI INDUVECA SUPREMO',
    category: 'salamis',
    description: 'Salami de cerdo, calidad supremo. Venta por libra.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'salami-induveca-super-especial',
    name: 'Salami Induveca Super Especial',
    ref: 'SALAMI INDUVECA SUPER ESPECIAL',
    category: 'salamis',
    description: 'Corte clásico dominicano, ideal para desayuno y sándwich.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'salami-chef-super-especial',
    name: 'Salami Chef Super Especial',
    ref: 'SALAMI CHEF SUPER ESPECIAL',
    category: 'salamis',
    description: 'Salami super especial, presentación por libra.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'salami-del-cerro-negro',
    name: 'Salami del Cerro Negro',
    ref: 'SALAMI DEL CERRO NEGRO',
    category: 'salamis',
    description: 'Salami de cerdo, marca El Cerro. Por libra.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'salami-estelar',
    name: 'Salami Estelar',
    ref: 'SALAMI ESTELAR',
    category: 'salamis',
    description: 'Salami de consumo diario, rendidor.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'salami-don-cibao-fino',
    name: 'Salami Don Cibao Fino',
    ref: 'SALAMI DON CIBAO FINO',
    category: 'salamis',
    description: 'Corte fino, textura suave.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'salami-prado-campo-especial',
    name: 'Salami Prado Campo Especial',
    ref: 'SALAMI PRADO CAMPO ESPECIAL',
    category: 'salamis',
    description: 'Salami especial de la línea Prado Campo.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'salami-prado-campo-fino',
    name: 'Salami Prado Campo Fino',
    ref: 'SALAMI PRADO CAMPO FINO',
    category: 'salamis',
    description: 'Corte fino, marca Prado Campo.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'salami-el-mocano-super-especial',
    name: 'Salami El Mocano Super Especial',
    ref: 'SALAMI EL MOCANO SUPER ESPECIAL',
    category: 'salamis',
    description: 'Salami super especial, venta por libra.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'salami-tolentino-ahumado',
    name: 'Salami Tolentino Ahumado Grado Superior',
    ref: 'SALAMI TOLENTINO AHUMADO GRADO SUPERIOR',
    category: 'salamis',
    description: 'Salami ahumado grado superior.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'salami-naranjal-latino',
    name: 'Salami Naranjal Latino',
    ref: 'SALAMI NARANJAL LATINO',
    category: 'salamis',
    description: 'Salami de la línea Naranjal Latino.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'salami-tipo-argentino',
    name: 'Salami Tipo Argentino',
    ref: 'SALAMI TIPO ARGENTINO',
    category: 'salamis',
    description: 'Salami curado tipo argentino, sabor intenso.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'salami-de-pollo-agrofem',
    name: 'Salami de Pollo Agrofem',
    ref: 'SALAMI DE POLLO AGROFEM',
    category: 'salamis',
    description: 'Salami de pollo, alternativa más liviana. Por libra.',
    unit: 'libra',
    hasPhoto: true,
  },

  // JAMONES Y JAMONETAS (11)
  {
    slug: 'jamon-picnic-del-cerro',
    name: 'Jamón Picnic del Cerro',
    ref: 'JAMON PICNIC DEL CERRO',
    category: 'jamones',
    description: 'Jamón picnic, marca El Cerro. Por libra.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'jamon-picnic-del-cerro-economico',
    name: 'Jamón Picnic del Cerro Económico',
    ref: 'JAMON PICNIC DEL CERRO ECONOMICO',
    category: 'jamones',
    description: 'Presentación económica del jamón picnic.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'jamon-picnic-cocido',
    name: 'Jamón Picnic Cocido',
    ref: 'JAMON PICNIC COCIDO',
    category: 'jamones',
    description: 'Jamón picnic cocido, listo para servir.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'jamon-cocido-corriente',
    name: 'Jamón Cocido Corriente',
    ref: 'JAMON COCIDO CORRIENTE',
    category: 'jamones',
    description: 'Jamón cocido de uso diario, rendidor.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'jamon-caserio',
    name: 'Jamón Caserío',
    ref: 'JAMON CASERIO',
    category: 'jamones',
    description: 'Jamón marca Caserío, venta por libra.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'jamon-de-pavo-checo',
    name: 'Jamón de Pavo Checo',
    ref: 'JAMON DE PAVO CHECO',
    category: 'jamones',
    description: 'Jamón de pavo, opción más liviana.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'jamoneta',
    name: 'Jamoneta',
    ref: 'JAMONETA',
    category: 'jamones',
    description: 'Jamoneta clásica, por libra.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'jamoneta-la-criolla',
    name: 'Jamoneta La Criolla',
    ref: 'JAMONETA LA CRIOLLA',
    category: 'jamones',
    description: 'Jamoneta marca La Criolla.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'jamoneta-de-pollo-ducarnes',
    name: 'Jamoneta de Pollo Ducarnes',
    ref: 'JAMONETA DE POLLO DUCARNES',
    category: 'jamones',
    description: 'Jamoneta de pollo, marca Ducarnes.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'jamoneta-moyeta',
    name: 'Jamoneta Moyeta',
    ref: 'JAMONETA MOYETA',
    category: 'jamones',
    description: 'Jamoneta marca La Moyeta.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'jamoneta-mortadela-la-moyeta',
    name: 'Jamoneta Mortadela La Moyeta',
    ref: 'JAMONETA MORTADELA LA MOYETA',
    category: 'jamones',
    description: 'Mortadela de la línea La Moyeta.',
    unit: 'libra',
    hasPhoto: true,
  },

  // SALCHICHAS (5)
  {
    slug: 'salchicha-chef-hot-dog-superior',
    name: 'Salchicha Chef Hot Dog Superior',
    ref: 'SALCHICHA CHEF HOT DOG SUPERIOR',
    category: 'salchichas',
    description: 'Salchicha hot dog superior, venta por unidad.',
    unit: 'unidad',
    hasPhoto: true,
  },
  {
    slug: 'salchicha-chef',
    name: 'Salchicha Chef',
    ref: 'SALCHICHA CHEF',
    category: 'salchichas',
    description: 'Salchicha marca Chef, por unidad.',
    unit: 'unidad',
    hasPhoto: true,
  },
  {
    slug: 'salchicha-hot-dog',
    name: 'Salchicha Hot Dog',
    ref: 'SALCHICHA HOT DOG',
    category: 'salchichas',
    description: 'Salchicha hot dog clásica.',
    unit: 'unidad',
    hasPhoto: true,
  },
  {
    slug: 'salchicha-hot-dog-agrofem',
    name: 'Salchicha Hot Dog Agrofem',
    ref: 'SALCHICHA HOT DOG AGROFEM',
    category: 'salchichas',
    description: 'Salchicha hot dog marca Agrofem.',
    unit: 'unidad',
    hasPhoto: true,
  },
  {
    slug: 'salchicha-piggy-links-premium-chef',
    name: 'Salchicha Piggy Links Premium Chef',
    ref: 'SALCHICHA PIGGY LINKS PREMIUM CHEF',
    category: 'salchichas',
    description: 'Salchicha premium tipo links, por paquete.',
    unit: 'paquete',
    hasPhoto: true,
  },

  // LONGANIZAS (3)
  {
    slug: 'longaniza-gruesa',
    name: 'Longaniza Gruesa',
    ref: 'LONGANIZA GRUESA',
    category: 'longanizas',
    description: 'Longaniza gruesa, por libra.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'longaniza-fina',
    name: 'Longaniza Fina',
    ref: 'LONGANIZA FINA',
    category: 'longanizas',
    description: 'Longaniza fina, por libra.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'longaniza-parrillera',
    name: 'Longaniza Parrillera',
    ref: 'LONGANIZA PARRILLERA',
    category: 'longanizas',
    description: 'Longaniza para parrilla, por libra.',
    unit: 'libra',
    hasPhoto: true,
  },

  // QUESOS (10)
  // Names are cleaned display versions of the client's inventory sheet; `ref`
  // keeps the original string. Units come from the sheet (LIB / UDS / LAT).
  {
    slug: 'queso-amarillo-cheddar',
    name: 'Queso Amarillo Cheddar',
    ref: 'QUESO AMARILLO CHEDAR',
    category: 'quesos',
    description: 'Queso amarillo tipo cheddar. Venta por libra.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'queso-blanco-de-freir',
    name: 'Queso Blanco de Freír',
    ref: 'QUESO BLANCO DE FREIR',
    category: 'quesos',
    description: 'Queso blanco para freír. Venta por libra.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'queso-blanco-lismarie',
    name: 'Queso Blanco Lismarie',
    ref: 'QUESO BLANCO LISMARIE',
    category: 'quesos',
    description: 'Queso blanco marca Lismarie, por unidad.',
    unit: 'unidad',
    hasPhoto: true,
  },
  {
    slug: 'queso-cayacoa',
    name: 'Queso Cayacoa',
    ref: 'QUESO CAYACOA',
    category: 'quesos',
    description: 'Queso marca Cayacoa. Venta por libra.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'queso-cheddar-en-lata',
    name: 'Queso Cheddar en Lata',
    ref: 'QUESO CHEDDAR EN LATA',
    category: 'quesos',
    description: 'Queso cheddar en lata, listo para servir.',
    unit: 'lata',
    hasPhoto: true,
  },
  {
    slug: 'queso-danes',
    name: 'Queso Danés',
    ref: 'QUESO DANES',
    category: 'quesos',
    description: 'Queso danés. Venta por libra.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'queso-geo-geo',
    name: 'Queso Geo Geo',
    ref: 'QUESO GEO GEO',
    category: 'quesos',
    description: 'Queso marca Geo Geo. Venta por libra.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'queso-gouda-bunwo',
    name: 'Queso Gouda Bunwo',
    ref: 'QUESO GOUDA BUNWO',
    category: 'quesos',
    description: 'Queso gouda marca Bunwo. Venta por libra.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'queso-mozzarella',
    name: 'Queso Mozzarella',
    ref: 'QUESO MOZARELA',
    category: 'quesos',
    description: 'Queso mozzarella. Venta por libra.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'queso-yaquelin',
    name: 'Queso Yaquelin',
    ref: 'QUESO YAQUELIN',
    category: 'quesos',
    description: 'Queso marca Yaquelin.',
    unit: 'libra',
    hasPhoto: true,
  },

  // ESPECIALIDADES (2)
  {
    slug: 'tocineta-rebanada',
    name: 'Tocineta Rebanada',
    ref: 'TOCINETA REBANADA',
    category: 'especialidades',
    description: 'Tocineta en rebanadas, lista para cocinar.',
    unit: 'libra',
    hasPhoto: true,
  },
  {
    slug: 'pepperoni',
    name: 'Pepperoni',
    ref: 'PEPPERONI',
    category: 'especialidades',
    description: 'Pepperoni por libra, ideal para pizzería.',
    unit: 'libra',
    hasPhoto: true,
  },
];

/** Salami brands the client confirmed. Single source for the FAQ answer and
 *  the counter in the About section so the two can never drift apart. */
export const SALAMI_BRANDS = [
  'Induveca',
  'El Cerro',
  'Don Cibao',
  'Prado Campo',
  'El Mocano',
  'Tolentino',
  'Naranjal Latino',
  'Estelar',
  'Agrofem',
];

export const CATEGORY_LABEL: Record<Category, string> = {
  salamis: 'Salamis',
  jamones: 'Jamones y jamonetas',
  salchichas: 'Salchichas',
  longanizas: 'Longanizas',
  quesos: 'Quesos',
  especialidades: 'Especialidades',
};

export function countByCategory(id: Category): number {
  return PRODUCTS.filter((product) => product.category === id).length;
}
