import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const EASE = [0.19, 1, 0.22, 1]

const SECTIONS = [
  { id: 'about', label: 'О проекте' },
  { id: 'program', label: 'Программа' },
  { id: 'schedule', label: 'Афиша' },
  { id: 'speakers', label: 'Спикеры' },
  { id: 'faq', label: 'Вопросы' },
]

export default function Nav4() {
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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[color:var(--paper)]/95 backdrop-blur-sm border-b-[3px] border-[color:var(--ink)]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-stretch justify-between">
          <a href="#top" className="flex items-center gap-3 py-3">
            <span className="w-9 h-9 bg-[color:var(--ink)] text-[color:var(--paper)] flex items-center justify-center font-poster font-bold text-xl">
              Н
            </span>
            <span className="font-poster font-bold text-lg tracking-wide hidden sm:inline">Наше дело</span>
          </a>

          <div className="hidden lg:flex items-stretch">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`font-poster font-medium text-sm flex items-center px-5 border-l-[3px] border-[color:var(--ink)] transition-colors ${
                  active === id
                    ? 'bg-[color:var(--ink)] text-[color:var(--paper)]'
                    : 'hover:bg-[color:var(--ink)]/8'
                }`}
              >
                {label}
              </a>
            ))}
            <a
              href="#register"
              className="font-poster font-semibold text-sm flex items-center px-6 border-l-[3px] border-[color:var(--ink)] bg-[color:var(--blue)] text-white hover:bg-[color:var(--blue-bright)] transition-colors"
            >
              Регистрация
            </a>
          </div>

          <button
            className="lg:hidden w-12 flex items-center justify-center text-[color:var(--ink)]"
            aria-label="Открыть меню"
            onClick={() => setMenuOpen(true)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-[color:var(--ink)] flex flex-col items-start justify-center gap-2 px-8"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <button
              className="absolute top-5 right-5 w-12 h-12 flex items-center justify-center text-[color:var(--paper)]"
              aria-label="Закрыть меню"
              onClick={() => setMenuOpen(false)}
            >
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            {SECTIONS.map(({ id, label }, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                className="font-poster font-bold text-4xl text-[color:var(--paper)] hover:text-[color:var(--sky)] py-1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: EASE }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </motion.a>
            ))}
            <motion.a
              href="#register"
              className="btn-poster font-poster font-semibold text-xl px-8 py-4 mt-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.4, ease: EASE }}
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
