"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

interface HeroAmbientBackgroundProps {
  className?: string;
}

export function HeroAmbientBackground({
  className,
}: HeroAmbientBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMounted();
  const animate = mounted && !prefersReducedMotion;

  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    >
      <div className="hero-noise absolute inset-0 opacity-[0.35]" />
      <div className="bg-grid absolute inset-0 opacity-[0.18]" />
      <div className="hero-radial-glow absolute inset-0" />

      {animate ? (
        <motion.div
          className="hero-aurora absolute inset-0"
          animate={{ opacity: [0.6, 0.85, 0.6] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <div className="hero-aurora-static absolute inset-0" />
      )}

      <div className="hero-gradient-mesh absolute inset-0" />
      <div className="hero-vignette absolute inset-0" />
    </div>
  );
}
