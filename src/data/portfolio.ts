export type PortfolioItem = {
  id: string
  title: string
  summary: string
  description: string
  image: string
  price: string
  priceType: 'fixed' | 'custom'
  tags: string[]
  category: 'ai' | 'bot' | 'parser' | 'other'
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 'ai-agent',
    title: 'ИИ-агент и чат на сайте',
    summary: 'Агент с MCP для управления сервисами, отчётами и календарём.',
    description:
      'Заказчик из США. ИИ-агент и простой сайт для управления. Через MCP агент управляет сервисами: отчёты, сообщения сотрудникам, график в календаре.',
    image: 'ai_chat.png',
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
    image: 'bot_ai_photo_generate.jpg',
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
    image: 'parse_casino.png',
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
    image: 'bot_ai_generate.jpg',
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
    image: 'start.png',
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
    image: 'parse_hh_tg_bot.jpg',
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
    image: 'profi_funpay.png',
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
    image: 'cpp_chat.jpg',
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
    image: 'faceebok_market.png',
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
    image: 'amazon_parse.png',
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
    image: 'ozon_parser.png',
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
    image: 'wb_tracking_bot.jpg',
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
    image: 'payment_system_bot.png',
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
