import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

/* Луч рассвета: световая нить у левого края, растущая по мере скролла
   до самого подвала; на конце — движущаяся точка-«солнце». */
export default function DawnLine() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26 })
  const sunTop = useTransform(progress, [0, 1], ['0%', '100%'])

  return (
    <div
      className="fixed left-5 lg:left-7 top-0 bottom-0 w-[2px] z-40 hidden md:block pointer-events-none"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-white/12 rounded-full" />
      <motion.div
        className="absolute inset-x-0 top-0 h-full origin-top rounded-full"
        style={{
          scaleY: progress,
          background: 'linear-gradient(180deg, #a8c8dc 0%, #dcebf5 55%, #ffefc2 100%)',
        }}
      />
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 -mt-1.5 w-3 h-3 rounded-full"
        style={{
          top: sunTop,
          background: 'radial-gradient(circle, #fff8e1 30%, #ffd98a 100%)',
          boxShadow: '0 0 16px 5px rgba(255, 235, 180, 0.55)',
        }}
      />
    </div>
  )
}
