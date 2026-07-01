"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import {
  certificationsContent,
  contactContent,
  processContent,
  techStackContent,
} from "@/constants/content";
import { Container } from "@/components/ui/container";
import { GlassPanel, SectionTitle } from "@/components/ui/glass";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const techIcons: Record<string, string> = {
  "Next.js": "N",
  React: "R",
  TypeScript: "TS",
  Python: "Py",
  FastAPI: "F",
  "Node.js": "N",
  PostgreSQL: "PG",
  AWS: "A",
};

function ProcessVisual() {
  const layers = [
    { y: 0, z: 0, hue: "primary" },
    { y: -12, z: 4, hue: "purple" },
    { y: -24, z: 8, hue: "primary" },
    { y: -36, z: 12, hue: "purple" },
  ] as const;

  return (
    <div className="relative flex h-36 w-24 items-center justify-center [perspective:700px]">
      {layers.map((layer, i) => (
        <div
          key={i}
          className={cn(
            "process-stack-layer absolute size-16 rounded-xl border border-white/12",
            layer.hue === "primary"
              ? "from-primary/25 bg-gradient-to-br to-[#4F8CFF]/10"
              : "from-purple/25 bg-gradient-to-br to-[#6D5DF6]/10",
            `process-stack-layer--${i + 1}`,
            "shadow-[0_0_28px_-4px_rgba(79,140,255,0.3)] backdrop-blur-md",
          )}
          style={
            {
              "--stack-y": `${layer.y}px`,
              "--stack-z": `${layer.z}deg`,
              transform: `translateY(${layer.y}px) rotateX(52deg) rotateZ(${layer.z}deg)`,
              zIndex: i,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

export function BottomGridSection() {
  return (
    <section className="relative py-20 lg:py-24">
      <div
        className="section-glow-divider absolute inset-x-0 top-0"
        aria-hidden
      />
      <Container>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* Process */}
          <Reveal>
            <GlassPanel
              id={processContent.id}
              className="flex h-full flex-col p-5 lg:p-6"
            >
              <SectionTitle as="h3" className="mb-5 text-xl lg:text-[1.35rem]">
                {processContent.title}
              </SectionTitle>
              <div className="mb-5 flex flex-1 flex-col gap-5 sm:flex-row xl:flex-col">
                <ol className="flex-1 space-y-2.5">
                  {processContent.steps.map((step, i) => (
                    <li
                      key={step}
                      className="flex items-center gap-2.5 text-[13px] text-white/60"
                    >
                      <span className="text-primary/70 font-mono text-[11px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
                <ProcessVisual />
              </div>
            </GlassPanel>
          </Reveal>

          {/* Tech Stack */}
          <Reveal delay={0.08}>
            <GlassPanel id={techStackContent.id} className="h-full p-5 lg:p-6">
              <SectionTitle as="h3" className="mb-5 text-xl lg:text-[1.35rem]">
                {techStackContent.title}
              </SectionTitle>
              <div className="grid grid-cols-4 gap-2.5">
                {techStackContent.items.map((tech) => (
                  <div
                    key={tech}
                    className="group hover:border-primary/20 hover:bg-primary/[0.06] flex flex-col items-center gap-1.5 rounded-xl border border-white/[0.06] bg-white/[0.03] p-2.5 transition-colors"
                  >
                    <span className="from-primary/30 to-purple/20 flex size-9 items-center justify-center rounded-lg bg-gradient-to-br text-[11px] font-bold text-white/80">
                      {techIcons[tech] ?? tech.charAt(0)}
                    </span>
                    <span className="text-center text-[9px] font-medium text-white/45 group-hover:text-white/65">
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </Reveal>

          {/* Certifications */}
          <Reveal delay={0.16}>
            <GlassPanel
              id={certificationsContent.id}
              className="flex h-full flex-col p-5 lg:p-6"
            >
              <SectionTitle as="h3" className="mb-5 text-xl lg:text-[1.35rem]">
                {certificationsContent.title}
              </SectionTitle>
              <div className="mb-4 grid grid-cols-2 gap-2.5">
                {certificationsContent.items.map((cert) => (
                  <div
                    key={cert.name}
                    className="flex flex-col items-center rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center"
                  >
                    <div className="from-primary/25 to-purple/15 mb-2 flex size-10 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-bold text-white/80">
                      {cert.name.slice(0, 2).toUpperCase()}
                    </div>
                    <p className="text-[11px] font-semibold text-white/80">
                      {cert.name}
                    </p>
                    <p className="text-[9px] text-white/40">{cert.subtitle}</p>
                  </div>
                ))}
              </div>
              <Link
                href={certificationsContent.viewAll.href}
                className="text-primary/80 hover:text-primary mt-auto inline-flex items-center gap-1 text-[11px] font-medium"
              >
                {certificationsContent.viewAll.label}
                <ArrowRight className="size-3" />
              </Link>
            </GlassPanel>
          </Reveal>

          {/* Contact */}
          <Reveal delay={0.24}>
            <GlassPanel
              id={contactContent.id}
              className="flex h-full flex-col p-5 lg:p-6"
            >
              <SectionTitle
                as="h3"
                className="mb-4 text-xl leading-snug lg:text-[1.35rem]"
              >
                {contactContent.title}
              </SectionTitle>
              <p className="mb-6 flex-1 text-[13px] leading-relaxed text-white/50">
                Let&apos;s discuss your next product, collaboration, or
                opportunity.
              </p>
              <Link
                href={contactContent.cta.href}
                className={cn(
                  "mb-4 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5",
                  "text-[12px] font-semibold text-white",
                  "from-primary bg-gradient-to-r to-[#6D5DF6]",
                  "shadow-[0_0_24px_-4px_rgba(79,140,255,0.45)]",
                  "transition-all hover:brightness-110",
                )}
              >
                <Mail className="size-3.5" />
                {contactContent.cta.label}
              </Link>
              <a
                href={`mailto:${contactContent.email}`}
                className="hover:text-primary text-[12px] text-white/45 transition-colors"
              >
                {contactContent.email}
              </a>
            </GlassPanel>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
