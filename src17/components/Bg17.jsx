import { useEffect } from 'react'

/* Сцена «Кино»: OLED-зелёный фон, два дышащих mesh-свечения и курсорный
   прожектор. Прожектор двигается через CSS-переменные (без re-render),
   на тач-устройствах выключен медиазапросом. Орбы — blur-слои с медленной
   transform-анимацией; на мобильных анимация остановлена (см. CSS). */
export default function Bg17() {
  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const root = document.documentElement
    let raf = 0
    const onMove = (e) => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        root.style.setProperty('--spot-x', `${e.clientX}px`)
        root.style.setProperty('--spot-y', `${e.clientY}px`)
        raf = 0
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="bg-viewport11 fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, #06150f 0%, #081b13 30%, #0a2016 55%, #081b13 82%, #06150f 100%)',
          }}
        />
        <div className="orb17 orb17-green w-[70vmax] h-[70vmax] -top-[20%] -left-[18%]" />
        <div className="orb17 orb17-warm w-[55vmax] h-[55vmax] top-[30%] -right-[22%]" />
        {/* Виньетка кинокадра */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 42%, transparent 50%, rgba(2, 10, 7, 0.65) 100%)',
          }}
        />
      </div>
      {/* Прожектор поверх фона, под контентом */}
      <div className="spotlight17" aria-hidden="true" />
    </>
  )
}
