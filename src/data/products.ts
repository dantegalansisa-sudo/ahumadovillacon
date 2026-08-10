/**
 * Product catalog. Source: the client's physical inventory sheet.
 * `name` is the cleaned display name, `ref` keeps the original inventory
 * string so the client can match items internally.
 * Photos resolve to /products/{slug}.jpg — missing files fall back silently
 * through the ProductImage component.
 *
 * Descriptions are provisional: product type only, no origin, quality grade,
 * nutrition or marketing claims. Do not expand them without client sign-off.
 */

export type Category =
  | 'salamis'
  | 'jamones'
  | 'salchichas'
  | 'longanizas'
  | 'especialidades';

export interface Product {
  slug: string;
  name: string;
  ref: string;
  category: Category;
  description: string;
}

export interface CategoryMeta {
  id: Category;
  label: string;
  chipLabel: string;
  blurb: string;
  image: string;
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
    image: '/categories/salamis.jpg',
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
    image: '/categories/jamones.jpg',
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
    image: '/categories/salchichas.jpg',
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
    image: '/categories/longanizas.jpg',
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
    id: 'especialidades',
    label: 'Especialidades',
    chipLabel: 'Especialidades',
    blurb: 'Tocineta rebanada y pepperoni para pizzería y desayuno.',
    image: '/categories/especialidades.jpg',
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
  },
  {
    slug: 'salami-induveca-super-especial',
    name: 'Salami Induveca Super Especial',
    ref: 'SALAMI INDUVECA SUPER ESPECIAL',
    category: 'salamis',
    description: 'Corte clásico dominicano, ideal para desayuno y sándwich.',
  },
  {
    slug: 'salami-chef-super-especial',
    name: 'Salami Chef Super Especial',
    ref: 'SALAMI CHEF SUPER ESPECIAL',
    category: 'salamis',
    description: 'Salami super especial, presentación por libra.',
  },
  {
    slug: 'salami-del-cerro-negro',
    name: 'Salami del Cerro Negro',
    ref: 'SALAMI DEL CERRO NEGRO',
    category: 'salamis',
    description: 'Salami de cerdo, marca El Cerro. Por libra.',
  },
  {
    slug: 'salami-estelar',
    name: 'Salami Estelar',
    ref: 'SALAMI ESTELAR',
    category: 'salamis',
    description: 'Salami de consumo diario, rendidor.',
  },
  {
    slug: 'salami-don-cibao-fino',
    name: 'Salami Don Cibao Fino',
    ref: 'SALAMI DON CIBAO FINO',
    category: 'salamis',
    description: 'Corte fino, textura suave.',
  },
  {
    slug: 'salami-prado-campo-especial',
    name: 'Salami Prado Campo Especial',
    ref: 'SALAMI PRADO CAMPO ESPECIAL',
    category: 'salamis',
    description: 'Salami especial de la línea Prado Campo.',
  },
  {
    slug: 'salami-prado-campo-fino',
    name: 'Salami Prado Campo Fino',
    ref: 'SALAMI PRADO CAMPO FINO',
    category: 'salamis',
    description: 'Corte fino, marca Prado Campo.',
  },
  {
    slug: 'salami-el-mocano-super-especial',
    name: 'Salami El Mocano Super Especial',
    ref: 'SALAMI EL MOCANO SUPER ESPECIAL',
    category: 'salamis',
    description: 'Salami super especial, venta por libra.',
  },
  {
    slug: 'salami-tolentino-ahumado',
    name: 'Salami Tolentino Ahumado Grado Superior',
    ref: 'SALAMI TOLENTINO AHUMADO GRADO SUPERIOR',
    category: 'salamis',
    description: 'Salami ahumado grado superior.',
  },
  {
    slug: 'salami-naranjal-latino',
    name: 'Salami Naranjal Latino',
    ref: 'SALAMI NARANJAL LATINO',
    category: 'salamis',
    description: 'Salami de la línea Naranjal Latino.',
  },
  {
    slug: 'salami-tipo-argentino',
    name: 'Salami Tipo Argentino',
    ref: 'SALAMI TIPO ARGENTINO',
    category: 'salamis',
    description: 'Salami curado tipo argentino, sabor intenso.',
  },
  {
    slug: 'salami-de-pollo-agrofem',
    name: 'Salami de Pollo Agrofem',
    ref: 'SALAMI DE POLLO AGROFEM',
    category: 'salamis',
    description: 'Salami de pollo, alternativa más liviana. Por libra.',
  },

  // JAMONES Y JAMONETAS (11)
  {
    slug: 'jamon-picnic-del-cerro',
    name: 'Jamón Picnic del Cerro',
    ref: 'JAMON PICNIC DEL CERRO',
    category: 'jamones',
    description: 'Jamón picnic, marca El Cerro. Por libra.',
  },
  {
    slug: 'jamon-picnic-del-cerro-economico',
    name: 'Jamón Picnic del Cerro Económico',
    ref: 'JAMON PICNIC DEL CERRO ECONOMICO',
    category: 'jamones',
    description: 'Presentación económica del jamón picnic.',
  },
  {
    slug: 'jamon-picnic-cocido',
    name: 'Jamón Picnic Cocido',
    ref: 'JAMON PICNIC COCIDO',
    category: 'jamones',
    description: 'Jamón picnic cocido, listo para servir.',
  },
  {
    slug: 'jamon-cocido-corriente',
    name: 'Jamón Cocido Corriente',
    ref: 'JAMON COCIDO CORRIENTE',
    category: 'jamones',
    description: 'Jamón cocido de uso diario, rendidor.',
  },
  {
    slug: 'jamon-caserio',
    name: 'Jamón Caserío',
    ref: 'JAMON CASERIO',
    category: 'jamones',
    description: 'Jamón marca Caserío, venta por libra.',
  },
  {
    slug: 'jamon-de-pavo-checo',
    name: 'Jamón de Pavo Checo',
    ref: 'JAMON DE PAVO CHECO',
    category: 'jamones',
    description: 'Jamón de pavo, opción más liviana.',
  },
  {
    slug: 'jamoneta',
    name: 'Jamoneta',
    ref: 'JAMONETA',
    category: 'jamones',
    description: 'Jamoneta clásica, por libra.',
  },
  {
    slug: 'jamoneta-la-criolla',
    name: 'Jamoneta La Criolla',
    ref: 'JAMONETA LA CRIOLLA',
    category: 'jamones',
    description: 'Jamoneta marca La Criolla.',
  },
  {
    slug: 'jamoneta-de-pollo-ducarnes',
    name: 'Jamoneta de Pollo Ducarnes',
    ref: 'JAMONETA DE POLLO DUCARNES',
    category: 'jamones',
    description: 'Jamoneta de pollo, marca Ducarnes.',
  },
  {
    slug: 'jamoneta-moyeta',
    name: 'Jamoneta Moyeta',
    ref: 'JAMONETA MOYETA',
    category: 'jamones',
    description: 'Jamoneta marca La Moyeta.',
  },
  {
    slug: 'jamoneta-mortadela-la-moyeta',
    name: 'Jamoneta Mortadela La Moyeta',
    ref: 'JAMONETA MORTADELA LA MOYETA',
    category: 'jamones',
    description: 'Mortadela de la línea La Moyeta.',
  },

  // SALCHICHAS (5)
  {
    slug: 'salchicha-chef-hot-dog-superior',
    name: 'Salchicha Chef Hot Dog Superior',
    ref: 'SALCHICHA CHEF HOT DOG SUPERIOR',
    category: 'salchichas',
    description: 'Salchicha hot dog superior, venta por unidad.',
  },
  {
    slug: 'salchicha-chef',
    name: 'Salchicha Chef',
    ref: 'SALCHICHA CHEF',
    category: 'salchichas',
    description: 'Salchicha marca Chef, por unidad.',
  },
  {
    slug: 'salchicha-hot-dog',
    name: 'Salchicha Hot Dog',
    ref: 'SALCHICHA HOT DOG',
    category: 'salchichas',
    description: 'Salchicha hot dog clásica.',
  },
  {
    slug: 'salchicha-hot-dog-agrofem',
    name: 'Salchicha Hot Dog Agrofem',
    ref: 'SALCHICHA HOT DOG AGROFEM',
    category: 'salchichas',
    description: 'Salchicha hot dog marca Agrofem.',
  },
  {
    slug: 'salchicha-piggy-links-premium-chef',
    name: 'Salchicha Piggy Links Premium Chef',
    ref: 'SALCHICHA PIGGY LINKS PREMIUM CHEF',
    category: 'salchichas',
    description: 'Salchicha premium tipo links, por paquete.',
  },

  // LONGANIZAS (3)
  {
    slug: 'longaniza-gruesa',
    name: 'Longaniza Gruesa',
    ref: 'LONGANIZA GRUESA',
    category: 'longanizas',
    description: 'Longaniza gruesa, por libra.',
  },
  {
    slug: 'longaniza-fina',
    name: 'Longaniza Fina',
    ref: 'LONGANIZA FINA',
    category: 'longanizas',
    description: 'Longaniza fina, por libra.',
  },
  {
    slug: 'longaniza-parrillera',
    name: 'Longaniza Parrillera',
    ref: 'LONGANIZA PARRILLERA',
    category: 'longanizas',
    description: 'Longaniza para parrilla, por libra.',
  },

  // ESPECIALIDADES (2)
  {
    slug: 'tocineta-rebanada',
    name: 'Tocineta Rebanada',
    ref: 'TOCINETA REBANADA',
    category: 'especialidades',
    description: 'Tocineta en rebanadas, lista para cocinar.',
  },
  {
    slug: 'pepperoni',
    name: 'Pepperoni',
    ref: 'PEPPERONI',
    category: 'especialidades',
    description: 'Pepperoni por libra, ideal para pizzería.',
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
  especialidades: 'Especialidades',
};

export function countByCategory(id: Category): number {
  return PRODUCTS.filter((product) => product.category === id).length;
}
