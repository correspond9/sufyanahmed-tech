"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { heroContent } from "@/constants/content";
import { useMounted } from "@/hooks/use-mounted";

const statusColors = {
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  sky: "text-sky-400",
} as const;

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroTerminal() {
  const mounted = useMounted();
  const lines = heroContent.terminal.lines;

  return (
    <motion.div
      initial={{ opacity: 1, y: 24 }}
      animate={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 24 }}
      transition={{ duration: 0.7, delay: 0.55, ease }}
      className="max-w-md overflow-hidden rounded-xl border border-white/[0.1] bg-[rgba(15,23,42,0.72)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_12px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[11px] text-white/40">
          {heroContent.terminal.path}
        </span>
      </div>

      <div className="space-y-2.5 p-4 font-mono text-[12px]">
        {lines.map((line, index) => (
          <div key={line.command}>
            <motion.p
              className="text-white/80"
              initial={{ opacity: 1, x: -10 }}
              animate={mounted ? { opacity: 1, x: 0 } : { opacity: 1, x: -10 }}
              transition={{
                duration: 0.4,
                delay: 0.75 + index * 0.45,
                ease,
              }}
            >
              <span className="text-primary/80">{"> "}</span>
              {line.command}
            </motion.p>
            <motion.p
              className={cn("pl-3", statusColors[line.color])}
              initial={{ opacity: 1, y: 6 }}
              animate={mounted ? { opacity: 1, y: 0 } : { opacity: 1, y: 6 }}
              transition={{
                duration: 0.35,
                delay: 1.05 + index * 0.45,
                ease,
              }}
            >
              ✓ {line.status}
            </motion.p>
          </div>
        ))}

        <p className="flex items-center text-white/80">
          <span className="text-primary/80">{"> "}</span>
          <span className="terminal-cursor bg-primary ml-1 inline-block h-3.5 w-2 rounded-sm" />
        </p>
      </div>
    </motion.div>
  );
}
