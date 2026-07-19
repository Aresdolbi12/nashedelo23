import { motion, useScroll, useTransform } from 'framer-motion'

/* Живое небо: фон светлеет от предрассветной стали к дневному небу,
   облака проявляются, к финалу встаёт солнце. Всё привязано к скроллу.
   Кривая подобрана под текст секций: hero/about/program идут по белому тексту
   на тёмном небе, а к schedule рассвет резко «прорывается» в светлое,
   чтобы тёмный текст нижних секций не сливался с фоном. */
export default function Bg() {
  const { scrollYProgress } = useScroll()

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.20, 0.40, 0.50, 0.64, 1],
    ['#0c1e35', '#1e4976', '#3f6d9a', '#c2d9ea', '#e8f2f8', '#eef5fa'],
  )
  // Облака видны уже в hero и уверенно проявляются к светлой части
  const cloudsOpacity = useTransform(scrollYProgress, [0, 0.5], [0.38, 0.92])
  const sunOpacity = useTransform(scrollYProgress, [0.62, 0.92], [0, 1])
  const horizonOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0])

  return (
    <motion.div className="fixed inset-0 -z-10 overflow-hidden" style={{ backgroundColor }} aria-hidden="true">
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[45vh]"
        style={{
          opacity: horizonOpacity,
          background: 'linear-gradient(180deg, transparent, rgba(120,160,200,0.35) 55%, rgba(190,212,235,0.55))',
        }}
      />
      <motion.div className="absolute inset-0" style={{ opacity: cloudsOpacity }}>
        <div className="cloud3" style={{ width: 560, height: 160, top: '10%', left: '-8%', '--drift': '90s' }} />
        <div className="cloud3" style={{ width: 440, height: 130, top: '26%', right: '-6%', '--drift': '110s' }} />
        <div className="cloud3" style={{ width: 380, height: 110, top: '46%', left: '10%', '--drift': '80s' }} />
        <div className="cloud3" style={{ width: 480, height: 140, top: '64%', right: '8%', '--drift': '120s' }} />
        <div className="cloud3" style={{ width: 340, height: 100, top: '82%', left: '22%', '--drift': '100s' }} />
      </motion.div>
      <motion.div
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[900px] max-h-[900px]"
        style={{
          opacity: sunOpacity,
          background: 'radial-gradient(circle, rgba(255,252,240,0.95), rgba(255,248,225,0.35) 40%, transparent 70%)',
        }}
      />
    </motion.div>
  )
}
