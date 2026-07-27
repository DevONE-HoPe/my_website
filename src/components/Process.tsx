import { processSteps } from '../data/content'
import { cn } from '../lib/cn'
import { Section } from './ui/Section'
import { Stagger, StaggerItem } from './motion/Reveal'

/**
 * Соединитель ведёт к следующему шагу, поэтому виден только там,
 * где следующая карточка стоит справа в том же ряду.
 * 1 колонка — скрыт, 2 колонки — у 01 и 03, 4 колонки — у всех, кроме последнего.
 */
const CONNECTOR = ['hidden sm:block', 'hidden lg:block', 'hidden sm:block', 'hidden']

export function Process() {
  return (
    <Section
      id="process"
      eyebrow="Процесс"
      title="Как идёт работа"
      description="Четыре этапа — без лишней бюрократии, с понятным результатом на каждом шаге."
    >
      <Stagger
        as="ol"
        className="grid gap-x-3 gap-y-6 sm:grid-cols-2 lg:grid-cols-4"
        stagger={0.08}
      >
        {processSteps.map((step, i) => (
          <StaggerItem key={step.step} as="li" className="group flex flex-col">
            <div className="mb-3 flex items-center gap-3">
              <span className="tabular flex h-9 w-9 flex-none items-center justify-center rounded-chip border border-border bg-elevated font-mono text-sm font-medium text-amber transition-colors duration-200 group-hover:border-amber/50 group-hover:bg-amber/10">
                {step.step}
              </span>
              <span
                className={cn(
                  '-mr-3 h-px flex-1 bg-gradient-to-r from-amber/45 via-border to-border/40',
                  CONNECTOR[i],
                )}
                aria-hidden
              />
            </div>

            <div className="flex flex-1 flex-col rounded-card border border-border bg-surface/85 p-4 transition-colors duration-200 group-hover:border-border-hover sm:p-5">
              <h3 className="display text-lg text-fg">{step.title}</h3>
              <p className="mt-2 flex-1 text-base leading-relaxed text-subtle">
                {step.description}
              </p>
              <p className="mt-4 flex items-baseline gap-2 border-t border-border/70 pt-3 text-sm leading-relaxed text-muted">
                <span className="font-mono text-amber" aria-hidden>
                  &rarr;
                </span>
                {step.result}
              </p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  )
}
