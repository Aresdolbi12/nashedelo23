import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowIcon, Reveal } from './shared2.jsx'

/* Магнитная кнопка: тянется к курсору в радиусе обёртки */
function MagneticButton({ children, href }) {
  const wrapRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 })
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 16 })

  const onMove = (e) => {
    if (reduceMotion || !wrapRef.current) return
    const r = wrapRef.current.getBoundingClientRect()
    x.set((e.clientX - r.left - r.width / 2) * 0.25)
    y.set((e.clientY - r.top - r.height / 2) * 0.25)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div ref={wrapRef} className="inline-block p-6 -m-6" onMouseMove={onMove} onMouseLeave={onLeave}>
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ x, y }}
        className="btn-steel sheen chamfer inline-flex items-center gap-3 px-10 py-5 text-base font-bold tracking-wider uppercase"
      >
        {children}
      </motion.a>
    </div>
  )
}

export default function Cta2() {
  return (
    <section id="register" className="sky-v2 grain relative">
      <div className="cloud" style={{ width: 560, height: 170, top: '-4%', left: '-8%', opacity: 0.85, '--drift': '85s' }} aria-hidden="true" />
      <div className="cloud" style={{ width: 460, height: 140, top: '22%', right: '-12%', opacity: 0.8, '--drift': '70s' }} aria-hidden="true" />
      <div className="cloud" style={{ width: 380, height: 110, bottom: '8%', left: '22%', opacity: 0.6, '--drift': '105s' }} aria-hidden="true" />

      <div className="max-w-4xl mx-auto px-6 lg:px-10 py-24 md:py-32 relative z-10 text-center">
        <Reveal>
          <div className="stamp mb-10">
            <span className="stamp-num">лист 7</span>
            <span className="stamp-name">Подпись и дата</span>
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl text-[color:var(--ink)] leading-[1.03] mb-8">
            Чертёж готов.
            <br />
            Дело за <span className="text-outline">вами</span>.
          </h2>
          <p className="text-lg md:text-xl text-[#31435c] max-w-2xl mx-auto leading-relaxed mb-12">
            Заполните короткую анкету — мы свяжемся с вами, расскажем подробности и поможем
            подготовиться к старту потока.
          </p>
          <MagneticButton href="https://forms.yandex.ru/">
            Зарегистрироваться
            <ArrowIcon size={20} />
          </MagneticButton>
          <p className="text-sm text-gray-600 mt-8">Участие бесплатное. Количество мест ограничено.</p>
        </Reveal>
      </div>
    </section>
  )
}
