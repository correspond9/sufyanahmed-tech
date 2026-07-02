"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { heroContent } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { GradientText } from "@/components/ui/glass";
import { HeroTerminal } from "@/components/hero/hero-terminal";
import { SceneErrorBoundary } from "@/components/hero/scene-error-boundary";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const EcosystemCanvas = dynamic(
  () =>
    import("@/components/hero/ecosystem-canvas").then((m) => m.EcosystemCanvas),
  { ssr: false, loading: () => <EcosystemFallback /> },
);

const ease = [0.22, 1, 0.36, 1] as const;

function EcosystemFallback() {
  return (
    <div className="hero-orbit-stage relative flex h-full min-h-[360px] w-full items-center justify-center overflow-hidden">
      <div className="hero-orbit-halo absolute top-1/2 left-1/2 size-64 -translate-x-1/2 -translate-y-1/2" />
      <div className="relative">
        <div className="hero-orbit-fallback-ring border-primary/25 absolute inset-0 rounded-full border" />
        <div className="hero-orbit-fallback-ring hero-orbit-fallback-ring--delay border-purple/20 absolute inset-[-18px] rounded-full border" />
        <div className="hero-orbit-fallback-core border-primary/35 relative size-28 rounded-full border bg-[#020617]/80 shadow-[0_0_60px_rgba(79,140,255,0.35)]" />
      </div>
    </div>
  );
}

export function HeroSection() {
  const mounted = useMounted();
  const prefersReducedMotion = useReducedMotion();

  const hidden = prefersReducedMotion
    ? { opacity: 1, y: 0, scale: 1 }
    : { opacity: 0, y: 24, scale: 0.98 };
  const visible = { opacity: 1, y: 0, scale: 1 };
  const sceneHidden = prefersReducedMotion
    ? { opacity: 1, scale: 1 }
    : { opacity: 0, scale: 0.94 };
  const sceneVisible = { opacity: 1, scale: 1 };

  return (
    <section
      id={heroContent.id}
      className="relative min-h-screen overflow-hidden pt-[4.5rem]"
    >
      <div
        className="hero-mesh-glow pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div
        className="hero-noise pointer-events-none absolute inset-0"
        aria-hidden
      />

      <Container className="relative z-[1] py-12 lg:py-16 xl:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8 xl:gap-12">
          <div className="space-y-7 lg:space-y-8">
            <motion.div
              initial={hidden}
              animate={mounted ? visible : hidden}
              transition={{ duration: 0.7, delay: 0.05, ease }}
            >
              <span className="badge-glow inline-flex items-center gap-2.5 rounded-full border border-white/[0.1] bg-white/[0.05] px-4 py-2 text-[10px] font-semibold tracking-[0.12em] text-white/80 uppercase backdrop-blur-md">
                <span className="status-pulse-dot size-1.5 rounded-full bg-emerald-400" />
                {heroContent.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={hidden}
              animate={mounted ? visible : hidden}
              transition={{ duration: 0.7, delay: 0.14, ease }}
              className="font-display text-[2.5rem] leading-[1.05] font-bold tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]"
            >
              <span className="block">{heroContent.headline.line1}</span>
              <motion.div
                initial={hidden}
                animate={mounted ? visible : hidden}
                transition={{ duration: 0.7, delay: 0.28, ease }}
              >
                <GradientText
                  as="span"
                  className="mt-1 block text-[2.5rem] sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]"
                >
                  {heroContent.headline.line2}
                </GradientText>
              </motion.div>
            </motion.h1>

            <motion.p
              initial={hidden}
              animate={mounted ? visible : hidden}
              transition={{ duration: 0.7, delay: 0.36, ease }}
              className="max-w-lg text-[15px] leading-[1.75] text-white/65 sm:text-base"
            >
              {heroContent.subtitle}
            </motion.p>

            <motion.div
              initial={hidden}
              animate={mounted ? visible : hidden}
              transition={{ duration: 0.7, delay: 0.44, ease }}
              className="flex flex-wrap gap-3 pt-1"
            >
              <motion.div
                whileHover={
                  mounted && !prefersReducedMotion
                    ? { scale: 1.04, y: -2 }
                    : undefined
                }
                whileTap={
                  mounted && !prefersReducedMotion ? { scale: 0.98 } : undefined
                }
              >
                <Link
                  href={heroContent.cta.primary.href}
                  className={cn(
                    "cta-glow-primary inline-flex items-center gap-2 rounded-full px-6 py-3",
                    "text-[13px] font-semibold text-white",
                    "from-primary bg-gradient-to-r to-[#6D5DF6]",
                    "shadow-[0_0_32px_-4px_rgba(79,140,255,0.55)]",
                    "transition-all duration-300 hover:shadow-[0_0_48px_-2px_rgba(79,140,255,0.75)] hover:brightness-110",
                  )}
                >
                  {heroContent.cta.primary.label}
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={
                  mounted && !prefersReducedMotion
                    ? { scale: 1.03, y: -2 }
                    : undefined
                }
                whileTap={
                  mounted && !prefersReducedMotion ? { scale: 0.98 } : undefined
                }
              >
                <Link
                  href={heroContent.cta.secondary.href}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full px-6 py-3",
                    "text-[13px] font-medium text-white/85",
                    "border border-white/[0.12] bg-white/[0.05] backdrop-blur-md",
                    "hover:border-primary/30 hover:bg-primary/10 transition-all duration-300 hover:text-white",
                  )}
                >
                  <Mail className="size-4" />
                  {heroContent.cta.secondary.label}
                </Link>
              </motion.div>
            </motion.div>

            <HeroTerminal />
          </div>

          <motion.div
            initial={sceneHidden}
            animate={mounted ? sceneVisible : sceneHidden}
            transition={{ duration: 1.1, delay: 0.2, ease }}
            className="relative min-h-[400px] overflow-hidden px-2 sm:min-h-[460px] lg:min-h-[560px] lg:px-4"
          >
            <SceneErrorBoundary fallback={<EcosystemFallback />}>
              <EcosystemCanvas />
            </SceneErrorBoundary>
          </motion.div>
        </div>
      </Container>

      <div
        className="absolute right-6 bottom-8 z-10 hidden flex-col items-center gap-2 lg:flex"
        aria-hidden
      >
        <span className="text-[9px] font-medium tracking-[0.2em] text-white/30 uppercase [writing-mode:vertical-lr]">
          Scroll to explore
        </span>
        <div className="flex h-10 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <div className="scroll-indicator-dot bg-primary/60 size-1 rounded-full" />
        </div>
      </div>
    </section>
  );
}
