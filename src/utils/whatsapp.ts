import { BUSINESS } from '../data/business';

/** Base WhatsApp deep link with an arbitrary pre-filled message. */
export function waLinkWithMessage(message: string): string {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Product enquiry — used by every card in the catalog. */
export function waLink(productName: string): string {
  return waLinkWithMessage(
    `Hola ${BUSINESS.name}, me interesa: ${productName}. ¿Me pueden dar precio y disponibilidad?`,
  );
}

/** Generic enquiry — header, hero, final CTA, floating button. */
export const WA_GENERAL = waLinkWithMessage(
  `Hola ${BUSINESS.name}, quiero hacer un pedido. ¿Me pueden ayudar?`,
);

/** B2B enquiry — wholesale section. */
export const WA_WHOLESALE = waLinkWithMessage(
  'Hola, soy un negocio y quiero cotizar al por mayor',
);
