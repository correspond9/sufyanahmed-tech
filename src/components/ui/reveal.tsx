"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { ReactNode } from "react";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  once?: boolean;
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMounted();
  const { ref, inView } = useInView({
    triggerOnce: once,
    threshold: 0.1,
    rootMargin: "0px 0px -4% 0px",
  });

  if (!mounted || prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  const offsets = {
    up: 48,
    down: -48,
    left: 40,
    right: -40,
    none: 0,
  };

  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const offset = offsets[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x: 0, y: 0, scale: 0.98 }}
      animate={
        inView
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : {
              opacity: 0,
              scale: 0.98,
              [axis]: offset,
            }
      }
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

export function StaggerReveal({
  children,
  className,
  stagger = 0.1,
}: StaggerRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMounted();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.08,
    rootMargin: "0px 0px -4% 0px",
  });

  if (!mounted || prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.05 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.7, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <Reveal className={cn("mb-12 lg:mb-16", className)}>
      <div
        className={cn(
          "max-w-2xl space-y-4",
          align === "center" && "mx-auto text-center",
        )}
      >
        <p className="gradient-text-shine text-[13px] font-medium tracking-[0.12em] uppercase">
          {eyebrow}
        </p>
        <h2 className="font-display text-foreground text-3xl leading-[1.1] font-bold tracking-[-0.02em] sm:text-4xl lg:text-[2.75rem]">
          {title}
        </h2>
        {description && (
          <p className="text-muted-foreground/90 text-base leading-relaxed sm:text-[17px]">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
