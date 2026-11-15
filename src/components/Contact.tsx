import { Clock, MessageCircle, Send, Shield } from 'lucide-react'
import { contacts } from '../data/content'
import { useLang } from '../i18n/context'
import { track } from '../lib/track'
import { Button } from './ui/Button'
import { Section } from './ui/Section'
import { Reveal } from './motion/Reveal'

const PROMISE_ICONS = [Clock, Shield, MessageCircle]

export function Contact() {
  const { t } = useLang()
  return (
    <Section
      id="contact"
      eyebrow={t.contact.eyebrow}
      title={t.contact.title}
      description={t.contact.description}
      className="min-h-[calc(100svh-6.5rem)] border-t border-border/60"
      narrow
    >
      <Reveal className="mx-auto max-w-xl rounded-card border border-accent/25 bg-gradient-to-b from-elevated to-surface p-6 text-center sm:p-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-chip border border-accent/30 bg-accent/10 text-accent">
          <MessageCircle size={22} />
        </div>
        <h3 className="display text-2xl text-fg">Telegram</h3>
        <p className="mx-auto mt-2 max-w-sm text-base text-subtle">
          {t.contact.channel}
        </p>

        <div className="mt-5">
          <Button
            href={contacts.telegram}
            external
            className="w-full sm:w-auto"
            onClick={() => track('telegram_click', { place: 'contact' })}
          >
            <Send size={16} />
            {contacts.telegramHandle}
          </Button>
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-border pt-5">
          {t.contact.promises.map((text, i) => {
            const Icon = PROMISE_ICONS[i]
            return (
              <li key={text} className="inline-flex items-center gap-2 text-sm text-subtle">
                <Icon size={15} className="shrink-0 text-accent" />
                {text}
              </li>
            )
          })}
        </ul>
      </Reveal>
    </Section>
  )
}
