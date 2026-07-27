import { useState } from 'react'
import { Plus } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { faqItems } from '../data/content'
import { Section } from './ui/Section'
import { cn } from '../lib/cn'
import { Reveal } from './motion/Reveal'
import { easeOut } from './motion/variants'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const prefersReduced = useReducedMotion()

  return (
    <Section
      id="faq"
      eyebrow="FAQ"
      title="Частые вопросы"
      description="Коротко о цене, сроках и процессе. Если чего-то нет — напишите в Telegram."
      narrow
    >
      <Reveal className="mx-auto max-w-2xl overflow-hidden rounded-card border border-border bg-surface/85">
        {faqItems.map((item, index) => {
          const open = openIndex === index
          return (
            <div
              key={item.question}
              className="border-b border-border/70 last:border-0"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left transition-colors hover:bg-elevated/60 sm:px-5"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span
                  className={cn(
                    'text-base font-medium transition-colors sm:text-lg',
                    open ? 'text-accent' : 'text-fg',
                  )}
                >
                  {item.question}
                </span>
                <Plus
                  size={18}
                  className={cn(
                    'shrink-0 transition-transform duration-200',
                    open ? 'rotate-45 text-accent' : 'text-muted',
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="answer"
                    initial={prefersReduced ? false : { height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={prefersReduced ? undefined : { height: 0, opacity: 0 }}
                    transition={
                      prefersReduced
                        ? { duration: 0 }
                        : { duration: 0.28, ease: easeOut }
                    }
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-base leading-relaxed text-subtle sm:px-5">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </Reveal>
    </Section>
  )
}
