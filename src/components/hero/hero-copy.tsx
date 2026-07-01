"use client";

import { motion, useReducedMotion } from "framer-motion";
import { heroAnimation, heroContent } from "@/constants/hero";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

export function HeroSubtitle() {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMounted();

  if (!mounted || prefersReducedMotion) {
    return (
      <p className="text-muted-foreground/90 max-w-[34rem] text-base leading-[1.75] sm:text-[17px]">
        {heroContent.subtitle}
      </p>
    );
  }

  return (
    <motion.p
      className="text-muted-foreground/90 max-w-[34rem] text-base leading-[1.75] sm:text-[17px]"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: heroAnimation.fadeDuration,
        delay: 0.45,
        ease: [0, 0, 0.2, 1],
      }}
    >
      {heroContent.subtitle}
    </motion.p>
  );
}

export function HeroEyebrow() {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMounted();

  const content = (
    <p
      className={cn(
        "text-primary/90 inline-flex items-center gap-2.5 text-[13px] font-medium tracking-[0.04em]",
        "border-primary/15 bg-primary/[0.06] rounded-full border px-3.5 py-1.5",
        "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
      )}
    >
      <span
        className="bg-primary size-1.5 rounded-full shadow-[0_0_8px_rgba(79,140,255,0.8)]"
        aria-hidden
      />
      {heroContent.eyebrow}
    </p>
  );

  if (!mounted || prefersReducedMotion) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0, 0, 0.2, 1] }}
    >
      {content}
    </motion.div>
  );
}
