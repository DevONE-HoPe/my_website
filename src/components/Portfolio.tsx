import { useEffect, useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  portfolioFilters,
  portfolioItems,
  type PortfolioItem,
} from '../data/portfolio'
import { Section } from './ui/Section'
import { Badge } from './ui/Badge'
import { cn } from '../lib/cn'
import { Reveal } from './motion/Reveal'
import { easeOut, springSoft } from './motion/variants'

function asset(path: string) {
  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\//, '')}`
}

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof portfolioFilters)[number]['id']>('all')
  const [active, setActive] = useState<PortfolioItem | null>(null)
  const prefersReduced = useReducedMotion()

  const items = useMemo(() => {
    if (filter === 'all') return portfolioItems
    return portfolioItems.filter((item) => item.category === filter)
  }, [filter])

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active])

  return (
    <>
      <Section
        id="portfolio"
        eyebrow="Портфолио"
        title="Примеры работ"
        description="Реальные проекты с ориентиром по цене. Нажмите на карточку, чтобы открыть детали."
        className="border-y border-border/60 bg-surface/40"
      >
        <Reveal className="mb-6 flex flex-wrap gap-2" role="tablist" aria-label="Фильтр портфолио">
          {portfolioFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                'relative rounded-chip border px-3.5 py-1.5 font-mono text-sm transition-colors',
                filter === f.id
                  ? 'border-accent bg-accent text-white'
                  : 'border-border bg-transparent text-subtle hover:border-accent/40 hover:text-fg',
              )}
            >
              {f.label}
            </button>
          ))}
        </Reveal>

        <motion.div
          layout
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                layout={!prefersReduced}
                initial={prefersReduced ? false : { opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  prefersReduced
                    ? { opacity: 0 }
                    : { opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.18 } }
                }
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : {
                        duration: 0.35,
                        delay: Math.min(i * 0.035, 0.28),
                        ease: easeOut,
                        layout: { duration: 0.28, ease: easeOut },
                      }
                }
                onClick={() => setActive(item)}
                className="group flex h-full flex-col overflow-hidden rounded-card border border-border bg-surface/85 text-left transition-colors duration-200 hover:border-accent/40"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-elevated">
                  <img
                    src={asset(item.image)}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <span className="absolute bottom-2 right-2">
                    <Badge tone="price" className="tabular text-sm">
                      {item.price}
                    </Badge>
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="display text-lg text-fg">{item.title}</h3>
                  <p className="mt-1.5 line-clamp-2 flex-1 text-base leading-relaxed text-subtle">
                    {item.summary}
                  </p>
                  <div className="mt-3.5 flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} className="font-mono">
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 3 && (
                      <Badge tone="muted">+{item.tags.length - 3}</Badge>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/75 p-4 backdrop-blur-sm sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-modal-title"
            onClick={() => setActive(null)}
            initial={prefersReduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReduced ? undefined : { opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.22 }}
          >
            <motion.div
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-card border border-border bg-surface shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              initial={
                prefersReduced
                  ? false
                  : { opacity: 0, y: 28, scale: 0.97 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReduced
                  ? undefined
                  : { opacity: 0, y: 16, scale: 0.98 }
              }
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { ...springSoft, opacity: { duration: 0.2 } }
              }
            >
              <div className="relative aspect-[16/9] bg-elevated">
                <img
                  src={asset(active.image)}
                  alt={active.title}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-chip border border-white/10 bg-black/65 text-white backdrop-blur-sm hover:bg-black/85"
                  aria-label="Закрыть"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-5 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <h3 id="portfolio-modal-title" className="display text-xl text-fg sm:text-2xl">
                    {active.title}
                  </h3>
                  <Badge tone="price" className="tabular shrink-0 text-sm">
                    {active.price}
                  </Badge>
                </div>
                <p className="mt-3 text-base leading-relaxed text-subtle sm:text-lg">
                  {active.description}
                </p>
                <div className="mt-5">
                  <p className="spec-label mb-2">Технологии</p>
                  <div className="flex flex-wrap gap-1.5">
                    {active.tags.map((tag) => (
                      <Badge key={tag} className="font-mono">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
