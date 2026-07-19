import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo15 from './Logo15.jsx'

const EASE = [0.32, 0.72, 0, 1]

const SECTIONS = [
  { id: 'about', label: 'О проекте' },
  { id: 'program', label: 'Программа' },
  { id: 'schedule', label: 'География' },
  { id: 'speakers', label: 'Спикеры' },
  { id: 'press', label: 'О нас пишут' },
  { id: 'faq', label: 'Вопросы' },
]

export default function Nav5() {
  const [active, setActive] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' },
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.nav
        className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl"
        initial={{ y: -70, x: '-50%', opacity: 0 }}
        animate={{ y: 0, x: '-50%', opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.2 }}
      >
        <div className="glass-nav flex items-center justify-between pl-4 pr-2 py-2">
          <a href="#top" className="flex items-center" aria-label="Наше дело — к началу страницы">
            <Logo15 size="nav" tone="ink" />
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  active === id ? 'text-[#f4ecdf]' : 'text-[#27251f]/80 hover:text-[#27251f]'
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav5-pill"
                    className="absolute inset-0 bg-[#154734] rounded-full"
                    transition={{ duration: 0.45, ease: EASE }}
                  />
                )}
                <span className="relative z-10">{label}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#register"
              className="hidden md:inline-flex btn16 btn16-red !py-2 !pl-5 text-sm"
            >
              Регистрация
            </a>
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#27251f]"
              aria-label="Открыть меню"
              onClick={() => setMenuOpen(true)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[#f4ecdf]/97 backdrop-blur-md flex flex-col items-center justify-center gap-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <button
              className="absolute top-6 right-6 w-11 h-11 flex items-center justify-center text-[#27251f]"
              aria-label="Закрыть меню"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <Logo15 size="footer" tone="ink" className="mb-2" />
            {SECTIONS.map(({ id, label }, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                className="text-2xl font-bold text-[#154734]"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: EASE }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </motion.a>
            ))}
            <motion.a
              href="#register"
              className="btn16 btn16-red mt-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.45, ease: EASE }}
              onClick={() => setMenuOpen(false)}
            >
              Регистрация
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
