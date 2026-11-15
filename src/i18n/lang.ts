import type { Lang } from './types.ts'
import { siteUrlFor } from './seo.ts'

export type { Lang }

export const LANGS: readonly Lang[] = ['ru', 'en']

/**
 * У каждого языка свой адрес: / — русский, /en/ — английский.
 * Так поисковики индексируют обе версии отдельно (hreflang), а не одну,
 * которую скрипт подменяет на лету.
 */
const BASE = import.meta.env.BASE_URL

const STORAGE_KEY = 'lang'

/**
 * Языки, носителям которых русская версия понятнее английской.
 * Всем остальным показываем английскую.
 */
const RU_LIKE = new Set(['ru', 'uk', 'be', 'kk', 'ky', 'uz', 'tg', 'tk', 'tt', 'ba', 'hy', 'az', 'ka'])

/** Роботов не перенаправляем: каждую версию они должны видеть по её собственному адресу. */
const BOT_UA =
  /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|embedly|preview|lighthouse|headless/i

export function isLang(value: unknown): value is Lang {
  return value === 'ru' || value === 'en'
}

export function pathFor(lang: Lang) {
  return lang === 'en' ? `${BASE}en/` : BASE
}

export const absoluteUrlFor = siteUrlFor

export function langFromPath(pathname: string = window.location.pathname): Lang {
  return pathname.startsWith(`${BASE}en/`) || pathname === `${BASE}en` ? 'en' : 'ru'
}

/** Явный выбор пользователя (переключатель), если он был. */
export function storedLang(): Lang | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return isLang(value) ? value : null
  } catch {
    return null
  }
}

export function storeLang(lang: Lang) {
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* Приватный режим или запрет хранилища — просто не запоминаем */
  }
}

/** Язык по настройкам браузера: первый из списка, который мы умеем показать. */
export function browserLang(): Lang {
  const list = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const tag of list) {
    if (!tag) continue
    const base = tag.toLowerCase().split('-')[0]
    if (base === 'en') return 'en'
    if (RU_LIKE.has(base)) return 'ru'
  }
  return 'en'
}

/** Меняет адрес на версию нужного языка без перезагрузки; хеш и состояние истории сохраняются. */
export function replaceUrlLang(lang: Lang) {
  if (langFromPath() === lang) return
  const { search, hash } = window.location
  window.history.replaceState(window.history.state, '', pathFor(lang) + search + hash)
}

/**
 * Язык при загрузке.
 * Корень сайта — «вход по умолчанию»: туда приходят из поиска и по старым ссылкам,
 * поэтому там подстраиваемся под браузер. Явная ссылка на /en/ остаётся английской,
 * если человек сам раньше не выбрал русский.
 */
export function resolveInitialLang(): Lang {
  const fromPath = langFromPath()
  if (BOT_UA.test(navigator.userAgent)) return fromPath
  const wanted = storedLang() ?? (fromPath === 'ru' ? browserLang() : fromPath)
  replaceUrlLang(wanted)
  return wanted
}
