import { motion } from 'framer-motion'
import { ArrowIcon } from '../../src2/components/shared2.jsx'

const EASE = [0.19, 1, 0.22, 1]

export default function Cta5() {
  return (
    <section id="register" className="relative px-6 lg:px-10 pt-28 pb-36 text-center">
      <div className="max-w-3xl mx-auto">
        <motion.h2
          className="text-[#0f2847] font-black text-[clamp(2.5rem,7vw,5.5rem)] leading-[1] mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          Уже светло.
          <br />
          Пора строить.
        </motion.h2>
        <motion.p
          className="text-[#1e4976] text-lg md:text-xl leading-relaxed mb-12 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
        >
          Заполните короткую анкету — мы свяжемся, расскажем подробности и поможем
          подготовиться к старту потока.
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
          <p className="text-[#1e4976]/70 text-sm mt-6">Участие бесплатное. Количество мест ограничено.</p>
        </motion.div>
      </div>
    </section>
  )
}
