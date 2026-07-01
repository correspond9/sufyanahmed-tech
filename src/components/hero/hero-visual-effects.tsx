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
      {/* Layer 1 — fine grid */}
      <div className="bg-grid-fine absolute inset-0 opacity-50" />

      {/* Layer 2 — radial glow */}
      <div className="hero-scene-glow absolute inset-0" />

      {/* Layer 3 — animated gradient */}
      {animate ? (
        <motion.div
          className="hero-scene-aurora absolute inset-0"
          animate={{
            opacity: [0.5, 0.75, 0.5],
            scale: [1, 1.03, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      ) : (
        <div className="hero-scene-aurora-static absolute inset-0" />
      )}

      {/* Layer 4 — floating particles */}
      {animate && <HeroParticles />}

      {/* Layer 6 — foreground lighting (applied after 3D in canvas wrapper) */}
    </div>
  );
}

function HeroParticles() {
  const particles = Array.from({ length: 18 }, (_, index) => ({
    id: index,
    left: `${(index * 19 + 13) % 100}%`,
    top: `${(index * 27 + 9) % 100}%`,
    size: 1.5 + (index % 3),
    duration: 5 + (index % 6),
    delay: (index % 7) * 0.4,
  }));

  return (
    <>
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="bg-primary/30 absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [0.15, 0.6, 0.15],
            y: [0, -16, 0],
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

export function HeroSceneForegroundLight({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 z-[2]", className)}
      aria-hidden
    >
      <div className="from-primary/[0.06] to-purple/[0.08] absolute inset-0 bg-gradient-to-br via-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,transparent_50%,rgba(10,15,31,0.2)_100%)]" />
    </div>
  );
}
