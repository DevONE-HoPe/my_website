import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  children: ReactNode
  className?: string
  tone?: 'default' | 'accent' | 'amber' | 'muted' | 'price'
}

const tones = {
  default: 'border-border bg-elevated text-subtle',
  accent: 'border-accent/35 bg-accent/12 text-accent-soft',
  amber: 'border-amber/35 bg-amber/12 text-amber-soft',
  muted: 'border-border/70 bg-surface text-muted',
  /* solid amber chip — prices, the thing that must be read first */
  price: 'border-amber bg-amber text-[#1a1005] font-semibold',
}

export function Badge({ children, className, tone = 'default' }: Props) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-chip border px-2 py-0.5 text-xs font-medium',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
