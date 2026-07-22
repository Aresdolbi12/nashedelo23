import { motion } from 'framer-motion'
import { ArrowIcon } from '../../src2/components/shared2.jsx'

const EASE = [0.19, 1, 0.22, 1]

/* «О нас пишут» v33: РЕАЛЬНЫЕ публикации о старте программы (21.07.2026).
   Заголовки — как в первоисточниках; у новости администрации края
   заголовок с сайта недоступен, поэтому дано описание материала. */
const ROWS = [
  {
    outlet: 'РИА Новости',
    title: 'В Краснодарском крае стартует проект «Наше дело»',
    href: 'https://ria.ru/20260721/ruppel-2106110286.html',
  },
  {
    outlet: 'МК на Кубани',
    title: 'В семи городах Кубани запускают бизнес-курс для ветеранов СВО и их семей',
    href: 'https://kuban.mk.ru/economics/2026/07/21/v-semi-gorodakh-kubani-zapuskayut-bizneskurs-dlya-veteranov-svo-i-ikh-semey.html',
  },
  {
    outlet: 'Администрация Краснодарского края',
    title: 'Официальная новость о старте программы на портале администрации региона',
    href: 'https://admkrai.krasnodar.ru/content/1131/show/834091/',
  },
  {
    outlet: 'Газета «Единство»',
    title: 'В Краснодарском крае стартует проект «Наше дело» — образовательная программа для ветеранов СВО и членов их семей',
    href: 'https://pav-edin23.ru/2026/07/21/v-krasnodarskom-krae-startuet-proekt-nashe-delo-obrazovatelnaya-programma-dlya-veteranov-svo-i-chlenov-ix-semej/',
  },
]

export default function Press15() {
  return (
    <section id="press" className="relative px-6 lg:px-10 py-24 md:py-32">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="relative text-[#f2ece3] font-black text-4xl md:text-6xl mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="echo-text15 absolute -top-[0.55em] left-[0.1em] text-[1.5em] font-black" aria-hidden="true">
            Пресса
          </span>
          <span className="relative">О нас пишут</span>
        </motion.h2>

        <div className="space-y-6 md:space-y-8 max-w-3xl">
          {ROWS.map(({ outlet, title, href }, i) => (
            <motion.article
              key={outlet}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
            >
              <div className="plaque22 newsplaque31 relative px-8 py-7 sm:px-10 sm:py-8">
                <p className="text-[#623b2a] font-black uppercase tracking-[0.14em] text-[13px] sm:text-sm">
                  {outlet}
                </p>
                <h3 className="text-[#27251f] mt-3 font-semibold text-[15px] sm:text-lg leading-snug">
                  {title}
                </h3>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-read31 mt-6"
                  aria-label={`Читать материал: ${outlet}`}
                >
                  Читать материал
                  <ArrowIcon size={15} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
