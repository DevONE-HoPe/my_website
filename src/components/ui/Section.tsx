import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'
import { Reveal } from '../motion/Reveal'

type Props = {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  children: ReactNode
  className?: string
  narrow?: boolean
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  narrow,
}: Props) {
  return (
    <section id={id} className={cn('py-14 sm:py-20', className)}>
      <div className="container-page">
        <Reveal as="header" className={cn('mb-8 max-w-2xl sm:mb-10', narrow && 'mx-auto text-center')}>
          {eyebrow && (
            <p className={cn('spec-label mb-3', narrow && 'justify-center')}>{eyebrow}</p>
          )}
          <h2 className="display text-3xl text-fg sm:text-4xl">{title}</h2>
          {description && (
            <p className="mt-3 text-base leading-relaxed text-subtle sm:text-lg">
              {description}
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </section>
  )
}
