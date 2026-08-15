import { BUSINESS, NEARBY_AREAS } from './business';
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
    question: '¿Venden embutidos al por mayor en Villa Consuelo?',
    answer:
      'Sí. Trabajamos al por mayor con los colmados, cafeterías y restaurantes de Villa Consuelo y los barrios vecinos, y también vendemos al detalle por libra para el hogar. Escríbenos por WhatsApp al ' +
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
    id: 'donde-estan',
    question: '¿Dónde están ubicados en Santo Domingo?',
    answer: `Estamos en ${BUSINESS.address}, Santo Domingo, Distrito Nacional. En Google Maps aparecemos como ${BUSINESS.mapsName}. Abrimos de lunes a sábado de 7:00 a.m. a 6:30 p.m. y los domingos de 7:00 a.m. a 5:00 p.m.`,
  },
  {
    id: 'zona',
    question: '¿A qué zonas llegan con la entrega?',
    answer: `Trabajamos con la gente de la zona: estamos a minutos de ${NEARBY_AREAS.slice(
      1,
      6,
    ).join(', ')} y los barrios vecinos del Distrito Nacional. Escríbenos por WhatsApp con tu ubicación y te confirmamos cómo te lo hacemos llegar.`,
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
