import { useEffect, useState } from 'react'
import { ArrowRight, Send } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/content'
import { track } from '../lib/track'
import { Button } from './ui/Button'
import { easeOut, fadeUp, staggerContainer, tweenOut } from './motion/variants'

/** Короткие фразы — каждая влезает в одну строку заголовка, поэтому блок не меняет высоту */
const ROTATING = [
  'Telegram-боты',
  'Mini Apps',
  'парсеры 24/7',
  'ИИ-агенты',
  'Android и iOS',
]

const SPEC = [
  { label: 'Локация', value: profile.location },
  { label: 'Опыт', value: profile.experience },
  { label: 'Фокус', value: 'AI + Telegram' },
  { label: 'Проектов', value: '18+' },
  { label: 'Формат', value: 'от идеи до деплоя' },
]

export function Hero() {
  const [index, setIndex] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING.length)
    }, 2800)
    return () => window.clearInterval(id)
  }, [prefersReduced])

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-12 sm:pt-32 sm:pb-16">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-70" aria-hidden />
      <div
        className="hero-glow pointer-events-none absolute -top-24 left-[15%] h-[360px] w-[620px] rounded-full bg-accent/12 blur-[110px]"
        aria-hidden
      />

      <div className="container-page relative">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={prefersReduced ? undefined : staggerContainer(0.08, 0.05)}
          >
            <motion.p
              variants={prefersReduced ? undefined : fadeUp}
              transition={tweenOut(0.4)}
              className="spec-label mb-5 before:hidden"
            >
              <span
                className="dot-live inline-block h-1.5 w-1.5 rounded-full bg-amber"
                aria-hidden
              />
              Доступен к заказам
            </motion.p>

            <motion.h1
              variants={prefersReduced ? undefined : fadeUp}
              transition={tweenOut(0.45)}
              className="display text-4xl text-fg sm:text-5xl lg:text-[3.4rem]"
            >
              Продукты под ключ:
              <span className="relative mt-1.5 grid overflow-hidden pb-[0.12em] text-accent-soft">
                {ROTATING.map((phrase) => (
                  <span
                    key={phrase}
                    className="invisible col-start-1 row-start-1 block"
                    aria-hidden
                  >
                    {phrase}
                  </span>
                ))}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={ROTATING[index]}
                    initial={prefersReduced ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReduced ? undefined : { opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: easeOut }}
                    className="col-start-1 row-start-1 block"
                  >
                    {ROTATING[index]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </motion.h1>

            <motion.p
              variants={prefersReduced ? undefined : fadeUp}
              transition={tweenOut(0.45)}
              className="mt-5 max-w-xl text-base leading-relaxed text-subtle sm:text-lg"
            >
              Я {profile.name} — {profile.role}. Веду проект самостоятельно: архитектура,
              код, деплой и поддержка после запуска.
            </motion.p>

            <motion.div
              variants={prefersReduced ? undefined : fadeUp}
              transition={tweenOut(0.45)}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <Button
                href={profile.telegram}
                external
                onClick={() => track('telegram_click', { place: 'hero' })}
              >
                <Send size={16} />
                Обсудить задачу
              </Button>
              <Button href="#portfolio" variant="secondary">
                Смотреть портфолио
                <ArrowRight size={16} />
              </Button>
            </motion.div>
          </motion.div>

          <motion.dl
            initial={prefersReduced ? false : { opacity: 0, y: 18, x: 8 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={prefersReduced ? { duration: 0 } : tweenOut(0.55, 0.18)}
            className="rounded-card border border-border bg-surface/70 p-4 backdrop-blur-sm sm:p-5"
          >
            {SPEC.map((row, i) => (
              <motion.div
                key={row.label}
                initial={prefersReduced ? false : { opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : tweenOut(0.35, 0.28 + i * 0.05)
                }
                className="flex items-baseline justify-between gap-4 border-b border-border/70 py-2.5 last:border-0 last:pb-0 first:pt-0"
              >
                <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  {row.label}
                </dt>
                <dd className="tabular text-right text-base font-medium text-fg">
                  {row.value}
                </dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>
      </div>
    </section>
  )
}
