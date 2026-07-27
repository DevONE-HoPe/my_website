import {
  BadgeCheck,
  Bitcoin,
  Bot,
  FileText,
  Globe2,
  LayoutGrid,
  ScanSearch,
  Smartphone,
  Sparkles,
  Workflow,
  type LucideIcon,
} from 'lucide-react'
import { directions, legalPoints, profile, stackGroups } from '../data/content'
import { Section } from './ui/Section'
import { Badge } from './ui/Badge'
import { Card } from './ui/Card'
import { Reveal, Stagger, StaggerItem } from './motion/Reveal'

const directionIcons: Record<(typeof directions)[number]['icon'], LucideIcon> = {
  globe: Globe2,
  app: LayoutGrid,
  bot: Bot,
  scan: ScanSearch,
  phone: Smartphone,
  spark: Sparkles,
  agent: Workflow,
}

const legalIcons: Record<(typeof legalPoints)[number]['icon'], LucideIcon> = {
  file: FileText,
  badge: BadgeCheck,
  crypto: Bitcoin,
}

function asset(path: string) {
  const base = import.meta.env.BASE_URL
  return `${base}${path.replace(/^\//, '')}`
}

function pluralTools(n: number) {
  const tail = n % 100
  if (tail > 4 && tail < 21) return 'инструментов'
  const last = n % 10
  if (last === 1) return 'инструмент'
  if (last > 1 && last < 5) return 'инструмента'
  return 'инструментов'
}

const toolCount = stackGroups.reduce((n, group) => n + group.items.length, 0)

export function About() {
  return (
    <Section
      id="about"
      eyebrow="Обо мне"
      title="Кто делает вашу задачу"
      description="Коротко и по делу: кто я, чем занимаюсь и на чём строю решения."
    >
      <Stagger className="grid gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]" stagger={0.1}>
        <StaggerItem>
          <Card hover={false} className="p-5 sm:p-6">
            {/* Identity row — photo stays beside the name at every width */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative shrink-0">
                <div
                  className="absolute -inset-px rounded-card bg-gradient-to-br from-accent/70 via-accent/25 to-amber/60"
                  aria-hidden
                />
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`${asset('profile-256.webp')} 1x, ${asset('profile-512.webp')} 2x`}
                  />
                  <img
                    src={asset('profile-256.jpg')}
                    srcSet={`${asset('profile-256.jpg')} 1x, ${asset('profile-512.jpg')} 2x`}
                    alt={`${profile.name} — фото`}
                    width={256}
                    height={256}
                    decoding="async"
                    fetchPriority="high"
                    className="relative block h-20 w-20 rounded-card object-cover sm:h-28 sm:w-28"
                  />
                </picture>
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                  <h3 className="display text-2xl text-fg sm:text-3xl">{profile.name}</h3>
                  <Badge tone="amber" className="tabular">
                    {profile.age} год
                  </Badge>
                </div>
                <p className="mt-1 text-base text-subtle">{profile.role}</p>
                <p className="mt-2 font-mono text-xs text-muted">
                  {profile.location}
                  <span className="px-1.5 text-amber/70">/</span>
                  {profile.experience}
                  <span className="px-1.5 text-amber/70">/</span>
                  end-to-end
                </p>
              </div>
            </div>

            <p className="mt-5 text-base leading-relaxed text-subtle">{profile.summary}</p>

            <p className="spec-label mt-6">Направления</p>
            <ul className="mt-2 border-t border-border/70">
              {directions.map((item) => {
                const Icon = directionIcons[item.icon]
                return (
                  <li
                    key={item.title}
                    className="flex flex-wrap items-baseline gap-x-2.5 border-b border-border/70 py-2.5"
                  >
                    <Icon
                      size={15}
                      strokeWidth={1.75}
                      className="translate-y-0.5 shrink-0 text-accent-soft"
                    />
                    <span className="text-base leading-snug text-fg">{item.title}</span>
                    <span className="basis-full pl-[1.55rem] text-sm text-muted sm:ml-auto sm:basis-auto sm:pl-3 sm:text-right">
                      {item.hint}
                    </span>
                  </li>
                )
              })}
            </ul>
          </Card>
        </StaggerItem>

        <StaggerItem>
          <Card hover={false} className="p-5 sm:p-6">
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="display text-xl text-fg">Стек технологий</h3>
              <span className="tabular hidden shrink-0 font-mono text-xs text-muted sm:inline">
                {toolCount} {pluralTools(toolCount)}
              </span>
            </div>
            <p className="mt-1.5 text-base text-muted">
              С чем стабильно собираю продукты.
            </p>

            <dl className="mt-4 border-t border-border/70">
              {stackGroups.map((group) => (
                <div
                  key={group.title}
                  className="flex flex-col gap-1.5 border-b border-border/70 py-3 sm:flex-row sm:gap-4"
                >
                  <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted sm:w-24 sm:shrink-0 sm:pt-1">
                    {group.title}
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <Badge key={item} className="font-mono">
                        {item}
                      </Badge>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        </StaggerItem>
      </Stagger>

      <Reveal delay={0.08} className="mt-4 rounded-card border border-amber/25 bg-gradient-to-br from-elevated to-surface p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="spec-label">Легально и удобно</p>
          <span className="text-sm text-muted">
            Работаю официально — с документами и понятной оплатой.
          </span>
        </div>

        <ul className="mt-5 grid gap-5 sm:grid-cols-3 sm:gap-6">
          {legalPoints.map((point) => {
            const Icon = legalIcons[point.icon]
            return (
              <li key={point.title} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-chip border border-amber/30 bg-amber/10 text-amber">
                  <Icon size={18} strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-fg">{point.title}</p>
                  <p className="mt-0.5 text-base leading-relaxed text-subtle">
                    {point.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </Reveal>
    </Section>
  )
}
