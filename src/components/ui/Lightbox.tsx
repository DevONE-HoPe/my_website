import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { cn } from '../../lib/cn'

type Props = {
  /** Уже разрешённые пути к картинкам. */
  images: string[]
  index: number
  title: string
  onIndexChange: (index: number) => void
  onClose: () => void
}

/** Порог свайпа для смены кадра — в пикселях. */
const SWIPE_THRESHOLD = 48

/**
 * Полноэкранный просмотр скриншотов с зумом.
 * Мышь — колесо и двойной клик, тач — пинч и двойной тап, клавиатура — стрелки и Esc.
 */
export function Lightbox({ images, index, title, onIndexChange, onClose }: Props) {
  const prefersReduced = useReducedMotion()
  const [zoomed, setZoomed] = useState(false)
  const touchStart = useRef<{ x: number; y: number } | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const many = images.length > 1

  const go = useCallback(
    (dir: 1 | -1) => {
      if (!many) return
      onIndexChange((index + dir + images.length) % images.length)
    },
    [images.length, index, many, onIndexChange],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        onClose()
      }
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, onClose])

  /* Новый кадр открывается в исходном масштабе */
  useEffect(() => setZoomed(false), [index])

  const onTouchStart = (e: React.TouchEvent) => {
    if (zoomed || e.touches.length !== 1) {
      touchStart.current = null
      return
    }
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current
    touchStart.current = null
    if (!start || zoomed) return
    const touch = e.changedTouches[0]
    const dx = touch.clientX - start.x
    const dy = touch.clientY - start.y
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return
    go(dx < 0 ? 1 : -1)
  }

  /**
   * Клик мимо фото закрывает просмотр. Проверяем именно координаты: библиотека
   * ставит картинке pointer-events: none, поэтому по target её не отличить от
   * подложки. Пока кадр приближен, клик — часть панорамы, не закрываем.
   */
  const onEmptyClick = (e: React.MouseEvent) => {
    if (zoomed) return
    const box = imgRef.current?.getBoundingClientRect()
    if (!box) return
    const onImage =
      e.clientX >= box.left &&
      e.clientX <= box.right &&
      e.clientY >= box.top &&
      e.clientY <= box.bottom
    if (!onImage) onClose()
  }

  const controlClass =
    'inline-flex h-10 w-10 items-center justify-center rounded-chip border border-white/12 bg-black/60 text-white backdrop-blur-sm transition-colors hover:border-accent/50 hover:bg-black/85 disabled:opacity-40'

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} — просмотр изображения`}
      initial={prefersReduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={prefersReduced ? undefined : { opacity: 0 }}
      transition={{ duration: prefersReduced ? 0 : 0.2 }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <TransformWrapper
        key={index}
        minScale={1}
        maxScale={6}
        centerOnInit
        limitToBounds
        centerZoomedOut
        doubleClick={{ mode: 'toggle', step: 1.4 }}
        wheel={{ step: 0.18 }}
        pinch={{ step: 6 }}
        panning={{ disabled: !zoomed, velocityDisabled: true }}
        onTransform={(_, state) => {
          const next = state.scale > 1.01
          setZoomed((prev) => (prev === next ? prev : next))
        }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <div className="flex shrink-0 items-center justify-between gap-3 p-3 sm:p-4">
              <span className="tabular rounded-chip border border-white/12 bg-black/60 px-3 py-1.5 font-mono text-sm text-white/80 backdrop-blur-sm">
                {many ? `${index + 1} / ${images.length}` : title}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => zoomOut()}
                  className={cn(controlClass, 'hidden sm:inline-flex')}
                  aria-label="Отдалить"
                >
                  <ZoomOut size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => zoomIn()}
                  className={cn(controlClass, 'hidden sm:inline-flex')}
                  aria-label="Приблизить"
                >
                  <ZoomIn size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => resetTransform()}
                  className={controlClass}
                  aria-label="Сбросить масштаб"
                >
                  <Maximize2 size={16} />
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className={controlClass}
                  aria-label="Закрыть просмотр"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            <div className="relative min-h-0 flex-1">
              {/* touchAction: none — иначе пинч уводит зум в браузер, а не в картинку */}
              <TransformComponent
                wrapperStyle={{ width: '100%', height: '100%', touchAction: 'none' }}
                contentStyle={{ width: '100%', height: '100%' }}
              >
                {/* Курсор здесь не меняем: библиотека гасит pointer-events у
                    картинки, поэтому любой курсор области показывался бы и над
                    фото — про закрытие пишем в подсказке снизу */}
                <div
                  onClick={onEmptyClick}
                  className="flex h-full w-full items-center justify-center p-2 sm:p-6"
                >
                  <img
                    ref={imgRef}
                    src={images[index]}
                    alt={`${title} — скриншот ${index + 1}`}
                    draggable={false}
                    className="max-h-full max-w-full select-none object-contain"
                  />
                </div>
              </TransformComponent>

              {many && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className={cn(controlClass, 'absolute left-2 top-1/2 -translate-y-1/2 sm:left-4')}
                    aria-label="Предыдущий скриншот"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className={cn(controlClass, 'absolute right-2 top-1/2 -translate-y-1/2 sm:right-4')}
                    aria-label="Следующий скриншот"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            <div className="shrink-0 p-3 sm:p-4">
              {many && (
                <div className="mb-2 flex justify-center gap-2 overflow-x-auto pb-1">
                  {images.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => onIndexChange(i)}
                      aria-label={`Скриншот ${i + 1}`}
                      aria-current={i === index}
                      className={cn(
                        'h-12 w-16 shrink-0 overflow-hidden rounded-chip border transition-colors sm:h-14 sm:w-20',
                        i === index
                          ? 'border-accent opacity-100'
                          : 'border-white/12 opacity-55 hover:opacity-90',
                      )}
                    >
                      <img
                        src={src}
                        alt=""
                        draggable={false}
                        className="h-full w-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
              <p className="text-center font-mono text-xs text-white/45">
                <span className="hidden sm:inline">
                  Колесо или двойной клик — зум, перетаскивание — панорама, клик мимо
                  фото — закрыть
                </span>
                <span className="sm:hidden">
                  Пинч — зум{many ? ', свайп — кадр' : ''}, тап мимо фото — закрыть
                </span>
              </p>
            </div>
          </>
        )}
      </TransformWrapper>
    </motion.div>,
    document.body,
  )
}

/** Обёртка с AnimatePresence — чтобы просмотр плавно исчезал. */
export function LightboxPortal(props: Props & { open: boolean }) {
  const { open, ...rest } = props
  return <AnimatePresence>{open && <Lightbox {...rest} />}</AnimatePresence>
}
