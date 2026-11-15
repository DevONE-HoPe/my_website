import type { Lang } from './lang'

/** Строки интерфейса. Тексты разделов и работ — в src/data/*. */
const ru = {
  meta: {
    titlePrefix: 'Рамазан — ',
    titlePhrases: [
      'Fullstack & AI-разработчик',
      'Telegram-боты под ключ',
      'WebApp & Mini Apps',
      'Парсеры и автоматизация',
      'ИИ-агенты и RAG',
    ],
  },
  devtoolsBlocked: 'Закройте инструменты разработчика и обновите страницу.',
  nav: {
    main: 'Основная навигация',
    mobile: 'Мобильная навигация',
    menu: 'Меню',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    close: 'Закрыть',
    write: 'Написать',
    writeTelegram: 'Написать в Telegram',
    language: 'Язык',
  },
  hero: {
    available: 'Доступен к заказам',
    headline: 'Продукты под ключ:',
    rotating: ['Telegram-боты', 'Mini Apps', 'парсеры 24/7', 'ИИ-агенты', 'Android и iOS'],
    spec: {
      location: 'Локация',
      experience: 'Опыт',
      focus: 'Фокус',
      projects: 'Проектов',
      format: 'Формат',
      formatValue: 'от идеи до деплоя',
    },
    intro: (name: string, role: string) =>
      `Я ${name} — ${role}. Веду проект самостоятельно: архитектура, код, деплой и поддержка после запуска.`,
    discuss: 'Обсудить задачу',
    viewPortfolio: 'Смотреть портфолио',
    resume: 'Резюме',
  },
  about: {
    eyebrow: 'Обо мне',
    title: 'Кто делает вашу задачу',
    description: 'Коротко и по делу: кто я, чем занимаюсь и на чём строю решения.',
    photoAlt: (name: string) => `${name} — фото`,
    age: (n: number) => `${n} ${pluralRu(n, 'год', 'года', 'лет')}`,
    openResume: 'Открыть резюме (RU / EN, PDF) →',
    directions: 'Направления',
    stackTitle: 'Стек технологий',
    stackHint: 'С чем стабильно собираю продукты.',
    tools: (n: number) => `${n} ${pluralRu(n, 'инструмент', 'инструмента', 'инструментов')}`,
    legalTitle: 'Легально и удобно',
    legalHint: 'Работаю официально — с документами и понятной оплатой.',
  },
  services: {
    eyebrow: 'Услуги',
    title: 'Что могу сделать',
    description: 'Шесть направлений. Можно взять одно или собрать продукт целиком.',
  },
  portfolio: {
    eyebrow: 'Портфолио',
    title: 'Примеры работ',
    description:
      'Реальные проекты с ориентиром по цене. Нажмите на карточку, чтобы открыть детали.',
    filterLabel: 'Фильтр портфолио',
    filters: { all: 'Все', ai: 'ИИ', bot: 'Боты', parser: 'Парсеры', other: 'Другое' },
    range: (from: number, to: number, total: number) => `${from}–${to} из ${total}`,
    screens: (n: number) => `${n} ${pluralRu(n, 'скрин', 'скрина', 'скринов')}`,
    enlarge: 'Увеличить',
    openImage: (title: string) => `${title} — открыть изображение`,
    copyLinkLabel: 'Скопировать ссылку на работу',
    copied: 'Скопировано',
    link: 'Ссылка',
    close: 'Закрыть',
    openScreenshot: (n: number) => `Открыть скриншот ${n}`,
    screenshotAlt: (title: string, n: number) => `${title} — скриншот ${n}`,
    tech: 'Технологии',
    cta: 'Хочу такой же проект',
    ctaHint: 'Откроется Telegram — название работы уже будет в сообщении',
    telegramMessage: (title: string) =>
      `Здравствуйте! Смотрю работу «${title}» в портфолио — хочу похожий проект. Обсудим?`,
    pages: 'Страницы работ',
    prevPage: 'Предыдущая страница',
    nextPage: 'Следующая страница',
    page: (n: number) => `Страница ${n}`,
  },
  lightbox: {
    label: (title: string) => `${title} — просмотр изображения`,
    zoomOut: 'Отдалить',
    zoomIn: 'Приблизить',
    reset: 'Сбросить масштаб',
    close: 'Закрыть просмотр',
    prev: 'Предыдущий скриншот',
    next: 'Следующий скриншот',
    shot: (n: number) => `Скриншот ${n}`,
    hintDesktop: 'Колесо или двойной клик — зум, перетаскивание — панорама, клик мимо фото — закрыть',
    hintTouch: (many: boolean) =>
      `Пинч — зум${many ? ', свайп — кадр' : ''}, тап мимо фото — закрыть`,
  },
  process: {
    eyebrow: 'Процесс',
    title: 'Как идёт работа',
    description:
      'Четыре этапа — без лишней бюрократии, с понятным результатом на каждом шаге.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Частые вопросы',
    description:
      'Коротко о цене, сроках и процессе. Если чего-то нет — напишите в Telegram.',
  },
  contact: {
    eyebrow: 'Контакты',
    title: 'Обсудим вашу задачу',
    description:
      'Напишите в Telegram — отвечу, уточню детали и предложу план с ориентиром по срокам и цене.',
    channel: 'Основной канал связи. Опишите задачу — или просто спросите, реально ли её сделать.',
    promises: ['Быстрый MVP', 'Качество кода', 'Поддержка после запуска'],
  },
  footer: {
    tagline: 'Fullstack & AI, продукты под ключ.',
    resume: 'Резюме',
  },
  scrollTop: 'Наверх',
}

