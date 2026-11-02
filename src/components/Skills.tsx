import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { skills } from '../data'
import { Heading, TiltCard } from './ui'

export default function Skills() {
  const scope = useRef<HTMLElement>(null)
  useGSAP(() => {
    gsap.from('.skill-item', {
      y: 90, opacity: 0, rotateX: -20, stagger: { each: 0.07, from: 'start' }, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.skills-grid', start: 'top 85%' },
    })
    gsap.utils.toArray<HTMLElement>('.skill-bar i').forEach((bar) => {
      gsap.fromTo(bar, { width: 0 }, { width: bar.dataset.level + '%', duration: 1.6, ease: 'expo.out', scrollTrigger: { trigger: bar, start: 'top 92%' } })
    })
    gsap.to('.skills-bg', { xPercent: -25, scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: true } })
  }, { scope })

  return (
    <section className="skills" id="skills" ref={scope}>
      <div className="skills-bg" aria-hidden>STACK</div>
      <div className="container">
        <Heading index="02 — Skills" title="My arsenal" sub="Backend-first, infrastructure-aware, and fluent enough on the front end to ship the whole thing." />
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div className="skill-item" key={s.name}>
              <TiltCard>
                <div className="skill-card" data-hover="">
                  <span className="skill-big">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <span className="skill-tag">{s.tag}</span>
                    <h3 className="skill-name">{s.name}</h3>
                  </div>
                  <div>
                    <div className="skill-bar"><i data-level={s.level} /></div>
                    <div className="skill-pct"><span>Proficiency</span><span>{s.level}%</span></div>
                  </div>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
