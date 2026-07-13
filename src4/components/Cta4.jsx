import { motion } from 'framer-motion'
import { ArrowIcon } from '../../src2/components/shared2.jsx'

const EASE = [0.19, 1, 0.22, 1]

export default function Cta4() {
  return (
    <section id="register" className="relative py-28 md:py-40 bg-[color:var(--blue)] overflow-hidden">
      {/* Наклонная полоса неба поперёк плаката */}
      <div
        className="sky-window absolute left-[-10%] right-[-10%] top-1/2 -translate-y-1/2 h-40 md:h-56 -rotate-3 border-y-[3px] border-[color:var(--ink)] opacity-90"
        aria-hidden="true"
      >
        <div className="cloud4" style={{ width: 260, height: 80, top: '20%', left: '8%', '--drift': '75s' }} />
        <div className="cloud4" style={{ width: 220, height: 70, top: '35%', right: '12%', '--drift': '95s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-5 lg:px-10 text-center">
        <motion.h2
          className="font-poster font-bold text-[clamp(2.8rem,9vw,7rem)] leading-[0.95] text-white mb-10"
          initial={{ opacity: 0, scale: 1.1 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          Дело
          <br />
          за тобой
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
        >
          <a
            href="https://forms.yandex.ru/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 bg-[color:var(--paper)] text-[color:var(--ink)] font-poster font-semibold text-xl md:text-2xl px-12 py-6 print-shadow hover:-translate-x-1 hover:-translate-y-1 transition-transform"
          >
            Зарегистрироваться
            <ArrowIcon size={24} strokeWidth={3} />
          </a>
          <p className="text-white/75 mt-8 text-lg">
            Короткая анкета — мы свяжемся, расскажем детали и поможем подготовиться.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
