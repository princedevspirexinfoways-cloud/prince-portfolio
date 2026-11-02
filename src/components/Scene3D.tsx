import { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const ORANGE = new THREE.Color('#ff6b00')
const WHITE = new THREE.Color('#ffd0a8')
const DARK = new THREE.Color('#1b1b1b')
const BLACK = new THREE.Color(0, 0, 0)

type Kind = 'knot' | 'ico' | 'octa' | 'torus' | 'blob' | 'ring'

function Shape({ kind, position, scale = 1, speed = 1, dark = false }: { kind: Kind; position: [number, number, number]; scale?: number; speed?: number; dark?: boolean }) {
  const mesh = useRef<THREE.Mesh>(null)
  const [hover, setHover] = useState(false)
  const base = dark ? DARK : ORANGE

  useFrame((_, delta) => {
    const m = mesh.current
    if (!m) return
    const target = hover ? scale * 1.4 : scale
    m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, target, 0.12))
    m.rotation.x += delta * 0.35 * speed * (hover ? 3 : 1)
    m.rotation.y += delta * 0.5 * speed * (hover ? 3 : 1)
    const mat = m.material as THREE.MeshStandardMaterial
    if (mat.color) mat.color.lerp(hover ? WHITE : base, 0.1)
    if (mat.emissive) mat.emissive.lerp(hover ? ORANGE : BLACK, 0.1)
  })

  const geo = useMemo(() => {
    switch (kind) {
      case 'knot': return <torusKnotGeometry args={[1, 0.32, 110, 14]} />
      case 'ico': return <icosahedronGeometry args={[1, 1]} />
      case 'octa': return <octahedronGeometry args={[1, 0]} />
      case 'torus': return <torusGeometry args={[1, 0.38, 20, 64]} />
      case 'ring': return <torusGeometry args={[1.3, 0.06, 10, 80]} />
      default: return <icosahedronGeometry args={[1, 3]} />
    }
  }, [kind])

  return (
    <Float speed={1.6 * speed} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh
        ref={mesh}
        position={position}
        scale={scale}
        onPointerOver={(e) => { e.stopPropagation(); setHover(true); document.body.style.cursor = 'none' }}
        onPointerOut={() => setHover(false)}
      >
        {geo}
        {kind === 'blob' ? (
          <MeshDistortMaterial color={base} distort={0.4} speed={2.2} roughness={0.25} metalness={0.7} flatShading={false} />
        ) : kind === 'knot' || kind === 'ring' ? (
          <meshStandardMaterial color={base} wireframe={kind === 'knot'} roughness={0.3} metalness={0.8} emissive="#000" />
        ) : (
          <meshStandardMaterial color={base} roughness={0.2} metalness={0.85} flatShading emissive="#000" />
        )}
      </mesh>
    </Float>
  )
}

function Rig({ children, scrollFactor = 1, drift = true }: { children: React.ReactNode; scrollFactor?: number; drift?: boolean }) {
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    const g = group.current
    if (!g) return
    const s = (window.scrollY / window.innerHeight) * scrollFactor
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, s * 1.4 + state.pointer.x * 0.35, 0.06)
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, s * 0.5 - state.pointer.y * 0.3, 0.06)
    if (drift) g.position.y = THREE.MathUtils.lerp(g.position.y, s * 1.5, 0.08)
  })
  return <group ref={group}>{children}</group>
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 5]} intensity={2.2} color="#fff2e6" />
      <pointLight position={[-6, -3, 3]} intensity={30} color="#ff6b00" />
      <pointLight position={[4, -4, -3]} intensity={12} color="#ff9340" />
    </>
  )
}

/* Renders only while the wrapper is on screen; keeps every object and animation intact. */
function useOnScreen() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: '120px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return { ref, visible }
}

const GL = { antialias: true, alpha: true, powerPreference: 'high-performance' as const, stencil: false, depth: true }

export function HeroScene() {
  const { ref, visible } = useOnScreen()
  return (
    <div className="hero-canvas" ref={ref}>
      <Canvas dpr={[1, 1.5]} frameloop={visible ? 'always' : 'never'} camera={{ position: [0, 0, 9], fov: 42 }} gl={GL}>
        <Lights />
        <Rig>
          <Shape kind="blob" position={[-4.6, 2.2, -1]} scale={1.15} speed={0.8} />
          <Shape kind="knot" position={[0.8, -2.6, -2]} scale={0.95} speed={0.7} />
          <Shape kind="octa" position={[4.6, 2.8, -1.5]} scale={0.7} speed={1.3} />
          <Shape kind="ico" position={[-2.4, -2.4, 0.5]} scale={0.55} speed={1.1} dark />
          <Shape kind="ring" position={[5.4, -1.4, -3]} scale={1} speed={0.6} />
          <Shape kind="octa" position={[-0.6, 3.2, -3]} scale={0.4} speed={1.6} dark />
        </Rig>
      </Canvas>
    </div>
  )
}

export function ShapeScene({ kind, className }: { kind: Kind; className: string }) {
  const { ref, visible } = useOnScreen()
  return (
    <div className={className} ref={ref}>
      <Canvas dpr={[1, 1.5]} frameloop={visible ? 'always' : 'never'} camera={{ position: [0, 0, 6], fov: 40 }} gl={GL}>
        <Lights />
        <Rig scrollFactor={0.5} drift={false}>
          <Shape kind={kind} position={[0, 0, 0]} scale={1.6} speed={0.7} />
        </Rig>
      </Canvas>
    </div>
  )
}
