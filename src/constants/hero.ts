export const heroContent = {
  eyebrow: "Founder • Product Architect • AI-Assisted Engineer",
  headline: {
    line1: ["Building", "Products"],
    line2: ["That", "Scale."],
  },
  subtitle:
    "I design and build production-ready fintech platforms, SaaS products, trading systems, and cloud-native applications using modern engineering practices and AI-assisted development workflows.",
  cta: {
    primary: { label: "Explore My Work", href: "#projects" },
    secondary: { label: "Get In Touch", href: "#contact" },
  },
  terminal: {
    path: "~/sufyan",
    lines: [
      { command: "Building TradingNexus...", status: "Production" },
      { command: "Building XchangeByte...", status: "In Progress" },
      { command: "Always Learning...", status: "Every Day" },
    ],
  },
} as const;

export const heroAnimation = {
  stagger: 0.08,
  delayChildren: 0.12,
  wordDuration: 0.5,
  fadeDuration: 0.6,
  slideDuration: 0.5,
  terminalDelay: 0.8,
} as const;
