import { motion } from 'framer-motion'
import { ArrowIcon } from '../../src2/components/shared2.jsx'

const EASE = [0.19, 1, 0.22, 1]

export default function Cta5() {
  return (
    <section id="register" className="relative px-6 lg:px-10 py-24 md:py-32 text-center">
      <svg viewBox="0 0 200 200" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(70vw,520px)] h-auto opacity-[0.07] pointer-events-none" fill="none" aria-hidden="true">
        <g className="compass29">
          <circle cx="100" cy="100" r="92" stroke="#ebdccf" strokeWidth="1" strokeDasharray="3 6" />
          <circle cx="100" cy="100" r="70" stroke="#ebdccf" strokeWidth="0.75" />
          <path d="M100 14 L107 96 L100 104 L93 96 Z" fill="#ebdccf" />
          <path d="M100 186 L107 104 L100 96 L93 104 Z" stroke="#ebdccf" strokeWidth="1" />
          <path d="M14 100 L96 93 L104 100 L96 107 Z" stroke="#ebdccf" strokeWidth="1" />
          <path d="M186 100 L104 93 L96 100 L104 107 Z" stroke="#ebdccf" strokeWidth="1" />
        </g>
      </svg>
      <div className="max-w-3xl mx-auto relative">
        <motion.h2
          className="relative text-[#f2ece3] font-black text-[clamp(2.5rem,7vw,5.5rem)] leading-[1] mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <span
            className="echo-text15 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[1.6em] font-black"
            aria-hidden="true"
          >
            Действовать
          </span>
          <span className="relative">Время действовать</span>
        </motion.h2>
        <motion.p
          className="text-[#d9c9b8] text-lg md:text-xl leading-relaxed mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          Заполните анкету — мы поможем разобраться в деталях и ответим на все вопросы

        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
        >
          <a
            href="https://forms.yandex.ru/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ink inline-flex items-center gap-3 px-12 py-6 text-lg font-bold"
          >
            Зарегистрироваться
            <ArrowIcon size={20} />
          </a>
          <p className="text-[#d9c9b8]/70 text-sm mt-6">Участие бесплатное.</p>
        </motion.div>
      </div>
    </section>
  )
}
