"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMounted } from "@/hooks/use-mounted";

const orbs = [
  {
    className:
      "bg-primary/40 top-[8%] left-[5%] size-80 blur-[70px] animate-orb-float",
    delay: 0,
  },
  {
    className:
      "bg-purple/30 top-[40%] right-[4%] size-[28rem] blur-[80px] animate-orb-float-slow",
    delay: 0.8,
  },
  {
    className:
      "bg-cyan-400/20 bottom-[12%] left-[30%] size-96 blur-[75px] animate-orb-float-reverse",
    delay: 0.4,
  },
  {
    className:
      "bg-primary/25 top-[70%] right-[30%] size-64 blur-[60px] animate-orb-float",
    delay: 1.4,
  },
] as const;

export function AmbientBackground() {
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();

  const shellClass = "pointer-events-none absolute inset-0 z-0 overflow-hidden";

  if (!mounted || prefersReducedMotion) {
    return (
      <div className={shellClass} aria-hidden>
        <div className="bg-primary/20 absolute top-[15%] left-[8%] size-72 rounded-full blur-[60px]" />
        <div className="bg-purple/15 absolute right-[6%] bottom-[20%] size-80 rounded-full blur-[70px]" />
        <div className="absolute bottom-[30%] left-[40%] size-64 rounded-full bg-cyan-400/10 blur-[55px]" />
      </div>
    );
  }

  return (
    <div className={shellClass} aria-hidden>
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full ${orb.className}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.4,
            delay: orb.delay,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
      <div className="mesh-drift absolute inset-0 opacity-70" />
      <div className="bg-grid-fine absolute inset-0 opacity-[0.35]" />
    </div>
  );
}
