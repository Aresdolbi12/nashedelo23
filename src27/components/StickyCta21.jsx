import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.23, 1, 0.32, 1]

/* Плавающая CTA-планка: появляется после первого экрана, прячется, когда
   секция регистрации на экране (дубль рядом с целью не нужен), и навсегда
   закрывается крестиком (контроль пользователя — эвристика №3).
   Никаких таймеров и давления — только напоминание пути к цели. */
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
          className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:bottom-6 z-40"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24, transition: { duration: 0.18 } }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <div className="frame15 !rounded-2xl flex items-center gap-4 pl-5 pr-2 py-2 md:py-2.5 shadow-2xl bg-[#0d2f22]/95">
            <div className="hidden sm:block">
              <div className="text-[#f2ece3] font-bold text-sm leading-tight">Бесплатная бизнес-программа</div>
              <div className="text-[#d9bfa8]/80 text-xs">16.09 — 30.10 · 7 городов края</div>
            </div>
            <a href="#register" className="btn-ink px-5 py-2.5 text-sm font-bold whitespace-nowrap">
              Записаться бесплатно
            </a>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Скрыть панель записи"
              className="w-9 h-9 shrink-0 rounded-full text-[#d9bfa8]/70 hover:text-[#f2ece3] hover:bg-white/10 transition flex items-center justify-center cursor-pointer"
            >
              <svg width="13" height="13" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2" fill="none">
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
