import { Helmet } from 'react-helmet-async';
import { BUSINESS, HOURS, LEGAL, isPending } from '../data/business';
import { absoluteUrl } from '../utils/schema';

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
  const ogImage = absoluteUrl('/images/og-image.jpg');

  const store: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    name: BUSINESS.name,
    alternateName: 'Ahumados Villa Consuelo',
    description,
    telephone: BUSINESS.phoneE164,
    areaServed: 'Santo Domingo, República Dominicana',
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
  if (ogImage) {
    store.image = ogImage;
  }
  // A PostalAddress with placeholder fields would be worse than none.
  if (!isPending(BUSINESS.address)) {
    store.address = {
      '@type': 'PostalAddress',
      streetAddress: BUSINESS.address,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
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
