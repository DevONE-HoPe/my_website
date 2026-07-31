/** Путь к файлу в /public с учётом base из Vite. */
export function asset(path: string) {
  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\//, '')}`
}
