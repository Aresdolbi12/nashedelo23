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

export default function Nav17() {
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
            <Logo15 size="nav" />
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  active === id ? 'text-[#0d2f22]' : 'text-white/85 hover:text-white'
                }`}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav5-pill"
                    className="absolute inset-0 bg-white rounded-full"
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
              className="hidden md:inline-flex btn-light px-5 py-2.5 text-sm font-bold"
            >
              Регистрация
            </a>
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
              aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className={`burger17 ${menuOpen ? 'open' : ''}`} aria-hidden="true">
                <span /><span /><span />
              </span>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[45] bg-[#06150f]/85 backdrop-blur-2xl flex flex-col items-center justify-center gap-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Logo15 size="footer" className="mb-2" />
            {SECTIONS.map(({ id, label }, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.06, duration: 0.45, ease: EASE }}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </motion.a>
            ))}
            <motion.a
              href="#register"
              className="btn-light px-8 py-4 font-bold mt-4"
              initial={{ opacity: 0, y: 34 }}
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
