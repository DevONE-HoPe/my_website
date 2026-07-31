import { Clock, MessageCircle, Send, Shield } from 'lucide-react'
import { profile } from '../data/content'
import { track } from '../lib/track'
import { Button } from './ui/Button'
import { Section } from './ui/Section'
import { Reveal } from './motion/Reveal'

const PROMISES = [
  { icon: Clock, text: 'Быстрый MVP' },
  { icon: Shield, text: 'Качество кода' },
  { icon: MessageCircle, text: 'Поддержка после запуска' },
]

export function Contact() {
  return (
    <Section
      id="contact"
      eyebrow="Контакты"
      title="Обсудим вашу задачу"
      description="Напишите в Telegram — отвечу, уточню детали и предложу план с ориентиром по срокам и цене."
      className="border-t border-border/60"
      narrow
    >
      <Reveal className="mx-auto max-w-xl rounded-card border border-accent/25 bg-gradient-to-b from-elevated to-surface p-6 text-center sm:p-8">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-chip border border-accent/30 bg-accent/10 text-accent">
          <MessageCircle size={22} />
        </div>
        <h3 className="display text-2xl text-fg">Telegram</h3>
        <p className="mx-auto mt-2 max-w-sm text-base text-subtle">
          Основной канал связи. Опишите задачу — или просто спросите, реально ли её сделать.
        </p>

        <div className="mt-5">
          <Button
            href={profile.telegram}
            external
            className="w-full sm:w-auto"
            onClick={() => track('telegram_click', { place: 'contact' })}
          >
            <Send size={16} />
            {profile.telegramHandle}
          </Button>
        </div>

        <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 border-t border-border pt-5">
          {PROMISES.map(({ icon: Icon, text }) => (
            <li key={text} className="inline-flex items-center gap-2 text-sm text-subtle">
              <Icon size={15} className="shrink-0 text-accent" />
              {text}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  )
}
