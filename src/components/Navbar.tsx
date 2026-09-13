import { useEffect, useState } from 'react'
import { Menu, Terminal, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { navLinks, profile } from '../data/content'
import { isResumeHash } from '../data/resume'
import { useHash } from '../hooks/useHash'
import { Button } from './ui/Button'
import { cn } from '../lib/cn'
import { track } from '../lib/track'
import { easeOut } from './motion/variants'
import { useBodyScrollLock } from '../hooks/useBodyScrollLock'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const prefersReduced = useReducedMotion()
  const hash = useHash()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useBodyScrollLock(open)

  return (
    <header className="fixed-gutter pointer-events-none fixed inset-x-0 top-0 z-50 pt-3">
      <div className="container-page pointer-events-auto">
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={prefersReduced ? { duration: 0 } : { duration: 0.4, ease: easeOut }}
          className={cn(
            'glass relative flex h-14 items-center justify-between rounded-card px-2.5 pl-3.5 transition-shadow duration-300',
            scrolled && 'glass-strong',
          )}
        >
          <a href="#home" className="group relative z-10 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-chip border border-accent/60 bg-accent/25 text-accent-soft shadow-[0_0_16px_rgba(59,130,246,0.28)] transition-colors group-hover:bg-accent/35">
              <Terminal size={16} strokeWidth={2.5} aria-hidden="true" />
            </span>
            <span className="display text-legible text-base text-fg">{profile.name}</span>
          </a>

          <nav
            className="relative z-10 hidden items-center gap-0.5 lg:flex"
            aria-label="Основная навигация"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'text-legible rounded-chip px-3 py-2 text-[0.95rem] font-medium transition-colors hover:bg-accent/20 hover:text-fg',
                  link.href === '#resume' && isResumeHash(hash)
                    ? 'bg-accent/20 text-fg'
                    : 'text-fg/85',
                )}
              >
                {link.label}
              </a>
            ))}
            <Button
              href={profile.telegram}
              external
              className="ml-2 !py-2 !text-sm"
              onClick={() => track('telegram_click', { place: 'navbar' })}
            >
              Написать
            </Button>
          </nav>

          <button
            type="button"
            className="relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-chip border border-white/20 bg-white/10 text-fg transition-colors hover:bg-white/15 lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={prefersReduced ? undefined : { opacity: 0, y: -6, height: 0 }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { duration: 0.25, ease: easeOut }
              }
              className="glass-strong mt-2 overflow-hidden rounded-card lg:hidden"
            >
              <nav className="flex flex-col p-2" aria-label="Мобильная навигация">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={prefersReduced ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={
                      prefersReduced
                        ? { duration: 0 }
                        : { delay: 0.04 + i * 0.03, duration: 0.25, ease: easeOut }
                    }
                    className="text-legible rounded-chip px-4 py-3 text-base font-medium text-fg/85 transition-colors hover:bg-accent/20 hover:text-fg"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <a
                  href={profile.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    track('telegram_click', { place: 'navbar_mobile' })
                    setOpen(false)
                  }}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-control bg-accent px-5 py-3 text-base font-semibold text-[#1a1005]"
                >
                  Написать в Telegram
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
