"use client";

import { motion, useReducedMotion } from "framer-motion";
import { heroAnimation, heroContent } from "@/constants/hero";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

interface HeroTerminalProps {
  className?: string;
}

const statusColors: Record<string, string> = {
  Production: "text-emerald-400",
  "In Progress": "text-amber-400",
  "Every Day": "text-sky-400",
};

export function HeroTerminal({ className }: HeroTerminalProps) {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMounted();
  const { path, lines } = heroContent.terminal;

  const content = (
    <div
      className={cn(
        "terminal-glass overflow-hidden rounded-xl",
        "font-mono text-[11px] leading-[1.7] sm:text-[13px]",
        className,
      )}
      role="region"
      aria-label="Development status terminal"
    >
      <div className="terminal-header flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span
          className="size-2.5 rounded-full bg-[#ff5f57] shadow-[0_0_6px_rgba(255,95,87,0.4)] transition-opacity hover:opacity-80"
          aria-hidden
        />
        <span
          className="size-2.5 rounded-full bg-[#febc2e] shadow-[0_0_6px_rgba(254,188,46,0.3)] transition-opacity hover:opacity-80"
          aria-hidden
        />
        <span
          className="size-2.5 rounded-full bg-[#28c840] shadow-[0_0_6px_rgba(40,200,64,0.3)] transition-opacity hover:opacity-80"
          aria-hidden
        />
        <span className="text-muted-foreground/80 ml-2 text-[11px]">
          <span className="text-sky-400/90">{path}</span>
        </span>
      </div>

      <div className="space-y-3.5 p-4 pt-3.5">
        {lines.map((line) => (
          <div key={line.command} className="space-y-0.5">
            <p>
              <span className="text-primary/80" aria-hidden>
                {"> "}
              </span>
              <span className="text-foreground/85">{line.command}</span>
            </p>
            <p className="pl-3">
              <span className="text-emerald-400/90" aria-hidden>
                ✓{" "}
              </span>
              <span
                className={cn(
                  "font-medium",
                  statusColors[line.status] ?? "text-muted-foreground",
                )}
              >
                {line.status}
              </span>
            </p>
          </div>
        ))}

        <p className="flex items-center">
          <span className="text-primary/80" aria-hidden>
            {"> "}
          </span>
          <span
            className="terminal-cursor bg-primary/90 ml-0.5 inline-block h-[1.1em] w-2 rounded-[1px] shadow-[0_0_6px_rgba(79,140,255,0.5)]"
            aria-hidden
          />
          <span className="sr-only">Terminal cursor</span>
        </p>
      </div>
    </div>
  );

  if (!mounted || prefersReducedMotion) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: heroAnimation.fadeDuration,
        delay: heroAnimation.terminalDelay,
        ease: [0, 0, 0.2, 1],
      }}
    >
      {content}
    </motion.div>
  );
}
