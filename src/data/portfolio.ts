import type { Lang } from '../i18n/types.ts'

export type PortfolioCategory = 'ai' | 'bot' | 'parser' | 'other'

type PortfolioText = {
  title: string
  summary: string
  description: string
}

type PortfolioSource = {
  id: string
  ru: PortfolioText
  en: PortfolioText
  image: string
  /** Дополнительные скриншоты для галереи в модалке. Первый кадр — image. */
  gallery?: string[]
  /** Цена в рублях; null — по договорённости. */
  priceRub: number | null
  tags: string[]
  category: PortfolioCategory
}

/** Работа, уже собранная под конкретный язык. */
export type PortfolioItem = PortfolioText & {
  id: string
  image: string
  gallery?: string[]
  price: string
  tags: string[]
  category: PortfolioCategory
}

const EN: Record<string, PortfolioText> = {
  'roblox-ms-autobuy': {
    title: 'Roblox autobuy via Microsoft',
    summary: 'Bulk Robux purchases through Microsoft: login, three captchas, payment and delivery — all automatic.',
    description:
      'A bulk Robux purchasing script: it takes a single Roblox account or a whole list, goes through each one and completes the payment itself. Login solves three captchas — Cloudflare, PerimeterX and FunCaptcha — and 2FA is handled with a backup code. Then, through a Microsoft account, the script emulates the official Roblox client launched from the Microsoft Store: it creates the order, pays with the Microsoft payment method and confirms it so the Robux land on the account. You can buy a specific pack or any amount — say, 777 Robux: the script assembles it from the standard 80/500/1000/2000 packs. Results and cookies are written to files. Screenshots were retouched with AI: while running, the script prints sensitive data — cookies, proxies, URLs and tokens.',
  },
  'hoyo-autodonate': {
    title: 'HoYoverse auto top-up: panel + public API',
    summary: 'Panel and API for automatic top-ups. Dedicated Chrome, 3DS, scaling by workers.',
    description:
      'An automatic top-up service for Genshin Impact, Honkai: Star Rail, Zenless Zone Zero and Honkai Impact 3rd — a live product: genshinimpactautodonate.com. Orders come from the panel or the public API: game, server, account email and a list of items. Then a two-stage pipeline runs. First, an API login and a full account check — characters, storefront, cookies; dead accounts are dropped before a browser is started. If everything is alive, a dedicated Chrome spins up with a Google profile, user emulation and checkout, including 3DS codes read from email. The official storefront was taken apart and reverse-engineered, the queue lives in PostgreSQL behind PgBouncer, and workers pick up jobs on their own — scaling is just the number of containers and memory for Chrome. Three roles: users see their order, history and API token, moderators manage accounts and proxies, admins see pipeline stats by stage.',
  },
  turbommr: {
    title: 'TurboMMR: Dota 2 rating WebApp',
    summary: 'Mini App: Steam login, custom turbo MMR, weekly leaderboards and prize contests.',
    description:
      'A Telegram Mini App that tracks turbo rating in Dota 2. Players sign in with Steam OpenID — the service pulls matches from Steam and OpenDota and calculates its own MMR: the starting value comes from rank in recent turbo games, then +25 per win and −25 per loss. The profile shows an MMR card and W/L streak; the matches tab shows averages and highs over the last 20 games, a form bar and history with KDA, GPM, XPM and heroes. Weekly leaderboards by gold per minute, kills and damage, plus an all-time rating that never resets. Referral contests with tickets and a weighted prize lottery. React frontend in the WebApp, aiogram 3.x bot, profile cache in Redis, data in PostgreSQL behind PgBouncer, the whole stack in Docker on Linux.',
  },
  'ai-predictions': {
    title: 'AI-powered predictions WebApp',
    summary: 'AI understands a bet in plain text: finds the match, picks the outcome, builds an accumulator.',
    description:
      'A Telegram Mini App for sports predictions. Users type in plain words who they are looking for: "Real Madrid" or even "the most popular football club in Portugal" — the AI, via OpenRouter, finds the team and the match. Then they describe the bet in words: "home win" is recognized as an outcome on the first side; accumulators of several events are supported. Players use internal coins, not real money: there are contests with a prize pool, leaderboards per contest and all-time, a profile with stats and an admin panel for running contests and moderation. React frontend in the WebApp, aiogram 3.x bot, dialog context in Redis, data in PostgreSQL, the whole stack in Docker on Linux.',
  },
  'tech-parser-de': {
    title: 'Heavy-machinery scraper with AWS WAF bypass',
    summary: 'Three German marketplaces, Google Sheets matching and new finds straight to Telegram.',
    description:
      'A bot for a company that buys heavy machinery in the EU and resells it. The admin keeps a list of wanted machines and their specs in Google Sheets, and the scraper bypasses AWS WAF protection and constantly monitors three German marketplaces. As soon as a match appears, its card goes to the admins in the bot and to the team chat, and the record is duplicated into the same sheet through the API. There, managers add their prices and descriptions — and later search for machines right in the bot. Instead of browsing sites by hand, the department gets a single database and one place where all information is collected.',
  },
  'tarot-webapp': {
    title: 'Tarot service: WebApp + AI readings',
    summary: 'React Mini App, readings via OpenRouter, dialog memory in Redis and Tribute payments.',
    description:
      'A Telegram Mini App for tarot: React frontend inside the WebApp, aiogram 3.x bot. Readings and interpretations are written by an LLM through OpenRouter — a pool balancer spreads requests across keys and models, so the service never hits rate limits or goes down because of a single provider. Dialog context is stored in Redis: the chat remembers the user’s past readings and answers with them in mind. Subscriptions and one-off purchases run through Tribute, data lives in PostgreSQL, the whole stack in Docker on a Linux server.',
  },
  'adult-bot': {
    title: 'Adult bot with multi-copy launch',
    summary: '200,000 monthly users, a bot-copy factory and error monitoring.',
    description:
      'An adult service in Telegram on aiogram 3.x. Users deploy their own copy of the bot in a minute — this protects against bans, and the load is spread by a connection pool balancer. PostgreSQL and Redis keep state and queues, and the whole stack is packed in Docker. Error monitoring is in place: failures show up before anyone writes to support. It reliably serves 200,000 users every month.',
  },
  'ai-agent': {
    title: 'AI agent and website chat',
    summary: 'An MCP agent that manages services, reports and the calendar.',
    description:
      'A client from the USA. An AI agent and a simple website to control it. Through MCP the agent manages services: reports, messages to employees, the calendar schedule.',
  },
  'photo-bot': {
    title: 'AI photo generation bot',
    summary: 'Subscriptions + image generation on request.',
    description:
      'A Telegram bot with a subscription. An AI model generates photos from the user’s text prompt.',
  },
  'casino-parser': {
    title: 'Casino data scraper',
    summary: 'Data collection over sockets for model training.',
    description:
      'Data collection over sockets to train an AI model that predicts odds.',
  },
  'ai-chat-bot': {
    title: 'AI chatbot',
    summary: 'A Telegram bot that handles requests with AI.',
    description:
      'A Telegram chatbot that uses AI to process requests and provide information.',
  },
  'channel-bot': {
    title: 'AI bot for running a channel',
    summary: 'Post analytics and content recommendations.',
    description:
      'The bot connects to a channel and collects data on posts, reactions and views. Using AI, it gives advice on running the channel and on content format.',
  },
  'hh-parser': {
    title: 'HH.ru job scraper in Telegram',
    summary: 'Keyword-based job alerts with a subscription.',
    description:
      'Users buy a subscription and set keywords — the bot sends matching job openings. Ready-made categories are included.',
  },
  'funpay-parser': {
    title: 'FunPay scraper',
    summary: 'Products, prices and descriptions → CSV.',
    description:
      'A scraper that takes a product or catalog link: prices, descriptions, images. Output is CSV.',
  },
  'cpp-chat': {
    title: 'C++ chat',
    summary: 'Client-server app with encrypted messages and photos.',
    description:
      'A client-server chat in C++. Encryption on connect and when sending text and photos.',
  },
  'fb-market': {
    title: 'Facebook Marketplace scraper',
    summary: 'Collects listings and saves them to CSV.',
    description:
      'A scraper that takes a product or catalog link: prices, descriptions, images. Saves to CSV.',
  },
  'amazon-parser': {
    title: 'Amazon scraper',
    summary: 'Products, prices and reviews for a US client.',
    description: 'A client from the USA. Collects product, price and review data from Amazon.',
  },
  'ozon-parser': {
    title: 'OZON reviews scraper',
    summary: 'Dynamic element lookup in Chromium.',
    description:
      'Chromium engine. OZON elements are generated dynamically — the scraper finds the right blocks inside a stable container, with no fragile XPath.',
  },
  'wb-tracking': {
    title: 'Wildberries rank tracking',
    summary: 'Alerts when a product drops in search results.',
    description:
      'The bot notifies you when a product falls below a set position. Public and private tracks, group notifications, Wildberries internal API.',
  },
  payments: {
    title: 'Payments in a unit-economics bot',
    summary: 'Webhooks, subscriptions and expiry reminders.',
    description:
      'Added payments to a Wildberries unit-economics bot. Webhooks, subscription checks, reminders N days before expiry.',
  },
}

