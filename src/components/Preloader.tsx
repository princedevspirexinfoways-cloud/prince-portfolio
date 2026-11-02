import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = ['Backend', 'DevOps', 'Architecture', 'Leadership', 'Prince Sherasiya']

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0)
  const [w, setW] = useState(0)

  useEffect(() => {
    const start = performance.now()
    const dur = 1900
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setN(Math.round(eased * 100))
      setW(Math.min(words.length - 1, Math.floor(p * words.length)))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setTimeout(onDone, 250)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <motion.div
      className="preloader"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="preloader-words">
        <AnimatePresence mode="wait">
          <motion.div key={w} initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.35 }}>
            {words[w]}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="preloader-sub">Loading portfolio — 2026</div>
      <div className="preloader-num">{n}<span>%</span></div>
      <motion.div className="preloader-bar" style={{ scaleX: n / 100 }} />
    </motion.div>
  )
}
