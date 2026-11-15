import { createContext, useContext } from 'react'
import type { Lang } from './lang'
import type { UiCopy } from './ui'

type LangContextValue = {
  lang: Lang
  /** persist: false — сменить язык, но не запоминать выбор (например, заход по ссылке #resume/en). */
  setLang: (lang: Lang, options?: { persist?: boolean }) => void
  t: UiCopy
}

export const LangContext = createContext<LangContextValue | null>(null)

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside <LangProvider>')
  return ctx
}
