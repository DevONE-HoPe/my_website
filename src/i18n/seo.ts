/**
 * SEO-разметка для каждой языковой версии.
 *
 * Модуль без зависимостей от браузера и Vite: его же импортирует vite.config.ts,
 * чтобы на сборке получить два статических HTML — / (ru) и /en/ (en) — со своими
 * title, description, hreflang и JSON-LD. Поисковику не нужно выполнять JS,
 * чтобы увидеть, на каком языке страница и о чём она.
 */
import type { Lang } from './types.ts'

export const SITE_URL = 'https://devone-hope.github.io/my_website/'
export const OG_IMAGE = `${SITE_URL}og_title.jpg`
const TELEGRAM = 'https://t.me/aiogram_tgbots'
const GITHUB = 'https://github.com/devone-hope'

export function siteUrlFor(lang: Lang) {
  return lang === 'en' ? `${SITE_URL}en/` : SITE_URL
}

type FaqEntry = { q: string; a: string }

export type SeoCopy = {
  title: string
  description: string
  keywords: string
  ogTitle: string
  ogDescription: string
  ogLocale: string
  siteName: string
  personName: string
  jobTitle: string
  personDescription: string
  faq: FaqEntry[]
}

export const seo: Record<Lang, SeoCopy> = {
  ru: {
    title: 'Рамазан — Fullstack & AI-разработчик | Боты, парсеры, WebApp',
    description:
      'Fullstack-разработчик | AI/Automation | 5 лет опыта. Telegram-боты, парсеры, WebApp, мобильные приложения и внедрение ИИ — от идеи до деплоя.',
    keywords:
      'разработка телеграм ботов, создать тг бота, парсер на python, fullstack разработчик, ai агенты, telegram mini apps',
    ogTitle: 'Рамазан — Fullstack & AI-разработчик',
    ogDescription:
      'Продукты под ключ: Telegram-боты, парсеры, WebApp, мобильные приложения и ИИ-агенты. 5 лет опыта.',
    ogLocale: 'ru_RU',
    siteName: 'Рамазан — портфолио',
    personName: 'Рамазан Зайнутдинов',
    jobTitle: 'Fullstack-разработчик | AI/Automation',
    personDescription:
      'Fullstack-разработчик с 5 годами опыта. Продукты под ключ: Telegram-боты, парсеры, WebApp, мобильные приложения и ИИ-агенты.',
    faq: [
      {
        q: 'Сколько стоит создать бота в ТГ?',
        a: 'Стоимость зависит от сложности проекта. Простой информационный бот (MVP) дешевле, чем e-commerce с платежами и CRM. Индивидуальный расчёт после обсуждения ТЗ.',
      },
      {
        q: 'Как создать ТГ бота на Python?',
        a: 'Использую aiogram и python-telegram-bot: логика, база данных, деплой и тестирование. Все технические этапы беру на себя — вам нужно описать идею.',
      },
      {
        q: 'Какие сроки разработки Telegram бота?',
        a: 'Простой MVP — от нескольких дней до недели. Сложные проекты — от 2 до 4 недель и более. Сроки фиксируем на этапе ТЗ.',
      },
    ],
  },
  en: {
    title: 'Ramazan — Fullstack & AI Developer | Telegram Bots, Scrapers, Web Apps',
    description:
      'Freelance fullstack & AI developer with 5 years of experience. Telegram bots, Mini Apps, web scraping, AI agents, LLM/RAG integration and mobile apps — built end to end, from idea to deploy.',
    keywords:
      'telegram bot developer, hire telegram bot developer, telegram mini app developer, python web scraping, web scraper developer, ai agent developer, llm integration, rag developer, fullstack developer for hire, freelance python developer, fastapi developer',
    ogTitle: 'Ramazan — Fullstack & AI Developer for Hire',
    ogDescription:
      'Turnkey products: Telegram bots, Mini Apps, scrapers, web apps, mobile apps and AI agents. 5 years of experience.',
    ogLocale: 'en_US',
    siteName: 'Ramazan — Portfolio',
    personName: 'Ramazan Zainutdinov',
    jobTitle: 'Fullstack & AI Developer',
    personDescription:
      'Fullstack developer with 5 years of experience building turnkey products: Telegram bots, Mini Apps, web scrapers, web apps, mobile apps and AI agents.',
    faq: [
      {
        q: 'How much does a Telegram bot cost?',
        a: 'It depends on complexity. A simple info bot (MVP) costs less than e-commerce with payments and CRM. I give an exact estimate after we agree on the spec.',
      },
      {
        q: 'How do you build a Telegram bot in Python?',
        a: 'I use aiogram: bot logic, database, deployment and testing. I take care of every technical step — you only need to describe the idea.',
      },
      {
        q: 'How long does it take to build a Telegram bot?',
        a: 'A simple MVP takes from a few days to a week. Complex projects take 2–4 weeks or more. We fix the timeline at the spec stage.',
      },
    ],
  },
}

const escapeAttr = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

/** JSON внутри <script>: закрываем возможность случайно оборвать тег. */
const jsonLd = (data: unknown) =>
  `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`

/** Блок <head> для языковой версии: мета, hreflang, Open Graph, JSON-LD. */
export function renderSeoHead(lang: Lang): string {
  const t = seo[lang]
  const url = siteUrlFor(lang)
  const other: Lang = lang === 'ru' ? 'en' : 'ru'
  const a = escapeAttr

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: t.personName,
    jobTitle: t.jobTitle,
    url,
    image: OG_IMAGE,
    description: t.personDescription,
    address: { '@type': 'PostalAddress', addressLocality: 'Da Nang', addressCountry: 'VN' },
    knowsLanguage: ['ru', 'en', 'tt'],
    knowsAbout: [
      'Python',
      'FastAPI',
      'aiogram',
      'Telegram Bots',
      'Telegram Mini Apps',
      'Web Scraping',
      'AI Agents',
      'LLM',
      'LangChain',
      'RAG',
      'MCP',
      'PostgreSQL',
      'Redis',
      'Docker',
      'React',
    ],
    sameAs: [TELEGRAM, GITHUB],
  }

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t.siteName,
    url,
    inLanguage: lang,
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    inLanguage: lang,
    mainEntity: t.faq.map(({ q, a: answer }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }

  return [
    `<title>${a(t.title)}</title>`,
    `<meta name="description" content="${a(t.description)}" />`,
    `<meta name="keywords" content="${a(t.keywords)}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<link rel="canonical" href="${url}" />`,
    `<link rel="alternate" hreflang="ru" href="${siteUrlFor('ru')}" />`,
    `<link rel="alternate" hreflang="en" href="${siteUrlFor('en')}" />`,
    // Всем, чей язык не ru и не en, — английская версия
    `<link rel="alternate" hreflang="x-default" href="${siteUrlFor('en')}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${a(t.siteName)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${a(t.ogTitle)}" />`,
    `<meta property="og:description" content="${a(t.ogDescription)}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:locale" content="${t.ogLocale}" />`,
    `<meta property="og:locale:alternate" content="${seo[other].ogLocale}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:url" content="${url}" />`,
    `<meta name="twitter:title" content="${a(t.ogTitle)}" />`,
    `<meta name="twitter:description" content="${a(t.ogDescription)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    jsonLd(person),
    jsonLd(website),
    jsonLd(faq),
  ].join('\n    ')
}
