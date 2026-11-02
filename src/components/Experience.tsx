import { useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap, useGSAP } from '../lib/gsap'
import { experience } from '../data'
import { ArrowIcon } from './ui'

export default function Experience() {
  const scope = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width: 900px)', () => {
      const t = track.current!
      const dist = () => t.scrollWidth - window.innerWidth
      gsap.to(t, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: '.exp-pin', start: 'top top', end: () => '+=' + dist(), scrub: 1, pin: true, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (self) => gsap.set('.exp-progress i', { scaleX: self.progress }),
        },
      })
      gsap.utils.toArray<HTMLElement>('.exp-card').forEach((card) => {
        gsap.from(card, {
          y: 80, opacity: 0, rotate: 3, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: card, containerAnimation: gsap.getTweensOf(t)[0], start: 'left 95%' },
        })
      })
      gsap.from('.exp-intro h2 span', { yPercent: 110, stagger: 0.08, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: '.exp-pin', start: 'top 70%' } })
    })
    mm.add('(max-width: 899px)', () => {
      gsap.from('.exp-card', { y: 60, opacity: 0, stagger: 0.12, duration: 0.9, scrollTrigger: { trigger: '.exp-track', start: 'top 85%' } })
    })
  }, { scope })

  return (
    <section className="experience" id="experience" ref={scope}>
      <div className="exp-pin">
        <div className="exp-track" ref={track}>
          <div className="exp-intro">
            <span className="eyebrow" style={{ marginBottom: 24 }}>03 — Experience</span>
            <h2>
              <span style={{ display: 'block', overflow: 'hidden' }}><span style={{ display: 'block' }}>Where</span></span>
              <span style={{ display: 'block', overflow: 'hidden' }}><span style={{ display: 'block' }}>I've</span></span>
              <span style={{ display: 'block', overflow: 'hidden' }}><span style={{ display: 'block' }} className="accent">worked</span></span>
            </h2>
            <p>Six roles, two of them leadership, from an intern desk in Ahmedabad to running Backend & DevOps for enterprise clients.</p>
          </div>
          {experience.map((e, i) => (
            <motion.article
              key={e.role}
              className={`exp-card ${e.period === 'Current' ? 'current' : ''}`}
              whileHover={{ y: -14 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18 }}
              data-hover=""
            >
              <div>
                <div className="exp-num">{String(i + 1).padStart(2, '0')}</div>
                <span className="exp-period">{e.period}</span>
                <h3 className="exp-role">{e.role}</h3>
                {e.url ? (
                  <a className="exp-company" href={e.url} target="_blank" rel="noreferrer" data-hover="Visit">
                    {e.company} <span>· {e.location}</span> <span style={{ width: 14, display: 'inline-block' }}><ArrowIcon /></span>
                  </a>
                ) : (
                  <div className="exp-company">{e.company} <span>· {e.location}</span></div>
                )}
                <p className="exp-desc">{e.desc}</p>
              </div>
              <div className="exp-tags">{e.tags.map((t) => <span key={t}>{t}</span>)}</div>
            </motion.article>
          ))}
          <div style={{ flex: '0 0 6vw' }} />
        </div>
        <div className="exp-progress"><i /></div>
        <div className="exp-hint">Scroll to explore →</div>
      </div>
    </section>
  )
}
