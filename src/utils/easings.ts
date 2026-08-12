import type { Variants } from 'framer-motion';

/**
 * During the build-time prerender there is no window, and a motion element
 * would write its hidden state (opacity:0, translated) straight into the
 * static HTML — content a crawler reading the raw markup would see as hidden.
 * `initial={false}` makes the server render the resting state instead; the
 * animation still runs in the browser after hydration.
 */
export const IS_SERVER = typeof window === 'undefined';

/** Use in place of `initial="hidden"` on anything that is prerendered. */
export const INITIAL_HIDDEN = IS_SERVER ? false : 'hidden';

/** Cubic-bezier tuple typed so Framer Motion accepts it directly. */
export type Bezier = [number, number, number, number];

export const EASINGS = {
  premium: [0.76, 0, 0.24, 1] as Bezier,
  smooth: [0.25, 0.8, 0.25, 1] as Bezier,
  bounce: [0.34, 1.56, 0.64, 1] as Bezier,
  snappy: [0.4, 0, 0.2, 1] as Bezier,
  cinematic: [0.86, 0, 0.07, 1] as Bezier,
};

export const PREMIUM_EASE = EASINGS.premium;

/** Stagger variants reused by every card grid (Taste Skill Level 5). */
export const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 48, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: EASINGS.premium,
    },
  },
};
