"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

interface HeroVisualEffectsProps {
  className?: string;
}

export function HeroVisualEffects({ className }: HeroVisualEffectsProps) {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMounted();
  const animate = mounted && !prefersReducedMotion;

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
      aria-hidden
    >
      <div className="bg-grid absolute inset-0 opacity-40" />

      {animate && (
        <motion.div
          className="bg-primary/10 absolute -top-1/4 left-1/4 h-[60%] w-[60%] rounded-full blur-[100px]"
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <div
        className={cn(
          "absolute inset-0",
          animate
            ? "hero-aurora"
            : "bg-[radial-gradient(ellipse_at_50%_50%,rgb(79_140_255/0.12),transparent_70%)]",
        )}
      />

      {animate && (
        <>
          <motion.div
            className="bg-purple/20 absolute top-1/4 right-1/4 size-48 rounded-full blur-3xl"
            animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="bg-primary/25 absolute bottom-1/3 left-1/3 size-32 rounded-full blur-2xl"
            animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="bg-electric/15 absolute top-1/2 right-1/3 size-24 rounded-full blur-2xl"
            animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          />
          <HeroParticles />
        </>
      )}
    </div>
  );
}

function HeroParticles() {
  const particles = Array.from({ length: 24 }, (_, index) => ({
    id: index,
    left: `${(index * 17 + 11) % 100}%`,
    top: `${(index * 23 + 7) % 100}%`,
    size: 2 + (index % 3),
    duration: 4 + (index % 5),
    delay: (index % 8) * 0.3,
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="bg-primary/40 absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            y: [0, -20, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}
