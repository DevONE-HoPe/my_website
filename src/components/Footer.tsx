import { Send } from 'lucide-react'
import { profile } from '../data/content'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-7">
      <div className="container-page flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-muted">
          © {year} {profile.name} — Fullstack &amp; AI, продукты под ключ.
        </p>
        <a
          href={profile.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-sm text-subtle transition-colors hover:text-accent"
          aria-label="Telegram"
        >
          <Send size={15} />
          {profile.telegramHandle}
        </a>
      </div>
    </footer>
  )
}
