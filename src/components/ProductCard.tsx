import { memo } from 'react';
import { CATEGORY_LABEL, type Product } from '../data/products';
import { waLink } from '../utils/whatsapp';
import ProductImage from './ProductImage';
import { IconWhatsApp } from './Icons';

interface ProductCardProps {
  product: Product;
  /** First row skips lazy loading. */
  eager?: boolean;
}

function ProductCard({ product, eager = false }: ProductCardProps) {
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

        <a
          className="btn btn--ghost btn--block product-card__cta"
          href={waLink(product.name)}
          target="_blank"
          rel="noopener noreferrer"
          // Starts with the visible label so the accessible name matches it.
          aria-label={`Pedir por WhatsApp: ${product.name}`}
        >
          <IconWhatsApp size={15} />
          Pedir por WhatsApp
        </a>
      </div>
    </article>
  );
}

/** Cards never change once rendered; filtering only adds and removes them. */
export default memo(ProductCard);
