// ---------------------------------------------------------------------------
// SITE CONTENT
// Everything you'll want to edit lives in this file: copy, links, projects.
// Anything in [BRACKETS] is a placeholder you need to replace.
// ---------------------------------------------------------------------------

export const site = {
  name: "Jonathan Schafer",
  shortName: "Jonathan",
  // Used in <title>, meta description, and Open Graph tags.
  title: "Jonathan Schafer - Full-stack developer",
  description:
    "Portfolio of Jonathan Schafer, a full-stack developer and recent Computer Science graduate from Ohio University who builds software end to end with a designer's eye.",
  // Replace with your deployed URL after your first Vercel deploy.
  url: "https://jongschaf.com",
  location: "Columbus, OH",
  email: "jon.g.schaf@gmail.com",
  links: {
    github: "https://github.com/Jon-G-Schaf",
    linkedin: "https://www.linkedin.com/in/jongschaf",
    resume: "/JonathanSchafer_Resume.pdf",
  },
};

export const hero = {
  eyebrow: "Columbus, OH \u00b7 Full-stack developer",
  headline: "Jonathan Schafer",
  positioning: "Full-stack developer with a designer's eye.",
  intro:
    "I build software end to end, with a strong focus on the interface. I'm a recent Computer Science grad from Ohio University, and I care about type, spacing, and the small interactions that make software feel considered.",
  // A handwritten margin note in the hero, for anyone who lingers.
  note: "note to self: make it feel considered.",
};

export const about = {
  paragraphs: [
    "A Computer Science degree taught me to work across the stack: frontend, backend, and the glue in between. What I care about most is the part where software meets people. Type scale, spacing rhythm, and the first 200 milliseconds after a button press all matter. They are small details, but they change how finished a product feels. Most recently I've taken that beyond any single app, designing and building a complete desktop environment around one coherent design system.",
    "My capstone, Quorum, is where that clicked. On a five-person team I led the UI/UX and built major parts of both the Flutter frontend and the Firebase backend. I learned to make design and engineering calls under the same constraints: time, scope, team size, and what the product needed. Right now I'm going deeper on React and the modern full-stack JavaScript ecosystem, and this site is part of that.",
    "Away from a screen, I'm a competitive strength athlete. Training toward a 600-plus-pound deadlift taught me how I like to work: measure honestly, stay patient with long feedback loops, and keep making small improvements.",
  ],
};

export const skillGroups = [
  {
    label: "Frontend",
    note: "What users work with",
    skills: ["React", "Next.js", "JavaScript", "HTML / CSS", "Tailwind CSS", "Flutter / Dart", "Qt / QML"],
  },
  {
    label: "Backend & data",
    note: "What holds it up",
    skills: ["Node.js", "Fastify", "PostgreSQL", "Firebase", "Python", "SQL", "SQLite"],
  },
  {
    label: "Languages & tooling",
    note: "The rest of the toolbox",
    skills: ["TypeScript", "C++", "C", "OCaml", "Git", "Docker", "Linux", "Bash"],
  },
  {
    label: "Design",
    note: "The edge I bring to all of it",
    skills: [
      "Figma",
      "UI/UX design",
      "Design systems",
      "Design tokens",
      "Wireframing",
      "Prototyping",
      "Responsive layouts",
    ],
  },
];

export const featuredProject = {
  marker: "Featured project",
  name: "Crosstown",
  tagline: "Columbus bus reliability, measured.",
  description:
    "A live map of every COTA bus in Columbus, plus the reliability record the schedule can't give you. A TypeScript worker polls COTA's realtime feeds around the clock into Postgres, derives delay data against the published schedule, computes each route's on-time numbers in SQL, and streams positions to a Next.js + MapLibre front end over server-sent events. Designed, built, and shipped solo. Live and recording since June 2026.",
  stack: ["TypeScript", "Node.js", "PostgreSQL", "Next.js", "MapLibre"],
  caseStudyHref: "/work/crosstown",
  liveHref: "https://crosstown.jongschaf.com",
  liveLabel: "Open the live map",
};

// Flexible grid - duplicate, edit, or delete entries freely.
// Set `href` to a live URL or repo link; leave as "#" to render without a link target.
export const otherProjects = [
  {
    name: "Lustre",
    type: "Desktop environment · Design system",
    year: "2026",
    description:
      "A complete, hand-built KDE Plasma 6 desktop environment driven by a single design system: one palette and type scale carried across the window manager, panels, widgets, login, and terminal. Designed and built solo, end to end. Case study coming soon.",
    tags: ["KDE Plasma", "QML", "Python"],
    href: "#",
  },
  {
    name: "Quorum",
    type: "Mobile app \u00b7 CS capstone",
    year: "2025-26",
    description:
      "A Flutter + Firebase app for discovering local events like pickup games, club meetups, and study sessions. See what's happening nearby, claim an open spot, and coordinate over real-time chat. Built with a five-person capstone team at Ohio University. I led the UI/UX and carried much of the Flutter front end and Firebase back end.",
    tags: ["Flutter", "Dart", "Firebase"],
    href: "/work/quorum",
  },
  {
    name: "SnipBoard",
    type: "Desktop app \u00b7 UI/UX",
    year: "2025",
    description:
      "A Qt/QML desktop app for storing, organizing, and searching code snippets, with folders, tags, favorites, and fast search over SQLite, backed by a clean layered C++ core, plus a companion VS Code extension. On a five-person software-engineering team I led the design: the visual identity, color system, and the snippet, search, and settings screens.",
    tags: ["Qt / QML", "C++", "SQLite"],
    href: "#",
  },
];

export const contact = {
  heading: "Have a role or a project in mind?",
  body: "I'm looking for junior software and full-stack roles in Columbus, Cincinnati, Pittsburgh, or remote. If you think I'd be a fit, or you want to talk through a project, my inbox is open.",
};

// The colophon is the small "this site's own design tokens" strip in the
// footer. It's a quiet way of showing design intent. Edit or remove freely.
export const colophon = {
  tokens: [
    { kind: "swatch", value: "#1b1008", label: "espresso" },
    { kind: "swatch", value: "#2b1707", label: "walnut" },
    { kind: "swatch", value: "#f7eddc", label: "cream" },
    { kind: "swatch", value: "#ff7a1a", label: "ember" },
    { kind: "swatch", value: "#ffc35c", label: "amber" },
    { kind: "type", value: "Schibsted Grotesk", label: "display" },
    { kind: "type", value: "Inter", label: "body" },
    { kind: "type", value: "JetBrains Mono", label: "labels" },
  ],
  note: "Set on an 8-pt grid. Designed and built by hand with Next.js, Tailwind, and Framer Motion.",
};
