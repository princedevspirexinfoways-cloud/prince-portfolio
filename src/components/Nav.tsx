import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { scrollTo } from '../lib/lenis'

const links = [
  ['About', '#about'], ['Skills', '#skills'], ['Work', '#experience'], ['Projects', '#projects'], ['Contact', '#contact'],
]

export default function Nav({ ready }: { ready: boolean }) {
  const [hidden, setHidden] = useState(false)
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
      <a href="#contact" className="nav-cta" onClick={(e) => { e.preventDefault(); scrollTo('#contact') }}>
        <b /> Open to work
      </a>
    </motion.nav>
  )
}
