import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { EASE } from './shared2.jsx'

/* Стальные шторки, расходящиеся при загрузке */
export default function Intro() {
  const reduceMotion = useReducedMotion()
  const [show, setShow] = useState(!reduceMotion)

  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => setShow(false), 900)
    return () => clearTimeout(t)
  }, [show])

  if (reduceMotion) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[100] flex pointer-events-none" exit={{ opacity: 0 }} aria-hidden="true">
          <motion.div
            className="w-1/2 h-full steel-band"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.8, ease: EASE }}
          />
          <motion.div
            className="w-1/2 h-full steel-band"
            initial={{ x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: EASE }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <span className="font-display font-black text-white text-2xl tracking-wide">НАШЕ ДЕЛО</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
