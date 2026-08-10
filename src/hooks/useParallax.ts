import { useRef } from 'react';
import {
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';

/**
 * Taste Skill Level 3 — classic parallax.
 * Returns a ref to attach to the wrapper and a y MotionValue for the child.
 */
export function useParallax(distance = 80): {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  // Scroll-linked values bypass MotionConfig, so reduced motion is handled here.
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-distance, distance],
  );
  return { ref, y };
}
