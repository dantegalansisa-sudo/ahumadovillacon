import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { IS_SERVER } from '../utils/easings';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

/** Taste Skill bonus — counts up once the number scrolls into view. */
export default function AnimatedCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 2000,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = window.setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        window.clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => window.clearInterval(timer);
  }, [inView, target, duration]);

  // The static HTML carries the final figure — "0 productos en catálogo" would
  // be a poor thing for a crawler to read. suppressHydrationWarning covers the
  // deliberate difference: in the browser the number counts up from zero.
  return (
    <span ref={ref} suppressHydrationWarning>
      {prefix}
      {(IS_SERVER ? target : count).toLocaleString('es-DO')}
      {suffix}
    </span>
  );
}
