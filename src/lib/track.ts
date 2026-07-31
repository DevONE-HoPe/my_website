/**
 * Одно событие — сразу в Google Analytics и в Яндекс.Метрику.
 *
 * Оба счётчика подключены в index.html и до сих пор считали только заходы:
 * сколько людей пришло, видно, а что они делали — нет. Отсюда не понять, какие
 * работы вообще открывают и какая из кнопок «написать» реально приводит заявки.
 *
 * Счётчик мог не загрузиться — блокировщик, оффлайн, ошибка сети. Это норма:
 * вызовы необязательные, аналитика молча пропускается и ничего не ломает.
 */

declare global {
  interface Window {
    gtag?: (command: string, event: string, params?: Record<string, string>) => void
    ym?: (id: number, action: string, goal: string, params?: Record<string, string>) => void
  }
}

/* Тот же номер счётчика, что и в index.html */
const YM_COUNTER = 102742700

export type TrackEvent =
  /** Открыли карточку работы */
  | 'work_open'
  /** Из карточки работы нажали «Хочу такой же проект» */
  | 'work_cta_click'
  /** Скопировали ссылку на работу */
  | 'work_copy_link'
  /** Переключили фильтр в портфолио */
  | 'portfolio_filter'
  /** Ушли в Telegram — параметр place говорит, из какого блока */
  | 'telegram_click'

export function track(event: TrackEvent, params?: Record<string, string>) {
  window.gtag?.('event', event, params)
  window.ym?.(YM_COUNTER, 'reachGoal', event, params)
}
