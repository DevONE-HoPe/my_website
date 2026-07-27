export const profile = {
  name: 'Рамазан',
  age: 21,
  location: 'Вьетнам',
  role: 'Fullstack-разработчик | AI/Automation',
  experience: '5 лет опыта',
  summary:
    'Продукты под ключ — от идеи до деплоя, самостоятельно. Telegram-боты, WebApp, парсеры, мобильные приложения и внедрение ИИ.',
  // square renditions live in /public: profile-256|512.jpg|webp (source: profile.jpg)
  telegram: 'https://t.me/aiogram_tgbots',
  telegramHandle: '@aiogram_tgbots',
}

export const directions = [
  {
    title: 'Web-сайты и веб-сервисы',
    hint: 'Лендинги, кабинеты, API',
    icon: 'globe' as const,
  },
  {
    title: 'WebApp / Telegram Mini Apps',
    hint: 'Интерфейс внутри Telegram',
    icon: 'app' as const,
  },
  {
    title: 'Telegram-боты',
    hint: 'В т.ч. платежи через Stars',
    icon: 'bot' as const,
  },
  {
    title: 'Парсеры и автоматизация',
    hint: 'Данные и процессы 24/7',
    icon: 'scan' as const,
  },
  {
    title: 'Мобильные приложения',
    hint: 'iOS / Android + публикация',
    icon: 'phone' as const,
  },
  {
    title: 'Внедрение ИИ',
    hint: 'Чат-боты, ассистенты, RAG',
    icon: 'spark' as const,
  },
  {
    title: 'ИИ-агенты',
    hint: 'n8n, LLM-пайплайны, LangGraph',
    icon: 'agent' as const,
  },
]

export const legalPoints = [
  {
    title: 'Договор с ООО и ИП',
    description: 'Работаю легально по договору с юрлицами и ИП.',
    icon: 'file' as const,
  },
  {
    title: 'ИП на НПД',
    description: 'Открыто ИП на налоге на профессиональный доход. Можно с чеком.',
    icon: 'badge' as const,
  },
  {
    title: 'Оплата в крипте',
    description: 'Принимаю оплату в криптовалюте — удобно для международных заказов.',
    icon: 'crypto' as const,
  },
]

export const stackGroups = [
  {
    title: 'Backend',
    items: ['Python', 'aiogram', 'FastAPI', 'Alembic'],
  },
  {
    title: 'AI',
    items: ['OpenAI / Claude API', 'LangChain', 'LangGraph', 'RAG', 'MCP', 'n8n'],
  },
  {
    title: 'Frontend',
    items: ['JS / TS', 'SPA', 'деплой'],
  },
  {
    title: 'БД',
    items: ['PostgreSQL', 'MongoDB'],
  },
  {
    title: 'Инфра',
    items: ['Docker', 'nginx', 'Linux', 'systemd', 'SFTP'],
  },
  {
    title: 'Инструменты',
    items: ['GitHub', 'VS Code', 'Claude Code', 'MCP DevTools'],
  },
]

export const services = [
  {
    id: 'bots',
    title: 'Telegram-боты',
    description:
      'От информационных ботов до e-commerce с подписками, CRM и оплатой (включая Telegram Stars).',
    icon: 'bot' as const,
  },
  {
    id: 'parsers',
    title: 'Парсеры и автоматизация',
    description:
      'Сбор данных с сайтов, маркетплейсов и API. Мониторинг цен, вакансий, отзывов — 24/7.',
    icon: 'spider' as const,
  },
  {
    id: 'webapp',
    title: 'WebApp и сервисы',
    description:
      'Сайты, веб-сервисы и Telegram Mini Apps: удобный интерфейс + надёжный backend.',
    icon: 'globe' as const,
  },
  {
    id: 'ai',
    title: 'ИИ и агенты',
    description:
      'Чат-боты, RAG, MCP, n8n и LLM-пайплайны. Внедрение ИИ в существующие продукты.',
    icon: 'sparkles' as const,
  },
  {
    id: 'mobile',
    title: 'Мобильные приложения',
    description:
      'iOS и Android, включая публикацию в App Store и Google Play.',
    icon: 'smartphone' as const,
  },
  {
    id: 'deploy',
    title: 'Деплой и поддержка',
    description:
      'Docker, nginx, Linux. Запуск на сервере, мониторинг и поддержка после релиза.',
    icon: 'server' as const,
  },
]

export const processSteps = [
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
    description:
      'Правки по обратной связи, оптимизация и подготовка к продакшену.',
    result: 'Версия, готовая к продакшену',
  },
  {
    step: '04',
    title: 'Запуск и поддержка',
    description:
      'Деплой, доступы, стабильная работа 24/7. Остаюсь на связи после запуска.',
    result: 'Продукт на сервере, доступы у вас',
  },
]

export const faqItems = [
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
]

export const navLinks = [
  { href: '#about', label: 'Обо мне' },
  { href: '#services', label: 'Услуги' },
  { href: '#portfolio', label: 'Портфолио' },
  { href: '#process', label: 'Процесс' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Контакты' },
]
