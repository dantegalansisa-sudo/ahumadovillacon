import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { EASINGS, INITIAL_HIDDEN } from '../utils/easings';

type Tag = 'h1' | 'h2' | 'h3' | 'p' | 'span';

interface RevealTextProps {
  children: string;
  className?: string;
  delay?: number;
  tag?: Tag;
  /** Centers the word rows — used by centered section heads and the hero. */
  center?: boolean;
  /** Needed when a section points at its title with aria-labelledby. */
  id?: string;
}

/**
 * Taste Skill Level 2 — words rise out of a mask.
 *
 * The in-view trigger lives on the parent, never on the masked word: a word
 * sitting at y:110% is fully clipped by its overflow:hidden mask, and
 * IntersectionObserver reports a clipped element as not intersecting, so a
 * whileInView on the word itself would never fire.
 *
 * The visible spans are aria-hidden and the full string is exposed through
 * aria-label so the heading still reads as one continuous accessible string.
 */
export default function RevealText({
  children,
  className = '',
  delay = 0,
  tag: Tag = 'h1',
  center = false,
  id,
}: RevealTextProps) {
  const reduceMotion = useReducedMotion();
  const words = children.split(' ');
  const MotionTag = motion[Tag];

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: reduceMotion ? 0 : delay,
        staggerChildren: reduceMotion ? 0 : 0.07,
      },
    },
  };

  const word: Variants = reduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.15 } },
      }
    : {
        hidden: { y: '125%', rotate: 2 },
        visible: {
          y: 0,
          rotate: 0,
          transition: { duration: 0.85, ease: EASINGS.premium },
        },
      };

  return (
    <MotionTag
      id={id}
      className={`reveal-text ${center ? 'reveal-text--center' : ''} ${className}`.trim()}
      aria-label={children}
      variants={container}
      initial={INITIAL_HIDDEN}
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {words.map((item, i) => (
        <span className="reveal-text__mask" key={`${item}-${i}`} aria-hidden="true">
          <motion.span className="reveal-text__word" variants={word}>
            {item}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
