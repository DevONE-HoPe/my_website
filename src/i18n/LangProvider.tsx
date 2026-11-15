import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { absoluteUrlFor, replaceUrlLang, resolveInitialLang, storeLang, type Lang } from './lang'
import { seo } from './seo.ts'
import { ui } from './ui'
import { LangContext } from './context'

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  document.querySelector(selector)?.setAttribute(attr, value)
}

/** Держит head в согласии с языком — после переключения без перезагрузки. */
function syncHead(lang: Lang) {
  const t = seo[lang]
  const url = absoluteUrlFor(lang)
  document.documentElement.lang = lang
  setMeta('meta[name="description"]', 'content', t.description)
  setMeta('meta[name="keywords"]', 'content', t.keywords)
  setMeta('link[rel="canonical"]', 'href', url)
  setMeta('meta[property="og:url"]', 'content', url)
  setMeta('meta[property="og:title"]', 'content', t.ogTitle)
  setMeta('meta[property="og:description"]', 'content', t.ogDescription)
  setMeta('meta[property="og:locale"]', 'content', t.ogLocale)
  setMeta('meta[name="twitter:url"]', 'content', url)
  setMeta('meta[name="twitter:title"]', 'content', t.ogTitle)
  setMeta('meta[name="twitter:description"]', 'content', t.ogDescription)
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(resolveInitialLang)

  const setLang = useCallback((next: Lang, options?: { persist?: boolean }) => {
    if (options?.persist !== false) storeLang(next)
    replaceUrlLang(next)
    setLangState(next)
  }, [])

  useEffect(() => syncHead(lang), [lang])

  const value = useMemo(() => ({ lang, setLang, t: ui[lang] }), [lang, setLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}