const items: PortfolioSource[] = [
  {
    id: 'roblox-ms-autobuy',
    ru: {
      title: 'Автобай Роблокс Майкрософт',
      summary: 'Массовая покупка робуксов через Microsoft: вход, три капчи, оплата и зачисление сами.',
      description:
        'Скрипт массовой покупки робуксов: на вход один аккаунт Roblox или целый список, дальше он проходит по каждому и сам проводит платёж. Вход в аккаунт с решением трёх капч — Cloudflare, PerimeterX и FunCaptcha, — 2FA закрывается бэкап-кодом. Затем через аккаунт Microsoft скрипт имитирует официальный клиент Roblox, запущенный из Microsoft Store: формирует заказ, оплачивает его способом оплаты Microsoft и сам подтверждает, чтобы робуксы пришли на аккаунт. Можно купить конкретный пак или любую сумму — например, 777 робуксов: скрипт сам соберёт её из стандартных паков 80/500/1000/2000. Результаты и куки пишутся в файлы. Скриншоты обработаны ИИ: в процессе работы скрипт выводит чувствительные данные — куки, прокси, URL и токены.',
    },
    en: EN['roblox-ms-autobuy'],
    image: 'roblox_autobuy/cover.webp',
    gallery: [
      'roblox_autobuy/01_start.webp',
      'roblox_autobuy/02_login.webp',
      'roblox_autobuy/03_purchase.webp',
    ],
    priceRub: 170000,
    tags: [
      'Python',
      'JavaScript',
      'aiohttp',
      'WinRT',
      'Microsoft Store',
      'Cloudflare',
      'PerimeterX',
      'FunCaptcha',
    ],
    category: 'other',
  },
  {
    id: 'hoyo-autodonate',
    ru: {
      title: 'Автодонат HoYoverse: панель + публичный API',
      summary: 'Панель и API для автопополнения. Свой Chrome, 3DS, масштаб воркерами.',
      description:
        'Сервис автопополнения для Genshin Impact, Honkai: Star Rail, Zenless Zone Zero и Honkai Impact 3rd — живой продукт: genshinimpactautodonate.com. Заказ ставится из панели или через публичный API: игра, сервер, почта аккаунта и список товаров. Дальше конвейер из двух этапов. Сначала логин по API и полная проверка аккаунта — персонажи, витрина, куки; мёртвый аккаунт отсекается до браузера. Если всё живо, поднимается свой Chrome с Google-профилем, имитацией пользователя и оплатой, включая 3DS-коды с почты. Официальная витрина разбиралась и реверсилась, очередь живёт в PostgreSQL за PgBouncer, воркеры забирают задачи сами — масштаб это число контейнеров и память под Chrome. Три роли: пользователь видит заказ, историю и свой API-токен, модер — аккаунты и прокси, админ — статистику конвейера по этапам.',
    },
    en: EN['hoyo-autodonate'],
    image: 'autodonate/cover.webp',
    gallery: [
      'autodonate/01_user_home.webp',
      'autodonate/02_donate.webp',
      'autodonate/08_games.webp',
      'autodonate/03_user_history.webp',
      'autodonate/05_api.webp',
      'autodonate/04_stats.webp',
      'autodonate/07_admin_home.webp',
      'autodonate/06_login.webp',
    ],
    priceRub: 280000,
    tags: [
      'FastAPI',
      'React',
      'PostgreSQL',
      'Chrome',
      'Docker',
      'PgBouncer',
      '3DS',
      'Public API',
      'Linux',
    ],
    category: 'other',
  },
  {
    id: 'turbommr',
    ru: {
      title: 'TurboMMR: WebApp рейтинга Dota 2',
      summary: 'Mini App: Steam-логин, свой MMR в турбо, лидерборды за неделю и конкурсы с призами.',
      description:
        'Telegram Mini App для трекинга турбо-рейтинга в Dota 2. Игрок входит через Steam OpenID — сервис тянет матчи из Steam и OpenDota и считает собственный MMR: старт по рангу в недавних турбо-играх, дальше +25 за победу и −25 за поражение. В профиле карточка с MMR и серией W/L, в матчах — средние и максимумы за последние 20 игр, полоска формы и история с KDA, GPM, XPM и героями. Лидерборды по золоту в минуту, убийствам и урону за неделю плюс общий рейтинг, который не сбрасывается. Реферальные конкурсы с билетами и взвешенной лотереей призов. Фронтенд на React в WebApp, бот на aiogram 3.x, кэш профилей в Redis, данные в PostgreSQL за PgBouncer, весь стек в Docker на Linux.',
    },
    en: EN['turbommr'],
    image: 'turbommr/cover.webp',
    gallery: [
      'turbommr/01_profile.webp',
      'turbommr/02_matches.webp',
      'turbommr/03_history.webp',
      'turbommr/04_leaders.webp',
      'turbommr/05_rating.webp',
      'turbommr/06_prizes.webp',
    ],
    priceRub: 130000,
    tags: [
      'React',
      'TypeScript',
      'FastAPI',
      'aiogram 3.x',
      'PostgreSQL',
      'Redis',
      'Steam API',
      'OpenDota',
      'Docker',
      'PgBouncer',
      'Linux',
    ],
    category: 'bot',
  },
  {
    id: 'ai-predictions',
    ru: {
      title: 'WebApp прогнозов на ИИ',
      summary: 'ИИ понимает ставку обычным текстом: находит матч, определяет исход, собирает экспресс.',
      description:
        'Telegram Mini App для прогнозов на спорт. Пользователь пишет обычным текстом, кого хочет найти: «Реал Мадрид» или даже «самая популярная команда по футболу в Португалии» — ИИ через OpenRouter сам подбирает команду и матч. Дальше он описывает ставку словами: «победа П1» распознаётся как исход на первого игрока; поддерживаются экспрессы из нескольких событий. Играют на внутренние ПИФ-коины, а не на деньги: есть конкурсы с призовым фондом, лидерборды за конкурс и за всё время, профиль со статистикой и админ-панель для запуска конкурсов и модерации. Фронтенд на React в WebApp, бот на aiogram 3.x, контекст диалога в Redis, данные в PostgreSQL, весь стек в Docker на Linux.',
    },
    en: EN['ai-predictions'],
    image: 'predict_bot/cover.webp',
    gallery: [
      'predict_bot/01_chat.webp',
      'predict_bot/02_menu.webp',
      'predict_bot/03_profile.webp',
      'predict_bot/04_predictions.webp',
      'predict_bot/05_rules.webp',
    ],
    priceRub: 185000,
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
    ru: {
      title: 'Парсер спецтехники с обходом AWS WAF',
      summary: 'Три немецкие площадки, сверка с Google Sheets и находки сразу в Telegram.',
      description:
        'Бот для компании, которая покупает спецтехнику в ЕС и продаёт в РФ. Админ ведёт в Google Sheets список нужной техники и её характеристики, а парсер обходит защиту AWS WAF и постоянно мониторит три немецкие площадки. Как только находится подходящая позиция, карточка уходит админам в бот и в рабочую группу, а запись через API дублируется в ту же таблицу. Там менеджеры проставляют свои цены и описания — и потом ищут нужную технику прямо в боте. Вместо ручного обхода сайтов у отдела появляется единая база и одна точка сбора информации.',
    },
    en: EN['tech-parser-de'],
    image: 'parser_de/cover.webp',
    gallery: ['parser_de/01_summary.webp'],
    priceRub: 145000,
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
    ru: {
      title: 'Таро-сервис: WebApp + ИИ-расклады',
      summary: 'Mini App на React, расклады через OpenRouter, память диалога в Redis и оплата Tribute.',
      description:
        'Telegram Mini App для таро: фронтенд на React внутри WebApp, бот на aiogram 3.x. Расклады и разборы пишет LLM через OpenRouter — балансировщик пулов распределяет запросы между ключами и моделями, поэтому сервис не упирается в лимиты и не встаёт из-за одного провайдера. Контекст диалога хранится в Redis: чат помнит прошлые расклады пользователя и отвечает с опорой на них. Подписки и разовые покупки подключены через Tribute, данные — в PostgreSQL, весь стек в Docker на Linux-сервере.',
    },
    en: EN['tarot-webapp'],
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
    priceRub: 120000,
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
    ru: {
      title: 'Adult-бот с мультизапуском копий',
      summary: '200 000 пользователей в месяц, фабрика копий ботов и мониторинг ошибок.',
      description:
        'Adult-сервис в Telegram на aiogram 3.x. Пользователь за минуту разворачивает собственную копию бота — это спасает от блокировок, а нагрузка распределяется балансировщиком пулов подключений. PostgreSQL и Redis держат состояние и очереди, весь стек упакован в Docker. Подключена система мониторинга ошибок: сбои видно раньше, чем о них напишут в поддержку. Стабильно обслуживает 200 000 пользователей ежемесячно.',
    },
    en: EN['adult-bot'],
    image: 'adult_bot/cover.webp',
    gallery: [
      'adult_bot/01_menu.webp',
      'adult_bot/02_multibot.webp',
      'adult_bot/03_styles.webp',
      'adult_bot/04_result.webp',
    ],
    priceRub: 175000,
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
    ru: {
      title: 'ИИ-агент и чат на сайте',
      summary: 'Агент с MCP для управления сервисами, отчётами и календарём.',
      description:
        'Заказчик из США. ИИ-агент и простой сайт для управления. Через MCP агент управляет сервисами: отчёты, сообщения сотрудникам, график в календаре.',
    },
    en: EN['ai-agent'],
    image: 'ai_chat.webp',
    priceRub: 650000,
    tags: ['Python', 'AWS', 'OpenAI SDK', 'LangChain', 'MCP'],
    category: 'ai',
  },
  {
    id: 'photo-bot',
    ru: {
      title: 'Бот для генерации фото',
      summary: 'Подписки + генерация изображений по запросу.',
      description:
        'Telegram-бот с подпиской. ИИ-модель генерирует фото по текстовому запросу пользователя.',
    },
    en: EN['photo-bot'],
    image: 'bot_ai_photo_generate.webp',
    priceRub: 30000,
    tags: ['Python', 'Genai', 'aiohttp', 'PostgreSQL', 'Redis'],
    category: 'bot',
  },
  {
    id: 'casino-parser',
    ru: {
      title: 'Парсер казино',
      summary: 'Сбор данных через сокеты для обучения модели.',
      description:
        'Сбор данных через сокеты для обучения ИИ-модели прогнозирования коэффициентов.',
    },
    en: EN['casino-parser'],
    image: 'parse_casino.webp',
    priceRub: 25000,
    tags: ['Python', 'RSocket', 'PostgreSQL'],
    category: 'parser',
  },
  {
    id: 'ai-chat-bot',
    ru: {
      title: 'Чат-бот с ИИ',
      summary: 'Telegram-бот для обработки запросов через ИИ.',
      description:
        'Чат-бот в Telegram, использующий ИИ для обработки запросов и предоставления информации.',
    },
    en: EN['ai-chat-bot'],
    image: 'bot_ai_generate.webp',
    priceRub: 40000,
    tags: ['Python', 'aiogram', 'PostgreSQL', 'Genai'],
    category: 'bot',
  },
  {
    id: 'channel-bot',
    ru: {
      title: 'ИИ-бот для ведения канала',
      summary: 'Аналитика постов и рекомендации по контенту.',
      description:
        'Бот подключается к каналу, собирает данные о постах, реакциях и просмотрах. Через ИИ даёт советы по ведению канала и формату контента.',
    },
    en: EN['channel-bot'],
    image: 'start.webp',
    priceRub: null,
    tags: ['Python', 'Telegram API', 'AI/ML'],
    category: 'ai',
  },
  {
    id: 'hh-parser',
    ru: {
      title: 'Парсер HH в Telegram',
      summary: 'Вакансии по ключам с подпиской и уведомлениями.',
      description:
        'Пользователь покупает подписку, задаёт ключевые слова — бот присылает найденные вакансии. Есть готовые категории.',
    },
    en: EN['hh-parser'],
    image: 'parse_hh_tg_bot.webp',
    priceRub: 30000,
    tags: ['Python', 'aiogram', 'PostgreSQL'],
    category: 'parser',
  },
  {
    id: 'funpay-parser',
    ru: {
      title: 'Парсер FunPay',
      summary: 'Товары, цены и описания → CSV.',
      description:
        'Парсер по ссылке на товар или каталог: цены, описания, изображения. Результат — CSV.',
    },
    en: EN['funpay-parser'],
    image: 'profi_funpay.webp',
    priceRub: null,
    tags: ['Python', 'Web Scraping', 'CSV'],
    category: 'parser',
  },
  {
    id: 'cpp-chat',
    ru: {
      title: 'Чат на C++',
      summary: 'Клиент-сервер с шифрованием сообщений и фото.',
      description:
        'Клиент-серверный чат на C++. Шифрование при подключении, отправке текста и фото.',
    },
    en: EN['cpp-chat'],
    image: 'cpp_chat.webp',
    priceRub: 50000,
    tags: ['C++', 'Криптография', 'Сокеты'],
    category: 'other',
  },
  {
    id: 'fb-market',
    ru: {
      title: 'Парсер Facebook Marketplace',
      summary: 'Сбор товаров и сохранение в CSV.',
      description:
        'Парсер по ссылке на товар или каталог: цены, описания, изображения. Сохранение в CSV.',
    },
    en: EN['fb-market'],
    image: 'faceebok_market.webp',
    priceRub: null,
    tags: ['Python', 'Web Scraping', 'CSV'],
    category: 'parser',
  },
  {
    id: 'amazon-parser',
    ru: {
      title: 'Парсер Amazon',
      summary: 'Товары, цены и отзывы для клиента из США.',
      description:
        'Клиент из США. Сбор данных о товарах, ценах и отзывах с Amazon.',
    },
    en: EN['amazon-parser'],
    image: 'amazon_parse.webp',
    priceRub: null,
    tags: ['Python', 'Selenium', 'CSV'],
    category: 'parser',
  },
  {
    id: 'ozon-parser',
    ru: {
      title: 'Парсер отзывов OZON',
      summary: 'Динамический поиск элементов в Chromium.',
      description:
        'Chromium-движок. Элементы OZON собираются динамически — парсер находит нужные блоки внутри стабильного контейнера, без хрупких xpath.',
    },
    en: EN['ozon-parser'],
    image: 'ozon_parser.webp',
    priceRub: 20000,
    tags: ['Python', 'Chromium', 'Web Scraping'],
    category: 'parser',
  },
  {
    id: 'wb-tracking',
    ru: {
      title: 'Трекинг позиций WB',
      summary: 'Уведомления, когда товар опускается в выдаче.',
      description:
        'Бот оповещает, когда товар опускается ниже заданной позиции. Публичные и личные треки, уведомления в группу, внутренний API WB.',
    },
    en: EN['wb-tracking'],
    image: 'wb_tracking_bot.webp',
    priceRub: 30000,
    tags: ['Python', 'aiogram', 'aiohttp', 'SQLite', 'WB API'],
    category: 'bot',
  },
  {
    id: 'payments',
    ru: {
      title: 'Платежи в боте (юнит-экономика)',
      summary: 'Webhook, подписки и напоминания об окончании.',
      description:
        'Внедрение платежей в бот расчёта юнит-экономики WB. Webhook, проверка подписки, напоминания об окончании за N времени.',
    },
    en: EN['payments'],
    image: 'payment_system_bot.webp',
    priceRub: 15000,
    tags: ['Python', 'FastAPI', 'aiogram', 'Webhook', 'Платежи'],
    category: 'bot',
  },
]

