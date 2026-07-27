import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  children: ReactNode
  className?: string
  hover?: boolean
  as?: 'div' | 'article' | 'button'
  onClick?: () => void
}

export function Card({
  children,
  className,
  hover = true,
  as: Tag = 'div',
  onClick,
}: Props) {
  return (
    <Tag
      onClick={onClick}
      className={cn(
        'rounded-card border border-border bg-surface/85 p-5',
        hover &&
          'transition-[border-color,background-color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-accent/30 hover:bg-elevated/80 hover:shadow-[0_10px_28px_-18px_rgba(59,130,246,0.55)]',
        onClick && 'cursor-pointer text-left',
        className,
      )}
    >
      {children}
    </Tag>
  )
}
