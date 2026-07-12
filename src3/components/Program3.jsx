import { motion } from 'framer-motion'
import { DAY1, DAY2, WEBINARS } from '../../src2/content.js'

const EASE = [0.19, 1, 0.22, 1]

function DayItems({ items }) {
  return (
    <div className="grid md:grid-cols-2 gap-x-12">
      {items.map((entry, i) => {
        const isBreak = entry.startsWith('—')
        return (
          <div key={i} className="flex items-start gap-3 py-3 border-b border-[#0f2847]/8 last:border-0">
            {isBreak ? (
              <span className="text-gray-400 italic text-sm pl-7">перерыв</span>
            ) : (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3d6892] mt-2.5 flex-shrink-0" />
                <span className="text-[#2c3d55]">{entry}</span>
              </>
            )}
          </div>
        )
      })}
    </div>
  )
}

const CARDS = [
  {
    tag: 'Очно · интенсив',
    title: 'День первый. Идея и опора',
    body: <DayItems items={DAY1} />,
  },
  {
    tag: 'Очно · интенсив',
    title: 'День второй. Деньги и люди',
    body: <DayItems items={DAY2} />,
  },
  {
    tag: 'Онлайн · после интенсива',
    title: 'Вебинары для глубины',
    body: (
      <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6">
        {WEBINARS.map(({ title, text }) => (
          <div key={title}>
            <h4 className="font-bold text-[#0f2847]">{title}</h4>
            <p className="text-sm text-gray-600 leading-relaxed mt-1">{text}</p>
          </div>
        ))}
      </div>
    ),
  },
]

/* Карточки-панели складываются в стопку по мере скролла */
export default function Program3() {
  return (
    <section id="program" className="relative px-4 sm:px-6 lg:px-10 py-28">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-white font-black text-4xl md:text-6xl mb-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          Программа
        </motion.h2>
        <motion.p
          className="text-white/75 text-lg max-w-xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
        >
          Два насыщенных дня с работой над личной дорожной картой — и серия вебинаров,
          чтобы копнуть глубже.
        </motion.p>

        <div className="space-y-8">
          {CARDS.map(({ tag, title, body }, i) => (
            <div key={title} className="sticky" style={{ top: `${96 + i * 22}px` }}>
              <motion.div
                className="panel p-7 md:p-10"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease: EASE }}
              >
                <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
                  <h3 className="font-black text-2xl md:text-3xl text-[#0f2847]">{title}</h3>
                  <span className="text-xs font-semibold text-[#1e4976] bg-[#a8c8dc]/25 rounded-full px-4 py-1.5">
                    {tag}
                  </span>
                </div>
                {body}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
