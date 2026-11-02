import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 })
  const [hover, setHover] = useState<string | null>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY) }
    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('a, button, [data-hover]') as HTMLElement | null
      setHover(el ? el.dataset.hover ?? '' : null)
    }
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over) }
  }, [x, y])

  return (
    <div className="cursor">
      <motion.div className="cursor-dot" style={{ x, y }} animate={{ scale: hover !== null ? 0 : 1 }} />
      <motion.div
        className="cursor-ring"
        style={{ x: rx, y: ry }}
        animate={{ scale: hover !== null ? (hover ? 2.2 : 1.6) : 1, backgroundColor: hover ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        {hover ? <span style={{ color: '#000', transform: 'scale(0.45)' }}>{hover}</span> : null}
      </motion.div>
    </div>
  )
}
