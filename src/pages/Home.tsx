import { PRODUCTS } from '../data/products';
import { faqSchema, itemListSchema } from '../utils/schema';
import Seo from '../components/Seo';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ValueStrip from '../components/ValueStrip';
import Categories from '../components/Categories';
import Catalog from '../components/Catalog';
import About from '../components/About';
import Wholesale from '../components/Wholesale';
import HowToOrder from '../components/HowToOrder';
import VisitUs from '../components/VisitUs';
import Faq from '../components/Faq';
import FinalCta from '../components/FinalCta';
import Footer from '../components/Footer';
import WhatsAppFab from '../components/WhatsAppFab';

const TITLE = 'Embutidos y quesos en Villa Consuelo | Ahumados Villacon';
const DESCRIPTION =
  'Salamis, jamones, salchichas, longanizas y quesos en Villa Consuelo, Santo Domingo. Al por mayor y al detalle, sin pedido mínimo, con entrega en la zona. Pide por WhatsApp al 849-352-9892.';

export default function Home() {
  return (
    <>
      <Seo
        title={TITLE}
        description={DESCRIPTION}
        path="/"
        schemas={[faqSchema(), itemListSchema(PRODUCTS, 'Catálogo de embutidos')]}
      />

      <a className="skip-link" href="#catalogo">
        Saltar al catálogo
      </a>

      <Header />

      <main id="main">
        <Hero />
        <ValueStrip />
        <Categories />
        <Catalog />
        <About />
        <Wholesale />
        <HowToOrder />
        <VisitUs />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
      <WhatsAppFab />
    </>
  );
}
