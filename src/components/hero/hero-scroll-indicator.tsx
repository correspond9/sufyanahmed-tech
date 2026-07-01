"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeroScrollIndicatorProps {
  className?: string;
}

export function HeroScrollIndicator({ className }: HeroScrollIndicatorProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "absolute bottom-8 left-1/2 z-10 -translate-x-1/2",
        className,
      )}
      aria-hidden
    >
      {prefersReducedMotion ? (
        <ChevronDown className="text-muted-foreground/60 size-5" />
      ) : (
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="text-muted-foreground/60 size-5" />
        </motion.div>
      )}
    </div>
  );
}
