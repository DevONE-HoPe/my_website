import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Menu, Send, Terminal, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { navLinks, profile } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { asset } from '../lib/asset'
import { cn } from '../lib/cn'
import { track } from '../lib/track'
import { easeOut } from './motion/variants'
import { Button } from './ui/Button'

const MOBILE_ORBS = [
  {
    src: 'autodonate/cover.webp',
    className: '-left-6 top-[10%] h-32 w-32 sm:left-4 sm:h-36 sm:w-36',
    style: { '--orb-x': '12px', '--orb-y': '-16px', '--orb-rot': '-10deg' },
  },
  {
    src: 'turbommr/cover.webp',
    className: '-right-8 top-[8%] h-28 w-28 sm:right-6 sm:h-32 sm:w-32',
    style: { '--orb-x': '-10px', '--orb-y': '14px', '--orb-rot': '12deg' },
  },
  {
    src: 'predict_bot/cover.webp',
    className: '-left-10 bottom-[12%] h-28 w-28 sm:left-2 sm:h-32 sm:w-32',
    style: { '--orb-x': '14px', '--orb-y': '10px', '--orb-rot': '8deg' },
  },
  {
    src: 'tarot_bot/cover.webp',
    className: '-right-6 bottom-[10%] h-32 w-32 sm:right-4 sm:h-36 sm:w-36',
    style: { '--orb-x': '-12px', '--orb-y': '-12px', '--orb-rot': '-14deg' },
  },
  {
    src: 'profile-256.webp',
    className: 'left-1 top-[44%] h-20 w-20 sm:left-8 sm:h-24 sm:w-24',
    style: { '--orb-x': '8px', '--orb-y': '-10px', '--orb-rot': '6deg' },
  },
  {
    src: 'parser_de/cover.webp',
    className: 'right-2 top-[42%] h-16 w-16 sm:right-10 sm:h-20 sm:w-20',
    style: { '--orb-x': '-8px', '--orb-y': '12px', '--orb-rot': '9deg' },
  },
] as const

/** bounce: 0 — без раскачки влево-вправо. */
const pillTransition = { type: 'spring' as const, bounce: 0, duration: 0.35 }

type PillBox = { x: number; y: number; width: number; height: number; instant: boolean }

/**
 * Одна постоянная пилюля под активной вкладкой.
 *
 * Не layoutId: shared layout меряет элементы относительно документа, и при быстрых
 * кликах во время smooth-scroll пилюля иногда влетала сверху или снизу. Здесь
 * координаты считаются от острова навбара — оба внутри fixed-шапки, скролл
 * страницы на них не влияет, анимируются только x/y/width/height.
 */
function useNavPill(active: string) {
  const islandRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef(new Map<string, HTMLAnchorElement>())
  const activeRef = useRef(active)
  const [box, setBox] = useState<PillBox | null>(null)

  const measure = useCallback((instant: boolean) => {
    const island = islandRef.current
    const link = linksRef.current.get(activeRef.current)
    /* Вкладка скрыта (мобильная ширина) — пилюлю не рисуем */
    if (!island || !link || link.getClientRects().length === 0) {
      setBox(null)
      return
    }
    const i = island.getBoundingClientRect()
    const l = link.getBoundingClientRect()
    setBox({
      x: l.left - i.left - island.clientLeft,
      y: l.top - i.top - island.clientTop,
      width: l.width,
      height: l.height,
      instant,
    })
  }, [])

  useLayoutEffect(() => {
    activeRef.current = active
    measure(false)
  }, [active, measure])

  useEffect(() => {
    const island = islandRef.current
    if (!island) return
    /* Ресайз окна и догрузка шрифта меняют ширину вкладок — подгоняем без анимации */
    const ro = new ResizeObserver(() => measure(true))
    ro.observe(island)
    linksRef.current.forEach((el) => ro.observe(el))
    return () => ro.disconnect()
  }, [measure])

  const linkRef = (href: string) => (el: HTMLAnchorElement | null) => {
    if (el) linksRef.current.set(href, el)
    else linksRef.current.delete(href)
  }

  return { islandRef, linkRef, box }
}

function NavPill({ box, reduced }: { box: PillBox | null; reduced: boolean | null }) {
  if (!box) return null
  return (
    <motion.span
      aria-hidden
      className="nav-active-pill pointer-events-none absolute top-0 left-0 rounded-full"
      initial={false}
      animate={{ x: box.x, y: box.y, width: box.width, height: box.height }}
      transition={reduced || box.instant ? { duration: 0 } : pillTransition}
    />
  )
}

function NavItem({
  href,
  active,
  linkRef,
  children,
}: {
  href: string
  active: boolean
  linkRef: (el: HTMLAnchorElement | null) => void
  children: ReactNode
}) {
  return (
    <a
      ref={linkRef}
      href={href}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'relative z-10 inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
        active ? 'text-white' : 'text-subtle hover:text-fg',
      )}
    >
      {children}
    </a>
  )
}

