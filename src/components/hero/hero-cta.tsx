"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { heroAnimation, heroContent } from "@/constants/hero";
import { Button } from "@/components/ui/button";

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
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: heroAnimation.slideDuration,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

export function HeroCta() {
  const prefersReducedMotion = useReducedMotion();
  const { primary, secondary } = heroContent.cta;

  if (prefersReducedMotion) {
    return (
      <div className="flex flex-wrap gap-4">
        <Button asChild size="lg">
          <Link href={primary.href}>
            {primary.label}
            <ArrowRight aria-hidden />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href={secondary.href}>{secondary.label}</Link>
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-wrap gap-4"
      variants={buttonContainerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={buttonVariants}>
        <Button asChild size="lg">
          <Link href={primary.href}>
            {primary.label}
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </motion.div>
      <motion.div variants={buttonVariants}>
        <Button asChild variant="outline" size="lg">
          <Link href={secondary.href}>{secondary.label}</Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}
