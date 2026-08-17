import { Helmet } from 'react-helmet-async';
import { BUSINESS, GEO, HOURS, LEGAL, NEARBY_AREAS, isPending } from '../data/business';
import { absoluteUrl, ogImageUrl } from '../utils/schema';

interface SeoProps {
  title: string;
  description: string;
  /** Path relative to the site root, e.g. "/" or "/productos/salamis". */
  path?: string;
  noindex?: boolean;
  /** Page-specific JSON-LD appended after the site-wide Store block. */
  schemas?: (Record<string, unknown> | null)[];
}

export default function Seo({
  title,
  description,
  path = '/',
  noindex = false,
  schemas = [],
}: SeoProps) {
  const url = absoluteUrl(path);
  const ogImage = ogImageUrl();

  const store: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: BUSINESS.name,
    alternateName: ['Ahumados Villa Consuelo', BUSINESS.mapsName],
    description,
    telephone: BUSINESS.phoneE164,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.lat,
      longitude: GEO.lng,
    },
    hasMap: BUSINESS.mapLinkUrl,
    // The barrios around the shop, not the whole city: the client sells to
    // whoever is close enough to walk in or take a short delivery.
    areaServed: NEARBY_AREAS.map((name) => ({
      '@type': 'Place',
      name: `${name}, Santo Domingo`,
    })),
    currenciesAccepted: 'DOP',
    founder: { '@type': 'Person', name: LEGAL.owner },
    openingHoursSpecification: HOURS.map((block) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [...block.days],
      opens: block.opens,
      closes: block.closes,
    })),
    // No prices are published, so priceRange is intentionally absent.
  };

  const siteUrl = absoluteUrl('/');
  if (siteUrl) {
    store['@id'] = siteUrl;
    store.url = siteUrl;
  }
  // A local listing without an image is weaker; the hero photo stands in
  // until og-image.jpg exists.
  store.image = ogImage ?? absoluteUrl('/images/hero.webp');
  // A PostalAddress with placeholder fields would be worse than none.
  if (!isPending(BUSINESS.address)) {
    store.address = {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    };
  }

  const blocks = [store, ...schemas].filter(Boolean) as Record<string, unknown>[];

  return (
    <Helmet>
      <html lang="es-DO" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      {url && <link rel="canonical" href={url} />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={BUSINESS.name} />
      <meta property="og:locale" content="es_DO" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {url && <meta property="og:url" content={url} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      <meta name="theme-color" content="#B23A20" />

      {blocks.map((block, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
