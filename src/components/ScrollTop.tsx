import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { easeOut } from './motion/variants'

export function ScrollTop() {
  const [visible, setVisible] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          initial={prefersReduced ? false : { opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReduced ? undefined : { opacity: 0, y: 8, scale: 0.92 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.22, ease: easeOut }
          }
          whileHover={prefersReduced ? undefined : { y: -2 }}
          whileTap={prefersReduced ? undefined : { scale: 0.94 }}
          className="glass-strong fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-chip text-accent"
          aria-label="Наверх"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
