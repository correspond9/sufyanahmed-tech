"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroAnimation, heroContent } from "@/constants/hero";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";

const buttonContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.5,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 1, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: heroAnimation.slideDuration,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

function StaticCta() {
  const { primary, secondary } = heroContent.cta;

  return (
    <div className="flex flex-wrap gap-3.5 pt-1">
      <Button asChild variant="premium" size="lg">
        <Link href={primary.href}>
          {primary.label}
          <ArrowRight
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      </Button>
      <Button asChild variant="premium-outline" size="lg">
        <Link href={secondary.href}>{secondary.label}</Link>
      </Button>
    </div>
  );
}

export function HeroCta() {
  const prefersReducedMotion = useReducedMotion();
  const mounted = useMounted();
  const { primary, secondary } = heroContent.cta;

  if (!mounted || prefersReducedMotion) {
    return <StaticCta />;
  }

  return (
    <motion.div
      className="flex flex-wrap gap-3.5 pt-1"
      variants={buttonContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={buttonVariants}>
        <Button asChild variant="premium" size="lg" className="group">
          <Link href={primary.href}>
            {primary.label}
            <ArrowRight
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </Button>
      </motion.div>
      <motion.div variants={buttonVariants}>
        <Button asChild variant="premium-outline" size="lg">
          <Link href={secondary.href}>{secondary.label}</Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
