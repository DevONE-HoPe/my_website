import { useEffect, useRef, useState } from 'react'
import { isResumeHash } from '../data/resume'
import { useHash } from './useHash'

/** Секции главной, которые есть в навбаре или являются «домом». */
const SECTIONS = [
  'home',
  'about',
  'services',
  'portfolio',
  'process',
  'faq',
  'contact',
] as const

const LAST = SECTIONS[SECTIONS.length - 1]
/** Линия под шапкой: секция, которая её пересекла, считается текущей. */
const LINE = 128
/** Запас, с которого считаем «доскроллили до конца страницы». */
const BOTTOM_EPS = 120
/** Столько тишины после последнего scroll-события — и плавная прокрутка закончилась. */
const SCROLL_IDLE = 160
/** Клавиши, которыми пользователь крутит страницу сам. */
const SCROLL_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
])

function sectionFromHash(hash: string): string | null {
  if (isResumeHash(hash)) return '#resume'
  if (hash.startsWith('#work-')) return '#portfolio'
  const id = hash.replace(/^#/, '').split('/')[0]
  if ((SECTIONS as readonly string[]).includes(id)) return `#${id}`
  return null
}

function sectionFromScroll(): string {
  const viewH = window.innerHeight
  const maxScroll = document.documentElement.scrollHeight - viewH
  const atBottom = maxScroll <= 0 || window.scrollY >= maxScroll - BOTTOM_EPS

  /* Последняя секция короче экрана — её верх никогда не доезжает до LINE.
     Если доскроллили вниз или она уже в верхней половине, это она. */
  const lastEl = document.getElementById(LAST)
  if (lastEl) {
    const top = lastEl.getBoundingClientRect().top
    if (atBottom || top <= viewH * 0.55) return `#${LAST}`
  }

  let current = '#home'
  for (const id of SECTIONS) {
    const el = document.getElementById(id)
    if (!el) continue
    if (el.getBoundingClientRect().top - LINE <= 0) current = `#${id}`
  }
  return current
}

/**
 * Какая секция сейчас под шапкой.
 *
 * Клик по якорю сразу красит вкладку и «пинит» её: пока идёт smooth-scroll
 * (в том числе прерванный следующим быстрым кликом), скролл подсветку не трогает —
 * иначе пилюля пробегает по всем промежуточным секциям и дёргается.
 * Пин снимается, когда прокрутка затихла, но и тогда вкладка остаётся той,
 * что выбрали кликом. Скролл снова ведёт, как только пользователь крутит сам.
 */
export function useActiveSection() {
  const hash = useHash()
  const [active, setActive] = useState(() => sectionFromHash(hash) ?? '#home')
  const pinRef = useRef<string | null>(sectionFromHash(hash))
  /* После клика не пересчитываем секцию, пока пользователь сам не прокрутит. */
  const heldRef = useRef(pinRef.current !== null)
  const resumeRef = useRef(isResumeHash(hash))

  useEffect(() => {
    resumeRef.current = isResumeHash(hash)
    const hashed = sectionFromHash(hash)
    if (hashed) {
      pinRef.current = hashed
      heldRef.current = true
      setActive(hashed)
    }
  }, [hash])

  useEffect(() => {
    let idle = 0

    const pin = (section: string) => {
      window.clearTimeout(idle)
      pinRef.current = section
      heldRef.current = true
      setActive(section)
    }

    const release = () => {
      window.clearTimeout(idle)
      pinRef.current = null
      heldRef.current = false
    }

    const onScroll = () => {
      if (resumeRef.current) return
      if (pinRef.current) {
        /* Программная прокрутка ещё идёт — ждём, пока затихнет */
        window.clearTimeout(idle)
        idle = window.setTimeout(() => {
          pinRef.current = null
        }, SCROLL_IDLE)
        return
      }
      if (heldRef.current) return
      setActive(sectionFromScroll())
    }

    const onResize = () => {
      if (resumeRef.current || pinRef.current || heldRef.current) return
      setActive(sectionFromScroll())
    }

    /* Клик по той же вкладке не меняет hash и не шлёт hashchange — ловим сам клик */
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]')
      if (!link) return
      const section = sectionFromHash(link.getAttribute('href') ?? '')
      if (section && section !== '#resume') pin(section)
    }

    const onKey = (e: KeyboardEvent) => {
      if (!SCROLL_KEYS.has(e.key)) return
      const t = e.target as HTMLElement | null
      if (t?.closest('input, textarea, select, [contenteditable="true"]')) return
      release()
    }

    /* Нажатие на системный скроллбар приходит с target = <html> */
    const onPointer = (e: PointerEvent) => {
      if (e.target === document.documentElement) release()
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    window.addEventListener('wheel', release, { passive: true })
    window.addEventListener('touchmove', release, { passive: true })
    window.addEventListener('keydown', onKey)
    window.addEventListener('pointerdown', onPointer)
    document.addEventListener('click', onClick)

    return () => {
      window.clearTimeout(idle)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('wheel', release)
      window.removeEventListener('touchmove', release)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return active
}
