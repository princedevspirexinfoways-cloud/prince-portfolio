import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { about, stats } from '../data'
import { Heading } from './ui'
import { ShapeScene } from './Scene3D'

export default function About() {
  const scope = useRef<HTMLElement>(null)
  useGSAP(() => {
    gsap.fromTo('.about-text .w', { opacity: 0.1, y: 10 }, {
      opacity: 1, y: 0, stagger: 0.04, ease: 'none',
      scrollTrigger: { trigger: '.about-text', start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
    })
    gsap.from('.stat', { y: 60, opacity: 0, stagger: 0.12, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.stats', start: 'top 85%' } })
    gsap.utils.toArray<HTMLElement>('.stat b').forEach((el) => {
      const end = Number(el.dataset.value)
      const obj = { v: 0 }
      gsap.to(obj, {
        v: end, duration: 1.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%' },
        onUpdate: () => { el.textContent = Math.round(obj.v) + (el.dataset.suffix ?? '') },
      })
    })
    gsap.matchMedia().add('(min-width: 961px)', () => {
      gsap.to('.about-canvas', { yPercent: -20, scrollTrigger: { trigger: scope.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    })
  }, { scope })

  return (
    <section className="about" id="about" ref={scope}>
      <div className="container">
        <Heading index="01 — About" title="Who I am" sub="Intern to Technical Lead in just over two years. I ship reliable systems and grow the people around them." />
        <div className="about-grid">
          <p className="about-text">
            {about.split(' ').map((w, i) => <span className="w" key={i}>{w}</span>)}
          </p>
          <div className="about-side">
            <div className="about-orb"><ShapeScene kind="torus" className="about-canvas" /></div>
            <div className="stats">
              {stats.map((s) => (
                <div className="stat" key={s.label} data-hover="">
                  <b data-value={s.value} data-suffix={s.suffix}>0{s.suffix}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
