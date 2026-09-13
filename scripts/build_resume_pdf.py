#!/usr/bin/env python3
"""Build RU/EN one-to-two-page A4 CVs. Run: uv run --with reportlab python scripts/build_resume_pdf.py"""

from __future__ import annotations

import shutil
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_JUSTIFY, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "resume"
FONT_DIR = Path("/usr/share/fonts/truetype/noto")
PORTFOLIO = "https://devone-hope.github.io/my_website/"

INK = HexColor("#1a1a1a")
MUTED = HexColor("#5c5c5c")
ACCENT = HexColor("#2563eb")
LINE = HexColor("#e2e2e2")
RULE = HexColor("#d4d4d4")

pdfmetrics.registerFont(TTFont("NotoSans", str(FONT_DIR / "NotoSans-Regular.ttf")))
pdfmetrics.registerFont(TTFont("NotoSans-Bold", str(FONT_DIR / "NotoSans-Bold.ttf")))
pdfmetrics.registerFont(TTFont("NotoSans-Italic", str(FONT_DIR / "NotoSans-Italic.ttf")))
pdfmetrics.registerFont(TTFont("NotoSans-BoldItalic", str(FONT_DIR / "NotoSans-BoldItalic.ttf")))
pdfmetrics.registerFont(TTFont("NotoSansMono", str(FONT_DIR / "NotoSansMono-Regular.ttf")))


def href(url: str) -> str:
    if url.startswith("#"):
        return PORTFOLIO + url
    return url


def link(label: str, url: str) -> str:
    return f'<link href="{href(url)}" color="#2563eb">{label}</link>'


def nbsp(text: str) -> str:
    return text.replace(" ", "&nbsp;")


CONTACTS = {
    "telegram": "https://t.me/aiogram_tgbots",
    "telegram_handle": "@aiogram_tgbots",
    "email": "gameytub@gmail.com",
    "github": "https://github.com/devone-hope",
    "github_handle": "github.com/devone-hope",
    "portfolio": PORTFOLIO,
    "portfolio_label": "devone-hope.github.io/my_website",
    "phone": "+7 917 464-97-40",
}

