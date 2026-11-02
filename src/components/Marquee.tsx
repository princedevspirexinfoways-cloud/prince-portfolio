import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '../lib/gsap'

export default function Marquee({ words, dark = false, speed = 22 }: { words: string[]; dark?: boolean; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const track = ref.current!.querySelector('.marquee-track') as HTMLElement
    const tween = gsap.to(track, { xPercent: -50, ease: 'none', duration: speed, repeat: -1 })
    const skewTo = gsap.quickTo(track, 'skewX', { duration: 0.6, ease: 'power3' })
    const clamp = gsap.utils.clamp(-16, 16)
    let dir = 1
    ScrollTrigger.create({
      onUpdate: (self) => {
        skewTo(clamp(self.getVelocity() / 250))
        const d = self.direction === -1 ? -1 : 1
        if (d !== dir) { dir = d; gsap.to(tween, { timeScale: d, duration: 0.5, overwrite: true }) }
      },
      onScrubComplete: () => skewTo(0),
    })
    let idle = 0
    ScrollTrigger.addEventListener('scrollEnd', () => { clearTimeout(idle); idle = window.setTimeout(() => skewTo(0), 80) })
  }, { scope: ref })

  const items = [...words, ...words]
  return (
    <div className={`marquee ${dark ? 'dark' : ''}`} ref={ref}>
      <div className="marquee-track">
        {items.map((w, i) => (
          <div className="marquee-item" key={i}><span>{w}</span><i /></div>
        ))}
      </div>
    </div>
  )
}
