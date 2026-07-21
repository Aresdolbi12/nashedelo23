import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1]

/* Плавающая CTA v31: только оранжевая кнопка «Записаться бесплатно»
   с компактным крестиком в углу (контроль пользователя сохранён).
   Появляется после первого экрана, прячется у секции регистрации. */
export default function StickyCta21() {
  const [dismissed, setDismissed] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [nearRegister, setNearRegister] = useState(false)

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    const reg = document.getElementById('register')
    let io
    if (reg) {
      io = new IntersectionObserver(
        (entries) => entries.forEach((e) => setNearRegister(e.isIntersecting)),
        { rootMargin: '0px 0px 20% 0px' },
      )
      io.observe(reg)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      io?.disconnect()
    }
  }, [])

  const show = pastHero && !nearRegister && !dismissed

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-4 right-4 md:right-6 md:bottom-6 z-40"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24, transition: { duration: 0.18 } }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div className="relative">
            <a
              href="#register"
              className="btn-ink inline-block px-6 py-3.5 text-sm md:text-base font-bold whitespace-nowrap shadow-2xl"
            >
              Записаться бесплатно
            </a>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Скрыть кнопку записи"
              className="absolute -top-2.5 -right-2.5 w-7 h-7 rounded-full bg-[#0d2f22] border border-[#d9bfa8]/50 text-[#d9bfa8] hover:text-white hover:border-white/80 transition flex items-center justify-center cursor-pointer shadow-lg"
            >
              <svg width="11" height="11" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
