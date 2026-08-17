import { BUSINESS } from '../data/business';
import { formatQty } from '../data/products';
import type { OrderItem } from '../hooks/useOrderList';

/**
 * Every prefilled message closes with this line. It tells whoever answers the
 * phone that the message came from the site rather than from a flyer, a
 * referral or an ad, which is the only way to know the site is producing
 * anything. The full URL is included so WhatsApp turns it into a tappable link.
 */
const SOURCE_LINE = `Vengo de la página web: ${BUSINESS.siteUrl}`;

/** Base WhatsApp deep link with an arbitrary pre-filled message. */
export function waLinkWithMessage(message: string): string {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(
    `${message}\n\n${SOURCE_LINE}`,
  )}`;
}

/**
 * The whole order list as a single message. Prices are only written when a
 * product actually has one, so the message stays honest while the catalog has
 * none.
 */
export function waOrderLink(items: OrderItem[]): string {
  const lines = items.map((item) => {
    const qty = formatQty(item.qty, item.product.unit);
    const price =
      item.product.price === undefined
        ? ''
        : ` (RD$${item.product.price.toLocaleString('es-DO')} c/u)`;
    return `- ${item.product.name}: ${qty}${price}`;
  });

  return waLinkWithMessage(
    `Hola ${BUSINESS.name}, quiero hacer este pedido:\n\n${lines.join(
      '\n',
    )}\n\n¿Me confirman precio y disponibilidad?`,
  );
}

/** Generic enquiry — hero, final CTA, floating button, Visítanos. */
export const WA_GENERAL = waLinkWithMessage(
  `Hola ${BUSINESS.name}, quiero hacer un pedido. ¿Me pueden ayudar?`,
);

/** B2B enquiry — wholesale section. */
export const WA_WHOLESALE = waLinkWithMessage(
  `Hola ${BUSINESS.name}, soy un negocio y quiero cotizar al por mayor.`,
);
