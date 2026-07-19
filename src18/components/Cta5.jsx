import { motion } from 'framer-motion'
import { IslandButton } from './Hero18.jsx'

const EASE = [0.32, 0.72, 0, 1]

/* Финальная зелёная полоса: симметрия с блоком программы, красная CTA */
export default function Cta5() {
  return (
    <section id="register" className="relative px-3 sm:px-4 py-24 md:py-32">
      <div
        className="relative max-w-[1400px] mx-auto bg-[#154734] border-2 border-[#27251f] shadow-[10px_10px_0_0_#27251f] px-6 py-20 md:py-28 text-center overflow-hidden"
        style={{ backgroundImage: 'radial-gradient(ellipse at 50% 120%, rgba(224,78,57,0.18), transparent 60%), radial-gradient(ellipse at 50% -20%, rgba(217,191,168,0.14), transparent 55%)' }}
      >
        <div className="outline-text15 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[min(24vw,300px)]" aria-hidden="true">
          ДЕЛО
        </div>
        <div className="relative max-w-3xl mx-auto">
          <motion.span
            className="eyebrow16 eyebrow16-invert mb-8 inline-flex"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Регистрация открыта
          </motion.span>
          <motion.h2
            className="text-[#f2ece3] font-black text-[clamp(2.5rem,7vw,5.5rem)] leading-[1] mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            Время действовать
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
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
          >
            <IslandButton href="https://forms.yandex.ru/" kind="red" className="text-lg !pl-8 !py-3">
              Зарегистрироваться
            </IslandButton>
            <p className="text-[#d9c9b8]/70 text-sm mt-6">Участие бесплатное.</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
