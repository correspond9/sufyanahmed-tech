export const aboutContent = {
  id: "about",
  eyebrow: "About",
  title: "Engineering Products From Concept to Production",
  description:
    "I am Sufyan Ahmed Ansari — a founder and product architect who designs and builds production-ready digital products across FinTech, SaaS, and cloud-native platforms.",
  paragraphs: [
    "My work sits at the intersection of product thinking and modern engineering. I approach every build with the mindset of a founder: clarity of vision, disciplined architecture, and relentless attention to the details that make software feel premium in production.",
    "I specialise in fintech platforms, trading systems, and scalable SaaS products — using AI-assisted development workflows to move from architecture to deployment without sacrificing quality, security, or craft.",
  ],
  highlights: [
    {
      label: "Focus",
      value: "FinTech & SaaS Products",
    },
    {
      label: "Approach",
      value: "AI-Assisted Engineering",
    },
    {
      label: "Standard",
      value: "Production-Ready Quality",
    },
  ],
} as const;

export const journeyContent = {
  id: "journey",
  eyebrow: "Journey",
  title: "Building Products That Compound",
  description:
    "A focused path from product vision to production systems — each venture strengthening the next.",
  milestones: [
    {
      year: "Foundation",
      title: "Product Architecture Mindset",
      description:
        "Established a founder-led approach to software — prioritising system design, user experience, and engineering discipline before writing code.",
    },
    {
      year: "2024",
      title: "TradingNexus",
      description:
        "Designed and built a production fintech trading platform — from architecture and UI systems to deployment-ready infrastructure.",
      status: "Production",
    },
    {
      year: "2025",
      title: "XchangeByte",
      description:
        "Currently building the next-generation exchange platform — applying lessons from TradingNexus to create a more scalable, cloud-native product.",
      status: "In Progress",
    },
    {
      year: "Ongoing",
      title: "Continuous Learning",
      description:
        "Deepening expertise in cloud architecture, AI-assisted development, and modern product engineering — every day.",
      status: "Active",
    },
  ],
} as const;

export const projectsContent = {
  id: "projects",
  eyebrow: "Featured Work",
  title: "Products Built to Scale",
  description:
    "Real platforms engineered end-to-end — from system architecture to production deployment.",
  projects: [
    {
      id: "tradingnexus",
      name: "TradingNexus",
      tagline: "FinTech Trading Platform",
      description:
        "A production-ready trading platform built with modern architecture, real-time data flows, and a premium user experience designed for serious market participants.",
      status: "Production",
      tags: ["FinTech", "Next.js", "TypeScript", "Docker"],
      href: "#contact",
      gradient: "from-primary/20 via-navy to-purple/15",
      accent: "#4F8CFF",
    },
    {
      id: "xchangebyte",
      name: "XchangeByte",
      tagline: "Exchange Platform",
      description:
        "A next-generation exchange platform in active development — engineered for scalability, security, and cloud-native deployment from day one.",
      status: "In Progress",
      tags: ["FinTech", "Cloud-Native", "TypeScript", "Architecture"],
      href: "#contact",
      gradient: "from-purple/20 via-navy to-primary/10",
      accent: "#6D5DF6",
    },
  ],
} as const;

export const processContent = {
  id: "process",
  eyebrow: "Process",
  title: "How I Build Products",
  description:
    "A disciplined, founder-led process — designed to move from idea to production without cutting corners.",
  steps: [
    {
      number: "01",
      title: "Discovery & Architecture",
      description:
        "Define the product vision, map system boundaries, and design an architecture that scales with the business — not against it.",
    },
    {
      number: "02",
      title: "Design Systems",
      description:
        "Establish typography, colour, spacing, and component patterns that create a cohesive, premium product experience.",
    },
    {
      number: "03",
      title: "AI-Assisted Development",
      description:
        "Leverage AI-assisted workflows to accelerate development while maintaining strict code quality, type safety, and review standards.",
    },
    {
      number: "04",
      title: "Quality & Testing",
      description:
        "Rigorous testing across functionality, accessibility, performance, and security — every release must meet production standards.",
    },
    {
      number: "05",
      title: "Deployment & DevOps",
      description:
        "Dockerised, environment-driven deployments with CI/CD pipelines — built for reliability from the first production release.",
    },
    {
      number: "06",
      title: "Iteration & Scale",
      description:
        "Continuous improvement driven by real usage — refining architecture, performance, and product experience as the platform grows.",
    },
  ],
} as const;

export const techStackContent = {
  id: "tech",
  eyebrow: "Technology",
  title: "Tools & Stack",
  description:
    "Modern, battle-tested technologies chosen for performance, maintainability, and production reliability.",
  categories: [
    {
      name: "Frontend",
      technologies: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      name: "Backend",
      technologies: [
        "Node.js",
        "PostgreSQL",
        "Firebase",
        "REST APIs",
        "Docker",
      ],
    },
    {
      name: "DevOps",
      technologies: ["Docker", "Coolify", "CI/CD", "GitHub", "Linux"],
    },
    {
      name: "AI & Tools",
      technologies: [
        "AI-Assisted Development",
        "Cursor",
        "Git",
        "Figma",
        "MDX",
      ],
    },
  ],
} as const;

export const certificationsContent = {
  id: "certifications",
  eyebrow: "Credentials",
  title: "Expertise & Continuous Learning",
  description:
    "Deep, hands-on proficiency across modern product engineering — built through real projects, not theory.",
  items: [
    {
      title: "Full-Stack Product Engineering",
      issuer: "Production Experience",
      description:
        "End-to-end ownership of fintech and SaaS products — from system design through deployment and iteration.",
      year: "Ongoing",
    },
    {
      title: "Cloud-Native Architecture",
      issuer: "Project-Based",
      description:
        "Dockerised deployments, environment-driven configuration, and scalable infrastructure patterns applied across live products.",
      year: "2024 — Present",
    },
    {
      title: "AI-Assisted Software Development",
      issuer: "Daily Practice",
      description:
        "Integrating AI tools into disciplined engineering workflows — accelerating delivery without compromising code quality.",
      year: "Ongoing",
    },
    {
      title: "FinTech Platform Development",
      issuer: "TradingNexus & XchangeByte",
      description:
        "Specialised experience building trading systems, exchange platforms, and financial data products for production use.",
      year: "2024 — Present",
    },
  ],
} as const;

export const contactContent = {
  id: "contact",
  eyebrow: "Contact",
  title: "Let's Build Something",
  description:
    "Open to consulting, freelance projects, full-time opportunities, and strategic partnerships. Reach out directly.",
  cta: "Start a Conversation",
} as const;
