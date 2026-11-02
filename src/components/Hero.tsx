import { useRef, type MouseEvent } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { gsap, useGSAP } from '../lib/gsap'
import { profile } from '../data'
import { Split, ArrowIcon } from './ui'
import { HeroScene } from './Scene3D'
import { scrollTo } from '../lib/lenis'

export default function Hero({ ready }: { ready: boolean }) {
  const scope = useRef<HTMLElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 120, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 120, damping: 18 })

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  useGSAP(() => {
    if (!ready) return
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.3 })
    tl.from('.hero-eyebrow', { x: -30, opacity: 0, duration: 0.8 })
      .from('.hero-char', { yPercent: 130, rotate: 10, stagger: 0.035, duration: 1.2 }, '-=0.5')
      .fromTo('.hero-photo-clip', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'expo.inOut' }, 0.4)
      .from('.hero-photo-clip img', { scale: 1.5, duration: 1.8, ease: 'expo.out' }, 0.5)
      .from('.hero-photo-ring', { opacity: 0, scale: 0.8, duration: 1, stagger: 0.1 }, 1.2)
      .from('.hero-badge', { scale: 0, rotate: -90, duration: 0.9, ease: 'back.out(2)' }, 1.4)
      .from('.hero-pill', { x: -40, opacity: 0, duration: 0.8 }, 1.5)
      .from('.hero-photo-caption', { y: 30, opacity: 0, duration: 0.8 }, 1.5)
      .from('.hero-sub', { y: 30, opacity: 0, duration: 0.9 }, 1.1)
      .from('.hero-ctas .btn', { y: 24, opacity: 0, stagger: 0.12, duration: 0.8 }, 1.3)
      .from('.hero-scroll', { opacity: 0, duration: 0.8 }, 1.8)

    const st = { trigger: scope.current, start: 'top top', end: 'bottom top', scrub: true }
    gsap.to('.hero-photo-outer', { yPercent: -30, rotate: -6, scrollTrigger: st })
    gsap.to('.hero-title', { yPercent: 40, opacity: 0.15, scrollTrigger: st })
    gsap.to('.hero-sub, .hero-ctas', { yPercent: 60, opacity: 0, scrollTrigger: st })
    gsap.to('.hero-glow', { yPercent: 50, scale: 1.4, scrollTrigger: st })
  }, { scope, dependencies: [ready] })

  return (
    <section className="hero" ref={scope} id="top">
      <div className="hero-glow" />
      <HeroScene />
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow hero-eyebrow">{profile.role}</span>
          <h1 className="hero-title" aria-label={profile.name}>
            <Split text={profile.first} charClass="hero-char" />
            <br />
            <span className="outline"><Split text={profile.last} charClass="hero-char" /></span>
          </h1>
          <p className="hero-sub">{profile.tagline} Currently leading Backend & DevOps at Spirex Infoways and serving as CTO at Nameless AI.</p>
          <div className="hero-ctas">
            <a className="btn solid" href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('#projects') }} data-hover="View">
              See my work <ArrowIcon />
            </a>
            <a className="btn ghost" href={profile.resume} target="_blank" rel="noreferrer" data-hover="PDF">
              Resume <ArrowIcon />
            </a>
          </div>
        </div>

        <div className="hero-photo-outer">
          <motion.div
            className="hero-photo-wrap"
            style={{ rotateX: rx, rotateY: ry }}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            data-hover="Hi"
          >
            <div className="hero-photo-ring" />
            <div className="hero-photo-ring second" />
            <div className="hero-photo-clip">
              <img src="/prince.png" alt="Prince Sherasiya" />
              <div className="hero-photo-tint" />
            </div>
            <div className="hero-photo-caption">
              Based in Rajkot, IN
              <b>{profile.name}</b>
            </div>
            <div className="hero-badge">
              <svg viewBox="0 0 130 130">
                <defs><path id="circ" d="M65,65 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0" /></defs>
                <text><textPath href="#circ">BACKEND • DEVOPS • LEAD • ARCHITECT •</textPath></text>
              </svg>
              <div className="badge-center"><i>{profile.years}</i></div>
            </div>
            <div className="hero-pill"><b /> Open to work</div>
          </motion.div>
        </div>
      </div>
      <div className="hero-scroll"><i /> Scroll</div>
    </section>
  )
}
