import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'

/* onClick описан отдельно и без события: обработчик вешается и на button, и на
   ссылку, а типы события у них разные. Всем текущим вызовам аргумент не нужен */
type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> & {
  variant?: Variant
  href?: string
  children: ReactNode
  className?: string
  external?: boolean
  onClick?: () => void
}

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-soft shadow-[0_8px_26px_-10px_rgba(59,130,246,0.9)]',
  secondary:
    'bg-transparent text-fg border border-border hover:border-accent/45 hover:bg-elevated',
  ghost: 'bg-transparent text-subtle hover:text-fg hover:bg-elevated/60',
}

export function Button({
  variant = 'primary',
  href,
  children,
  className,
  external,
  onClick,
  ...props
}: Props) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-control px-5 py-2.5 text-base font-semibold transition-colors duration-200',
    'disabled:pointer-events-none disabled:opacity-50',
    variants[variant],
    className,
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
