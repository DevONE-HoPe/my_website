export type ResumeLang = 'ru' | 'en'

export const resumeContacts = {
  telegram: 'https://t.me/aiogram_tgbots',
  telegramHandle: '@aiogram_tgbots',
  email: 'gameytub@gmail.com',
  github: 'https://github.com/devone-hope',
  githubHandle: 'github.com/devone-hope',
  portfolio: 'https://devone-hope.github.io/my_website/',
  portfolioLabel: 'devone-hope.github.io/my_website',
  phone: '+7 917 464-97-40',
}

/** Короткие постоянные URL — их можно скидывать как есть. */
export const resumePdfFiles = {
  ru: 'resume-ru.pdf',
  en: 'resume-en.pdf',
} as const

export function resumePdfUrl(lang: ResumeLang) {
  return `${resumeContacts.portfolio}${resumePdfFiles[lang]}`
}

type Localized<T> = Record<ResumeLang, T>

export type ResumeLink = { label: string; href: string }

export type ResumeJob = {
  company: string
  role: string
  period: string
  place: string
  bullets: string[]
}

export type ResumeProject = {
  title: string
  yours: string
  description: string
  links: ResumeLink[]
}

export type ResumeCopy = {
  documentTitle: string
  name: string
  role: string
  location: string
  intro: string
  stackTitle: string
  stack: { label: string; items: string }[]
  experienceTitle: string
  jobs: ResumeJob[]
  projectsTitle: string
  projectsNote: string
  projects: ResumeProject[]
  educationTitle: string
  education: string
  languagesTitle: string
  languages: string[]
  formatTitle: string
  format: string[]
  downloadPdf: string
  print: string
  langRu: string
  langEn: string
  pageEyebrow: string
  pdfLinksTitle: string
  copyLink: string
  copied: string
  openPdf: string
}

