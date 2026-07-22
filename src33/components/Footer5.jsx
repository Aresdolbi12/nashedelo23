import Logo15 from './Logo15.jsx'
import orgMb from '../assets/org-moibiznes.webp'

const LINKS = [
  { href: '#about', label: 'О проекте' },
  { href: '#program', label: 'Программа' },
  { href: '#schedule', label: 'География' },
  { href: '#speakers', label: 'Спикеры' },
  { href: '#faq', label: 'Вопросы' },
]

/* Соцсети центра «Мой бизнес»: у VK/TG/OK — фирменные глифы (simple-icons),
   у Rutube и MAX логотипы буквенные — рисуем буквой в том же кружке */
const SOCIALS = [
  {
    label: 'Одноклассники',
    href: 'https://ok.ru/group/61643509006428',
    d: 'M12 0C8.69 0 6 2.69 6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 8.44c-1.35 0-2.44-1.09-2.44-2.44S10.65 3.56 12 3.56s2.44 1.09 2.44 2.44S13.35 8.44 12 8.44zm4.5 4.8c-.55-.35-1.27-.27-1.72.18-.02.02-1.13 1.08-2.78 1.08s-2.76-1.06-2.78-1.08a1.4 1.4 0 0 0-1.72-.18c-.65.41-.84 1.28-.43 1.93.31.49 1.4 1.48 3.13 1.98l-2.6 2.6a1.4 1.4 0 0 0 0 1.98c.27.28.63.41.99.41s.72-.14.99-.41L12 19.42l2.42 2.31c.55.55 1.43.55 1.98 0s.55-1.43 0-1.98l-2.6-2.6c1.73-.5 2.82-1.49 3.13-1.98.41-.65.22-1.52-.43-1.93z',
  },
  {
    label: 'ВКонтакте',
    href: 'https://vk.ru/moibiz93',
    d: 'M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.847 2.457 2.27 4.607 2.856 4.607.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.18-3.61 2.18-3.61.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.49-.085.744-.576.744z',
  },
  {
    label: 'Телеграм',
    href: 'https://t.me/moibiz93',
    d: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
  },
  { label: 'Rutube', href: 'https://rutube.ru/channel/58535893/', letter: 'R' },
  { label: 'MAX', href: 'https://max.ru/moibiz93', letter: 'M' },
]

/* Контраст текста поднят: базовый #c3d0de (≈8:1 на #0f2847),
   вторичный #b3a394 (≈5:1) — читается и на старых мониторах */
export default function Footer5() {
  return (
    <footer className="relative bg-[#0d2f22] text-[#d9c9b8] border-t border-[#d9bfa8]/20 rounded-t-[32px]">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 py-14">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div className="max-w-sm">
            <a href="#top" aria-label="Наше дело — к началу страницы">
              <span className="inline-block mb-5"><Logo15 size="footer" /></span>
            </a>
            <p className="text-sm text-[#b3a394] leading-relaxed uppercase tracking-wide">
              Обучающая бизнес-программа
              <span className="text-[#b3a394]/50 mx-1.5">·</span>
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
              <li className="text-[#b3a394]">Служба заботы:</li>
              <li>
                <a href="mailto:info@нашедело.рф" className="hover:text-white transition">
                  info@нашедело.рф
                </a>
              </li>
              <li>
                <a href="tel:88619920347" className="font-bold hover:text-white transition whitespace-nowrap">
                  8 (861) 992-03-47
                </a>
              </li>
              <li className="text-[#b3a394] pt-1">Краснодарский край</li>
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
            <p className="text-xs text-[#b3a394] leading-relaxed">
              Организатор —{' '}
              <a
                href="https://moibiz93.ru/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[#b3a394]/40 underline-offset-2 hover:text-white transition"
              >
                Фонд развития бизнеса Краснодарского края
              </a>
            </p>
            <ul className="flex gap-2.5 mt-4" aria-label="Соцсети центра «Мой бизнес»">
              {SOCIALS.map(({ label, href, d, letter }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="soc33 flex items-center justify-center w-9 h-9 rounded-full border border-[#d9bfa8]/30 text-[#d9c9b8] hover:text-white hover:border-[#d9bfa8]/70 hover:bg-white/5 transition"
                  >
                    {d ? (
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                        <path d={d} />
                      </svg>
                    ) : (
                      <span className="font-black text-[13px] leading-none" aria-hidden="true">{letter}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="tel:88007070711"
              className="inline-block mt-3 text-sm font-bold hover:text-white transition whitespace-nowrap"
            >
              8 (800) 707-07-11
            </a>
          </div>
        </div>
        <div className="border-t border-white/15 mt-12 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-xs text-[#b3a394]">
          <span>© 2026 «Наше дело». Все права защищены.</span>
          <span>нашедело23.рф</span>
        </div>
      </div>
    </footer>
  )
}
