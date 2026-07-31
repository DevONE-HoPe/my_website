export type PortfolioItem = {
  id: string
  title: string
  summary: string
  description: string
  image: string
  /** Дополнительные скриншоты для галереи в модалке. Первый кадр — image. */
  gallery?: string[]
  price: string
  priceType: 'fixed' | 'custom'
  tags: string[]
  category: 'ai' | 'bot' | 'parser' | 'other'
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'ai-predictions',
    title: 'WebApp прогнозов на ИИ',
    summary: 'ИИ понимает ставку обычным текстом: находит матч, определяет исход, собирает экспресс.',
    description:
      'Telegram Mini App для прогнозов на спорт. Пользователь пишет обычным текстом, кого хочет найти: «Реал Мадрид» или даже «самая популярная команда по футболу в Португалии» — ИИ через OpenRouter сам подбирает команду и матч. Дальше он описывает ставку словами: «победа П1» распознаётся как исход на первого игрока; поддерживаются экспрессы из нескольких событий. Играют на внутренние ПИФ-коины, а не на деньги: есть конкурсы с призовым фондом, лидерборды за конкурс и за всё время, профиль со статистикой и админ-панель для запуска конкурсов и модерации. Фронтенд на React в WebApp, бот на aiogram 3.x, контекст диалога в Redis, данные в PostgreSQL, весь стек в Docker на Linux.',
    image: 'predict_bot/cover.webp',
    gallery: [
      'predict_bot/01_chat.webp',
      'predict_bot/02_menu.webp',
      'predict_bot/03_profile.webp',
      'predict_bot/04_predictions.webp',
      'predict_bot/05_rules.webp',
    ],
    price: '185 000 ₽',
    priceType: 'fixed',
    tags: [
      'OpenRouter',
      'aiogram 3.x',
      'React',
      'aiohttp',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Linux',
      'Балансировщик пулов',
    ],
    category: 'ai',
  },
  {
    id: 'tech-parser-de',
    title: 'Парсер спецтехники с обходом AWS WAF',
    summary: 'Три немецкие площадки, сверка с Google Sheets и находки сразу в Telegram.',
    description:
      'Бот для компании, которая покупает спецтехнику в ЕС и продаёт в РФ. Админ ведёт в Google Sheets список нужной техники и её характеристики, а парсер обходит защиту AWS WAF и постоянно мониторит три немецкие площадки. Как только находится подходящая позиция, карточка уходит админам в бот и в рабочую группу, а запись через API дублируется в ту же таблицу. Там менеджеры проставляют свои цены и описания — и потом ищут нужную технику прямо в боте. Вместо ручного обхода сайтов у отдела появляется единая база и одна точка сбора информации.',
    image: 'parser_de/cover.webp',
    gallery: ['parser_de/01_summary.webp'],
    price: '145 000 ₽',
    priceType: 'fixed',
    tags: [
      'aiogram 3.x',
      'aiohttp',
      'AWS WAF bypass',
      'Google Sheets API',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Linux',
      'Балансировщик пулов',
    ],
    category: 'parser',
  },
  {
    id: 'tarot-webapp',
    title: 'Таро-сервис: WebApp + ИИ-расклады',
    summary: 'Mini App на React, расклады через OpenRouter, память диалога в Redis и оплата Tribute.',
    description:
      'Telegram Mini App для таро: фронтенд на React внутри WebApp, бот на aiogram 3.x. Расклады и разборы пишет LLM через OpenRouter — балансировщик пулов распределяет запросы между ключами и моделями, поэтому сервис не упирается в лимиты и не встаёт из-за одного провайдера. Контекст диалога хранится в Redis: чат помнит прошлые расклады пользователя и отвечает с опорой на них. Подписки и разовые покупки подключены через Tribute, данные — в PostgreSQL, весь стек в Docker на Linux-сервере.',
    image: 'tarot_bot/cover.webp',
    gallery: [
      'tarot_bot/01_home.webp',
      'tarot_bot/02_topics.webp',
      'tarot_bot/03_form.webp',
      'tarot_bot/04_loading.webp',
      'tarot_bot/05_spread.webp',
      'tarot_bot/06_card.webp',
      'tarot_bot/07_analysis.webp',
      'tarot_bot/08_chat.webp',
      'tarot_bot/09_profile.webp',
    ],
    price: '120 000 ₽',
    priceType: 'fixed',
    tags: [
      'OpenRouter',
      'aiogram 3.x',
      'React',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Linux',
      'Балансировщик пулов',
      'Tribute',
    ],
    category: 'ai',
  },
  {
    id: 'adult-bot',
    title: 'Adult-бот с мультизапуском копий',
    summary: '200 000 пользователей в месяц, фабрика копий ботов и мониторинг ошибок.',
    description:
      'Adult-сервис в Telegram на aiogram 3.x. Пользователь за минуту разворачивает собственную копию бота — это спасает от блокировок, а нагрузка распределяется балансировщиком пулов подключений. PostgreSQL и Redis держат состояние и очереди, весь стек упакован в Docker. Подключена система мониторинга ошибок: сбои видно раньше, чем о них напишут в поддержку. Стабильно обслуживает 200 000 пользователей ежемесячно.',
    image: 'adult_bot/cover.webp',
    gallery: [
      'adult_bot/01_menu.webp',
      'adult_bot/02_multibot.webp',
      'adult_bot/03_styles.webp',
      'adult_bot/04_result.webp',
    ],
    price: '175 000 ₽',
    priceType: 'fixed',
    tags: [
      'aiogram 3.x',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Балансировщик пулов',
      'Мониторинг ошибок',
    ],
    category: 'bot',
  },
  {
    id: 'ai-agent',
    title: 'ИИ-агент и чат на сайте',
    summary: 'Агент с MCP для управления сервисами, отчётами и календарём.',
    description:
      'Заказчик из США. ИИ-агент и простой сайт для управления. Через MCP агент управляет сервисами: отчёты, сообщения сотрудникам, график в календаре.',
    image: 'ai_chat.webp',
    price: '650 000 ₽',
    priceType: 'fixed',
    tags: ['Python', 'AWS', 'OpenAI SDK', 'LangChain', 'MCP'],
    category: 'ai',
  },
  {
    id: 'photo-bot',
    title: 'Бот для генерации фото',
    summary: 'Подписки + генерация изображений по запросу.',
    description:
      'Telegram-бот с подпиской. ИИ-модель генерирует фото по текстовому запросу пользователя.',
    image: 'bot_ai_photo_generate.webp',
    price: '30 000 ₽',
    priceType: 'fixed',
    tags: ['Python', 'Genai', 'aiohttp', 'PostgreSQL', 'Redis'],
    category: 'bot',
  },
  {
    id: 'casino-parser',
    title: 'Парсер казино',
    summary: 'Сбор данных через сокеты для обучения модели.',
    description:
      'Сбор данных через сокеты для обучения ИИ-модели прогнозирования коэффициентов.',
    image: 'parse_casino.webp',
    price: '25 000 ₽',
    priceType: 'fixed',
    tags: ['Python', 'RSocket', 'PostgreSQL'],
    category: 'parser',
  },
  {
    id: 'ai-chat-bot',
    title: 'Чат-бот с ИИ',
    summary: 'Telegram-бот для обработки запросов через ИИ.',
    description:
      'Чат-бот в Telegram, использующий ИИ для обработки запросов и предоставления информации.',
    image: 'bot_ai_generate.webp',
    price: '40 000 ₽',
    priceType: 'fixed',
    tags: ['Python', 'aiogram', 'PostgreSQL', 'Genai'],
    category: 'bot',
  },
  {
    id: 'channel-bot',
    title: 'ИИ-бот для ведения канала',
    summary: 'Аналитика постов и рекомендации по контенту.',
    description:
      'Бот подключается к каналу, собирает данные о постах, реакциях и просмотрах. Через ИИ даёт советы по ведению канала и формату контента.',
    image: 'start.webp',
    price: 'По договорённости',
    priceType: 'custom',
    tags: ['Python', 'Telegram API', 'AI/ML'],
    category: 'ai',
  },
  {
    id: 'hh-parser',
    title: 'Парсер HH в Telegram',
    summary: 'Вакансии по ключам с подпиской и уведомлениями.',
    description:
      'Пользователь покупает подписку, задаёт ключевые слова — бот присылает найденные вакансии. Есть готовые категории.',
    image: 'parse_hh_tg_bot.webp',
    price: '30 000 ₽',
    priceType: 'fixed',
    tags: ['Python', 'aiogram', 'PostgreSQL'],
    category: 'parser',
  },
  {
    id: 'funpay-parser',
    title: 'Парсер FunPay',
    summary: 'Товары, цены и описания → CSV.',
    description:
      'Парсер по ссылке на товар или каталог: цены, описания, изображения. Результат — CSV.',
    image: 'profi_funpay.webp',
    price: 'По договорённости',
    priceType: 'custom',
    tags: ['Python', 'Web Scraping', 'CSV'],
    category: 'parser',
  },
  {
    id: 'cpp-chat',
    title: 'Чат на C++',
    summary: 'Клиент-сервер с шифрованием сообщений и фото.',
    description:
      'Клиент-серверный чат на C++. Шифрование при подключении, отправке текста и фото.',
    image: 'cpp_chat.webp',
    price: '50 000 ₽',
    priceType: 'fixed',
    tags: ['C++', 'Криптография', 'Сокеты'],
    category: 'other',
  },
  {
    id: 'fb-market',
    title: 'Парсер Facebook Marketplace',
    summary: 'Сбор товаров и сохранение в CSV.',
    description:
      'Парсер по ссылке на товар или каталог: цены, описания, изображения. Сохранение в CSV.',
    image: 'faceebok_market.webp',
    price: 'По договорённости',
    priceType: 'custom',
    tags: ['Python', 'Web Scraping', 'CSV'],
    category: 'parser',
  },
  {
    id: 'amazon-parser',
    title: 'Парсер Amazon',
    summary: 'Товары, цены и отзывы для клиента из США.',
    description:
      'Клиент из США. Сбор данных о товарах, ценах и отзывах с Amazon.',
    image: 'amazon_parse.webp',
    price: 'По договорённости',
    priceType: 'custom',
    tags: ['Python', 'Selenium', 'CSV'],
    category: 'parser',
  },
  {
    id: 'ozon-parser',
    title: 'Парсер отзывов OZON',
    summary: 'Динамический поиск элементов в Chromium.',
    description:
      'Chromium-движок. Элементы OZON собираются динамически — парсер находит нужные блоки внутри стабильного контейнера, без хрупких xpath.',
    image: 'ozon_parser.webp',
    price: '20 000 ₽',
    priceType: 'fixed',
    tags: ['Python', 'Chromium', 'Web Scraping'],
    category: 'parser',
  },
  {
    id: 'wb-tracking',
    title: 'Трекинг позиций WB',
    summary: 'Уведомления, когда товар опускается в выдаче.',
    description:
      'Бот оповещает, когда товар опускается ниже заданной позиции. Публичные и личные треки, уведомления в группу, внутренний API WB.',
    image: 'wb_tracking_bot.webp',
    price: '30 000 ₽',
    priceType: 'fixed',
    tags: ['Python', 'aiogram', 'aiohttp', 'SQLite', 'WB API'],
    category: 'bot',
  },
  {
    id: 'payments',
    title: 'Платежи в боте (юнит-экономика)',
    summary: 'Webhook, подписки и напоминания об окончании.',
    description:
      'Внедрение платежей в бот расчёта юнит-экономики WB. Webhook, проверка подписки, напоминания об окончании за N времени.',
    image: 'payment_system_bot.webp',
    price: '15 000 ₽',
    priceType: 'fixed',
    tags: ['Python', 'FastAPI', 'aiogram', 'Webhook', 'Платежи'],
    category: 'bot',
  },
]

export const portfolioFilters = [
  { id: 'all', label: 'Все' },
  { id: 'ai', label: 'ИИ' },
  { id: 'bot', label: 'Боты' },
  { id: 'parser', label: 'Парсеры' },
  { id: 'other', label: 'Другое' },
] as const