export function Navbar() {
  const [open, setOpen] = useState(false)
  const prefersReduced = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const active = useActiveSection()
  const pill = useNavPill(active)

  useBodyScrollLock(open)

  useEffect(() => {
    if (isDesktop) setOpen(false)
  }, [isDesktop])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed-gutter fixed inset-x-0 top-0 z-50 bg-bg">
      <div
        className={cn(
          'relative mx-auto w-full max-w-[72rem] px-3 sm:px-6 lg:px-8',
          'pt-[max(0.35rem,env(safe-area-inset-top))] pb-2.5',
          open ? 'hidden lg:flex' : 'flex',
        )}
      >
        <div
          ref={pill.islandRef}
          className="nav-island relative flex h-14 w-full items-center justify-between rounded-full px-1.5 lg:px-2"
        >
          <NavPill box={pill.box} reduced={prefersReduced} />
            <a
              ref={pill.linkRef('#home')}
              href="#home"
              aria-current={active === '#home' ? 'page' : undefined}
              className={cn(
                'relative z-10 flex items-center gap-2 rounded-full py-1 pr-3 pl-1 transition-colors',
                active === '#home' ? 'text-white' : 'text-fg hover:text-fg',
              )}
            >
              <span
                className={cn(
                  'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border transition-colors',
                  active === '#home'
                    ? 'border-white/35 bg-white/15 text-white'
                    : 'border-accent/55 bg-accent/20 text-accent-soft',
                )}
              >
                <Terminal size={15} strokeWidth={2.5} aria-hidden="true" />
              </span>
              <span className="display relative z-10 text-[0.95rem]">{profile.name}</span>
            </a>

            <nav
              className="relative z-10 hidden items-center gap-0.5 lg:flex"
              aria-label="Основная навигация"
            >
              {navLinks.map((link) => (
                <NavItem
                  key={link.href}
                  href={link.href}
                  active={active === link.href}
                  linkRef={pill.linkRef(link.href)}
                >
                  {link.label}
                </NavItem>
              ))}
            </nav>

          <div className="relative z-10 flex items-center gap-1">
            <Button
              href={profile.telegram}
              external
              onClick={() => track('telegram_click', { place: 'navbar' })}
              className="hidden h-10 !rounded-full !bg-white px-4 !py-0 !text-sm !text-[#111] !shadow-none hover:!bg-neutral-200 sm:inline-flex"
            >
              <Send size={14} strokeWidth={2.4} aria-hidden="true" />
              Написать
            </Button>

            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-fg transition-colors hover:bg-white/10 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      <div className="nav-fade pointer-events-none absolute inset-x-0 top-full h-8" aria-hidden />

      <AnimatePresence>
        {open && (
          <MobileMenu
            active={active}
            reduced={prefersReduced}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  )
}

function MobileMenu({
  active,
  reduced,
  onClose,
}: {
  active: string
  reduced: boolean | null
  onClose: () => void
}) {
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Меню"
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reduced ? undefined : { opacity: 0 }}
      transition={reduced ? { duration: 0 } : { duration: 0.22, ease: easeOut }}
      className="fixed inset-0 z-50 overflow-hidden bg-[#050505]/90 backdrop-blur-md lg:hidden"
    >
      {MOBILE_ORBS.map((orb, i) => (
        <motion.div
          key={orb.src}
          initial={reduced ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, scale: 0.9 }}
          transition={
            reduced
              ? { duration: 0 }
              : { delay: 0.05 + i * 0.04, duration: 0.35, ease: easeOut }
          }
          className={cn(
            'nav-orb pointer-events-none absolute overflow-hidden rounded-full border border-white/15 shadow-[0_18px_40px_rgba(0,0,0,0.55)]',
            orb.className,
          )}
          style={{
            ...orb.style,
            animationDelay: `${i * 0.35}s`,
          }}
        >
          <img
            src={asset(orb.src)}
            alt=""
            className="h-full w-full object-cover"
            draggable={false}
          />
        </motion.div>
      ))}

      <div className="relative flex h-full flex-col items-center justify-center px-5 py-[max(4.5rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-[max(0.75rem,env(safe-area-inset-top))] z-20 inline-flex h-10 items-center gap-2 rounded-full border border-white/12 bg-[#171717] px-4 text-sm font-medium text-fg shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
        >
          <X size={16} />
          Закрыть
        </button>

        <motion.nav
          initial={reduced ? false : { opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? undefined : { opacity: 0, y: 10, scale: 0.98 }}
          transition={reduced ? { duration: 0 } : { duration: 0.32, ease: easeOut }}
          aria-label="Мобильная навигация"
          className="nav-island relative z-10 w-full max-w-[19.5rem] overflow-y-auto rounded-[1.75rem] px-5 py-5 sm:max-w-sm"
        >
          <p className="mb-3 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted">
            Меню
          </p>
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => {
              const isActive = active === link.href
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    window.location.hash = link.href
                    window.setTimeout(onClose, 0)
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  initial={reduced ? false : { opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={
                    reduced
                      ? { duration: 0 }
                      : { delay: 0.06 + i * 0.035, duration: 0.28, ease: easeOut }
                  }
                  className={cn(
                    'display rounded-2xl px-3 py-2.5 text-2xl leading-tight transition-colors',
                    isActive
                      ? 'bg-accent text-white shadow-[0_10px_24px_-8px_rgba(59,130,246,0.8)]'
                      : 'text-fg/90 hover:bg-white/5',
                  )}
                >
                  {link.label}
                </motion.a>
              )
            })}
          </div>

          <Button
            href={profile.telegram}
            external
            onClick={() => {
              track('telegram_click', { place: 'navbar_mobile' })
              onClose()
            }}
            className="mt-5 w-full !rounded-full !bg-white !text-[#111] !shadow-none hover:!bg-neutral-200"
          >
            <Send size={16} strokeWidth={2.4} />
            Написать в Telegram
          </Button>
        </motion.nav>
      </div>
    </motion.div>
  )
}