export const resumeCopy: Localized<ResumeCopy> = {
  ru: {
    documentTitle: 'Рамазан Зайнутдинов — резюме',
    name: 'Зайнутдинов Рамазан Римович',
    role: 'Backend / AI Engineer',
    location: 'Дананга, Вьетнам (UTC+7) · готов к графику МСК',
    intro:
      'Python-разработчик: backend, Telegram-продукты и LLM-интеграции. Собираю сервисы под ключ — архитектура, код, деплой на Linux. Сейчас живу в Дананге, работаю удалённо и спокойно закрываю график Москвы. Открыт к найму и к длинным проектным контрактам.',
    stackTitle: 'Стек',
    stack: [
      { label: 'Языки', items: 'Python, TypeScript / JavaScript, SQL, C++ (базовый)' },
      { label: 'Фреймворки', items: 'FastAPI, aiogram 3, React, aiohttp' },
      { label: 'БД', items: 'PostgreSQL, Redis, MongoDB, PgBouncer' },
      { label: 'Инфра', items: 'Docker, nginx, Linux, Kubernetes, AWS' },
      { label: 'AI / наблюдение', items: 'OpenAI / Claude / Gemini API, OpenRouter, RAG, MCP, LangChain, Sentry, Prometheus, Grafana' },
    ],
    experienceTitle: 'Опыт',
    jobs: [
      {
        company: 'Независимый разработчик',
        role: 'Backend / AI, продукты под ключ',
        period: 'Февраль 2025 — н.в.',
        place: 'Дананга · удалённо · ИП',
        bullets: [
          'Собрал сервис автопополнения HoYoverse (Genshin, HSR, ZZZ): панель, публичный API, очередь в PostgreSQL за PgBouncer, воркеры со своим Chrome и 3DS. Продукт в проде — genshinimpactautodonate.com.',
          'Сделал Telegram Mini Apps с нуля: TurboMMR (Steam OpenID, свой MMR по турбо-матчам Dota 2, лидерборды), таро и спортивные прогнозы на LLM через OpenRouter с балансировкой ключей и памятью диалога в Redis.',
          'Поднял высоконагруженный Telegram-сервис с фабрикой копий ботов — около 200 000 пользователей в месяц, пулы подключений, мониторинг ошибок.',
          'Парсер спецтехники для импорта из ЕС: три немецкие площадки, обход AWS WAF, сверка с Google Sheets, карточки сразу в рабочую группу в Telegram.',
        ],
      },
      {
        company: 'AI-лаборатория «Решение»',
        role: 'ML / AI-инженер (Python)',
        period: 'Май 2023 — январь 2025',
        place: 'Казань · удалённо',
        bullets: [
          'Вывел в прод API обработки фото: кластер из 11 VPS (CPU и GPU), Kubernetes, FastAPI, nginx на две реплики, RabbitMQ. Сервис принимал запросы с сайта и из Telegram-бота, инференс — платная услуга.',
          'Адаптировал однопоточную PyTorch-модель (.pt) под параллельные запросы — исходный инференс не был рассчитан на продакшен.',
          'Собрал Telegram-ботов на aiogram с ИИ: контекст пользователя вне модели, RAG, function calling, MCP; видео и аудио. Наблюдаемость — Sentry, Prometheus, Grafana.',
          'Делал мультимодельные LLM-агенты на Python: разбор рынка криптовалют (Gemini) и агент, который управляет браузером через расширение.',
        ],
      },
      {
        company: 'Коммерческая разработка',
        role: 'Python-разработчик',
        period: 'Март 2021 — декабрь 2023',
        place: 'Фриланс · заказы через Profi.ru и напрямую',
        bullets: [
          'Парсеры статики и динамики на Selenium, Playwright и undetected-chromedriver: маркетплейсы, вакансии, отзывы — с выгрузкой в CSV и уведомлениями в Telegram.',
          'Telegram-боты с подписками и генерацией текста/изображений, платежи по webhook на FastAPI. Бот продажи авто с динамической локализацией под разные страны (Docker, PostgreSQL, Redis).',
          'Администрировал Ubuntu: nginx, Let’s Encrypt, fail2ban, Docker, пользователи и базовая безопасность сервера.',
        ],
      },
    ],
    projectsTitle: 'Проекты',
    projectsNote:
      'Код клиентских проектов — в закрытых репозиториях. Разборы и скриншоты — в портфолио, демо — где заказчик оставил публичный доступ.',
    projects: [
      {
        title: 'Автодонат HoYoverse',
        yours: 'Весь конвейер: API, панель, очередь, воркеры, роли, деплой',
        description:
          'Заказ из панели или по публичному API, проверка аккаунта, Chrome с оплатой и 3DS. Очередь в PostgreSQL, масштаб — число контейнеров.',
        links: [
          { label: 'Демо', href: 'https://genshinimpactautodonate.com' },
          { label: 'Кейс', href: '#work-hoyo-autodonate' },
        ],
      },
      {
        title: 'TurboMMR — Mini App рейтинга Dota 2',
        yours: 'Mini App, backend, бот, Steam/OpenDota, деплой',
        description:
          'Вход через Steam, свой MMR по турбо-матчам, лидерборды и конкурсы с призами. React + FastAPI + aiogram, Redis, Docker.',
        links: [{ label: 'Кейс', href: '#work-turbommr' }],
      },
      {
        title: 'Таро-сервис: WebApp + ИИ-расклады',
        yours: 'Mini App, LLM-пайплайн, оплаты, память диалога',
        description:
          'Расклады через OpenRouter с балансировкой ключей, контекст в Redis, подписки Tribute, PostgreSQL, Docker на Linux.',
        links: [{ label: 'Кейс', href: '#work-tarot-webapp' }],
      },
      {
        title: 'Парсер спецтехники (DE)',
        yours: 'Парсер, обход WAF, бот, связка с Google Sheets',
        description:
          'Мониторинг трёх немецких площадок, находки в Telegram и в таблицу. Вместо ручного обхода сайтов — одна база для отдела.',
        links: [{ label: 'Кейс', href: '#work-tech-parser-de' }],
      },
    ],
    educationTitle: 'Образование',
    education: 'Среднее общее образование',
    languagesTitle: 'Языки',
    languages: [
      'Русский — родной',
      'Английский — A2: читаю документацию и пишу простые письма, устно пока слабо',
    ],
    formatTitle: 'Формат',
    format: [
      'Удалённо, полная занятость или длинный проект',
      'График МСК, сейчас UTC+7',
      'ИП, договор с ООО и ИП',
    ],
    downloadPdf: 'Скачать PDF',
    print: 'Печать',
    langRu: 'RU',
    langEn: 'EN',
    pageEyebrow: 'Резюме',
    pdfLinksTitle: 'Прямые ссылки на PDF',
    copyLink: 'Копировать ссылку',
    copied: 'Скопировано',
    openPdf: 'Открыть',
  },
  en: {
    documentTitle: 'Ramazan Zainutdinov — CV',
    name: 'Ramazan Zainutdinov',
    role: 'Backend / AI Engineer',
    location: 'Da Nang, Vietnam (UTC+7) · available for Moscow hours',
    intro:
      'Python engineer: backend, Telegram products, and LLM integrations. I ship services end to end — architecture, code, Linux deploy. I live in Da Nang, work remotely, and can follow Moscow time. Open to full-time remote roles and longer contracts.',
    stackTitle: 'Stack',
    stack: [
      { label: 'Languages', items: 'Python, TypeScript / JavaScript, SQL, C++ (basic)' },
      { label: 'Frameworks', items: 'FastAPI, aiogram 3, React, aiohttp' },
      { label: 'Databases', items: 'PostgreSQL, Redis, MongoDB, PgBouncer' },
      { label: 'Infra', items: 'Docker, nginx, Linux, Kubernetes, AWS' },
      { label: 'AI / observability', items: 'OpenAI / Claude / Gemini API, OpenRouter, RAG, MCP, LangChain, Sentry, Prometheus, Grafana' },
    ],
    experienceTitle: 'Experience',
    jobs: [
      {
        company: 'Independent engineer',
        role: 'Backend / AI, end-to-end products',
        period: 'Feb 2025 — present',
        place: 'Da Nang · remote · sole proprietor',
        bullets: [
          'Built a HoYoverse top-up service (Genshin, HSR, ZZZ): admin panel, public API, PostgreSQL queue behind PgBouncer, workers with a dedicated Chrome and 3DS. Live product: genshinimpactautodonate.com.',
          'Shipped Telegram Mini Apps from scratch: TurboMMR (Steam OpenID, custom turbo MMR for Dota 2, leaderboards), tarot and sports-prediction apps on LLMs via OpenRouter with key pooling and Redis dialog memory.',
          'Ran a high-load Telegram service with a bot-copy factory — about 200,000 monthly users, connection pools, error monitoring.',
          'Heavy-machinery parser for EU import: three German marketplaces, AWS WAF bypass, Google Sheets sync, new listings pushed to the team Telegram chat.',
        ],
      },
      {
        company: 'AI Lab “Reshenie”',
        role: 'ML / AI engineer (Python)',
        period: 'May 2023 — Jan 2025',
        place: 'Kazan · remote',
        bullets: [
          'Shipped a production photo-processing API: 11-VPS cluster (CPU and GPU), Kubernetes, FastAPI, nginx in front of two replicas, RabbitMQ. The service served a website and a Telegram bot; inference was a paid product.',
          'Adapted a single-threaded PyTorch checkpoint (.pt) for concurrent traffic — the upstream model was not built for production load.',
          'Built Telegram bots on aiogram with LLMs: user context stored outside the model, RAG, function calling, MCP; video and audio. Observability via Sentry, Prometheus, Grafana.',
          'Built multi-model LLM agents in Python: a crypto-market analyst (Gemini) and a browser-control agent via an extension.',
        ],
      },
      {
        company: 'Commercial freelance',
        role: 'Python developer',
        period: 'Mar 2021 — Dec 2023',
        place: 'Freelance · Profi.ru and direct clients',
        bullets: [
          'Parsers for static and dynamic sites with Selenium, Playwright, and undetected-chromedriver: marketplaces, jobs, reviews — CSV export and Telegram alerts.',
          'Telegram bots with subscriptions and text/image generation, FastAPI payment webhooks. A car-sales bot with dynamic localization for different countries (Docker, PostgreSQL, Redis).',
          'Administered Ubuntu servers: nginx, Let’s Encrypt, fail2ban, Docker, users, and baseline hardening.',
        ],
      },
    ],
    projectsTitle: 'Selected work',
    projectsNote:
      'Client code lives in private repos. Case studies and screenshots are in the portfolio; live demos where the client kept them public.',
    projects: [
      {
        title: 'HoYoverse auto top-up',
        yours: 'Full pipeline: API, panel, queue, workers, roles, deploy',
        description:
          'Order from the panel or public API, account check, Chrome checkout with 3DS. Queue in PostgreSQL; scale is container count.',
        links: [
          { label: 'Live', href: 'https://genshinimpactautodonate.com' },
          { label: 'Case', href: '#work-hoyo-autodonate' },
        ],
      },
      {
        title: 'TurboMMR — Dota 2 rating Mini App',
        yours: 'Mini App, backend, bot, Steam/OpenDota, deploy',
        description:
          'Steam login, custom turbo MMR, leaderboards and prize contests. React + FastAPI + aiogram, Redis, Docker.',
        links: [{ label: 'Case', href: '#work-turbommr' }],
      },
      {
        title: 'Tarot service: WebApp + LLM spreads',
        yours: 'Mini App, LLM pipeline, payments, dialog memory',
        description:
          'Spreads via OpenRouter with key pooling, Redis context, Tribute subscriptions, PostgreSQL, Docker on Linux.',
        links: [{ label: 'Case', href: '#work-tarot-webapp' }],
      },
      {
        title: 'Heavy-machinery parser (DE)',
        yours: 'Parser, WAF bypass, bot, Google Sheets sync',
        description:
          'Monitors three German sites, sends hits to Telegram and a spreadsheet. One shared catalog instead of manual browsing.',
        links: [{ label: 'Case', href: '#work-tech-parser-de' }],
      },
    ],
    educationTitle: 'Education',
    education: 'Secondary education',
    languagesTitle: 'Languages',
    languages: [
      'Russian — native',
      'English — A2: I read technical docs and write simple emails; speaking is still limited',
    ],
    formatTitle: 'Work format',
    format: [
      'Remote, full-time or a longer contract',
      'Moscow hours, currently UTC+7',
      'Sole proprietor, contracts with companies',
    ],
    downloadPdf: 'Download PDF',
    print: 'Print',
    langRu: 'RU',
    langEn: 'EN',
    pageEyebrow: 'Resume',
    pdfLinksTitle: 'Direct PDF links',
    copyLink: 'Copy link',
    copied: 'Copied',
    openPdf: 'Open',
  },
}

export function resumeLangFromHash(hash: string): ResumeLang {
  return hash.startsWith('#resume/en') ? 'en' : 'ru'
}

export function isResumeHash(hash: string): boolean {
  return hash === '#resume' || hash.startsWith('#resume/')
}

export function resumeHashFor(lang: ResumeLang): string {
  return lang === 'en' ? '#resume/en' : '#resume'
}