RU = {
    "filename": "Zainutdinov_Ramazan_CV_RU.pdf",
    "portfolio_link": "портфолио",
    "title": "Зайнутдинов Рамазан Римович — резюме",
    "name": "Зайнутдинов Рамазан Римович",
    "role": "Backend / AI Engineer",
    "location": "Дананга, Вьетнам (UTC+7)  ·  готов к графику МСК",
    "intro": (
        "Python-разработчик: backend, Telegram-продукты и LLM-интеграции. "
        "Собираю сервисы под ключ — архитектура, код, деплой на Linux. "
        "Большую часть заказов вёл сам: от разговора с заказчиком до сдачи. "
        "Сейчас живу в Дананге, работаю удалённо и закрываю график Москвы."
    ),
    "strengths_title": "Сильные стороны",
    "strengths": [
        "Много работал напрямую с заказчиками. Задачу и результат объясняю бизнесовым языком: что получаем, зачем, какой эффект — без простыни из технологий. Умею преподнести проект так, чтобы его понял не только разработчик.",
        "Большой опыт QA на разных слоях: интерфейс сайта и приложения, ревью и тестирование кода, проверка БД и сервера. Не отдаю «вроде работает».",
        "Есть опыт в информационной безопасности: харденинг Linux-серверов (TLS, fail2ban, пользователи и права), шифрование канала в клиент-серверных сервисах, базовая модель доступа в проде.",
    ],
    "stack_title": "Стек",
    "stack": [
        ("Языки", "Python, TypeScript / JavaScript, SQL, C++ (базовый)"),
        ("Фреймворки", "FastAPI, aiogram 3, React, aiohttp"),
        ("БД", "PostgreSQL, Redis, MongoDB, PgBouncer"),
        ("Инфра", "Docker, nginx, Linux, Kubernetes, AWS, GitLab, GitHub Actions, CI/CD"),
        ("AI / наблюдение", "OpenAI / Claude / Gemini API, OpenRouter, RAG, MCP, LangChain, Sentry, Prometheus, Grafana, Kibana"),
        ("Процессы", "Jira, YouTrack, канбан"),
    ],
    "exp_title": "Опыт",
    "jobs": [
        {
            "company": "Независимый разработчик",
            "role": "Backend / AI, продукты под ключ",
            "period": "Февраль 2025 — н.в.",
            "place": "Дананга · удалённо · ИП",
            "bullets": [
                "Собрал сервис автопополнения HoYoverse (Genshin, HSR, ZZZ): панель, публичный API, очередь в PostgreSQL за PgBouncer, воркеры со своим Chrome и 3DS. Продукт в проде — genshinimpactautodonate.com.",
                "Сделал Telegram Mini Apps с нуля: TurboMMR (Steam OpenID, свой MMR по турбо-матчам Dota 2, лидерборды), таро и спортивные прогнозы на LLM через OpenRouter с балансировкой ключей и памятью диалога в Redis.",
                "Поднял высоконагруженный Telegram-сервис с фабрикой копий ботов — около 200 000 пользователей в месяц, пулы подключений, мониторинг ошибок.",
                "Парсер спецтехники для импорта из ЕС: три немецкие площадки, обход AWS WAF, сверка с Google Sheets, карточки сразу в рабочую группу в Telegram.",
            ],
        },
        {
            "company": "AI-лаборатория «Решение»",
            "role": "ML / AI-инженер (Python)",
            "period": "Май 2023 — январь 2025",
            "place": "Казань · удалённо",
            "bullets": [
                "Вывел в прод API обработки фото: кластер из 11 VPS (CPU и GPU), Kubernetes, FastAPI, nginx на две реплики, RabbitMQ. Сервис принимал запросы с сайта и из Telegram-бота, инференс — платная услуга.",
                "Адаптировал однопоточную PyTorch-модель (.pt) под параллельные запросы — исходный инференс не был рассчитан на продакшен.",
                "Собрал Telegram-ботов на aiogram с ИИ: контекст пользователя вне модели, RAG, function calling, MCP; видео и аудио. Наблюдаемость — Sentry, Prometheus, Grafana.",
                "Делал мультимодельные LLM-агенты на Python: разбор рынка криптовалют (Gemini) и агент, который управляет браузером через расширение.",
            ],
        },
        {
            "company": "Коммерческая разработка",
            "role": "Python-разработчик",
            "period": "Март 2021 — декабрь 2023",
            "place": "Фриланс · заказы через Profi.ru и напрямую",
            "bullets": [
                "Парсеры статики и динамики на Selenium, Playwright и undetected-chromedriver: маркетплейсы, вакансии, отзывы — с выгрузкой в CSV и уведомлениями в Telegram.",
                "Telegram-боты с подписками и генерацией текста/изображений, платежи по webhook на FastAPI. Бот продажи авто с динамической локализацией под разные страны (Docker, PostgreSQL, Redis).",
                "Администрировал Ubuntu с упором на безопасность: nginx, TLS (Let’s Encrypt), fail2ban, пользователи и права, базовая модель доступа.",
            ],
        },
    ],
    "proj_title": "Проекты",
    "proj_note": (
        "Код клиентских проектов — в закрытых репозиториях. "
        "Разборы и скриншоты — в портфолио, демо — где заказчик оставил публичный доступ."
    ),
    "projects": [
        {
            "title": "Автодонат HoYoverse",
            "yours": "Весь конвейер: API, панель, очередь, воркеры, роли, деплой",
            "description": "Заказ из панели или по публичному API, проверка аккаунта, Chrome с оплатой и 3DS. Очередь в PostgreSQL, масштаб — число контейнеров.",
            "links": [
                ("Демо", "https://genshinimpactautodonate.com"),
                ("Кейс", "#work-hoyo-autodonate"),
            ],
        },
        {
            "title": "TurboMMR — Mini App рейтинга Dota 2",
            "yours": "Mini App, backend, бот, Steam/OpenDota, деплой",
            "description": "Вход через Steam, свой MMR по турбо-матчам, лидерборды и конкурсы с призами. React + FastAPI + aiogram, Redis, Docker.",
            "links": [("Кейс", "#work-turbommr")],
        },
        {
            "title": "Таро-сервис: WebApp + ИИ-расклады",
            "yours": "Mini App, LLM-пайплайн, оплаты, память диалога",
            "description": "Расклады через OpenRouter с балансировкой ключей, контекст в Redis, подписки Tribute, PostgreSQL, Docker на Linux.",
            "links": [("Кейс", "#work-tarot-webapp")],
        },
        {
            "title": "Парсер спецтехники (DE)",
            "yours": "Парсер, обход WAF, бот, связка с Google Sheets",
            "description": "Мониторинг трёх немецких площадок, находки в Telegram и в таблицу. Вместо ручного обхода сайтов — одна база для отдела.",
            "links": [("Кейс", "#work-tech-parser-de")],
        },
    ],
    "edu_title": "Образование",
    "edu": "Среднее общее образование",
    "lang_title": "Языки",
    "langs": [
        "Русский — родной",
        "Татарский — родной",
        "Английский — B1: читаю документацию и рабочую переписку, говорить сложнее",
    ],
    "format_title": "Формат",
    "format": [
        "Удалённо, полная занятость или длинный проект",
        "График МСК, сейчас UTC+7",
        "ИП, договор с ООО и ИП",
    ],
}

