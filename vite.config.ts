import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { renderSeoHead } from './src/i18n/seo.ts'

const SEO_MARKER = '<!--seo-head-->'
const SEO_START = '<!--seo:start-->'
const SEO_END = '<!--seo:end-->'
const seoBlock = (lang: 'ru' | 'en') => `${SEO_START}\n    ${renderSeoHead(lang)}\n    ${SEO_END}`

/**
 * Две статические входные страницы вместо одной:
 *   dist/index.html    — русская версия (/my_website/)
 *   dist/en/index.html — английская (/my_website/en/)
 * Отличаются lang, title, description, canonical и JSON-LD — то, что поисковик
 * читает ещё до выполнения JS. Сам бандл у них общий, язык приложение берёт из пути.
 */
function localizedHtml(): Plugin {
  let outDir = 'dist'
  return {
    name: 'localized-html',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replace(SEO_MARKER, seoBlock('ru')),
    },
    async closeBundle() {
      const ruHtml = await readFile(resolve(outDir, 'index.html'), 'utf-8')
      const start = ruHtml.indexOf(SEO_START)
      const end = ruHtml.indexOf(SEO_END)
      if (start < 0 || end < start) throw new Error('localized-html: SEO block not found')
      const enHtml = (ruHtml.slice(0, start) + seoBlock('en') + ruHtml.slice(end + SEO_END.length)).replace(
        '<html lang="ru">',
        '<html lang="en">',
      )
      await mkdir(resolve(outDir, 'en'), { recursive: true })
      await writeFile(resolve(outDir, 'en', 'index.html'), enHtml)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), localizedHtml()],
  // GitHub Pages project site: https://devone-hope.github.io/my_website/
  base: '/my_website/',
})
