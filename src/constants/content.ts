export const siteContent = {
  brand: {
    initials: "SA",
    name: "SufyanAhmed.Tech",
    tagline: "Building products that scale. Solving problems that matter.",
  },
  nav: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "Stack", href: "#stack" },
    { label: "Certifications", href: "#certifications" },
    { label: "Contact", href: "#contact" },
  ],
  social: [
    { label: "GitHub", href: "https://github.com/sufyanahmed" },
    { label: "LinkedIn", href: "https://linkedin.com/in/sufyanahmed" },
    { label: "Twitter", href: "https://twitter.com/sufyanahmed" },
    { label: "Email", href: "mailto:hello@sufyanahmed.tech" },
  ],
} as const;

export const heroContent = {
  id: "home",
  badge: "FOUNDER • PRODUCT ARCHITECT • AI-ASSISTED ENGINEER",
  headline: {
    line1: "Building Products",
    line2: "That Scale.",
  },
  subtitle:
    "I design and build production-ready fintech platforms, SaaS products, trading systems, and cloud-native applications using modern engineering practices and AI-assisted development workflows.",
  cta: {
    primary: { label: "See What I've Built", href: "#projects" },
    secondary: { label: "Get In Touch", href: "#contact" },
  },
  terminal: {
    path: "~/sufyan",
    lines: [
      {
        command: "Building TradingNexus...",
        status: "Production",
        color: "emerald",
      },
      {
        command: "Building XchangeByte...",
        status: "In Progress",
        color: "amber",
      },
      { command: "Always Learning...", status: "Every Day", color: "sky" },
    ],
  },
  ecosystemNodes: [
    {
      label: "TradingNexus",
      subtitle: "Live Platform",
      icon: "trending",
      ring: 0,
      angle: 25,
    },
    {
      label: "Financio",
      subtitle: "Finance SaaS",
      icon: "wallet",
      ring: 0,
      angle: 155,
    },
    {
      label: "XchangeByte",
      subtitle: "In Progress",
      icon: "exchange",
      ring: 0,
      angle: 285,
    },
    {
      label: "AI & Automation",
      subtitle: "Workflow Engine",
      icon: "brain",
      ring: 1,
      angle: 55,
    },
    {
      label: "Open Source",
      subtitle: "Community",
      icon: "git",
      ring: 1,
      angle: 195,
    },
    {
      label: "System Design",
      subtitle: "Architecture",
      icon: "layers",
      ring: 2,
      angle: 110,
    },
    {
      label: "Cloud Architecture",
      subtitle: "Scalable • Secure",
      icon: "cloud",
      ring: 2,
      angle: 250,
    },
  ],
} as const;

export const aboutContent = {
  id: "about",
  title: "From Passion to Purpose",
  description:
    "I'm Sufyan Ahmed Ansari — a founder and product architect who transforms ideas into production-ready digital products. My journey from fitness and finance to software engineering shaped a unique approach: disciplined, user-focused, and relentlessly quality-driven.",
  cta: { label: "Know My Story", href: "#journey" },
  timeline: [
    {
      step: "01",
      title: "Fitness First",
      description:
        "Built discipline, consistency, and the mindset to show up every day.",
      icon: "dumbbell",
    },
    {
      step: "02",
      title: "Finance & Markets",
      description:
        "Developed deep understanding of markets, risk, and financial systems.",
      icon: "chart",
    },
    {
      step: "03",
      title: "Software Engineer",
      description:
        "Learned to architect and build production-grade software products.",
      icon: "code",
    },
    {
      step: "04",
      title: "AI-Assisted Builder",
      description:
        "Integrated AI workflows to accelerate development without sacrificing quality.",
      icon: "brain",
    },
    {
      step: "05",
      title: "Building Impact",
      description:
        "Shipping products that solve real problems for real users at scale.",
      icon: "rocket",
    },
  ],
} as const;

export const projectsContent = {
  id: "projects",
  title: "Products I'm Proud Of.",
  viewAll: { label: "View All Projects", href: "#projects" },
  items: [
    {
      id: "tradingnexus",
      name: "TradingNexus",
      description:
        "A production-ready trading platform with real-time data, premium UX, and scalable architecture.",
      status: "Live" as const,
      tags: ["Next.js", "FastAPI", "PostgreSQL"],
      href: "#contact",
      theme: "dark" as const,
    },
    {
      id: "financio",
      name: "Financio",
      description:
        "Personal finance management platform with intuitive dashboards and smart insights.",
      status: "Live" as const,
      tags: ["Next.js", "Node.js", "MongoDB"],
      href: "#contact",
      theme: "light" as const,
    },
    {
      id: "xchangebyte",
      name: "XchangeByte",
      description:
        "Next-generation exchange platform engineered for scalability and cloud-native deployment.",
      status: "In Progress" as const,
      tags: ["Next.js"],
      href: "#contact",
      theme: "dark" as const,
    },
  ],
} as const;

export const processContent = {
  id: "process",
  title: "How I Build",
  steps: [
    "Discovery",
    "Architecture",
    "Design",
    "AI-Assisted",
    "Testing",
    "Deployment",
  ],
} as const;

export const techStackContent = {
  id: "stack",
  title: "Tech Stack",
  items: [
    "Next.js",
    "React",
    "TypeScript",
    "Python",
    "FastAPI",
    "Node.js",
    "PostgreSQL",
    "AWS",
  ],
} as const;

export const certificationsContent = {
  id: "certifications",
  title: "Certifications",
  viewAll: { label: "View All Certifications", href: "#certifications" },
  items: [
    { name: "NISM", subtitle: "Certified" },
    { name: "NSE", subtitle: "Certified" },
    { name: "NIIT", subtitle: "Certified" },
    { name: "Gold's Gym", subtitle: "Trainer" },
  ],
} as const;

export const contactContent = {
  id: "contact",
  title: "Have a project or opportunity?",
  cta: { label: "Start a Conversation", href: "mailto:hello@sufyanahmed.tech" },
  email: "hello@sufyanahmed.tech",
} as const;

export const footerContent = {
  copyright: "© 2026 Sufyan Ahmed. All rights reserved.",
  links: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
  ],
} as const;
