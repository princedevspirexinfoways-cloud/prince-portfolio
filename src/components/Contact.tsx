import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'
import { profile } from '../data'
import { Magnetic, ArrowIcon } from './ui'
import { ShapeScene } from './Scene3D'
import { scrollTo } from '../lib/lenis'

export default function Contact() {
  const scope = useRef<HTMLElement>(null)
  useGSAP(() => {
    gsap.from('.contact-title .line > span', { yPercent: 110, rotate: 4, stagger: 0.12, duration: 1.3, ease: 'power4.out', scrollTrigger: { trigger: '.contact-title', start: 'top 80%' } })
    gsap.from('.contact-row > *', { y: 40, opacity: 0, stagger: 0.15, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: '.contact-row', start: 'top 90%' } })
    gsap.fromTo('.contact-canvas', { scale: 0.7, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.5, ease: 'power3.out', scrollTrigger: { trigger: scope.current, start: 'top 60%' } })
  }, { scope })

  return (
    <section className="contact" id="contact" ref={scope}>
      <ShapeScene kind="knot" className="contact-canvas" />
      <div className="container contact-inner">
        <span className="eyebrow" style={{ marginBottom: 32 }}>07 — Contact</span>
        <h2 className="contact-title">
          <span className="line"><span>Let's build</span></span>
          <span className="line"><span className="outline">something</span></span>
          <span className="line"><span>that</span></span>
          <span className="line"><span className="accent">scales.</span></span>
        </h2>
        <div className="contact-row">
          <div>
            <a className="contact-email" href={`mailto:${profile.email}`} data-hover="Mail">{profile.email}</a>
            <div className="contact-meta">
              <a href={`tel:${profile.phoneRaw}`}>{profile.phone}</a>
              <span>{profile.location}</span>
            </div>
          </div>
          <div className="contact-btns">
            <Magnetic><a className="btn solid" href={`mailto:${profile.email}`}>Email me <ArrowIcon /></a></Magnetic>
            <Magnetic><a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a></Magnetic>
            <Magnetic><a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a></Magnetic>
            <Magnetic><a className="btn ghost" href={profile.resume} target="_blank" rel="noreferrer">Resume <ArrowIcon /></a></Magnetic>
          </div>
        </div>
      </div>
      <footer className="footer">
        <span>© 2026 <b>Prince Sherasiya</b></span>
        <span>Built with React · GSAP · Framer Motion · Three.js</span>
        <button className="footer-top" onClick={() => scrollTo(0)} data-hover="Top">Back to top <i><span style={{ display: 'inline-block', transform: 'rotate(-45deg)', width: 16 }}><ArrowIcon /></span></i></button>
      </footer>
    </section>
  )
}
