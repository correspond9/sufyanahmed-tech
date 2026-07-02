"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  ChartLine,
  Code2,
  Dumbbell,
  Rocket,
} from "lucide-react";
import { aboutContent } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { SectionTitle } from "@/components/ui/glass";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const iconMap = {
  dumbbell: Dumbbell,
  chart: ChartLine,
  code: Code2,
  brain: Brain,
  rocket: Rocket,
} as const;

const timelineIconStyles = {
  dumbbell: {
    ring: "from-emerald-500/40 via-teal-500/25 to-emerald-600/20",
    glow: "shadow-[0_0_24px_-4px_rgba(52,211,153,0.5)]",
    icon: "text-emerald-300",
    iconShadow:
      "drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] drop-shadow-[0_3px_6px_rgba(6,78,59,0.9)]",
  },
  chart: {
    ring: "from-amber-500/40 via-yellow-500/25 to-orange-600/20",
    glow: "shadow-[0_0_24px_-4px_rgba(251,191,36,0.5)]",
    icon: "text-amber-300",
    iconShadow:
      "drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] drop-shadow-[0_3px_6px_rgba(120,53,15,0.9)]",
  },
  code: {
    ring: "from-cyan-500/40 via-sky-500/25 to-blue-600/20",
    glow: "shadow-[0_0_24px_-4px_rgba(34,211,238,0.5)]",
    icon: "text-cyan-300",
    iconShadow:
      "drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] drop-shadow-[0_3px_6px_rgba(14,116,144,0.9)]",
  },
  brain: {
    ring: "from-fuchsia-500/40 via-violet-500/25 to-purple-600/20",
    glow: "shadow-[0_0_24px_-4px_rgba(232,121,249,0.5)]",
    icon: "text-fuchsia-300",
    iconShadow:
      "drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] drop-shadow-[0_3px_6px_rgba(88,28,135,0.9)]",
  },
  rocket: {
    ring: "from-orange-500/40 via-rose-500/25 to-red-600/20",
    glow: "shadow-[0_0_24px_-4px_rgba(251,146,60,0.5)]",
    icon: "text-orange-300",
    iconShadow:
      "drop-shadow-[0_1px_0_rgba(255,255,255,0.35)] drop-shadow-[0_3px_6px_rgba(124,45,18,0.9)]",
  },
} as const;

export function AboutSection() {
  return (
    <section id={aboutContent.id} className="relative py-20 lg:py-28">
      <div
        className="section-glow-divider absolute inset-x-0 top-0"
        aria-hidden
      />
      <Container>
        <div className="mb-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <Reveal>
            <SectionTitle className="mb-5">{aboutContent.title}</SectionTitle>
            <p className="mb-8 max-w-md text-[15px] leading-[1.8] text-white/55">
              {aboutContent.description}
            </p>
            <Link
              href={aboutContent.cta.href}
              className="hover:border-primary/30 hover:bg-primary/10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-[13px] font-medium text-white/80 transition-all"
            >
              {aboutContent.cta.label}
              <ArrowRight className="size-3.5" />
            </Link>
          </Reveal>

          <div id="journey" className="relative pt-5 pb-4">
            <div className="overflow-x-auto pb-2">
              <div className="relative min-w-[640px] px-2 pt-4 lg:min-w-0">
                <div className="from-purple via-primary to-purple absolute top-[3.75rem] right-10 left-10 h-px bg-gradient-to-r opacity-60" />
                <div className="flex gap-4 lg:justify-between">
                  {aboutContent.timeline.map((item, index) => {
                    const Icon = iconMap[item.icon];
                    const styles = timelineIconStyles[item.icon];
                    return (
                      <Reveal
                        key={item.step}
                        delay={index * 0.08}
                        className="flex-1"
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="relative mb-4">
                            <div
                              className={cn(
                                "relative flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br",
                                styles.ring,
                                styles.glow,
                              )}
                            >
                              <span className="text-primary absolute -top-1.5 -right-1.5 z-10 rounded-md border border-white/10 bg-[#0a0f1f] px-1.5 py-0.5 text-[9px] font-bold">
                                {item.step}
                              </span>
                              <div className="flex size-10 items-center justify-center rounded-xl border border-white/20 bg-[#070b16]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_4px_10px_rgba(0,0,0,0.5)]">
                                <Icon
                                  className={cn(
                                    "size-5",
                                    styles.icon,
                                    styles.iconShadow,
                                  )}
                                  strokeWidth={2.25}
                                  aria-hidden
                                />
                              </div>
                            </div>
                          </div>
                          <h3 className="mb-2 text-[13px] font-semibold text-white">
                            {item.title}
                          </h3>
                          <p className="max-w-[140px] text-[11px] leading-relaxed text-white/45">
                            {item.description}
                          </p>
                        </div>
                      </Reveal>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
