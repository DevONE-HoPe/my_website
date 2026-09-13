import { Send } from 'lucide-react'
import { profile } from '../data/content'
import { resumePdfFiles } from '../data/resume'
import { asset } from '../lib/asset'
import { track } from '../lib/track'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-7">
      <div className="container-page flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-muted">
          © {year} {profile.name} — Fullstack &amp; AI, продукты под ключ.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="#resume"
            className="font-mono text-sm text-subtle transition-colors hover:text-accent"
          >
            Резюме
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
            href={profile.telegram}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track('telegram_click', { place: 'footer' })}
            className="inline-flex items-center gap-2 font-mono text-sm text-subtle transition-colors hover:text-accent"
            aria-label="Telegram"
          >
            <Send size={15} />
            {profile.telegramHandle}
          </a>
        </div>
      </div>
    </footer>
  )
}
