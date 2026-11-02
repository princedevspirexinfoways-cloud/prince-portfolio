import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { education } from '../data'
import { Heading } from './ui'

export default function Education() {
  const scope = useRef<HTMLElement>(null)
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.edu-row').forEach((row, i) => {
      gsap.from(row, { x: i % 2 ? 120 : -120, opacity: 0, rotate: i % 2 ? 2 : -2, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: row, start: 'top 88%' } })
      gsap.from(row.querySelector('.edu-year'), { scale: 0.4, opacity: 0, duration: 1, ease: 'back.out(1.8)', delay: 0.2, scrollTrigger: { trigger: row, start: 'top 88%' } })
    })
  }, { scope })

  return (
    <section className="education" id="education" ref={scope}>
      <div className="container">
        <Heading index="06 — Education" title="Foundations" sub="Formal training, algorithms, and the diploma that set the direction." />
        <div className="edu-list">
          {education.map((e) => (
            <div className="edu-row" key={e.title} data-hover="">
              <div className="edu-year">{e.year}</div>
              <div>
                <h3 className="edu-title">{e.title}</h3>
                <div className="edu-org">{e.org}</div>
              </div>
              <span className="edu-note">{e.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
