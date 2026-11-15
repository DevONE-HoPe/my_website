import { useEffect } from 'react'
import type { Lang } from '../i18n/lang'
import { seo } from '../i18n/seo.ts'
import { ui } from '../i18n/ui'

const TYPE_MS = 110
const ERASE_MS = 55
const HOLD_MS = 1800
const CURSOR = '█'

const DESKTOP_QUERY = '(min-width: 1024px) and (hover: hover) and (pointer: fine)'
const MOBILE_UA =
  /Android|webOS|iPhone|iPad|iPod|Mobile|Tablet|Silk|Kindle|PlayBook|BlackBerry|Opera Mini|IEMobile/i

/** Телефоны и планшеты вкладку с заголовком не показывают — анимация только для десктопа. */
function isDesktop() {
  if (typeof window === 'undefined') return false
  if (MOBILE_UA.test(navigator.userAgent)) return false
  // iPadOS 13+ представляется как macOS, отличаем по тач-поинтам
  if (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent)) return false
  return window.matchMedia(DESKTOP_QUERY).matches
}

function onResumePage() {
  const h = window.location.hash
  return h === '#resume' || h.startsWith('#resume/')
}

/**
 * Печатает document.title по буквам, перебирая специализации.
 * Работает только на ПК и уважает prefers-reduced-motion.
 * Вне анимации держит обычный заголовок на текущем языке; на странице резюме
 * заголовок ставит само резюме.
 */
export function useAnimatedTitle(lang: Lang) {
  useEffect(() => {
    const baseTitle = seo[lang].title
    const { titlePrefix, titlePhrases } = ui[lang].meta
    const media = window.matchMedia(DESKTOP_QUERY)
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    let timer = 0

    const stop = () => {
      window.clearTimeout(timer)
      timer = 0
    }

    const start = () => {
      let phrase = 0
      let chars = 0
      let erasing = false

      const tick = () => {
        const text = titlePhrases[phrase]
        document.title = titlePrefix + text.slice(0, chars) + CURSOR

        let delay = erasing ? ERASE_MS : TYPE_MS

        if (!erasing && chars === text.length) {
          erasing = true
          delay = HOLD_MS
        } else if (erasing && chars === 0) {
          erasing = false
          phrase = (phrase + 1) % titlePhrases.length
          delay = TYPE_MS * 3
        } else {
          chars += erasing ? -1 : 1
        }

        timer = window.setTimeout(tick, delay)
      }

      tick()
    }

    const sync = () => {
      const resume = onResumePage()
      const shouldRun = isDesktop() && !reduceMotion.matches && !resume

      if (shouldRun && !timer) start()
      else if (!shouldRun && timer) stop()
      if (!shouldRun && !resume) document.title = baseTitle
    }

    sync()

    media.addEventListener('change', sync)
    reduceMotion.addEventListener('change', sync)
    window.addEventListener('hashchange', sync)

    return () => {
      media.removeEventListener('change', sync)
      reduceMotion.removeEventListener('change', sync)
      window.removeEventListener('hashchange', sync)
      stop()
    }
  }, [lang])
}
