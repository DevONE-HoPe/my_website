import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../lib/cn'

type Props = {
  page: number
  totalPages: number
  onChange: (page: number) => void
  /** Подпись вида «1–5 из 22» над кнопками */
  summary?: string
  className?: string
}

const arrowClass =
  'inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-chip border border-border text-subtle transition-colors hover:border-accent/40 hover:text-fg disabled:pointer-events-none disabled:opacity-35'

export function Pagination({ page, totalPages, onChange, summary, className }: Props) {
  if (totalPages < 2) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <nav className={cn('flex flex-col items-center gap-3', className)} aria-label="Страницы работ">
      {summary && <p className="font-mono text-sm tabular text-muted">{summary}</p>}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          className={arrowClass}
          aria-label="Предыдущая страница"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex items-center gap-1.5">
          {pages.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              aria-current={p === page ? 'page' : undefined}
              aria-label={`Страница ${p}`}
              className={cn(
                'inline-flex h-10 min-w-10 items-center justify-center rounded-chip border px-2 font-mono text-sm tabular transition-colors',
                p === page
                  ? 'border-accent bg-accent text-white'
                  : 'border-border text-subtle hover:border-accent/40 hover:text-fg',
              )}
            >
              {p}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          className={arrowClass}
          aria-label="Следующая страница"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </nav>
  )
}
