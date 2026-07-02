"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface GlassPanelProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"
> {
  children: ReactNode;
  variant?: "default" | "strong" | "subtle";
  glow?: boolean;
  interactive?: boolean;
}

const variants = {
  default:
    "bg-[rgba(15,23,42,0.55)] border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_8px_32px_-8px_rgba(0,0,0,0.5)]",
  strong:
    "bg-[rgba(15,23,42,0.72)] border-white/[0.1] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_12px_40px_-12px_rgba(0,0,0,0.6)]",
  subtle:
    "bg-[rgba(15,23,42,0.35)] border-white/[0.06] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
};

export function GlassPanel({
  children,
  className,
  variant = "default",
  glow = false,
  interactive = false,
  ...props
}: GlassPanelProps) {
  const prefersReducedMotion = useReducedMotion();

  const panelClass = cn(
    "backdrop-blur-xl rounded-2xl border transition-[border-color,box-shadow,transform] duration-300",
    variants[variant],
    glow && "shadow-glow-blue",
    interactive &&
      "glass-panel-interactive hover:border-primary/40 hover:shadow-[0_0_60px_-8px_rgba(79,140,255,0.5)]",
    className,
  );

  if (!interactive || prefersReducedMotion) {
    return (
      <div className={panelClass} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={panelClass}
      whileHover={{ y: -12, scale: 1.025 }}
      transition={{ type: "spring", stiffness: 320, damping: 18 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  as?: "span" | "p" | "h1" | "h2" | "h3";
  animated?: boolean;
}

export function GradientText({
  children,
  className,
  as: Tag = "span",
  animated = true,
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "bg-gradient-to-r from-[#4F8CFF] via-[#6D9FFF] to-[#6D5DF6] bg-clip-text text-transparent",
        animated && "gradient-text-shine",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

interface SectionLabelProps {
  children: ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "gradient-text-shine text-[11px] font-semibold tracking-[0.14em] uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}

interface SectionTitleProps {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3";
}

export function SectionTitle({
  children,
  className,
  as: Tag = "h2",
}: SectionTitleProps) {
  return (
    <Tag
      className={cn(
        "font-display text-[1.75rem] leading-[1.15] font-bold tracking-[-0.02em] text-white sm:text-[2rem] lg:text-[2.25rem]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