EN = {
    "filename": "Zainutdinov_Ramazan_CV_EN.pdf",
    "portfolio_link": "portfolio",
    "title": "Ramazan Zainutdinov — CV",
    "name": "Ramazan Zainutdinov",
    "role": "Backend / AI Engineer",
    "location": "Da Nang, Vietnam (UTC+7)  ·  available for Moscow hours",
    "intro": (
        "Python engineer: backend, Telegram products, and LLM integrations. "
        "I ship services end to end — architecture, code, Linux deploy. "
        "I ran most client work myself, from the first call to delivery, "
        "and I can present a project in business language, not only in APIs. "
        "Based in Da Nang, remote, available on Moscow hours."
    ),
    "strengths_title": "Strengths",
    "strengths": [
        "Years of direct client work. I explain the product in business terms: what you get, why it matters, what changes — not a dump of technologies. I can pitch a project so a non-engineer understands it.",
        "Strong QA across layers: UI of the site or app, code review and testing, database checks, server and deploy. I do not ship “it seems to work”.",
        "Hands-on information security: Linux hardening (TLS, fail2ban, users and permissions), channel encryption in client-server apps, baseline access control in production.",
    ],
    "stack_title": "Stack",
    "stack": [
        ("Languages", "Python, TypeScript / JavaScript, SQL, C++ (basic)"),
        ("Frameworks", "FastAPI, aiogram 3, React, aiohttp"),
        ("Databases", "PostgreSQL, Redis, MongoDB, PgBouncer"),
        ("Infra", "Docker, nginx, Linux, Kubernetes, AWS, GitLab, GitHub Actions, CI/CD"),
        ("AI / observability", "OpenAI / Claude / Gemini API, OpenRouter, RAG, MCP, LangChain, Sentry, Prometheus, Grafana, Kibana"),
        ("Process", "Jira, YouTrack, Kanban"),
    ],
    "exp_title": "Experience",
    "jobs": [
        {
            "company": "Independent engineer",
            "role": "Backend / AI, end-to-end products",
            "period": "Feb 2025 — present",
            "place": "Da Nang · remote · sole proprietor",
            "bullets": [
                "Built a HoYoverse top-up service (Genshin, HSR, ZZZ): admin panel, public API, PostgreSQL queue behind PgBouncer, workers with a dedicated Chrome and 3DS. Live product: genshinimpactautodonate.com.",
                "Shipped Telegram Mini Apps from scratch: TurboMMR (Steam OpenID, custom turbo MMR for Dota 2, leaderboards), tarot and sports-prediction apps on LLMs via OpenRouter with key pooling and Redis dialog memory.",
                "Ran a high-load Telegram service with a bot-copy factory — about 200,000 monthly users, connection pools, error monitoring.",
                "Heavy-machinery parser for EU import: three German marketplaces, AWS WAF bypass, Google Sheets sync, new listings pushed to the team Telegram chat.",
            ],
        },
        {
            "company": "AI Lab “Reshenie”",
            "role": "ML / AI engineer (Python)",
            "period": "May 2023 — Jan 2025",
            "place": "Kazan · remote",
            "bullets": [
                "Shipped a production photo-processing API: 11-VPS cluster (CPU and GPU), Kubernetes, FastAPI, nginx in front of two replicas, RabbitMQ. The service served a website and a Telegram bot; inference was a paid product.",
                "Adapted a single-threaded PyTorch checkpoint (.pt) for concurrent traffic — the upstream model was not built for production load.",
                "Built Telegram bots on aiogram with LLMs: user context stored outside the model, RAG, function calling, MCP; video and audio. Observability via Sentry, Prometheus, Grafana.",
                "Built multi-model LLM agents in Python: a crypto-market analyst (Gemini) and a browser-control agent via an extension.",
            ],
        },
        {
            "company": "Commercial freelance",
            "role": "Python developer",
            "period": "Mar 2021 — Dec 2023",
            "place": "Freelance · Profi.ru and direct clients",
            "bullets": [
                "Parsers for static and dynamic sites with Selenium, Playwright, and undetected-chromedriver: marketplaces, jobs, reviews — CSV export and Telegram alerts.",
                "Telegram bots with subscriptions and text/image generation, FastAPI payment webhooks. A car-sales bot with dynamic localization for different countries (Docker, PostgreSQL, Redis).",
                "Administered Ubuntu with a security focus: nginx, TLS (Let’s Encrypt), fail2ban, users and permissions, baseline access control.",
            ],
        },
    ],
    "proj_title": "Selected work",
    "proj_note": (
        "Client code lives in private repos. Case studies and screenshots are in the portfolio; "
        "live demos where the client kept them public."
    ),
    "projects": [
        {
            "title": "HoYoverse auto top-up",
            "yours": "Full pipeline: API, panel, queue, workers, roles, deploy",
            "description": "Order from the panel or public API, account check, Chrome checkout with 3DS. Queue in PostgreSQL; scale is container count.",
            "links": [
                ("Live", "https://genshinimpactautodonate.com"),
                ("Case", "#work-hoyo-autodonate"),
            ],
        },
        {
            "title": "TurboMMR — Dota 2 rating Mini App",
            "yours": "Mini App, backend, bot, Steam/OpenDota, deploy",
            "description": "Steam login, custom turbo MMR, leaderboards and prize contests. React + FastAPI + aiogram, Redis, Docker.",
            "links": [("Case", "#work-turbommr")],
        },
        {
            "title": "Tarot service: WebApp + LLM spreads",
            "yours": "Mini App, LLM pipeline, payments, dialog memory",
            "description": "Spreads via OpenRouter with key pooling, Redis context, Tribute subscriptions, PostgreSQL, Docker on Linux.",
            "links": [("Case", "#work-tarot-webapp")],
        },
        {
            "title": "Heavy-machinery parser (DE)",
            "yours": "Parser, WAF bypass, bot, Google Sheets sync",
            "description": "Monitors three German sites, sends hits to Telegram and a spreadsheet. One shared catalog instead of manual browsing.",
            "links": [("Case", "#work-tech-parser-de")],
        },
    ],
    "edu_title": "Education",
    "edu": "Secondary education",
    "lang_title": "Languages",
    "langs": [
        "Russian — native",
        "Tatar — native",
        "English — B1: I read docs and work email; speaking is harder",
    ],
    "format_title": "Work format",
    "format": [
        "Remote, full-time or a longer contract",
        "Moscow hours, currently UTC+7",
        "Sole proprietor, contracts with companies",
    ],
}


