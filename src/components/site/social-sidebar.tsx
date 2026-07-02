"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { siteContent } from "@/constants/content";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  X: Twitter,
  Instagram: Instagram,
} as const;

export function SocialSidebar() {
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();

  return (
    <aside
      className="fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 lg:block xl:left-6"
      aria-label="Social links"
    >
      <ul className="flex flex-col gap-3">
        {siteContent.social.map((item, index) => {
          const Icon = iconMap[item.label as keyof typeof iconMap] ?? Github;

          const link = (
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.label}
              className={cn(
                "flex size-10 items-center justify-center rounded-xl",
                "border border-white/[0.08] bg-white/[0.04] text-white/50",
                "backdrop-blur-md transition-all duration-300",
                "hover:border-primary/35 hover:bg-primary/12 hover:text-primary",
                "hover:scale-110 hover:shadow-[0_0_20px_-2px_rgba(79,140,255,0.5)]",
              )}
            >
              <Icon className="size-4" />
            </a>
          );

          if (!mounted || prefersReducedMotion) {
            return <li key={item.label}>{link}</li>;
          }

          return (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.8 + index * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ x: 4, scale: 1.05 }}
            >
              {link}
            </motion.li>
          );
        })}
      </ul>
    </aside>
  );
}
