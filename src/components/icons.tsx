import {
  siNodedotjs, siExpress, siTypescript, siJavascript, siMysql, siMongodb, siSequelize, siRedis,
  siGithubactions, siReact, siThreedotjs, siGit, siCplusplus,
} from 'simple-icons'

type Icon = { title: string; path: string }

const map: Record<string, Icon | Icon[] | 'arch'> = {
  'Node.js & Express': [siNodedotjs, siExpress],
  'TypeScript': siTypescript,
  'JavaScript': siJavascript,
  'DBMS · MySQL · MongoDB': [siMysql, siMongodb],
  'Sequelize ORM': siSequelize,
  'Redis': siRedis,
  'CI/CD & DevOps': siGithubactions,
  'System Architecture': 'arch',
  'React': siReact,
  'Three.js · WebXR': siThreedotjs,
  'Git & GitHub': siGit,
  'DSA in C++': siCplusplus,
}

function Svg({ icon }: { icon: Icon }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={icon.title} fill="currentColor">
      <path d={icon.path} />
    </svg>
  )
}

function ArchIcon() {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label="System architecture" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2.5" width="6" height="5" rx="1.2" />
      <rect x="2.5" y="16.5" width="6" height="5" rx="1.2" />
      <rect x="15.5" y="16.5" width="6" height="5" rx="1.2" />
      <path d="M12 7.5v4M12 11.5l-6.5 5M12 11.5l6.5 5" />
      <circle cx="12" cy="11.5" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function SkillIcon({ name }: { name: string }) {
  const entry = map[name]
  if (!entry) return null
  if (entry === 'arch') return <span className="skill-icon"><ArchIcon /></span>
  const icons = Array.isArray(entry) ? entry : [entry]
  return (
    <span className={`skill-icon ${icons.length > 1 ? 'dual' : ''}`}>
      {icons.map((i) => <Svg icon={i} key={i.title} />)}
    </span>
  )
}
