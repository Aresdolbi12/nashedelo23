/* Новый логотип «НАШЕ ДЕЛО»: набран шрифтом Unbounded ExtraBold
   (шрифт заголовков «Мой Бизнес Forum» — просьба заказчика, менее
   агрессивный, чем старый рубленый PNG). Заливка — серебряный градиент
   в цвет прежнего металла, поверх — бегущий блик (только десктоп).

   size: 'hero' — главный экран; 'nav' — капсула меню; 'footer' — подвал.
   Дубль текста в .logo15-shine обязан совпадать посимвольно с основным. */

const SIZES = {
  poster: {
    wrap: 'inline-block text-center',
    top: 'text-[clamp(2.6rem,11vw,5.8rem)] tracking-[0.16em]',
    bottom: 'text-[clamp(3.9rem,16.5vw,8.6rem)] -mt-[0.1em]',
  },
  hero: {
    wrap: 'inline-block text-center',
    top: 'text-[clamp(2rem,9vw,4.6rem)] tracking-[0.14em]',
    bottom: 'text-[clamp(2.9rem,13vw,6.7rem)] -mt-[0.12em]',
  },
  nav: {
    wrap: 'inline-block text-left leading-none',
    top: 'text-[11px] tracking-[0.18em]',
    bottom: 'text-[16px] -mt-[2px]',
  },
  footer: {
    wrap: 'inline-block text-left leading-none',
    top: 'text-[15px] tracking-[0.18em]',
    bottom: 'text-[23px] -mt-[3px]',
  },
}

export default function Logo15({ size = 'hero', shine = false, tone = 'silver', className = '' }) {
  const s = SIZES[size]
  const toneCls = tone === 'ink' ? 'logo15 logo16-ink' : 'logo15'
  const rows = (cls) => (
    <span className={`${s.wrap} ${cls}`}>
      <span className={`block ${s.top}`}>НАШЕ</span>
      <span className={`block ${s.bottom}`}>ДЕЛО</span>
    </span>
  )
  return (
    <span className={`relative inline-block select-none ${className}`}>
      {rows(toneCls)}
      {shine && (
        <span className="absolute inset-0" aria-hidden="true">
          {rows('logo15 logo15-shine')}
        </span>
      )}
    </span>
  )
}
