"use client";

import { motion, useReducedMotion } from "framer-motion";
import { heroAnimation, heroContent } from "@/constants/hero";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: heroAnimation.stagger,
      delayChildren: heroAnimation.delayChildren,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: heroAnimation.wordDuration,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

function StaticHeadline() {
  return (
    <h1 className="font-display text-foreground text-[2.75rem] leading-[1.02] font-bold tracking-[-0.03em] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
      <span className="block">{heroContent.headline.line1.join(" ")}</span>
      <span className="from-primary to-purple mt-1 block bg-gradient-to-r bg-clip-text text-transparent">
        {heroContent.headline.line2.join(" ")}
      </span>
    </h1>
  );
}

export function HeroHeadline() {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMounted();
  const lines = [
    heroContent.headline.line1,
    heroContent.headline.line2,
  ] as const;

  if (!mounted || prefersReducedMotion) {
    return <StaticHeadline />;
  }

  return (
    <h1
      className="font-display text-[2.75rem] leading-[1.02] font-bold tracking-[-0.03em] sm:text-6xl lg:text-7xl xl:text-[5.25rem]"
      aria-label={`${heroContent.headline.line1.join(" ")} ${heroContent.headline.line2.join(" ")}`}
    >
      {lines.map((line, lineIndex) => (
        <motion.span
          key={lineIndex}
          className={cn(
            "block overflow-hidden",
            lineIndex === 1 &&
              "from-primary to-purple mt-1 bg-gradient-to-r bg-clip-text text-transparent",
          )}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {line.map((word) => (
            <motion.span
              key={word}
              className="mr-[0.22em] inline-block"
              variants={wordVariants}
              aria-hidden
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </h1>
  );
}
