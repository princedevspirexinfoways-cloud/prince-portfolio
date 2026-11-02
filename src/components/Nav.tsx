import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { scrollTo, lenisRef } from '../lib/lenis'
import { profile } from '../data'

const links = [
  ['About', '#about'], ['Skills', '#skills'], ['Work', '#experience'], ['Projects', '#projects'], ['Contact', '#contact'],
]

export default function Nav({ ready }: { ready: boolean }) {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (open) lenisRef.current?.stop()
    else lenisRef.current?.start()
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])
  const go = (href: string) => { setOpen(false); setTimeout(() => scrollTo(href), open ? 450 : 0) }
  useEffect(() => {
    let last = 0
    const onScroll = () => {
      const y = window.scrollY
      setHidden(y > last && y > 120)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
    <motion.nav
      className="nav"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: ready ? (hidden ? -100 : 0) : -80, opacity: ready ? 1 : 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href="#top" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo(0) }}>
        PS<motion.i animate={{ rotate: [0, 0, 360] }} transition={{ repeat: Infinity, duration: 4, times: [0, 0.7, 1], ease: 'easeInOut' }}>.</motion.i>
      </a>
      <div className="nav-links">
        {links.map(([label, href], i) => (
          <motion.a
            key={href}
            href={href}
            className="nav-link"
            onClick={(e) => { e.preventDefault(); scrollTo(href) }}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: ready ? 0 : -20, opacity: ready ? 1 : 0 }}
            transition={{ delay: 0.6 + i * 0.08, duration: 0.6 }}
          >
            <span>{label}</span><span>{label}</span>
          </motion.a>
        ))}
      </div>
      <div className="nav-right">
        <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); go('#contact') }}>
          <b /> <span>Open to work</span>
        </a>
        <button className={`nav-burger ${open ? 'open' : ''}`} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <i /><i />
        </button>
      </div>
    </motion.nav>
    <AnimatePresence>
      {open && (
        <motion.div
          className="mobile-menu"
          initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
          animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
          exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {links.map(([label, href], i) => (
            <motion.a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); go(href) }}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1, transition: { delay: 0.25 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
              exit={{ y: 20, opacity: 0, transition: { duration: 0.2 } }}
            >
              <span>0{i + 1}</span>{label}
            </motion.a>
          ))}
          <motion.div className="mobile-menu-foot" initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.6 } }} exit={{ opacity: 0 }}>
            <span>Rajkot, IN</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
