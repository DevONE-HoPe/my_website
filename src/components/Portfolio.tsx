import { useEffect, useMemo, useRef, useState } from 'react'
import { Check, Link2, Maximize2, Send, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  portfolioFilters,
  portfolioItems,
  type PortfolioItem,
} from '../data/portfolio'
import { profile } from '../data/content'
import { Section } from './ui/Section'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { Pagination } from './ui/Pagination'
import { LightboxPortal } from './ui/Lightbox'
import { cn } from '../lib/cn'
import { asset } from '../lib/asset'
import { track } from '../lib/track'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { Reveal } from './motion/Reveal'
import { easeOut, springSoft } from './motion/variants'

/* На телефоне сетка в одну колонку, и все работы подряд — это очень длинная
   лента. Режем её на страницы; с sm и шире карточки идут в 2–3 колонки, там
   пагинация не нужна и список показывается целиком. */
const MOBILE_PAGE_SIZE = 5

/**
 * Ссылка в Telegram с уже готовым первым сообщением.
 *
 * Человек смотрит конкретную работу — это лучший момент, чтобы написать, и
 * заодно единственный, когда ещё известно, какая работа его зацепила. Дальше
 * этот контекст теряется: в общем блоке контактов приходит просто «здравствуйте».
 *
 * Параметр text подхватывают не все клиенты Telegram; там, где он не сработает,
 * просто откроется диалог с пустым полем ввода — как у кнопки в контактах.
 */
function telegramLinkFor(item: PortfolioItem) {
  const text = `Здравствуйте! Смотрю работу «${item.title}» в портфолио — хочу похожий проект. Обсудим?`
  return `${profile.telegram}?text=${encodeURIComponent(text)}`
}

/* Каждая работа получает свой адрес: сайт одностраничный, роутера нет, поэтому
   держим состояние модалки в хеше — этого хватает и для ссылки, и для истории */
const HASH_PREFIX = '#work-'

function itemFromHash(): PortfolioItem | null {
  const { hash } = window.location
  if (!hash.startsWith(HASH_PREFIX)) return null
  const id = decodeURIComponent(hash.slice(HASH_PREFIX.length))
  return portfolioItems.find((item) => item.id === id) ?? null
}

