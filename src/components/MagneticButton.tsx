import { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  magnetRadius?: number;
  magnetStrength?: number;
  ariaLabel?: string;
  newTab?: boolean;
}

/**
 * Taste Skill Level 4 — the CTA drifts toward the pointer when it gets close.
 * Disabled under prefers-reduced-motion and on touch (no mousemove there).
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = '',
  magnetRadius = 90,
  magnetStrength = 0.32,
  ariaLabel,
  newTab = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const reduceMotion = useReducedMotion();

  const handleMouseMove = (event: React.MouseEvent) => {
    if (reduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < magnetRadius + rect.width / 2) {
      setPos({ x: dx * magnetStrength, y: dy * magnetStrength });
    } else {
      setPos({ x: 0, y: 0 });
    }
  };

  const reset = () => setPos({ x: 0, y: 0 });

  const isExternal = Boolean(href && href.startsWith('http'));

  return (
    <div
      ref={ref}
      className="magnetic"
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
    >
      <motion.div
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {href ? (
          <a
            href={href}
            className={className}
            aria-label={ariaLabel}
            target={isExternal && newTab ? '_blank' : undefined}
            rel={isExternal && newTab ? 'noopener noreferrer' : undefined}
            onClick={onClick}
          >
            {children}
          </a>
        ) : (
          <button type="button" className={className} aria-label={ariaLabel} onClick={onClick}>
            {children}
          </button>
        )}
      </motion.div>
    </div>
  );
}
