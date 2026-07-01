"use client";

import { motion, useReducedMotion } from "framer-motion";
import { heroAnimation, heroContent } from "@/constants/hero";
import { cn } from "@/lib/utils";

interface HeroTerminalProps {
  className?: string;
}

export function HeroTerminal({ className }: HeroTerminalProps) {
  const prefersReducedMotion = useReducedMotion();
  const { path, lines } = heroContent.terminal;

  const content = (
    <div
      className={cn(
        "border-border/80 bg-surface/80 overflow-hidden rounded-lg border backdrop-blur-sm",
        "font-mono text-xs leading-relaxed sm:text-sm",
        className,
      )}
      role="region"
      aria-label="Development status terminal"
    >
      <div className="border-border/60 flex items-center gap-2 border-b px-4 py-3">
        <span className="size-2.5 rounded-full bg-red-500/80" aria-hidden />
        <span className="size-2.5 rounded-full bg-yellow-500/80" aria-hidden />
        <span className="size-2.5 rounded-full bg-green-500/80" aria-hidden />
        <span className="text-muted-foreground ml-2">{path}</span>
      </div>

      <div className="space-y-3 p-4">
        {lines.map((line) => (
          <div key={line.command} className="space-y-1">
            <p className="text-foreground/90">
              <span className="text-primary" aria-hidden>
                {"> "}
              </span>
              {line.command}
            </p>
            <p className="text-muted-foreground">
              <span className="text-green-400" aria-hidden>
                ✓{" "}
              </span>
              {line.status}
            </p>
          </div>
        ))}

        <p className="text-foreground/90 flex items-center">
          <span className="text-primary" aria-hidden>
            {"> "}
          </span>
          <span
            className="terminal-cursor bg-primary ml-0.5 inline-block h-4 w-2"
            aria-hidden
          />
          <span className="sr-only">Terminal cursor</span>
        </p>
      </div>
    </div>
  );

  if (prefersReducedMotion) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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
