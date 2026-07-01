"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

interface HeroScrollIndicatorProps {
  className?: string;
}

export function HeroScrollIndicator({ className }: HeroScrollIndicatorProps) {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMounted();
  const animate = mounted && !prefersReducedMotion;

  return (
    <div
      className={cn(
        "absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2",
        className,
      )}
      aria-hidden
    >
      <span className="text-muted-foreground/50 text-[10px] font-medium tracking-[0.2em] uppercase">
        Scroll
      </span>
      <div className="border-border/40 flex size-8 items-center justify-center rounded-full border bg-white/[0.02] backdrop-blur-sm">
        {animate ? (
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="text-muted-foreground/60 size-3.5" />
          </motion.div>
        ) : (
          <ChevronDown className="text-muted-foreground/60 size-3.5" />
        )}
      </div>
    </div>
  );
}
