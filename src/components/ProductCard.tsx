import { CATEGORY_LABEL, UNIT_LABEL, type Product } from '../data/products';
import { useOrderList } from '../hooks/useOrderList';
import ProductImage from './ProductImage';
import { IconMinus, IconPlus } from './Icons';

interface ProductCardProps {
  product: Product;
  /** First row skips lazy loading. */
  eager?: boolean;
}

export default function ProductCard({ product, eager = false }: ProductCardProps) {
  const { qtyOf, add, setQty } = useOrderList();
  const qty = qtyOf(product.slug);
  const unit = UNIT_LABEL[product.unit];

  return (
    <article className="product-card">
      <div className="product-card__media">
        <ProductImage
          className="product-card__img"
          src={`/products/${product.slug}.jpg`}
          alt={product.name}
          width={1200}
          height={1200}
          eager={eager}
        />
      </div>

      <div className="product-card__body">
        <span className="product-card__tag">{CATEGORY_LABEL[product.category]}</span>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__desc">{product.description}</p>

        {/* Price only renders once the client supplies one. */}
        {product.price !== undefined && (
          <p className="product-card__price">
            RD${product.price.toLocaleString('es-DO')}
            <span> / {unit.one}</span>
          </p>
        )}

        {qty === 0 ? (
          <button
            type="button"
            className="btn btn--ghost btn--block product-card__cta"
            onClick={() => add(product.slug)}
          >
            <IconPlus size={15} />
            Agregar
          </button>
        ) : (
          <div
            className="stepper"
            role="group"
            aria-label={`Cantidad de ${product.name}`}
          >
            <button
              type="button"
              className="stepper__btn"
              aria-label={`Quitar una ${unit.one} de ${product.name}`}
              onClick={() => setQty(product.slug, qty - 1)}
            >
              <IconMinus size={16} />
            </button>
            <span className="stepper__value" aria-live="polite">
              {qty} {qty === 1 ? unit.one : unit.many}
            </span>
            <button
              type="button"
              className="stepper__btn"
              aria-label={`Agregar una ${unit.one} de ${product.name}`}
              onClick={() => setQty(product.slug, qty + 1)}
            >
              <IconPlus size={16} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
