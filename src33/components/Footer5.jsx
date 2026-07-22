import Logo15 from './Logo15.jsx'
import orgMb from '../assets/org-moibiznes.webp'

const LINKS = [
  { href: '#about', label: 'О проекте' },
  { href: '#program', label: 'Программа' },
  { href: '#schedule', label: 'География' },
  { href: '#speakers', label: 'Спикеры' },
  { href: '#faq', label: 'Вопросы' },
]

/* Соцсети центра «Мой бизнес». Глифы VK/TG/OK — simple-icons;
   Rutube — актуальный компакт-знак с rutube.ru (буква R + красная точка);
   MAX — официальный знак с max.ru (пузырь со спиралью) */
const SOCIALS = [
  {
    label: 'Одноклассники',
    href: 'https://ok.ru/group/61643509006428',
    viewBox: '0 0 24 24',
    size: 19,
    paths: [
      'M12 0C8.69 0 6 2.69 6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 8.44c-1.35 0-2.44-1.09-2.44-2.44S10.65 3.56 12 3.56s2.44 1.09 2.44 2.44S13.35 8.44 12 8.44zm4.5 4.8c-.55-.35-1.27-.27-1.72.18-.02.02-1.13 1.08-2.78 1.08s-2.76-1.06-2.78-1.08a1.4 1.4 0 0 0-1.72-.18c-.65.41-.84 1.28-.43 1.93.31.49 1.4 1.48 3.13 1.98l-2.6 2.6a1.4 1.4 0 0 0 0 1.98c.27.28.63.41.99.41s.72-.14.99-.41L12 19.42l2.42 2.31c.55.55 1.43.55 1.98 0s.55-1.43 0-1.98l-2.6-2.6c1.73-.5 2.82-1.49 3.13-1.98.41-.65.22-1.52-.43-1.93z',
    ],
  },
  {
    label: 'ВКонтакте',
    href: 'https://vk.ru/moibiz93',
    viewBox: '0 0 24 24',
    size: 16,
    paths: [
      'M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.862-.525-2.049-1.714-1.033-1.01-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.847 2.457 2.27 4.607 2.856 4.607.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.27-1.422 2.18-3.61 2.18-3.61.119-.254.322-.491.762-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.049.17.49-.085.744-.576.744z',
    ],
  },
  {
    label: 'Телеграм',
    href: 'https://t.me/moibiz93',
    viewBox: '0 0 24 24',
    size: 16,
    paths: [
      'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
    ],
  },
  {
    label: 'Rutube',
    href: 'https://rutube.ru/channel/58535893/',
    viewBox: '8.7 3.7 27.6 26.5',
    size: 17,
    paths: [
      'M25.5129 11.5405H9V29.8973H13.5961V23.9251H22.4029L26.4211 29.8973H31.5675L27.1366 23.8977C28.5127 23.6775 29.5035 23.1546 30.109 22.3289C30.7144 21.5033 31.0171 20.1822 31.0171 18.4208V17.0448C31.0171 15.999 30.9071 15.1734 30.7144 14.5403C30.5217 13.9074 30.1915 13.3569 29.7236 12.8616C29.2282 12.3937 28.6778 12.0634 28.0173 11.8433C27.3568 11.6506 26.5311 11.5405 25.5129 11.5405ZM24.7698 19.8795H13.5961V15.5861H24.7698C25.4028 15.5861 25.8431 15.6962 26.0633 15.8889C26.2834 16.0815 26.4211 16.4393 26.4211 16.9623V18.5035C26.4211 19.0539 26.2834 19.4117 26.0633 19.6043C25.8431 19.797 25.4028 19.8795 24.7698 19.8795Z',
      { d: 'M32.5109 10.4319C34.287 10.4319 35.7269 8.99209 35.7269 7.21596C35.7269 5.43984 34.287 4 32.5109 4C30.7348 4 29.2949 5.43984 29.2949 7.21596C29.2949 8.99209 30.7348 10.4319 32.5109 10.4319Z', fill: '#ED143B' },
    ],
  },
  {
    label: 'MAX',
    href: 'https://max.ru/moibiz93',
    viewBox: '0 0 100 100',
    size: 17,
    paths: [
      'M50.76 0c27.53 0 49.12 22.34 49.12 49.89S77.61 99.23 51.02 99.23c-9.43 0-14.01-1.33-21.37-6.54-.5-.36-1.2-.26-1.63.19-5.66 6.04-20.17 10.28-20.83 2.03C7.19 80.53 0 71.18 0 49.61 0 21.3 23.22 0 50.76 0m.77 24.55c-13.07-.68-23.26 8.39-25.51 22.58-1.86 11.75 1.44 26.07 4.26 26.8 1.2.3 4.08-1.9 6.18-3.88.4-.37.99-.44 1.45-.15 3.27 2 6.97 3.5 11.05 3.71 13.42.7 25.3-9.8 26-23.21.71-13.42-10.01-25.14-23.43-25.85',
    ],
  },
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
                <a href="mailto:info@нашедело23.рф" className="hover:text-white transition">
                  info@нашедело23.рф
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
              {SOCIALS.map(({ label, href, viewBox, size, paths }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="soc33 flex items-center justify-center w-9 h-9 rounded-full border border-[#d9bfa8]/30 text-[#d9c9b8] hover:text-white hover:border-[#d9bfa8]/70 hover:bg-white/5 transition"
                  >
                    <svg viewBox={viewBox} width={size} height={size} fill="currentColor" fillRule="evenodd" aria-hidden="true">
                      {paths.map((p, k) =>
                        typeof p === 'string' ? <path key={k} d={p} /> : <path key={k} d={p.d} fill={p.fill} />
                      )}
                    </svg>
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
