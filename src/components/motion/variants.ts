import type { Transition, Variants } from 'framer-motion'

/** Shared timing — short enough to feel snappy, not theatrical */
export const easeOut: Transition['ease'] = [0.22, 1, 0.36, 1]

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
}

export const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 380,
  damping: 28,
  mass: 0.8,
}

export const tweenOut = (duration = 0.45, delay = 0): Transition => ({
  duration,
  delay,
  ease: easeOut,
})

export const staggerContainer = (stagger = 0.06, delayChildren = 0.04): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren,
    },
  },
})

/** Instant show when user prefers reduced motion */
export const reduced: Variants = {
  hidden: { opacity: 1, y: 0, scale: 1 },
  visible: { opacity: 1, y: 0, scale: 1 },
}