export const portfolioFilterIds = ['all', 'ai', 'bot', 'parser', 'other'] as const
export type PortfolioFilter = (typeof portfolioFilterIds)[number]

/** Теги с русскими словами; технологии и названия сервисов не переводим. */
const TAG_EN: Record<string, string> = {
  'Балансировщик пулов': 'Pool balancer',
  'Мониторинг ошибок': 'Error monitoring',
  Криптография: 'Cryptography',
  Сокеты: 'Sockets',
  Платежи: 'Payments',
}

/**
 * Курс для английской версии: цены там в долларах. Поменяйте число —
 * пересчитаются все работы. Суммы округляются до $50, чтобы не было «$1,587».
 */
const RUB_PER_USD = 80

function toUsd(rub: number) {
  return Math.max(50, Math.round(rub / RUB_PER_USD / 50) * 50)
}

function formatPrice(rub: number | null, lang: Lang) {
  if (rub === null) return lang === 'ru' ? 'По договорённости' : 'On request'
  return lang === 'ru'
    ? `${rub.toLocaleString('ru-RU')} ₽`
    : `$${toUsd(rub).toLocaleString('en-US')}`
}

const cache = new Map<Lang, PortfolioItem[]>()

export function portfolioFor(lang: Lang): PortfolioItem[] {
  let list = cache.get(lang)
  if (!list) {
    list = items.map((item) => ({
      ...item[lang],
      id: item.id,
      image: item.image,
      gallery: item.gallery,
      price: formatPrice(item.priceRub, lang),
      tags: lang === 'en' ? item.tags.map((tag) => TAG_EN[tag] ?? tag) : item.tags,
      category: item.category,
    }))
    cache.set(lang, list)
  }
  return list
}
