import type Lenis from 'lenis'

export const lenisRef: { current: Lenis | null } = { current: null }

export function scrollTo(target: string | number) {
  if (lenisRef.current) lenisRef.current.scrollTo(target, { duration: 1.4 })
  else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' })
  else document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
}
