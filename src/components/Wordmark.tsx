interface WordmarkProps {
  variant?: 'light' | 'dark';
  size?: 'header' | 'hero' | 'footer';
  /** Header only: shrinks the mark once the page is scrolled. */
  compact?: boolean;
}

/**
 * Typographic wordmark. There is no logo file yet — when one arrives it is
 * swapped inside this component only. Type only: no pig, cow or flame.
 */
export default function Wordmark({
  variant = 'light',
  size = 'header',
  compact = false,
}: WordmarkProps) {
  const classes = [
    'wordmark',
    `wordmark--${size}`,
    variant === 'dark' ? 'wordmark--dark' : '',
    compact ? 'is-compact' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes}>
      <span className="wordmark__rule" aria-hidden="true">
        <span className="wordmark__line" />
        <span className="wordmark__diamond" />
        <span className="wordmark__line" />
      </span>
      <span className="wordmark__top">Ahumados</span>
      <span className="wordmark__main">Villacon</span>
      <span className="wordmark__sub">Embutidos &middot; Villa Consuelo, SD</span>
    </span>
  );
}
