import { useEffect, useState } from 'react'

/**
 * Следит за CSS-медиазапросом из JS.
 *
 * Нужен там, где одной вёрсткой не обойтись: если мобильную часть списка
 * прятать через CSS, скрытые карточки всё равно останутся в DOM и продолжат
 * тянуть картинки. Здесь же лишние элементы просто не рендерятся.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)

    /* Ширина могла измениться между первым рендером и подпиской */
    onChange()
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}
