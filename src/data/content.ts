import type { Lang } from '../i18n/types.ts'

/** Не зависит от языка. */
export const contacts = {
  // square renditions live in /public: profile-256|512.jpg|webp (source: profile.jpg)
  telegram: 'https://t.me/aiogram_tgbots',
  telegramHandle: '@aiogram_tgbots',
  age: 22,
}

type DirectionIcon = 'globe' | 'app' | 'bot' | 'scan' | 'phone' | 'spark' | 'agent'
type LegalIcon = 'file' | 'badge' | 'crypto'
type ServiceIcon = 'bot' | 'spider' | 'globe' | 'sparkles' | 'smartphone' | 'server'

export type SiteContent = {
  profile: {
    name: string
    location: string
    role: string
    experience: string
    summary: string
  }
  directions: { title: string; hint: string; icon: DirectionIcon }[]
  legalPoints: { title: string; description: string; icon: LegalIcon }[]
  stackGroups: { title: string; items: string[] }[]
  services: { id: string; title: string; description: string; icon: ServiceIcon }[]
  processSteps: { step: string; title: string; description: string; result: string }[]
  faqItems: { question: string; answer: string }[]
  navLinks: { href: string; label: string }[]
}

const ru: SiteContent = {
  profile: {
    name: 'Рамазан',
    location: 'Дананга, Вьетнам',
    role: 'Fullstack-разработчик | AI/Automation',
    experience: '5 лет опыта',
    summary:
      'Продукты под ключ — от идеи до деплоя, самостоятельно. Telegram-боты, WebApp, парсеры, мобильные приложения и внедрение ИИ.',
  },
  directions: [
    { title: 'Web-сайты и веб-сервисы', hint: 'Лендинги, кабинеты, API', icon: 'globe' },
    { title: 'WebApp / Telegram Mini Apps', hint: 'Интерфейс внутри Telegram', icon: 'app' },
    { title: 'Telegram-боты', hint: 'В т.ч. платежи через Stars', icon: 'bot' },
    { title: 'Парсеры и автоматизация', hint: 'Данные и процессы 24/7', icon: 'scan' },
    { title: 'Мобильные приложения', hint: 'iOS / Android + публикация', icon: 'phone' },
    { title: 'Внедрение ИИ', hint: 'Чат-боты, ассистенты, RAG', icon: 'spark' },
    { title: 'ИИ-агенты', hint: 'n8n, LLM-пайплайны, LangGraph', icon: 'agent' },
  ],
  legalPoints: [
    {
      title: 'Договор с ООО и ИП',
      description: 'Работаю легально по договору с юрлицами и ИП.',
      icon: 'file',
    },
    {
      title: 'ИП на НПД',
      description: 'Открыто ИП на налоге на профессиональный доход. Можно с чеком.',
      icon: 'badge',
    },
    {
      title: 'Оплата в крипте',
      description: 'Принимаю оплату в криптовалюте — удобно для международных заказов.',
      icon: 'crypto',
    },
  ],
  stackGroups: [
    { title: 'Backend', items: ['Python', 'aiogram', 'FastAPI', 'Alembic'] },
    {
      title: 'AI',
      items: ['OpenAI / Claude API', 'LangChain', 'LangGraph', 'RAG', 'MCP', 'n8n'],
    },
    { title: 'Frontend', items: ['JS / TS', 'SPA', 'деплой'] },
    { title: 'БД', items: ['PostgreSQL', 'MongoDB'] },
    { title: 'Инфра', items: ['Docker', 'nginx', 'Linux', 'systemd', 'SFTP'] },
    { title: 'Инструменты', items: ['GitHub', 'VS Code', 'Claude Code', 'MCP DevTools'] },
  ],
  services: [
    {
      id: 'bots',
      title: 'Telegram-боты',
      description:
        'От информационных ботов до e-commerce с подписками, CRM и оплатой (включая Telegram Stars).',
      icon: 'bot',
    },
    {
      id: 'parsers',
      title: 'Парсеры и автоматизация',
      description:
        'Сбор данных с сайтов, маркетплейсов и API. Мониторинг цен, вакансий, отзывов — 24/7.',
      icon: 'spider',
    },
    {
      id: 'webapp',
      title: 'WebApp и сервисы',
      description:
        'Сайты, веб-сервисы и Telegram Mini Apps: удобный интерфейс + надёжный backend.',
      icon: 'globe',
    },
    {
      id: 'ai',
      title: 'ИИ и агенты',
      description:
        'Чат-боты, RAG, MCP, n8n и LLM-пайплайны. Внедрение ИИ в существующие продукты.',
      icon: 'sparkles',
    },
    {
      id: 'mobile',
      title: 'Мобильные приложения',
      description: 'iOS и Android, включая публикацию в App Store и Google Play.',
      icon: 'smartphone',
    },
    {
      id: 'deploy',
      title: 'Деплой и поддержка',
      description:
        'Docker, nginx, Linux. Запуск на сервере, мониторинг и поддержка после релиза.',
      icon: 'server',
    },
  ],
  processSteps: [
    {
      step: '01',
      title: 'Обсуждение и ТЗ',
      description:
        'Разбираем задачу, цели и ограничения. Формируем понятное техническое задание.',
      result: 'ТЗ, сроки и фиксированная цена',
    },
    {
      step: '02',
      title: 'Разработка и тест',
      description:
        'Собираю архитектуру, пишу код, делаю MVP и проверяю ключевые сценарии.',
      result: 'Рабочий MVP, который можно потрогать',
    },
    {
      step: '03',
      title: 'Финализация',
      description: 'Правки по обратной связи, оптимизация и подготовка к продакшену.',
      result: 'Версия, готовая к продакшену',
    },
    {
      step: '04',
      title: 'Запуск и поддержка',
      description:
        'Деплой, доступы, стабильная работа 24/7. Остаюсь на связи после запуска.',
      result: 'Продукт на сервере, доступы у вас',
    },
  ],
  faqItems: [
    {
      question: 'Сколько стоит создать бота в ТГ?',
      answer:
        'Стоимость зависит от сложности: простой информационный MVP дешевле, e-commerce с платежами и CRM — дороже. После обсуждения ТЗ даю точную оценку. Ориентиры по ценам — в портфолио.',
    },
    {
      question: 'Как создать ТГ бота на Python?',
      answer:
        'Обычно: aiogram, токен от BotFather, логика обработки, БД, деплой. Если не хотите углубляться в детали — делаю всё под ключ: от идеи до работающего бота на сервере.',
    },
    {
      question: 'Какие сроки разработки?',
      answer:
        'Простой MVP — от нескольких дней до недели. Сложные проекты с уникальной логикой и интеграциями — от 2–4 недель. Сроки фиксируем на этапе ТЗ.',
    },
    {
      question: 'Работаете ли вы официально? Можно ли с договором и чеком?',
      answer:
        'Да. Работаю легально с ООО и ИП по договору. У меня открыто ИП на НПД — можно оформить всё с чеком. Также принимаю оплату в криптовалюте.',
    },
    {
      question: 'Делаете ли вы нелегальные боты?',
      answer:
        'Нет. Не занимаюсь фишингом, скамом и обманом. Легальные бизнес-инструменты, аналитика и автоматизация — да.',
    },
  ],
  navLinks: [
    { href: '#about', label: 'Обо мне' },
    { href: '#services', label: 'Услуги' },
    { href: '#portfolio', label: 'Портфолио' },
    { href: '#resume', label: 'Резюме' },
    { href: '#process', label: 'Процесс' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Контакты' },
  ],
}

const en: SiteContent = {
  profile: {
    name: 'Ramazan',
    location: 'Da Nang, Vietnam',
    role: 'fullstack & AI automation developer',
    experience: '5 years',
    summary:
      'Turnkey products — from idea to deploy, on my own. Telegram bots, web apps, scrapers, mobile apps and AI integration.',
  },
  directions: [
    { title: 'Websites and web services', hint: 'Landings, dashboards, APIs', icon: 'globe' },
    { title: 'WebApp / Telegram Mini Apps', hint: 'UI right inside Telegram', icon: 'app' },
    { title: 'Telegram bots', hint: 'Incl. Telegram Stars payments', icon: 'bot' },
    { title: 'Scrapers and automation', hint: 'Data and workflows 24/7', icon: 'scan' },
    { title: 'Mobile apps', hint: 'iOS / Android + store release', icon: 'phone' },
    { title: 'AI integration', hint: 'Chatbots, assistants, RAG', icon: 'spark' },
    { title: 'AI agents', hint: 'n8n, LLM pipelines, LangGraph', icon: 'agent' },
  ],
  legalPoints: [
    {
      title: 'Contracts with companies',
      description: 'I work officially under contract with companies and sole proprietors.',
      icon: 'file',
    },
    {
      title: 'Registered sole proprietor',
      description: 'Registered as a self-employed sole proprietor in Russia. Receipts available.',
      icon: 'badge',
    },
    {
      title: 'Crypto payments',
      description: 'I accept cryptocurrency — convenient for international clients.',
      icon: 'crypto',
    },
  ],
  stackGroups: [
    { title: 'Backend', items: ['Python', 'aiogram', 'FastAPI', 'Alembic'] },
    {
      title: 'AI',
      items: ['OpenAI / Claude API', 'LangChain', 'LangGraph', 'RAG', 'MCP', 'n8n'],
    },
    { title: 'Frontend', items: ['JS / TS', 'SPA', 'deploy'] },
    { title: 'DB', items: ['PostgreSQL', 'MongoDB'] },
    { title: 'Infra', items: ['Docker', 'nginx', 'Linux', 'systemd', 'SFTP'] },
    { title: 'Tools', items: ['GitHub', 'VS Code', 'Claude Code', 'MCP DevTools'] },
  ],
  services: [
    {
      id: 'bots',
      title: 'Telegram bots',
      description:
        'From info bots to e-commerce with subscriptions, CRM and payments (including Telegram Stars).',
      icon: 'bot',
    },
    {
      id: 'parsers',
      title: 'Scrapers and automation',
      description:
        'Data collection from websites, marketplaces and APIs. Monitoring prices, jobs and reviews — 24/7.',
      icon: 'spider',
    },
    {
      id: 'webapp',
      title: 'Web apps and services',
      description:
        'Websites, web services and Telegram Mini Apps: a clean interface on a reliable backend.',
      icon: 'globe',
    },
    {
      id: 'ai',
      title: 'AI and agents',
      description:
        'Chatbots, RAG, MCP, n8n and LLM pipelines. Adding AI to existing products.',
      icon: 'sparkles',
    },
    {
      id: 'mobile',
      title: 'Mobile apps',
      description: 'iOS and Android, including release to the App Store and Google Play.',
      icon: 'smartphone',
    },
    {
      id: 'deploy',
      title: 'Deploy and support',
      description:
        'Docker, nginx, Linux. Server launch, monitoring and support after release.',
      icon: 'server',
    },
  ],
  processSteps: [
    {
      step: '01',
      title: 'Discovery and spec',
      description:
        'We go through the task, goals and constraints, and put together a clear technical spec.',
      result: 'Spec, timeline and a fixed price',
    },
    {
      step: '02',
      title: 'Build and test',
      description:
        'I design the architecture, write the code, build an MVP and test the key scenarios.',
      result: 'A working MVP you can try',
    },
    {
      step: '03',
      title: 'Polish',
      description: 'Changes based on your feedback, optimization and production prep.',
      result: 'A production-ready version',
    },
    {
      step: '04',
      title: 'Launch and support',
      description:
        'Deploy, access handover, stable 24/7 operation. I stay in touch after launch.',
      result: 'Product on the server, access in your hands',
    },
  ],
  faqItems: [
    {
      question: 'How much does a Telegram bot cost?',
      answer:
        'It depends on complexity: a simple info MVP costs less, e-commerce with payments and CRM costs more. I give an exact estimate once we agree on the spec. Price references are in the portfolio.',
    },
    {
      question: 'How do you build a Telegram bot in Python?',
      answer:
        'Usually: aiogram, a token from BotFather, the handling logic, a database and deployment. If you do not want to dive into details, I do it all end to end — from idea to a bot running on a server.',
    },
    {
      question: 'How long does development take?',
      answer:
        'A simple MVP takes from a few days to a week. Complex projects with custom logic and integrations take 2–4 weeks and up. We fix the timeline at the spec stage.',
    },
    {
      question: 'Do you work officially, with a contract and receipts?',
      answer:
        'Yes. I work legally under contract with companies and sole proprietors. I am a registered self-employed sole proprietor in Russia, so receipts are available. I also accept cryptocurrency.',
    },
    {
      question: 'Do you build illegal bots?',
      answer:
        'No. No phishing, scams or fraud. Legal business tools, analytics and automation — yes.',
    },
  ],
  navLinks: [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#resume', label: 'Resume' },
    { href: '#process', label: 'Process' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ],
}

export const content: Record<Lang, SiteContent> = { ru, en }
