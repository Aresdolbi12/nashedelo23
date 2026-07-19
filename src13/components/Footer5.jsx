import logo from '../assets/logo-nashe-delo.webp'
import orgMb from '../assets/org-moibiznes.webp'

const LINKS = [
  { href: '#about', label: 'О проекте' },
  { href: '#program', label: 'Программа' },
  { href: '#schedule', label: 'География' },
  { href: '#speakers', label: 'Спикеры' },
  { href: '#faq', label: 'Вопросы' },
]

/* Контраст текста поднят: базовый #c3d0de (≈8:1 на #0f2847),
   вторичный #9db1c6 (≈5:1) — читается и на старых мониторах */
export default function Footer5() {
  return (
    <footer className="relative bg-[#0f2847] text-[#c3d0de] rounded-t-[32px]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div className="max-w-sm">
            <a href="#top" aria-label="Наше дело — к началу страницы">
              <img src={logo} alt="Наше дело" className="h-14 w-auto mb-5" />
            </a>
            <p className="text-sm text-[#9db1c6] leading-relaxed uppercase tracking-wide">
              Образовательная бизнес-программа
              <span className="text-[#9db1c6]/50 mx-1.5">·</span>
              для участников боевых действий, ветеранов СВО и членов их семей
            </p>
          </div>
          <div className="flex gap-16">
            <ul className="space-y-2 text-sm">
              {LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="hover:text-white transition">{label}</a>
                </li>
              ))}
            </ul>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:info@нашедело23.рф" className="hover:text-white transition">
                  info@нашедело23.рф
                </a>
              </li>
              <li className="text-[#9db1c6]">Краснодарский край</li>
            </ul>
          </div>
          <div className="max-w-[240px]">
            <a
              href="https://moibiz93.ru/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-80 transition-opacity"
            >
              <img src={orgMb} alt="Центр «Мой бизнес» Краснодарский край" className="h-16 w-auto mb-3" />
            </a>
            <p className="text-xs text-[#9db1c6] leading-relaxed">
              Организатор —{' '}
              <a
                href="https://moibiz93.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[#9db1c6]/40 underline-offset-2 hover:text-white transition"
              >
                Фонд развития бизнеса Краснодарского края
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-white/15 mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-[#9db1c6]">
          <span>© 2026 «Наше дело». Все права защищены.</span>
          <span>нашедело23.рф</span>
        </div>
      </div>
    </footer>
  )
}
