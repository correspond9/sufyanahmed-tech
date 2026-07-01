"use client";

import { motion, useReducedMotion } from "framer-motion";
import { heroAnimation, heroContent } from "@/constants/hero";
import { useMounted } from "@/hooks/use-mounted";

export function HeroSubtitle() {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMounted();

  if (!mounted || prefersReducedMotion) {
    return (
      <p className="text-muted-foreground max-w-xl text-base leading-relaxed sm:text-lg">
        {heroContent.subtitle}
      </p>
    );
  }

  return (
    <motion.p
      className="text-muted-foreground max-w-xl text-base leading-relaxed sm:text-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
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

  if (!mounted || prefersReducedMotion) {
    return (
      <p className="text-primary text-sm font-medium tracking-wide">
        {heroContent.eyebrow}
      </p>
    );
  }

  return (
    <motion.p
      className="text-primary text-sm font-medium tracking-wide"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
    >
      {heroContent.eyebrow}
    </motion.p>
  );
}
