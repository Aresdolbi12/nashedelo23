import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { EASE } from './shared2.jsx'

const SECTIONS = [
  { id: 'about', label: 'О проекте' },
  { id: 'program', label: 'Программа' },
  { id: 'schedule', label: 'Маршрут' },
  { id: 'speakers', label: 'Спикеры' },
  { id: 'faq', label: 'Вопросы' },
]

export default function Nav2() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#f2f6fa]/90 backdrop-blur-xl border-b border-[color:var(--line)] shadow-sm' : ''
        }`}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[color:var(--steel)] origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3">
            <div className="w-10 h-10 metal-gradient chamfer-sm flex items-center justify-center shadow-md">
              <span className="font-display font-black text-white text-lg">Н</span>
            </div>
            <div className="hidden sm:block">
              <div className="font-display font-bold text-[15px] leading-none text-[color:var(--ink)]">НАШЕ ДЕЛО</div>
              <div className="text-[10px] tracking-[0.2em] text-gray-500 mt-1 uppercase">Чертёж вашего дела</div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`relative text-sm font-medium transition py-1 ${
                  active === id ? 'text-[color:var(--steel)]' : 'text-gray-700 hover:text-[color:var(--steel)]'
                }`}
              >
                {label}
                {active === id && (
                  <motion.span
                    layoutId="nav2-underline"
                    className="absolute -bottom-0.5 left-0 right-0 h-[2px] bg-[color:var(--steel)]"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="#register"
              className="hidden md:inline-flex btn-steel sheen chamfer-sm px-5 py-2.5 text-sm font-semibold tracking-wide uppercase"
            >
              Регистрация
            </a>
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[color:var(--ink)]"
              aria-label="Открыть меню"
              onClick={() => setMenuOpen(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-[#0f2847]/35 z-[55]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 w-80 max-w-full bg-[color:var(--paper)] blueprint z-[60] shadow-2xl p-8 flex flex-col"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <button
                className="self-end mb-8 w-10 h-10 flex items-center justify-center text-[color:var(--ink)]"
                aria-label="Закрыть меню"
                onClick={() => setMenuOpen(false)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="flex flex-col gap-5">
                {SECTIONS.map(({ id, label }, i) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    className="text-lg font-medium text-gray-800 hover:text-[color:var(--steel)]"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: EASE }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </motion.a>
                ))}
              </div>
              <a
                href="#register"
                className="btn-steel sheen chamfer-sm mt-10 py-4 text-center font-semibold tracking-wide uppercase"
                onClick={() => setMenuOpen(false)}
              >
                Регистрация
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
