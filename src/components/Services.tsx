import {
  Bot,
  Globe,
  ScanSearch,
  Server,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { services } from '../data/content'
import { Section } from './ui/Section'
import { Card } from './ui/Card'
import { Stagger, StaggerItem } from './motion/Reveal'

const iconMap: Record<(typeof services)[number]['icon'], LucideIcon> = {
  bot: Bot,
  spider: ScanSearch,
  globe: Globe,
  sparkles: Sparkles,
  smartphone: Smartphone,
  server: Server,
}

export function Services() {
  return (
    <Section
      id="services"
      eyebrow="Услуги"
      title="Что могу сделать"
      description="Шесть направлений. Можно взять одно или собрать продукт целиком."
      className="border-y border-border/60 bg-surface/40"
    >
      <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.055}>
        {services.map((service) => {
          const Icon = iconMap[service.icon]
          return (
            <StaggerItem key={service.id}>
              <Card className="group flex h-full flex-col">
                <div className="mb-3.5 flex h-10 w-10 items-center justify-center rounded-chip border border-border bg-elevated text-accent transition-colors group-hover:border-accent/40 group-hover:bg-accent/10">
                  <Icon size={19} strokeWidth={1.75} />
                </div>
                <h3 className="display text-lg text-fg">{service.title}</h3>
                <p className="mt-2 flex-1 text-base leading-relaxed text-subtle">
                  {service.description}
                </p>
              </Card>
            </StaggerItem>
          )
        })}
      </Stagger>
    </Section>
  )
}
