import { useRef } from 'react'
import { gsap, useGSAP, ScrollTrigger } from '../lib/gsap'

export default function Marquee({ words, dark = false, speed = 22 }: { words: string[]; dark?: boolean; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  useGSAP(() => {
    const track = ref.current!.querySelector('.marquee-track') as HTMLElement
    const tween = gsap.to(track, { xPercent: -50, ease: 'none', duration: speed, repeat: -1 })
    const proxy = { skew: 0 }
    const skewSetter = gsap.quickSetter(track, 'skewX', 'deg')
    const clamp = gsap.utils.clamp(-16, 16)
    ScrollTrigger.create({
      onUpdate: (self) => {
        const v = self.getVelocity() / 250
        const skew = clamp(v)
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew
          gsap.to(proxy, { skew: 0, duration: 0.8, ease: 'power3', overwrite: true, onUpdate: () => skewSetter(proxy.skew) })
        }
        tween.timeScale(self.direction === -1 ? -1 : 1)
      },
    })
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
