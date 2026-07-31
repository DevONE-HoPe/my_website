import { useEffect } from 'react'

/* Сколько замков сейчас висит: модалка портфолио и мобильное меню могут пересечься */
let locks = 0

/**
 * Блокирует скролл страницы, не давая контенту прыгнуть.
 *
 * Скрытый overflow убирает системный скроллбар, и вёрстка расширяется на его
 * ширину — из-за этого заголовки и шапка дёргаются вбок. Компенсируем разницу
 * padding-ом, замеряя её уже после блокировки: если браузер поддерживает
 * scrollbar-gutter, разницы не будет и padding не добавится.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    const { body, documentElement: html } = document

    locks += 1
    if (locks === 1) {
      /* Меряем именно body: html.clientWidth не учитывает scrollbar-gutter
         и даёт ложную разницу, из-за которой вёрстку уводит в другую сторону */
      const widthBefore = body.getBoundingClientRect().width
      body.style.overflow = 'hidden'
      const gap = Math.round(body.getBoundingClientRect().width - widthBefore)
      if (gap > 0) {
        body.style.paddingRight = `${gap}px`
        /* Шапка position: fixed — её padding body не достаёт */
        html.style.setProperty('--scrollbar-gap', `${gap}px`)
      }
    }

    return () => {
      locks -= 1
      if (locks === 0) {
        body.style.overflow = ''
        body.style.paddingRight = ''
        html.style.removeProperty('--scrollbar-gap')
      }
    }
  }, [locked])
}
