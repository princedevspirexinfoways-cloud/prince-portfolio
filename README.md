# Prince Sherasiya — Portfolio

Animated personal portfolio built with React 19, Vite, GSAP (ScrollTrigger), Framer Motion, React Three Fiber and Lenis smooth scroll. Orange & black theme.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
npm run preview  # preview the build
```

## Edit content

All resume content lives in `src/data.ts` (profile, skills, experience, projects, highlights, education).
Photo: `public/prince.png`. Resume PDF: `public/Prince-Sherasiya-Resume.pdf`.

## Structure

- `src/components/Hero.tsx` — hero with 3D scene, animated photo frame, split-text intro
- `src/components/Scene3D.tsx` — React Three Fiber shapes (hover + scroll reactive)
- `src/components/Experience.tsx` — pinned horizontal-scroll timeline
- `src/components/Highlights.tsx` — awards-style hover list with cursor-following preview
- `src/components/ui.tsx` — Heading, TiltCard, Magnetic, Split helpers
- `src/index.css` — theme tokens and all styles
