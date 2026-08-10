import { BUSINESS } from '../data/business';
import { FAQ } from '../data/faq';
import { isPending } from '../data/business';
import type { Product } from '../data/products';

/** Absolute URLs only exist once the domain is filled in. */
export const hasDomain = !BUSINESS.domain.includes('{{');

export function absoluteUrl(path: string): string | undefined {
  return hasDomain ? `${BUSINESS.siteUrl}${path}` : undefined;
}

/** Answers still marked PENDING are skipped rather than invented. */
export function faqSchema(): Record<string, unknown> | null {
  const answered = FAQ.filter((item) => !isPending(item.answer));
  if (answered.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: answered.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/**
 * Product schema without offers triggers Search Console warnings and there are
 * no published prices, so the catalog is exposed as a plain list of names.
 */
export function itemListSchema(products: Product[], name: string): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: product.name,
    })),
  };
}

export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): Record<string, unknown> | null {
  if (!hasDomain) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}
