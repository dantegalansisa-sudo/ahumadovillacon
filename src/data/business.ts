/**
 * Single source of truth for business data.
 * Anything the client has not confirmed yet is the literal token PENDING
 * so it can be swapped in one place. Never fabricate these values.
 */

export const PENDING = '{{PENDIENTE}}';

/**
 * Where customers actually buy: a stall inside the Mercado de Villa Consuelo.
 * The address on the ONAPI certificate is the owner's private domicile, not the
 * shop, and is deliberately kept out of the site and out of this repository.
 * Still missing: the stall / local number inside the market.
 */
const ADDRESS = 'Calle Manuela Diez 230-228, Villa Consuelo';
const MAP_QUERY = `${ADDRESS}, Santo Domingo 10308, República Dominicana`;

export const BUSINESS = {
  name: 'Ahumados Villacon',
  shortName: 'Villacon',
  whatsapp: '18493529892',
  whatsappDisplay: '(849) 352-9892',
  phoneE164: '+18493529892',
  // Landline from the Google listing. Every WhatsApp CTA keeps using the 849.
  landlineDisplay: '(829) 909-0000',
  landlineE164: '+18299090000',
  /** How the business is listed on Google Maps, which is how people find it. */
  mapsName: 'Embutidos Villa Consuelo',
  address: ADDRESS,
  addressLocality: 'Santo Domingo',
  addressRegion: 'Distrito Nacional',
  postalCode: '10308',
  country: 'DO',
  email: PENDING,
  instagram: PENDING,
  facebook: PENDING,
  // Keyless Google Maps embed. Swap for the Maps Embed API with a key if this
  // endpoint ever stops resolving.
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&output=embed`,
  mapLinkUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MAP_QUERY)}`,
  // Vercel serves the site on www and 308-redirects the apex to it, so www is
  // the canonical host. Mirrored in public/robots.txt and public/sitemap.xml.
  domain: 'www.ahumadosvillacon.com',
  siteUrl: 'https://www.ahumadosvillacon.com',
} as const;

/**
 * Opening hours, confirmed by the client.
 * `spec` feeds the LocalBusiness structured data; `display` feeds the UI.
 */
export const HOURS = [
  {
    label: 'Lunes a sábado',
    display: '7:00 a.m. – 6:30 p.m.',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '07:00',
    closes: '18:30',
  },
  {
    label: 'Domingo',
    display: '7:00 a.m. – 5:00 p.m.',
    days: ['Sunday'],
    opens: '07:00',
    closes: '17:00',
  },
] as const;

/** One-line version for the footer and the wholesale card. */
export const HOURS_SHORT = 'Lun a sáb 7:00 a.m. – 6:30 p.m. · Dom 7:00 a.m. – 5:00 p.m.';

/**
 * Registry data from the ONAPI trade-name certificate (April 2026).
 * "Ahumados Villacon" is both the registered and the public brand name;
 * "Villa Consuelo" is the market the business operates from.
 */
export const LEGAL = {
  owner: 'Franklin Starlin Olaverría Casado',
  ownerShort: 'Franklin Olaverría',
  registryNumber: '924865',
  registryOffice: 'ONAPI',
} as const;

/** True when a value is still an unconfirmed placeholder. */
export function isPending(value: string): boolean {
  return value.includes('{{PENDIENTE}}');
}

/** Root-relative so the nav also works from the category routes. */
export const NAV = [
  { label: 'Inicio', href: '/#inicio' },
  { label: 'Productos', href: '/#catalogo' },
  { label: 'Al por mayor', href: '/#al-por-mayor' },
  { label: 'Nosotros', href: '/#nosotros' },
  { label: 'Cómo pedir', href: '/#como-pedir' },
  { label: 'Contacto', href: '/#visitanos' },
] as const;

export const AGENCY = {
  name: 'NEXIX Tech Studio',
  url: 'https://instagram.com/nexixstudio',
} as const;
