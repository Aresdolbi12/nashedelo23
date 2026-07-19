import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/* Плавное открытие сайта (v14): никаких шторок и логотипа по центру —
   тёмная вуаль в цвет неба просто мягко растворяется над готовой страницей.
   Статичный #boot из index.html закрывает паузу до загрузки JS. */
export default function Intro5() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    document.getElementById('boot')?.remove()
    // Короткая пауза, чтобы hero успел смонтироваться и отрисоваться под вуалью
    const t = setTimeout(() => setShow(false), 350)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{ background: 'linear-gradient(180deg, #16304f 0%, #0c1e35 100%)' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          aria-hidden="true"
        />
      )}
    </AnimatePresence>
  )
}
