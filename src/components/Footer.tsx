import { Send } from 'lucide-react'
import { contacts, content } from '../data/content'
import { useLang } from '../i18n/context'
import { resumePdfFiles } from '../data/resume'
import { asset } from '../lib/asset'
import { track } from '../lib/track'

export function Footer() {
  const { lang, t } = useLang()
  const { profile } = content[lang]
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-7">
      <div className="container-page flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-muted">
          © {year} {profile.name} — {t.footer.tagline}
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#resume"
            className="font-mono text-sm text-subtle transition-colors hover:text-accent"
          >
            {t.footer.resume}
          </a>
          <a
            href={asset(resumePdfFiles.ru)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-subtle transition-colors hover:text-accent"
          >
            PDF RU
          </a>
          <a
            href={asset(resumePdfFiles.en)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-sm text-subtle transition-colors hover:text-accent"
          >
            PDF EN
          </a>
          <a
            href={contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('telegram_click', { place: 'footer' })}
            className="inline-flex items-center gap-2 font-mono text-sm text-subtle transition-colors hover:text-accent"
            aria-label="Telegram"
          >
            <Send size={15} />
            {contacts.telegramHandle}
          </a>
        </div>
      </div>
    </footer>
  )
}