def styles() -> dict[str, ParagraphStyle]:
    return {
        "name": ParagraphStyle(
            "name",
            fontName="NotoSans-Bold",
            fontSize=18,
            leading=22,
            textColor=INK,
            spaceAfter=2,
        ),
        "role": ParagraphStyle(
            "role",
            fontName="NotoSans",
            fontSize=10.5,
            leading=14,
            textColor=ACCENT,
            spaceAfter=1,
        ),
        "loc": ParagraphStyle(
            "loc",
            fontName="NotoSans",
            fontSize=9,
            leading=12,
            textColor=MUTED,
            spaceAfter=6,
        ),
        "contacts": ParagraphStyle(
            "contacts",
            fontName="NotoSans",
            fontSize=8.5,
            leading=12,
            textColor=INK,
            spaceAfter=8,
        ),
        "intro": ParagraphStyle(
            "intro",
            fontName="NotoSans",
            fontSize=9.2,
            leading=13,
            textColor=INK,
            alignment=TA_JUSTIFY,
            spaceAfter=2,
        ),
        "section": ParagraphStyle(
            "section",
            fontName="NotoSans-Bold",
            fontSize=9,
            leading=12,
            textColor=ACCENT,
            spaceBefore=6,
            spaceAfter=3,
            tracking=0.6,
        ),
        "stack_label": ParagraphStyle(
            "stack_label",
            fontName="NotoSans-Bold",
            fontSize=8.2,
            leading=11,
            textColor=MUTED,
        ),
        "stack_items": ParagraphStyle(
            "stack_items",
            fontName="NotoSans",
            fontSize=8.5,
            leading=11.5,
            textColor=INK,
        ),
        "job_company": ParagraphStyle(
            "job_company",
            fontName="NotoSans-Bold",
            fontSize=10,
            leading=13,
            textColor=INK,
        ),
        "job_period": ParagraphStyle(
            "job_period",
            fontName="NotoSans",
            fontSize=8.5,
            leading=12,
            textColor=MUTED,
            alignment=TA_RIGHT,
        ),
        "job_role": ParagraphStyle(
            "job_role",
            fontName="NotoSans",
            fontSize=8.7,
            leading=12,
            textColor=ACCENT,
        ),
        "job_place": ParagraphStyle(
            "job_place",
            fontName="NotoSans-Italic",
            fontSize=8.2,
            leading=11,
            textColor=MUTED,
            spaceAfter=3,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            fontName="NotoSans",
            fontSize=8.7,
            leading=12,
            textColor=INK,
        ),
        "note": ParagraphStyle(
            "note",
            fontName="NotoSans-Italic",
            fontSize=8,
            leading=11,
            textColor=MUTED,
            spaceAfter=5,
        ),
        "proj_title": ParagraphStyle(
            "proj_title",
            fontName="NotoSans-Bold",
            fontSize=9.2,
            leading=12,
            textColor=INK,
        ),
        "proj_links": ParagraphStyle(
            "proj_links",
            fontName="NotoSans",
            fontSize=8,
            leading=11,
            textColor=ACCENT,
            alignment=TA_RIGHT,
        ),
        "proj_yours": ParagraphStyle(
            "proj_yours",
            fontName="NotoSans-Italic",
            fontSize=8,
            leading=11,
            textColor=MUTED,
        ),
        "proj_desc": ParagraphStyle(
            "proj_desc",
            fontName="NotoSans",
            fontSize=8.5,
            leading=11.5,
            textColor=INK,
            spaceAfter=2,
        ),
        "small": ParagraphStyle(
            "small",
            fontName="NotoSans",
            fontSize=8.7,
            leading=12,
            textColor=INK,
        ),
        "small_label": ParagraphStyle(
            "small_label",
            fontName="NotoSans-Bold",
            fontSize=8.2,
            leading=11,
            textColor=MUTED,
        ),
    }


