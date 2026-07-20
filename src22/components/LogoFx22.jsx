import { useCallback, useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import Logo15 from './Logo15.jsx'

/* «Живой металл»: логотип наклоняется за курсором в 3D, и свет скользит
   по металлу вслед за мышью — блик управляется рукой посетителя.
   На тач-устройствах и при reduced-motion — базовое серебро с бликом. */
export default function LogoFx22() {
  const reduceMotion = useReducedMotion()
  const [interactive, setInteractive] = useState(false)
  useEffect(() => {
    setInteractive(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 16 })
  const sy = useSpring(my, { stiffness: 60, damping: 16 })
  const rotY = useTransform(sx, [-1, 1], [-7, 7])
  const rotX = useTransform(sy, [-1, 1], [5, -5])
  const lightPos = useTransform(sx, [-1, 1], ['130% 0%', '-130% 0%'])

  const onMove = useCallback((e) => {
    mx.set((e.clientX / window.innerWidth) * 2 - 1)
    my.set((e.clientY / window.innerHeight) * 2 - 1)
  }, [mx, my])

  useEffect(() => {
    if (!interactive || reduceMotion) return
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [interactive, reduceMotion, onMove])

  if (!interactive || reduceMotion) return <Logo15 size="poster" shine />

  return (
    <div style={{ perspective: 900 }}>
      <motion.span
        className="relative inline-block"
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
      >
        <Logo15 size="poster" />
        {/* Свет, скользящий по металлу за курсором */}
        <motion.span className="absolute inset-0" aria-hidden="true" style={{ backgroundPosition: lightPos }}>
          <span
            className="logo15 logo22-light inline-block text-center"
            style={{ backgroundPosition: 'inherit' }}
          >
            <span className="block text-[clamp(2.6rem,11vw,5.8rem)] tracking-[0.16em]">НАШЕ</span>
            <span className="block text-[clamp(3.9rem,16.5vw,8.6rem)] -mt-[0.1em]">ДЕЛО</span>
          </span>
        </motion.span>
      </motion.span>
    </div>
  )
}
