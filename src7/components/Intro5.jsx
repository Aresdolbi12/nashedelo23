import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import logo from '../assets/logo-nashe-delo.png'

const EASE = [0.19, 1, 0.22, 1]

/* Прелоадер из варианта 2: шторки мягко расходятся, открывая контент */
export default function Intro5() {
  const reduceMotion = useReducedMotion()
  const [show, setShow] = useState(!reduceMotion)

  useEffect(() => {
    if (!show) return
    const t = setTimeout(() => setShow(false), 1100)
    return () => clearTimeout(t)
  }, [show])

  if (reduceMotion) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[100] flex pointer-events-none" exit={{ opacity: 0 }} aria-hidden="true">
          <motion.div
            className="w-1/2 h-full"
            style={{ background: 'linear-gradient(180deg, #16304f 0%, #0c1e35 100%)' }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          <motion.div
            className="w-1/2 h-full"
            style={{ background: 'linear-gradient(180deg, #16304f 0%, #0c1e35 100%)' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.9, ease: EASE }}
          />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <img src={logo} alt="" className="h-20 md:h-24 w-auto drop-shadow-[0_8px_24px_rgba(0,0,0,0.5)]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
