import { useRef, useState, type MouseEvent } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { highlights } from '../data'
import { Heading, ArrowIcon } from './ui'

export default function Highlights() {
  const scope = useRef<HTMLElement>(null)
  const preview = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const xTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null)
  const yTo = useRef<ReturnType<typeof gsap.quickTo> | null>(null)

  useGSAP(() => {
    xTo.current = gsap.quickTo(preview.current, 'x', { duration: 0.6, ease: 'power3' })
    yTo.current = gsap.quickTo(preview.current, 'y', { duration: 0.6, ease: 'power3' })
    gsap.utils.toArray<HTMLElement>('.hl-row').forEach((row, i) => {
      gsap.from(row, { x: i % 2 ? 80 : -80, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 90%' } })
      gsap.from(row.querySelector('.hl-title'), { yPercent: 60, opacity: 0, duration: 1, delay: 0.15, ease: 'power4.out', scrollTrigger: { trigger: row, start: 'top 90%' } })
    })
  }, { scope })

  const fromTop = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    return e.clientY < r.top + r.height / 2
  }
  const onEnter = (e: MouseEvent<HTMLLIElement>, i: number) => {
    const row = e.currentTarget
    const fill = row.querySelector('.hl-fill')
    gsap.killTweensOf(fill)
    gsap.set(fill, { transformOrigin: fromTop(e) ? 'top' : 'bottom' })
    gsap.to(fill, { scaleY: 1, duration: 0.5, ease: 'power3.out' })
    row.classList.add('is-hover')
    setActive(i)
    gsap.to(preview.current, { opacity: 1, scale: 1, rotate: -4, duration: 0.5, ease: 'power3.out' })
  }
  const onLeave = (e: MouseEvent<HTMLLIElement>) => {
    const row = e.currentTarget
    const fill = row.querySelector('.hl-fill')
    gsap.killTweensOf(fill)
    gsap.set(fill, { transformOrigin: fromTop(e) ? 'top' : 'bottom' })
    gsap.to(fill, { scaleY: 0, duration: 0.5, ease: 'power3.out' })
    row.classList.remove('is-hover')
    gsap.to(preview.current, { opacity: 0, scale: 0.6, rotate: -10, duration: 0.4 })
  }
  const onMove = (e: MouseEvent<HTMLUListElement>) => {
    xTo.current?.(e.clientX + 36)
    yTo.current?.(e.clientY - 110)
  }

  return (
    <section className="highlights" id="highlights" ref={scope}>
      <div className="container">
        <Heading index="05 — Highlights" title="Milestones" sub="The moments that defined the last two years, listed like the awards wall they deserve to be." />
        <ul className="hl-list" onMouseMove={onMove}>
          {highlights.map((h, i) => (
            <li className="hl-row" key={h.title} onMouseEnter={(e) => onEnter(e, i)} onMouseLeave={onLeave} data-hover="">
              <div className="hl-fill" />
              <span className="hl-idx">0{i + 1}</span>
              <h3 className="hl-title">{h.title}<small>{h.org}</small></h3>
              <div className="hl-right">
                <span className="hl-year">{h.year}</span>
                <span className="hl-arrow"><ArrowIcon /></span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="hl-preview" ref={preview}>
        <div className="hl-preview-inner" style={{ transform: `translateY(-${active * 100}%)` }}>
          {highlights.map((h, i) => (
            <div className="hl-preview-slide" key={h.title}>
              <b>0{i + 1}</b>
              <span>{h.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
