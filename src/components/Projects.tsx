import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { projects } from '../data'
import { Heading, TiltCard, ArrowIcon } from './ui'

export default function Projects() {
  const scope = useRef<HTMLElement>(null)
  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>('.project-item').forEach((item, i) => {
      gsap.from(item, {
        y: 120, opacity: 0, scale: 0.92, rotate: i % 2 ? 2 : -2, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: item, start: 'top 88%' },
      })
    })
  }, { scope })

  return (
    <section className="projects" id="projects" ref={scope}>
      <div className="container">
        <Heading index="04 — Projects" title="Selected work" sub="APIs in production, AR in the browser, and the college builds where it all started." />
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div className="project-item" key={p.title}>
              <TiltCard max={7}>
                <article className="project-card" data-hover="">
                  <div className={`project-art h${p.hue}`} />
                  <span className="project-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className={`project-status ${p.status === 'LIVE' ? 'live' : ''}`}>{p.status}</span>
                  <div className="project-body">
                    <span className="project-stack">{p.stack}</span>
                    <h3 className="project-title">{p.title}</h3>
                    <p className="project-desc">{p.desc}</p>
                    {p.link ? (
                      <a className="project-link" href={p.link} target="_blank" rel="noreferrer" data-hover="Repo">View repository <ArrowIcon /></a>
                    ) : null}
                  </div>
                </article>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
