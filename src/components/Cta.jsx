import { Reveal } from './shared.jsx'
import { ArrowIcon } from './shared.jsx'

export default function Cta() {
  return (
    <section
      id="register"
      className="relative overflow-hidden grain"
      style={{ background: 'linear-gradient(180deg, #a8c8dc 0%, #d6e6f0 50%, #f7f9fb 100%)' }}
    >
      <div className="cloud" style={{ width: 600, height: 180, top: '-5%', left: '-10%', opacity: 0.85, '--drift': '90s' }} aria-hidden="true" />
      <div className="cloud" style={{ width: 500, height: 150, top: '20%', right: '-15%', opacity: 0.8, '--drift': '75s' }} aria-hidden="true" />
      <div className="cloud" style={{ width: 400, height: 120, bottom: '10%', left: '20%', opacity: 0.6, '--drift': '110s' }} aria-hidden="true" />

      <div className="max-w-5xl mx-auto px-6 lg:px-10 py-24 md:py-32 relative z-10 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="h-px w-12 bg-[#1e4976]" />
            <span className="text-xs tracking-[0.3em] uppercase font-semibold text-[#1e4976]">
              Следующий шаг
            </span>
            <div className="h-px w-12 bg-[#1e4976]" />
          </div>
          <h2 className="font-display font-black text-4xl md:text-6xl lg:text-7xl text-[#0f2847] leading-[1.02] mb-8">
            Мирное небо.
            <br />
            <span className="italic font-light">Ваше дело.</span>
          </h2>
          <p className="text-lg md:text-xl text-[#1e3a5f] max-w-2xl mx-auto leading-relaxed mb-12 font-light">
            Заполните короткую анкету — мы свяжемся с вами, расскажем подробности и поможем подготовиться
            к старту потока.
          </p>
          <a
            href="https://forms.yandex.ru/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-3 px-10 py-5 rounded-sm text-base font-bold tracking-wider uppercase"
          >
            <span className="shine" />
            Зарегистрироваться
            <ArrowIcon size={20} className="arrow" />
          </a>
          <p className="text-sm text-gray-600 mt-6">Участие бесплатное. Количество мест ограничено.</p>
        </Reveal>
      </div>
    </section>
  )
}