export type UiCopy = typeof ru

const en: UiCopy = {
  meta: {
    titlePrefix: 'Ramazan — ',
    titlePhrases: [
      'Fullstack & AI Developer',
      'Telegram bots, end to end',
      'WebApp & Mini Apps',
      'Scrapers & automation',
      'AI agents & RAG',
    ],
  },
  devtoolsBlocked: 'Close the developer tools and reload the page.',
  nav: {
    main: 'Main navigation',
    mobile: 'Mobile navigation',
    menu: 'Menu',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    close: 'Close',
    write: 'Message',
    writeTelegram: 'Message on Telegram',
    language: 'Language',
  },
  hero: {
    available: 'Available for projects',
    headline: 'Turnkey products:',
    rotating: ['Telegram bots', 'Mini Apps', 'scrapers 24/7', 'AI agents', 'Android & iOS'],
    spec: {
      location: 'Location',
      experience: 'Experience',
      focus: 'Focus',
      projects: 'Projects',
      format: 'Scope',
      formatValue: 'idea to deploy',
    },
    intro: (name: string, role: string) =>
      `I'm ${name}, a ${role}. I run projects on my own: architecture, code, deployment and support after launch.`,
    discuss: 'Discuss your project',
    viewPortfolio: 'View portfolio',
    resume: 'Resume',
  },
  about: {
    eyebrow: 'About',
    title: 'Who builds your product',
    description: 'In short: who I am, what I do, and what I build with.',
    photoAlt: (name: string) => `${name} — photo`,
    age: (n: number) => `${n} y.o.`,
    openResume: 'Open resume (RU / EN, PDF) →',
    directions: 'What I build',
    stackTitle: 'Tech stack',
    stackHint: 'What I reliably ship products with.',
    tools: (n: number) => `${n} ${n === 1 ? 'tool' : 'tools'}`,
    legalTitle: 'Official and easy',
    legalHint: 'I work officially — with contracts and clear payment terms.',
  },
  services: {
    eyebrow: 'Services',
    title: 'What I can build',
    description: 'Six areas. Pick one, or have the whole product built end to end.',
  },
  portfolio: {
    eyebrow: 'Portfolio',
    title: 'Selected work',
    description:
      'Real projects with a price reference. Tap a card to see the details.',
    filterLabel: 'Portfolio filter',
    filters: { all: 'All', ai: 'AI', bot: 'Bots', parser: 'Scrapers', other: 'Other' },
    range: (from: number, to: number, total: number) => `${from}–${to} of ${total}`,
    screens: (n: number) => `${n} ${n === 1 ? 'screenshot' : 'screenshots'}`,
    enlarge: 'Enlarge',
    openImage: (title: string) => `${title} — open image`,
    copyLinkLabel: 'Copy link to this project',
    copied: 'Copied',
    link: 'Link',
    close: 'Close',
    openScreenshot: (n: number) => `Open screenshot ${n}`,
    screenshotAlt: (title: string, n: number) => `${title} — screenshot ${n}`,
    tech: 'Technologies',
    cta: 'I want a project like this',
    ctaHint: 'Telegram will open with the project name already in the message',
    telegramMessage: (title: string) =>
      `Hi! I'm looking at "${title}" in your portfolio and would like a similar project. Can we discuss it?`,
    pages: 'Portfolio pages',
    prevPage: 'Previous page',
    nextPage: 'Next page',
    page: (n: number) => `Page ${n}`,
  },
  lightbox: {
    label: (title: string) => `${title} — image viewer`,
    zoomOut: 'Zoom out',
    zoomIn: 'Zoom in',
    reset: 'Reset zoom',
    close: 'Close viewer',
    prev: 'Previous screenshot',
    next: 'Next screenshot',
    shot: (n: number) => `Screenshot ${n}`,
    hintDesktop: 'Wheel or double-click to zoom, drag to pan, click outside the image to close',
    hintTouch: (many: boolean) =>
      `Pinch to zoom${many ? ', swipe to switch' : ''}, tap outside the image to close`,
  },
  process: {
    eyebrow: 'Process',
    title: 'How we work',
    description: 'Four stages — no extra bureaucracy, a clear result at every step.',
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'Frequently asked questions',
    description:
      'Price, timelines and process in short. If something is missing, message me on Telegram.',
  },
  contact: {
    eyebrow: 'Contact',
    title: "Let's discuss your project",
    description:
      "Message me on Telegram — I'll reply, clarify the details and suggest a plan with a time and price estimate.",
    channel: 'My main channel. Describe the task — or just ask whether it can be done.',
    promises: ['Fast MVP', 'Code quality', 'Support after launch'],
  },
  footer: {
    tagline: 'Fullstack & AI, turnkey products.',
    resume: 'Resume',
  },
  scrollTop: 'Back to top',
}

export const ui: Record<Lang, UiCopy> = { ru, en }

function pluralRu(n: number, one: string, few: string, many: string) {
  const tail = n % 100
  if (tail > 10 && tail < 20) return many
  const last = n % 10
  if (last === 1) return one
  if (last > 1 && last < 5) return few
  return many
}
