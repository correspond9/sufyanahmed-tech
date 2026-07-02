import { routes } from "@/lib/navigation";

export const siteContent = {
  brand: {
    initials: "SA",
    name: "SufyanAhmed.Tech",
    tagline: "Building products that scale. Solving problems that matter.",
  },
  nav: [
    { label: "Home", href: routes.home },
    { label: "About", href: "/#about" },
    { label: "Projects", href: routes.projects },
    { label: "Blog", href: routes.blog },
    { label: "Services", href: "/#services" },
    { label: "Contact", href: routes.contact },
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
    primary: { label: "See What I've Built", href: "/#projects" },
    secondary: { label: "Get In Touch", href: routes.contact },
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
  viewAll: { label: "View All Projects", href: routes.projects },
} as const;

export const servicesContent = {
  id: "services",
  title: "How I Can Help",
  description:
    "From product strategy to production deployment — I partner with founders and teams to ship software that earns trust.",
  items: [
    {
      id: "product-architecture",
      title: "Product Architecture",
      description:
        "Turn ideas into clear system designs, technical roadmaps, and scalable foundations before a single line of code is written.",
      icon: "layers",
    },
    {
      id: "fintech-saas",
      title: "FinTech & SaaS Development",
      description:
        "Build production-grade platforms — trading systems, finance tools, and SaaS products — with modern stacks and premium UX.",
      icon: "chart",
    },
    {
      id: "ai-engineering",
      title: "AI-Assisted Engineering",
      description:
        "Accelerate delivery with AI-assisted workflows while maintaining code quality, security, and long-term maintainability.",
      icon: "brain",
    },
    {
      id: "consulting",
      title: "Technical Consulting",
      description:
        "Get honest guidance on architecture decisions, stack choices, deployment strategy, and product engineering best practices.",
      icon: "message",
    },
  ],
  cta: {
    label: "Discuss Your Project",
    href: routes.contact,
  },
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
  description:
    "Formal credentials across finance, technology, and fitness — reflecting a multidisciplinary foundation.",
  viewAll: { label: "View All Certifications", href: routes.certifications },
  items: [
    {
      id: "nism",
      name: "NISM",
      subtitle: "Certified",
      category: "Finance & Markets",
      description:
        "National Institute of Securities Markets certification — foundational expertise in Indian securities markets and regulatory frameworks.",
    },
    {
      id: "nse",
      name: "NSE",
      subtitle: "Certified",
      category: "Finance & Markets",
      description:
        "National Stock Exchange certification — practical knowledge of market operations, trading systems, and financial instruments.",
    },
    {
      id: "niit",
      name: "NIIT",
      subtitle: "Certified",
      category: "Technology",
      description:
        "NIIT certification in software and technology — structured training in programming, systems, and professional software development.",
    },
    {
      id: "golds-gym",
      name: "Gold's Gym",
      subtitle: "Trainer",
      category: "Fitness",
      description:
        "Certified fitness trainer — discipline, consistency, and the mindset to show up every day, applied to product building.",
    },
  ],
} as const;

export const contactContent = {
  id: "contact",
  title: "Have a project or opportunity?",
  description:
    "Whether you're launching a product, scaling a platform, or exploring a partnership — I'd like to hear from you.",
  cta: { label: "Start a Conversation", href: routes.contact },
  email: "hello@sufyanahmed.tech",
  topics: [
    "Product development",
    "FinTech & trading platforms",
    "Technical consulting",
    "Partnerships & collaborations",
    "Speaking & workshops",
  ],
} as const;

export const contactFormContent = {
  title: "Send a Message",
  description:
    "Fill out the form below and I'll get back to you within 1–2 business days.",
  fields: {
    name: "Full Name",
    email: "Email Address",
    subject: "Subject",
    message: "Message",
  },
  submit: "Send Message",
  success:
    "Thank you! Your message has been sent. I'll respond as soon as possible.",
  error:
    "Something went wrong. Please try again or email hello@sufyanahmed.tech directly.",
  notConfigured:
    "The contact form email is not set up on the server yet. Please email hello@sufyanahmed.tech directly.",
} as const;

export const footerContent = {
  copyright: "© 2026 Sufyan Ahmed. All rights reserved.",
  links: [
    { label: "Privacy Policy", href: routes.privacy },
    { label: "Terms of Use", href: routes.terms },
  ],
} as const;

export const legalContent = {
  privacy: {
    title: "Privacy Policy",
    updated: "July 1, 2026",
    sections: [
      {
        heading: "Overview",
        body: 'SufyanAhmed.Tech ("we", "this site") respects your privacy. This policy explains what information we collect when you use this website and how we use it.',
      },
      {
        heading: "Information We Collect",
        body: "When you submit the contact form, we collect your name, email address, subject, and message. We may also collect standard technical data such as browser type and IP address through server logs for security and performance.",
      },
      {
        heading: "How We Use Your Information",
        body: "Contact form submissions are used solely to respond to your inquiry. We do not sell, rent, or share your personal information with third parties for marketing purposes.",
      },
      {
        heading: "Data Retention",
        body: "Messages are retained only as long as needed to respond to your inquiry and maintain a record of our communication.",
      },
      {
        heading: "Third-Party Services",
        body: "This site may use third-party services for hosting, analytics, or form delivery. These providers process data according to their own privacy policies.",
      },
      {
        heading: "Your Rights",
        body: "You may request access to, correction of, or deletion of your personal data by contacting hello@sufyanahmed.tech.",
      },
      {
        heading: "Contact",
        body: "For privacy-related questions, email hello@sufyanahmed.tech.",
      },
    ],
  },
  terms: {
    title: "Terms of Use",
    updated: "July 1, 2026",
    sections: [
      {
        heading: "Acceptance",
        body: "By accessing and using SufyanAhmed.Tech, you agree to these Terms of Use. If you do not agree, please do not use this website.",
      },
      {
        heading: "Use of Content",
        body: "All content on this site — including text, design, code samples, and branding — is owned by Sufyan Ahmed Ansari unless otherwise stated. You may not copy, reproduce, or distribute content without written permission.",
      },
      {
        heading: "No Professional Advice",
        body: "Information on this site is provided for general informational purposes. It does not constitute financial, legal, or professional advice.",
      },
      {
        heading: "Project Representations",
        body: "Projects and experience described on this site reflect genuine work. Descriptions are presented accurately and without exaggeration.",
      },
      {
        heading: "External Links",
        body: "This site may link to third-party websites. We are not responsible for the content or practices of external sites.",
      },
      {
        heading: "Limitation of Liability",
        body: 'This site is provided "as is" without warranties. Sufyan Ahmed Ansari is not liable for any damages arising from use of this website.',
      },
      {
        heading: "Changes",
        body: "These terms may be updated at any time. Continued use of the site after changes constitutes acceptance of the updated terms.",
      },
      {
        heading: "Contact",
        body: "For questions about these terms, email hello@sufyanahmed.tech.",
      },
    ],
  },
} as const;
