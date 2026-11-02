import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion'
import { gsap, useGSAP } from '../lib/gsap'

/* Split a string into animated chars wrapped in overflow-hidden words */
export function Split({ text, charClass = 'h-char', wordClass = 'word' }: { text: string; charClass?: string; wordClass?: string }) {
  return (
    <>
      {text.split(' ').map((word, wi) => (
        <span key={wi} className={wordClass} aria-hidden>
          {word.split('').map((c, ci) => (
            <span key={ci} className={charClass}>{c}</span>
          ))}
          {wi < text.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </>
  )
}

export function Heading({ index, title, sub }: { index: string; title: string; sub?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    gsap.from('.h-char', {
      yPercent: 120, rotate: 8, stagger: 0.025, duration: 1.1, ease: 'power4.out',
      scrollTrigger: { trigger: ref.current, start: 'top 85%' },
    })
    gsap.from('.heading-index, .heading p', { opacity: 0, y: 20, duration: 0.8, stagger: 0.15, scrollTrigger: { trigger: ref.current, start: 'top 85%' } })
  }, { scope: ref })
  return (
    <div className="heading" ref={ref}>
      <div>
        <span className="heading-index">{index}</span>
        <h2 aria-label={title}><Split text={title} /></h2>
      </div>
      {sub ? <p>{sub}</p> : null}
    </div>
  )
}

export function TiltCard({ children, className = '', max = 12 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), { stiffness: 220, damping: 20 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), { stiffness: 220, damping: 20 })
  const gx = useTransform(x, [-0.5, 0.5], ['0%', '100%'])
  const gy = useTransform(y, [-0.5, 0.5], ['0%', '100%'])
  const glow = useMotionTemplate`radial-gradient(420px circle at ${gx} ${gy}, rgba(255,107,0,0.22), transparent 60%)`

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - r.left) / r.width - 0.5)
    y.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { x.set(0); y.set(0) }

  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.025 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      <motion.div className="tilt-glow" style={{ background: glow }} />
      {children}
    </motion.div>
  )
}

export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 14, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 14, mass: 0.4 })
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => { x.set(0); y.set(0) }
  return (
    <motion.div ref={ref} className="magnetic" style={{ x, y }} onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  )
}

export const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M8 7h9v9" />
  </svg>
)
