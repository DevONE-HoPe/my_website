import { useEffect, useState } from 'react'
import { Check, Copy, Download, ExternalLink, Printer } from 'lucide-react'
import {
  resumeContacts,
  resumeCopy,
  resumeLangFromHash,
  resumePdfFiles,
  resumePdfUrl,
  type ResumeLang,
} from '../data/resume'
import { asset } from '../lib/asset'
import { track } from '../lib/track'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import { Card } from './ui/Card'
import { Reveal } from './motion/Reveal'
import { useHash } from '../hooks/useHash'
import { cn } from '../lib/cn'

function ContactLink({ href, children }: { href: string; children: string }) {
  const external = href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')
  return (
    <a
      href={href}
      className="text-accent-soft transition-colors hover:text-accent"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

export function ResumePage() {
  const hash = useHash()
  const lang = resumeLangFromHash(hash)
  const t = resumeCopy[lang]
  const pdfHref = asset(resumePdfFiles[lang])
  const [copied, setCopied] = useState<ResumeLang | null>(null)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(null), 1600)
    return () => window.clearTimeout(id)
  }, [copied])

  const copyPdfLink = async (code: ResumeLang) => {
    const url = resumePdfUrl(code)
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      window.prompt(t.copyLink, url)
    }
    setCopied(code)
    track('resume_copy_link', { lang: code })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [lang])

  useEffect(() => {
    const html = document.documentElement
    const prev = html.lang
    html.lang = lang
    document.title = t.documentTitle
    return () => {
      html.lang = prev
    }
  }, [lang, t.documentTitle])

  const setLang = (next: typeof lang) => {
    const nextHash = next === 'en' ? '#resume/en' : '#resume'
    if (window.location.hash === nextHash) return
    window.location.hash = nextHash
    track('resume_lang', { lang: next })
  }

  return (
    <section className="resume-page relative overflow-hidden pt-28 pb-16 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 grid-fade opacity-50" aria-hidden />

      <div className="container-page relative max-w-3xl">
        <Reveal className="resume-toolbar mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="spec-label">{t.pageEyebrow}</p>
          <div className="flex flex-wrap items-center gap-2">
            <div
              className="inline-flex rounded-chip border border-border bg-surface p-0.5"
              role="group"
              aria-label="Language"
            >
              {(['ru', 'en'] as const).map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setLang(code)}
                  className={cn(
                    'rounded-[0.4rem] px-3 py-1.5 font-mono text-xs font-semibold tracking-wide transition-colors',
                    lang === code
                      ? 'bg-accent/20 text-accent-soft'
                      : 'text-muted hover:text-fg',
                  )}
                  aria-pressed={lang === code}
                >
                  {code === 'ru' ? t.langRu : t.langEn}
                </button>
              ))}
            </div>
            <Button
              href={pdfHref}
              download={resumePdfFiles[lang]}
              variant="secondary"
              className="!py-2 !text-sm"
              onClick={() => track('resume_pdf', { lang })}
            >
              <Download size={15} />
              {t.downloadPdf}
            </Button>
            <Button
              variant="ghost"
              className="!py-2 !text-sm"
              onClick={() => {
                track('resume_print', { lang })
                window.print()
              }}
            >
              <Printer size={15} />
              {t.print}
            </Button>
          </div>
        </Reveal>

        <Reveal className="resume-toolbar mb-6 rounded-card border border-border bg-surface/85 p-4 sm:p-5">
          <p className="spec-label mb-3">{t.pdfLinksTitle}</p>
          <ul className="space-y-3">
            {(['ru', 'en'] as const).map((code) => {
              const url = resumePdfUrl(code)
              return (
                <li
                  key={code}
                  className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                >
                  <a
                    href={asset(resumePdfFiles[code])}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 break-all font-mono text-sm text-accent-soft transition-colors hover:text-accent"
                  >
                    {url}
                  </a>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Button
                      href={asset(resumePdfFiles[code])}
                      external
                      variant="secondary"
                      className="!py-1.5 !text-sm"
                      onClick={() => track('resume_pdf', { lang: code, place: 'open' })}
                    >
                      <ExternalLink size={14} />
                      {t.openPdf}
                    </Button>
                    <Button
                      variant="ghost"
                      className="!py-1.5 !text-sm"
                      onClick={() => void copyPdfLink(code)}
                    >
                      {copied === code ? <Check size={14} /> : <Copy size={14} />}
                      {copied === code ? t.copied : t.copyLink}
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal delay={0.06}>
          <Card hover={false} className="resume-sheet p-5 sm:p-8">
            <header className="border-b border-border/70 pb-5">
              <h1 className="display text-2xl text-fg sm:text-3xl">{t.name}</h1>
              <p className="mt-1.5 text-base font-medium text-accent-soft">{t.role}</p>
              <p className="mt-1 text-sm text-muted">{t.location}</p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-sm text-subtle">
                <li>
                  <ContactLink href={resumeContacts.telegram}>
                    {resumeContacts.telegramHandle}
                  </ContactLink>
                </li>
                <li>
                  <ContactLink href={`mailto:${resumeContacts.email}`}>
                    {resumeContacts.email}
                  </ContactLink>
                </li>
                <li>
                  <ContactLink href={resumeContacts.github}>
                    {resumeContacts.githubHandle}
                  </ContactLink>
                </li>
                <li>
                  <ContactLink href={resumeContacts.portfolio}>
                    {resumeContacts.portfolioLabel}
                  </ContactLink>
                </li>
                <li>
                  <ContactLink href={`tel:${resumeContacts.phone.replace(/\s/g, '')}`}>
                    {resumeContacts.phone}
                  </ContactLink>
                </li>
              </ul>
            </header>

            <p className="mt-5 text-base leading-relaxed text-subtle">{t.intro}</p>

            <section className="mt-8">
              <h2 className="spec-label mb-3">{t.stackTitle}</h2>
              <dl className="border-t border-border/70">
                {t.stack.map((row) => (
                  <div
                    key={row.label}
                    className="flex flex-col gap-1 border-b border-border/70 py-2.5 sm:flex-row sm:gap-4"
                  >
                    <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted sm:w-36 sm:shrink-0 sm:pt-0.5">
                      {row.label}
                    </dt>
                    <dd className="text-base text-fg">{row.items}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="mt-8">
              <h2 className="spec-label mb-4">{t.experienceTitle}</h2>
              <ol className="space-y-6">
                {t.jobs.map((job) => (
                  <li key={`${job.company}-${job.period}`}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                      <h3 className="text-lg font-semibold text-fg">{job.company}</h3>
                      <p className="tabular shrink-0 font-mono text-xs text-muted">{job.period}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-accent-soft">{job.role}</p>
                    <p className="text-sm text-muted">{job.place}</p>
                    <ul className="mt-3 space-y-2">
                      {job.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="relative pl-4 text-base leading-relaxed text-subtle before:absolute before:left-0 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-amber"
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>

            <section className="mt-8">
              <h2 className="spec-label mb-2">{t.projectsTitle}</h2>
              <p className="mb-4 text-sm text-muted">{t.projectsNote}</p>
              <ul className="space-y-4">
                {t.projects.map((project) => (
                  <li
                    key={project.title}
                    className="rounded-chip border border-border/70 bg-elevated/40 p-4"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-base font-semibold text-fg">{project.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.links.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            className="font-mono text-xs text-accent-soft transition-colors hover:text-accent"
                            {...(link.href.startsWith('http')
                              ? { target: '_blank', rel: 'noopener noreferrer' }
                              : {})}
                          >
                            {link.label} →
                          </a>
                        ))}
                      </div>
                    </div>
                    <p className="mt-1">
                      <Badge tone="amber" className="font-normal">
                        {project.yours}
                      </Badge>
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-subtle">{project.description}</p>
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-8 grid gap-6 border-t border-border/70 pt-5 sm:grid-cols-3">
              <section>
                <h2 className="spec-label mb-2">{t.educationTitle}</h2>
                <p className="text-base text-subtle">{t.education}</p>
              </section>
              <section>
                <h2 className="spec-label mb-2">{t.languagesTitle}</h2>
                <ul className="space-y-1">
                  {t.languages.map((line) => (
                    <li key={line} className="text-base text-subtle">
                      {line}
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h2 className="spec-label mb-2">{t.formatTitle}</h2>
                <ul className="space-y-1">
                  {t.format.map((line) => (
                    <li key={line} className="text-base text-subtle">
                      {line}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  )
}
