import { motion } from 'framer-motion'
import { ArrowIcon } from './shared33.jsx'

const EASE = [0.19, 1, 0.22, 1]

/* Ракета из логотипа «Мой бизнес» (пути из moibiz93.ru/…/moi-biz-logo.svg):
   корпус-капля с вырезом, иллюминатор, пламя-ромб снизу, искра сверху.
   Используется водяным знаком на градиенте — как в их собственных баннерах. */
function RocketGlyph({ className }) {
  return (
    <svg viewBox="125 0 43 76" className={className} fill="currentColor" aria-hidden="true">
      <path
        opacity="0.55"
        d="M150.164 63.7629L144.213 57.9088L138.262 63.7629L144.213 75.9999L150.164 63.7629Z"
      />
      <path d="M144.213 24.245C143.393 24.2391 142.59 24.4731 141.905 24.9175C141.22 25.3619 140.685 25.9966 140.367 26.741C140.05 27.4855 139.964 28.3061 140.12 29.0987C140.277 29.8913 140.669 30.6202 141.248 31.1928C141.826 31.7655 142.564 32.1561 143.368 32.3152C144.172 32.4742 145.005 32.3944 145.763 32.0859C146.521 31.7775 147.169 31.2543 147.624 30.5827C148.079 29.9112 148.322 29.1215 148.321 28.314C148.321 27.2333 147.885 26.1968 147.109 25.4326C146.333 24.6683 145.28 24.239 144.182 24.239" />
      <path d="M144.214 5.96771C142.956 6.60481 126.513 15.1695 126.513 28.8611C126.513 40.5692 136.205 58.3118 136.205 58.3118L144.238 50.3841L152.246 58.2998C152.246 58.2998 161.939 40.5392 161.939 28.8491C161.939 15.1575 145.459 6.61082 144.238 5.95569L144.214 5.96771ZM149.542 45.077L144.238 39.842L138.909 45.077C138.641 44.3498 135.082 34.8594 135.082 28.6988C135.082 20.3625 143.573 15.6924 144.238 15.3499C144.848 15.6924 153.394 20.3625 153.394 28.6988C153.394 34.8775 149.841 44.3257 149.567 45.077" />
      <path
        opacity="0.55"
        d="M161.94 0.00011496L155.881 5.96704L161.94 11.934L168 5.96705L161.94 0.00011496Z"
      />
    </svg>
  )
}

/* Баннер «Меры поддержки бизнеса участников СВО» (просьба заказчика 24.07):
   яркая красная плита 7417C перед подвалом, ведёт на moibiz93.ru/svo-support.
   Красный на сайте зарезервирован под акценты — поэтому баннер единственный
   крупный красный блок и читается мгновенно. С 2026-07-24 вместо звезды —
   ракета логотипа «Мой бизнес» водяным знаком на градиенте (правка заказчика). */
export default function SvoSupport33() {
  return (
    <section id="svo-support" className="relative px-6 lg:px-10 pb-24 md:pb-32">
      <motion.div
        className="max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <a
          href="https://moibiz93.ru/svo-support/"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block overflow-hidden bg-[linear-gradient(130deg,#ef6a52_0%,#e04e39_48%,#c23a27_100%)] rounded-[28px] px-8 py-9 md:px-12 md:py-11 shadow-[0_24px_60px_rgba(224,78,57,0.35)] hover:shadow-[0_28px_70px_rgba(224,78,57,0.5)] hover:-translate-y-0.5 transition-all duration-300"
        >
          {/* Водяной знак-ракета: крупно справа, уходит за край плиты */}
          <RocketGlyph className="absolute -right-8 md:-right-3 top-1/2 -translate-y-1/2 h-[190%] w-auto text-white/[0.14] group-hover:text-white/[0.2] transition-colors duration-500 pointer-events-none select-none" />
          {/* Мягкий блик сверху — глубина плиты */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 18% -20%, rgba(255,255,255,0.18) 0%, transparent 55%)' }}
            aria-hidden="true"
          />
          <div className="relative flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <div className="flex-1">
              <div className="text-white/80 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2">
                Центр «Мой бизнес» · Краснодарский край
              </div>
              <div className="text-white font-black text-xl md:text-3xl leading-tight text-balance">
                Меры поддержки бизнеса участников СВО
              </div>
            </div>
            <span className="btn-light inline-flex items-center justify-center gap-3 px-7 py-4 font-bold whitespace-nowrap md:self-center group-hover:gap-4 transition-all">
              Смотреть меры
              <ArrowIcon size={17} />
            </span>
          </div>
        </a>
      </motion.div>
    </section>
  )
}
