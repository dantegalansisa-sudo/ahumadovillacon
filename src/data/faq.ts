import { BUSINESS } from './business';
import { SALAMI_BRANDS } from './products';

export interface FaqItem {
  id: string;
  question: string;
  /** Plain-text answer. An answer left as the PENDING token is skipped from
   *  the FAQPage JSON-LD instead of being invented. */
  answer: string;
}

/** Written for search intent. These six items also power the FAQPage schema. */
export const FAQ: FaqItem[] = [
  {
    id: 'mayorista',
    question: '¿Venden embutidos al por mayor en Santo Domingo?',
    answer:
      'Sí. Trabajamos al por mayor con colmados, cafeterías, restaurantes, hoteles, food trucks y catering en todo Santo Domingo, y también vendemos al detalle por libra para el hogar. Escríbenos por WhatsApp al ' +
      BUSINESS.whatsappDisplay +
      ' con la lista de lo que necesitas.',
  },
  {
    id: 'pedido-minimo',
    question: '¿Cuál es el pedido mínimo para negocios?',
    answer:
      'No hay pedido mínimo. Puedes pedir una libra para tu casa o cajas completas para tu negocio, y en los dos casos te cotizamos igual.',
  },
  {
    id: 'marcas',
    question: '¿Qué marcas de salami manejan?',
    answer: `Manejamos ${SALAMI_BRANDS.slice(0, -1).join(', ')} y ${
      SALAMI_BRANDS[SALAMI_BRANDS.length - 1]
    }.`,
  },
  {
    id: 'libra-o-caja',
    question: '¿Puedo comprar por libra o solo por caja?',
    answer:
      'Las dos formas. Puedes comprar por libra si es para tu casa, o por caja completa si es para tu negocio. Dinos la cantidad por WhatsApp y te cotizamos.',
  },
  {
    id: 'entregas',
    question: '¿Hacen entregas a colmados y restaurantes?',
    answer:
      'Sí, hay entrega disponible. Coordinamos el envío por WhatsApp al confirmar el pedido; escríbenos con tu ubicación y te decimos cómo lo manejamos.',
  },
  {
    id: 'como-pedir',
    question: '¿Cómo hago un pedido?',
    answer:
      'Revisa el catálogo, anota los productos que necesitas y escríbenos por WhatsApp al ' +
      BUSINESS.whatsappDisplay +
      '. Te confirmamos precio y disponibilidad al momento.',
  },
];