export function Portfolio() {
  const [filter, setFilter] = useState<(typeof portfolioFilters)[number]['id']>('all')
  /* Ссылка вида /#work-ai-predictions открывает работу сразу при загрузке */
  const [active, setActive] = useState<PortfolioItem | null>(itemFromHash)
  const [zoomIndex, setZoomIndex] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const [page, setPage] = useState(1)
  const prefersReduced = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 639px)')
  const gridRef = useRef<HTMLDivElement>(null)

  const items = useMemo(() => {
    if (filter === 'all') return portfolioItems
    return portfolioItems.filter((item) => item.category === filter)
  }, [filter])

  const totalPages = isMobile ? Math.ceil(items.length / MOBILE_PAGE_SIZE) : 1
  /* Фильтр мог укоротить список сильнее, чем текущая страница: пока состояние
     не сброшено эффектом, считаем по безопасному значению, а не по пустоте */
  const safePage = Math.min(page, Math.max(totalPages, 1))

  const visibleItems = useMemo(() => {
    if (!isMobile) return items
    const start = (safePage - 1) * MOBILE_PAGE_SIZE
    return items.slice(start, start + MOBILE_PAGE_SIZE)
  }, [items, isMobile, safePage])

  /* Смена фильтра — всегда с первой страницы */
  useEffect(() => {
    setPage(1)
  }, [filter])

  const goToPage = (next: number) => {
    setPage(next)
    /* Иначе после перелистывания пользователь оказывается в конце новой
       страницы — возвращаем его к первой карточке */
    gridRef.current?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    })
  }

  const rangeStart = (safePage - 1) * MOBILE_PAGE_SIZE + 1
  const rangeEnd = rangeStart + visibleItems.length - 1

  /* У любой работы есть галерея — как минимум из одной обложки */
  const gallery = useMemo(
    () => (active ? (active.gallery ?? [active.image]).map(asset) : []),
    [active],
  )

  useBodyScrollLock(active !== null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      /* Esc при открытом просмотре закрывает только просмотр */
      if (e.key === 'Escape' && zoomIndex === null) setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, zoomIndex])

  /* Под #work-… браузеру нечего искать — до секции доводим сами, чтобы
     за закрытой карточкой оказалось портфолио, а не верх страницы */
  useEffect(() => {
    if (itemFromHash()) document.getElementById('portfolio')?.scrollIntoView()
  }, [])

  /* Кнопка «назад» закрывает карточку, а не уводит с сайта */
  useEffect(() => {
    const onPop = () => {
      setZoomIndex(null)
      setActive(itemFromHash())
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const openItem = (item: PortfolioItem) => {
    setActive(item)
    track('work_open', { work: item.id })
    window.history.pushState({ work: item.id }, '', HASH_PREFIX + item.id)
  }

  const closeModal = () => {
    setZoomIndex(null)
    setActive(null)
    if (window.history.state?.work) {
      /* Свою же запись в истории и снимаем — popstate доедет до того же null */
      window.history.back()
    } else {
      /* Заход был сразу по ссылке: назад тут некуда, просто чистим адрес */
      const { pathname, search } = window.location
      window.history.replaceState(null, '', pathname + search)
    }
  }

  /* Значок «скопировано» гаснет сам */
  useEffect(() => {
    if (!copied) return
    const id = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(id)
  }, [copied])

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      if (active) track('work_copy_link', { work: active.id })
    } catch {
      /* Без https и разрешения буфера обмена нет — молча оставляем как было */
    }
  }

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
              onClick={() => {
                setFilter(f.id)
                track('portfolio_filter', { filter: f.id })
              }}
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
          ref={gridRef}
          layout
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visibleItems.map((item, i) => (
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
                onClick={() => openItem(item)}
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

        {isMobile && (
          <Pagination
            page={safePage}
            totalPages={totalPages}
            onChange={goToPage}
            summary={`${rangeStart}–${rangeEnd} из ${items.length}`}
            className="mt-7"
          />
        )}
      </Section>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/75 p-4 backdrop-blur-sm sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-modal-title"
            onClick={closeModal}
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
                <button
                  type="button"
                  onClick={() => setZoomIndex(0)}
                  className="group/zoom block h-full w-full cursor-zoom-in"
                  aria-label={`${active.title} — открыть изображение`}
                >
                  <img
                    src={asset(active.image)}
                    alt={active.title}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-chip border border-white/12 bg-black/65 px-2.5 py-1 font-mono text-xs text-white/85 backdrop-blur-sm transition-colors group-hover/zoom:border-accent/50">
                    <Maximize2 size={13} />
                    {gallery.length > 1 ? `${gallery.length} скрина` : 'Увеличить'}
                  </span>
                </button>
                <div className="absolute right-3 top-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyLink}
                    className="inline-flex h-9 items-center gap-1.5 rounded-chip border border-white/10 bg-black/65 px-3 font-mono text-xs text-white backdrop-blur-sm transition-colors hover:bg-black/85"
                    aria-label="Скопировать ссылку на работу"
                  >
                    {copied ? <Check size={15} className="text-accent" /> : <Link2 size={15} />}
                    {copied ? 'Скопировано' : 'Ссылка'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-chip border border-white/10 bg-black/65 text-white backdrop-blur-sm hover:bg-black/85"
                    aria-label="Закрыть"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {gallery.length > 1 && (
                <div className="flex gap-2 overflow-x-auto border-b border-border/60 bg-elevated/40 p-3">
                  {gallery.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setZoomIndex(i)}
                      aria-label={`Открыть скриншот ${i + 1}`}
                      className="h-16 w-24 shrink-0 cursor-zoom-in overflow-hidden rounded-chip border border-border bg-bg transition-colors hover:border-accent/50"
                    >
                      <img
                        src={src}
                        alt={`${active.title} — скриншот ${i + 1}`}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
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

                <div className="mt-6 border-t border-border pt-5">
                  <Button
                    href={telegramLinkFor(active)}
                    external
                    className="w-full"
                    onClick={() => {
                      track('work_cta_click', { work: active.id })
                      track('telegram_click', { place: 'work_modal' })
                    }}
                  >
                    <Send size={16} />
                    Хочу такой же проект
                  </Button>
                  <p className="mt-2.5 text-center text-sm text-muted">
                    Откроется Telegram — название работы уже будет в сообщении
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <LightboxPortal
        open={active !== null && zoomIndex !== null}
        images={gallery}
        index={zoomIndex ?? 0}
        title={active?.title ?? ''}
        onIndexChange={setZoomIndex}
        onClose={() => setZoomIndex(null)}
      />
    </>
  )
}
