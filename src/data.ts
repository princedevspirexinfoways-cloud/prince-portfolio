export const profile = {
  name: 'Prince Sherasiya',
  first: 'Prince',
  last: 'Sherasiya',
  role: 'Technical Lead · Backend & DevOps',
  tagline: 'I architect backends that scale, pipelines that ship, and teams that deliver.',
  email: 'princesherasiya1@gmail.com',
  phone: '+91 91062 04250',
  phoneRaw: '+919106204250',
  location: 'Rajkot, Gujarat — India',
  years: '2+',
  linkedin: 'https://www.linkedin.com/in/princesherasiya/',
  github: 'https://github.com/doingcodelikeashit',
  resume: '/Prince-Sherasiya-Resume.pdf',
}

export const about = `I'm a backend-first engineer who grew from a Node.js intern into a Technical Lead in just over two years. I design system architecture, own CI/CD and infrastructure, and mentor the people who build alongside me. Today I lead Backend & DevOps at Spirex Infoways and serve part-time as CTO of an AI startup, where I turn product ideas into reliable, scalable systems.`

export const stats = [
  { value: 2, suffix: '+', label: 'Years of experience' },
  { value: 6, suffix: '', label: 'Roles across the stack' },
  { value: 5, suffix: '', label: 'Shipped projects' },
  { value: 2, suffix: '', label: 'Leadership positions' },
]

export const skills = [
  { name: 'Node.js & Express', level: 95, tag: 'Backend' },
  { name: 'TypeScript', level: 92, tag: 'Language' },
  { name: 'JavaScript', level: 94, tag: 'Language' },
  { name: 'DBMS · MySQL · MongoDB', level: 88, tag: 'Data' },
  { name: 'Sequelize ORM', level: 90, tag: 'Data' },
  { name: 'Redis', level: 82, tag: 'Data' },
  { name: 'CI/CD & DevOps', level: 86, tag: 'Infra' },
  { name: 'System Architecture', level: 85, tag: 'Design' },
  { name: 'React', level: 78, tag: 'Frontend' },
  { name: 'Three.js · WebXR', level: 70, tag: 'Frontend' },
  { name: 'Git & GitHub', level: 93, tag: 'Tooling' },
  { name: 'DSA in C++', level: 75, tag: 'Core' },
]

export const marqueeWords = [
  'Backend', 'DevOps', 'TypeScript', 'Node.js', 'CI/CD', 'Architecture', 'Redis', 'Sequelize', 'Leadership', 'MySQL', 'MongoDB', 'Mentorship',
]

export const experience = [
  {
    role: 'Technical Lead — Backend & DevOps',
    company: 'Spirex Infoways',
    url: 'http://spirexinfoways.com',
    location: 'Rajkot',
    period: 'Current',
    desc: 'Lead backend and DevOps for enterprise apps, focusing on system architecture, CI/CD, and team mentorship to ensure scalability and reliability.',
    tags: ['Architecture', 'CI/CD', 'Mentorship'],
  },
  {
    role: 'Chief Technical Officer',
    company: 'Nameless AI Services',
    url: 'https://callmesuru.github.io/nameless-ai-website/',
    location: 'Remote · Part-time',
    period: 'Current',
    desc: 'Provide strategic technical leadership for an AI startup, guiding product architecture, infrastructure, and development roadmaps.',
    tags: ['Strategy', 'Infrastructure', 'Roadmaps'],
  },
  {
    role: 'Team Lead — TypeScript',
    company: 'Catloga',
    url: 'http://catloga.com',
    location: 'Morbi',
    period: 'Past',
    desc: 'Full-stack developer focused on TypeScript, Node.js, and React to build scalable, high-performance solutions.',
    tags: ['TypeScript', 'Node.js', 'React'],
  },
  {
    role: 'Lab Coordinator',
    company: 'Red & White Skill Education',
    url: '',
    location: 'Gujarat',
    period: 'Past',
    desc: 'Managed academic lab operations, including equipment maintenance and student support during practical sessions.',
    tags: ['Operations', 'Teaching'],
  },
  {
    role: 'Freelance — Node.js',
    company: 'Self Employed',
    url: '',
    location: 'Remote',
    period: 'Past',
    desc: 'Developed end-to-end backend solutions using Node.js, RESTful APIs, and relational and non-relational databases.',
    tags: ['REST APIs', 'SQL', 'NoSQL'],
  },
  {
    role: 'Node.js — Sequelize Intern',
    company: 'TST Technology',
    url: 'http://tsttechnology.io',
    location: 'Ahmedabad',
    period: 'Past',
    desc: 'Developed and optimized backend services and REST APIs using Node.js, Express, and Sequelize.',
    tags: ['Express', 'Sequelize', 'APIs'],
  },
]

export const projects = [
  {
    title: 'AR & 3D Tiles Visualizer',
    stack: 'TypeScript · Three.js · WebXR',
    desc: 'Cross-platform AR flooring tool with WebXR support for accurate, real-world 3D rendering of tile layouts.',
    link: '',
    status: 'AR / 3D',
    hue: 0,
  },
  {
    title: 'E-Commerce API',
    stack: 'Node.js · Express · MySQL',
    desc: 'Full e-commerce API with a properly related MySQL schema. Currently live and serving production traffic.',
    link: 'https://github.com/doingcodelikeashit/econ-serviceproject-tst',
    status: 'LIVE',
    hue: 1,
  },
  {
    title: 'Garage Management System',
    stack: 'Node.js · MongoDB',
    desc: 'Freelance full-stack garage system with inventory tracking, billing, and role-based access control.',
    link: 'https://github.com/doingcodelikeashit/Garage-Management-System-Backend',
    status: 'Freelance',
    hue: 2,
  },
  {
    title: 'PC Shop E-Commerce',
    stack: 'PHP · MySQL',
    desc: 'College project: an online PC shop with an admin panel and a responsive storefront.',
    link: '',
    status: 'College',
    hue: 3,
  },
  {
    title: 'Chat Website',
    stack: 'WordPress · Plugins',
    desc: 'College project: a real-time chatting website built with WordPress and a tuned plugin stack.',
    link: '',
    status: 'College',
    hue: 4,
  },
]

export const highlights = [
  { title: 'Intern to Technical Lead', org: 'In just over two years', year: '2024 → 26', note: 'Fastest path on the team' },
  { title: 'Chief Technical Officer', org: 'Nameless AI Services', year: 'Current', note: 'Leading an AI startup' },
  { title: 'Backend & DevOps Lead', org: 'Spirex Infoways', year: 'Current', note: 'Enterprise systems' },
  { title: 'Production E-Commerce API', org: 'Live & serving traffic', year: 'Live', note: 'Node · Express · MySQL' },
  { title: 'AR / WebXR Visualizer', org: 'TypeScript · Three.js', year: 'Project', note: 'Cross-platform AR' },
  { title: 'Team Lead — TypeScript', org: 'Catloga', year: 'Past', note: 'Full-stack delivery' },
]

export const education = [
  { title: 'DSA in C++', org: 'Red & White Skill Education', year: 'Cert', note: 'Data structures & algorithms' },
  { title: 'Diploma in Computer Engineering', org: 'Darshan University', year: '2024', note: 'CGPA 6.00' },
  { title: 'XII (GSEB)', org: 'Center Point Vidhyalay, Morbi', year: 'HSC', note: 'Higher secondary' },
]
