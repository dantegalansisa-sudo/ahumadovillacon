import Seo from '../components/Seo';
import Wordmark from '../components/Wordmark';
import { BUSINESS } from '../data/business';

export default function NotFound() {
  return (
    <>
      <Seo
        title={`Página no encontrada | ${BUSINESS.name}`}
        description="La página que buscas no existe. Vuelve al inicio para ver el catálogo de embutidos."
        noindex
      />

      <main className="notfound">
        <div className="container notfound__inner">
          <Wordmark size="footer" />
          <p className="notfound__code">404</p>
          <h1 className="notfound__title">Esta página no existe</h1>
          <p className="notfound__line muted">
            Puede que el enlace esté roto o que la página se haya movido.
          </p>
          <a className="btn btn--primary" href="/">
            Volver al inicio
          </a>
        </div>
      </main>
    </>
  );
}
