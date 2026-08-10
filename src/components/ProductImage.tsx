import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** First-row images skip lazy loading. */
  eager?: boolean;
  /** Fallback background: product cards sit on cream, category cards on deep. */
  tone?: 'cream' | 'deep';
}

/**
 * Photos land later in /public. Until then the fallback is a designed block —
 * the wordmark diamond on a flat panel. No broken-image icon, no placeholder
 * service URL, no stock photo.
 */
export default function ProductImage({
  src,
  alt,
  width,
  height,
  className = '',
  eager = false,
  tone = 'cream',
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`img-fallback img-fallback--${tone} ${className}`.trim()}
        role="img"
        aria-label={alt}
      >
        <span className="img-fallback__diamond" />
      </div>
    );
  }

  return (
    <img
      className={className}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
