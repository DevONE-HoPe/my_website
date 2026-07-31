import type { ReactNode } from 'react'
import { motion, useReducedMotion, type UseInViewOptions } from 'framer-motion'
import { cn } from '../../lib/cn'
import { fadeUp, reduced, tweenOut } from './variants'

/**
 * Готовые motion-компоненты берём из таблицы, а не через motion.create() в
 * рендере: там на каждый рендер рождается новый тип, React размонтирует
 * поддерево, и whileInView проигрывается заново — текст дёргается.
 */
const motionTags = {
  div: motion.div,
  header: motion.header,
  li: motion.li,
  article: motion.article,
  span: motion.span,
  ul: motion.ul,
  ol: motion.ol,
  dl: motion.dl,
}

/**
 * Trigger as soon as a sliver is near the viewport.
 * Positive bottom margin expands the root so content just under the fold
 * (e.g. About right after Hero) animates on first paint — no empty gap.
 */
const inView: UseInViewOptions = {
  once: true,
  amount: 0.01,
  margin: '0px 0px 30% 0px',
}

type RevealProps = {
  children: ReactNode
  className?: string
  /** Delay in seconds before the reveal starts */
  delay?: number
  /** How far to slide up (px). 0 = fade only */
  y?: number
  as?: 'div' | 'header' | 'li' | 'article' | 'span'
  role?: string
  'aria-label'?: string
}

/**
 * One-shot scroll reveal. GPU-friendly (opacity + transform only).
 * Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
  as = 'div',
  role,
  'aria-label': ariaLabel,
}: RevealProps) {
  const prefersReduced = useReducedMotion()
  const Tag = motionTags[as]

  const variants = prefersReduced
    ? reduced
    : {
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0 },
      }

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={variants}
      transition={prefersReduced ? { duration: 0 } : tweenOut(0.45, delay)}
      className={cn(className)}
      role={role}
      aria-label={ariaLabel}
    >
      {children}
    </Tag>
  )
}

type StaggerProps = {
  children: ReactNode
  className?: string
  stagger?: number
  delayChildren?: number
  as?: 'div' | 'ul' | 'ol' | 'dl'
}

/**
 * Parent that staggers children marked with StaggerItem.
 */
export function Stagger({
  children,
  className,
  stagger = 0.06,
  delayChildren = 0.05,
  as = 'div',
}: StaggerProps) {
  const prefersReduced = useReducedMotion()
  const Tag = motionTags[as]

  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={inView}
      variants={
        prefersReduced
          ? reduced
          : {
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: stagger,
                  delayChildren,
                },
              },
            }
      }
      className={className}
    >
      {children}
    </Tag>
  )
}

type ItemProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'article'
}

export function StaggerItem({ children, className, as = 'div' }: ItemProps) {
  const prefersReduced = useReducedMotion()
  const Tag = motionTags[as]

  return (
    <Tag
      variants={prefersReduced ? reduced : fadeUp}
      transition={prefersReduced ? { duration: 0 } : tweenOut(0.4)}
      className={className}
    >
      {children}
    </Tag>
  )
}
