export const siteConfig = {
  name: "Sufyan Ahmed Ansari",
  shortName: "SufyanAhmed.Tech",
  title: "Sufyan Ahmed Ansari — Founder & Product Architect",
  description:
    "Building products that scale. Founder, product architect, and AI-assisted engineer crafting modern digital products.",
  tagline: "Building Products That Scale.",
  url: "https://sufyanahmed.tech",
  locale: "en_US",
  author: {
    name: "Sufyan Ahmed Ansari",
    role: "Founder • Product Architect • AI-Assisted Engineer",
    email: "hello@sufyanahmed.tech",
  },
  keywords: [
    "Sufyan Ahmed Ansari",
    "product architect",
    "software architect",
    "founder",
    "AI-assisted engineer",
    "FinTech",
    "product builder",
  ],
  links: {
    github: "https://github.com/correspond9",
    linkedin: "https://www.linkedin.com/in/sufyan-it-is/",
    twitter: "https://x.com/Sufyan_it_is",
    instagram: "https://www.instagram.com/sufyan_ansarii/",
  },
} as const;

export const navigationConfig = {
  main: [
    { label: "About", href: "#about" },
    { label: "Work", href: "#projects" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ],
} as const;

export const footerConfig = {
  copyright: `© ${new Date().getFullYear()} Sufyan Ahmed Ansari. All rights reserved.`,
} as const;
