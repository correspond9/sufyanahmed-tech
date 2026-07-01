"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { siteContent } from "@/constants/content";
import { cn } from "@/lib/utils";

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Twitter: Twitter,
  Email: Mail,
} as const;

export function SocialSidebar() {
  return (
    <aside
      className="fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 lg:block xl:left-6"
      aria-label="Social links"
    >
      <ul className="flex flex-col gap-3">
        {siteContent.social.map((item) => {
          const Icon = iconMap[item.label as keyof typeof iconMap] ?? Mail;
          return (
            <li key={item.label}>
              <a
                href={item.href}
                target={item.label === "Email" ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={item.label}
                className={cn(
                  "flex size-10 items-center justify-center rounded-xl",
                  "border border-white/[0.08] bg-white/[0.04] text-white/50",
                  "backdrop-blur-md transition-all duration-300",
                  "hover:border-primary/30 hover:bg-primary/10 hover:text-primary hover:shadow-[0_0_16px_-2px_rgba(79,140,255,0.4)]",
                )}
              >
                <Icon className="size-4" />
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
