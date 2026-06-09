// ---------------------------------------------------------------------------
// SITE CONTENT
// Everything you'll want to edit lives in this file: copy, links, projects.
// Anything in [BRACKETS] is a placeholder you need to replace.
// ---------------------------------------------------------------------------

export const site = {
  name: "Jonathan Schafer",
  shortName: "Jonathan",
  // Used in <title>, meta description, and Open Graph tags.
  title: "Jonathan Schafer — Full-stack developer",
  description:
    "Portfolio of Jonathan Schafer, a full-stack developer and recent Computer Science graduate from Ohio University who builds software end to end with a designer's eye for the details.",
  // Replace with your deployed URL after your first Vercel deploy.
  url: "https://[your-domain].vercel.app",
  location: "Columbus, OH",
  email: "grant.schafer555@gmail.com",
  links: {
    github: "https://github.com/Jon-G-Schaf",
    linkedin: "https://www.linkedin.com/in/jonathan-schafer-531859265",
    resume: "/JonathanSchafer_Resume.pdf",
  },
};

export const hero = {
  eyebrow: "Columbus, OH · Open to junior software & full-stack developer roles",
  headline: "Jonathan Schafer",
  positioning: "Full-stack developer with a designer's eye.",
  intro:
    "I build software end to end — and I sweat the interface. Recent Computer Science graduate from Ohio University who ships full-stack apps and still cares about type, spacing, and the small interactions that make software feel considered.",
};

export const about = {
  paragraphs: [
    "A Computer Science degree taught me to work across the stack — frontend, backend, and the glue in between. What I care about most is the part where that software meets people: the details users never consciously notice — type scale, spacing rhythm, what a button does in the 200 milliseconds after you press it — are usually the difference between software people tolerate and software people like.",
    "My capstone, Quorum, is where it came together. On a five-person team I led the UI/UX and did a lot of the heavy lifting across the stack — the Flutter frontend and much of the Firebase backend — and learned that good engineering decisions, like good design decisions, are the ones that survive contact with real constraints. Right now I'm going deeper on React and the modern full-stack JavaScript ecosystem — this site is part of that.",
    "Away from a screen, I'm a competitive strength athlete. Training toward a 600-plus-pound deadlift taught me how I like to work: honest measurement, long feedback loops, and small improvements that compound.",
  ],
};

export const skillGroups = [
  {
    label: "Frontend",
    note: "What users actually touch",
    skills: ["React", "Next.js", "JavaScript", "HTML / CSS", "Tailwind CSS", "Flutter / Dart", "Qt"],
  },
  {
    label: "Backend & data",
    note: "What holds it up",
    skills: ["Firebase", "Python", "SQL", "SQLite"],
  },
  {
    label: "Languages & tooling",
    note: "The rest of the toolbox",
    skills: ["C++", "C", "OCaml", "Git", "Docker", "Linux"],
  },
  {
    label: "Design",
    note: "The edge I bring to all of it",
    skills: [
      "Figma",
      "UI/UX design",
      "Wireframing",
      "Prototyping",
      "Responsive layouts",
    ],
  },
];

export const featuredProject = {
  marker: "Featured project",
  name: "Quorum",
  tagline: "Group scheduling that finds the time, not another poll.",
  description:
    "A Flutter app for finding the meeting time that actually works for a group — availability as a glanceable heatmap instead of a form, with one recommended time surfaced on top. My CS capstone at Ohio University, built with a five-person team: I led the UI/UX and carried much of the build across the Flutter frontend and the Firebase backend.",
  stack: ["Flutter", "Dart", "Firebase", "Figma"],
  caseStudyHref: "/work/quorum",
};

// Flexible grid — duplicate, edit, or delete entries freely.
// Set `href` to a live URL or repo link; leave as "#" to render without a link target.
export const otherProjects = [
  {
    name: "Restaurant Finder",
    type: "Full-stack web app",
    year: "2025",
    description:
      "A web app that finds restaurants by ZIP code and radius. Built on the OpenStreetMap Overpass API with Zippopotamus for geocoding, it returns each spot's name, address, phone, and website.",
    tags: ["JavaScript", "HTML/CSS", "REST APIs"],
    href: "#",
  },
  {
    name: "SnipBoard",
    type: "Desktop app · UI/UX",
    year: "2025",
    description:
      "A cross-platform desktop app for storing and searching code snippets, with a companion VS Code extension for in-editor insertion. On a five-person team I designed the visual identity and the search, tagging, and favorites interfaces.",
    tags: ["Qt", "C++", "SQLite"],
    href: "#",
  },
];

export const contact = {
  heading: "Have a role or a project in mind?",
  body: "I'm looking for junior software and full-stack roles in Columbus or Pittsburgh (or remote). If you think I'd be a fit — or you just want to talk shop about building things well — my inbox is open.",
};

// The colophon is the small "this site's own design tokens" strip in the
// footer. It's a quiet way of showing design intent. Edit or remove freely.
export const colophon = {
  tokens: [
    { kind: "swatch", value: "#ff7a1a", label: "ember" },
    { kind: "swatch", value: "#ffc35c", label: "amber" },
    { kind: "type", value: "Schibsted Grotesk", label: "display" },
    { kind: "type", value: "Inter", label: "body" },
    { kind: "type", value: "JetBrains Mono", label: "labels" },
  ],
  note: "Set on an 8-pt grid. Designed and built by hand with Next.js, Tailwind, and Framer Motion.",
};