def section_rule() -> HRFlowable:
    return HRFlowable(
        width="100%",
        thickness=0.6,
        color=RULE,
        spaceBefore=0,
        spaceAfter=6,
    )


def contact_block(s: dict[str, ParagraphStyle], portfolio_label: str) -> Table:
    c = CONTACTS
    line1 = "  ·  ".join(
        [
            link(c["telegram_handle"], c["telegram"]),
            link(c["email"], f"mailto:{c['email']}"),
            nbsp(c["phone"]),
        ]
    )
    line2 = "  ·  ".join(
        [
            link(c["github_handle"], c["github"]),
            link(portfolio_label, c["portfolio"]),
        ]
    )
    table = Table(
        [[Paragraph(line1, s["contacts"])], [Paragraph(line2, s["contacts"])]],
        colWidths=[A4[0] - 36 * mm],
    )
    table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, 0), 1),
                ("BOTTOMPADDING", (0, 1), (-1, 1), 6),
            ]
        )
    )
    return table


def build_story(data: dict, s: dict[str, ParagraphStyle]) -> list:
    story: list = [
        Paragraph(data["name"], s["name"]),
        Paragraph(data["role"], s["role"]),
        Paragraph(data["location"], s["loc"]),
        contact_block(s, data["portfolio_link"]),
        HRFlowable(width="100%", thickness=0.8, color=ACCENT, spaceBefore=0, spaceAfter=8),
        Paragraph(data["intro"], s["intro"]),
        Paragraph(data["strengths_title"].upper(), s["section"]),
        section_rule(),
        ListFlowable(
            [
                ListItem(Paragraph(item, s["bullet"]), leftIndent=8, bulletColor=ACCENT)
                for item in data["strengths"]
            ],
            bulletType="bullet",
            start="•",
            leftIndent=10,
            bulletFontName="NotoSans",
            bulletFontSize=8,
            spaceBefore=0,
            spaceAfter=2,
        ),
        Paragraph(data["stack_title"].upper(), s["section"]),
        section_rule(),
    ]

    page_w = A4[0] - 36 * mm
    stack_rows = [
        [
            Paragraph(label, s["stack_label"]),
            Paragraph(items, s["stack_items"]),
        ]
        for label, items in data["stack"]
    ]
    stack = Table(stack_rows, colWidths=[32 * mm, page_w - 32 * mm])
    stack.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (0, -1), 8),
                ("RIGHTPADDING", (1, 0), (1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 1.4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 1.4),
            ]
        )
    )
    story.append(stack)

    story.append(Paragraph(data["exp_title"].upper(), s["section"]))
    story.append(section_rule())

    for job in data["jobs"]:
        head = Table(
            [
                [
                    Paragraph(job["company"], s["job_company"]),
                    Paragraph(job["period"], s["job_period"]),
                ]
            ],
            colWidths=[page_w - 42 * mm, 42 * mm],
        )
        head.setStyle(
            TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "BOTTOM"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                ]
            )
        )
        bullets = ListFlowable(
            [
                ListItem(Paragraph(b, s["bullet"]), leftIndent=8, bulletColor=ACCENT)
                for b in job["bullets"]
            ],
            bulletType="bullet",
            start="•",
            leftIndent=10,
            bulletFontName="NotoSans",
            bulletFontSize=8,
            spaceBefore=1,
            spaceAfter=2,
        )
        block = [
            head,
            Paragraph(job["role"], s["job_role"]),
            Paragraph(job["place"], s["job_place"]),
            bullets,
            Spacer(1, 5),
        ]
        story.append(KeepTogether(block))

    def project_block(proj: dict) -> list:
        links = "  ·  ".join(link(label, url) for label, url in proj["links"])
        head = Table(
            [
                [
                    Paragraph(proj["title"], s["proj_title"]),
                    Paragraph(links, s["proj_links"]),
                ]
            ],
            colWidths=[page_w * 0.62, page_w * 0.38],
        )
        head.setStyle(
            TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                ]
            )
        )
        return [
            head,
            Paragraph(proj["yours"], s["proj_yours"]),
            Paragraph(proj["description"], s["proj_desc"]),
            Spacer(1, 6),
        ]

    first, *rest = data["projects"]
    story.append(
        KeepTogether(
            [
                Paragraph(data["proj_title"].upper(), s["section"]),
                section_rule(),
                Paragraph(data["proj_note"], s["note"]),
                *project_block(first),
            ]
        )
    )
    for proj in rest:
        story.append(KeepTogether(project_block(proj)))

    col_edu, col_lang, col_fmt = page_w * 0.24, page_w * 0.42, page_w * 0.34
    meta = Table(
        [
            [
                Paragraph(data["edu_title"].upper(), s["section"]),
                Paragraph(data["lang_title"].upper(), s["section"]),
                Paragraph(data["format_title"].upper(), s["section"]),
            ],
            [
                HRFlowable(width="95%", thickness=0.6, color=RULE, spaceBefore=0, spaceAfter=4),
                HRFlowable(width="95%", thickness=0.6, color=RULE, spaceBefore=0, spaceAfter=4),
                HRFlowable(width="95%", thickness=0.6, color=RULE, spaceBefore=0, spaceAfter=4),
            ],
            [
                Paragraph(data["edu"], s["small"]),
                Paragraph("<br/>".join(data["langs"]), s["small"]),
                Paragraph("<br/>".join(data["format"]), s["small"]),
            ],
        ],
        colWidths=[col_edu, col_lang, col_fmt],
    )
    meta.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (1, -1), 8),
                ("RIGHTPADDING", (2, 0), (2, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    story.append(KeepTogether([Spacer(1, 4), meta]))

    return story


def draw_page(canvas, doc, name: str, email: str) -> None:
    canvas.saveState()
    canvas.setFillColor(ACCENT)
    canvas.rect(0, A4[1] - 3.2 * mm, A4[0], 3.2 * mm, fill=1, stroke=0)
    canvas.setFillColor(LINE)
    canvas.rect(18 * mm, 12 * mm, A4[0] - 36 * mm, 0.3, fill=1, stroke=0)
    canvas.setFillColor(MUTED)
    canvas.setFont("NotoSans", 7.5)
    canvas.drawString(18 * mm, 7.5 * mm, f"{name}  ·  {email}")
    canvas.drawRightString(A4[0] - 18 * mm, 7.5 * mm, str(doc.page))
    canvas.restoreState()


def write_pdf(data: dict, path: Path) -> None:
    s = styles()
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        leftMargin=18 * mm,
        rightMargin=18 * mm,
        topMargin=14 * mm,
        bottomMargin=16 * mm,
        title=data["title"],
        author=data["name"],
        subject=data["role"],
        creator="resume builder",
    )
    story = build_story(data, s)
    doc.build(
        story,
        onFirstPage=lambda c, d: draw_page(c, d, data["name"], CONTACTS["email"]),
        onLaterPages=lambda c, d: draw_page(c, d, data["name"], CONTACTS["email"]),
    )


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    downloads = Path.home() / "Загрузки"
    copies = {
        RU["filename"]: "Зайнутдинов_Рамазан_резюме.pdf",
        EN["filename"]: "Zainutdinov_Ramazan_CV.pdf",
    }

    short = {
        RU["filename"]: ROOT / "public" / "resume-ru.pdf",
        EN["filename"]: ROOT / "public" / "resume-en.pdf",
    }

    for data in (RU, EN):
        dest = OUT_DIR / data["filename"]
        write_pdf(data, dest)
        print(f"wrote {dest}")
        shutil.copy2(dest, short[data["filename"]])
        print(f"copied → {short[data['filename']]}")
        if downloads.is_dir():
            send_name = copies[data["filename"]]
            shutil.copy2(dest, downloads / send_name)
            shutil.copy2(dest, downloads / data["filename"])
            print(f"copied → {downloads / send_name}")


if __name__ == "__main__":
    main()
