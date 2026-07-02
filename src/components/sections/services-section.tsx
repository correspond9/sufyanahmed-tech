"use client";

import {
  Brain,
  ChartLine,
  Layers,
  MessageSquare,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { servicesContent } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { GlassPanel, SectionTitle } from "@/components/ui/glass";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/ui/reveal";

const iconMap: Record<string, LucideIcon> = {
  layers: Layers,
  chart: ChartLine,
  brain: Brain,
  message: MessageSquare,
};

export function ServicesSection() {
  return (
    <section id={servicesContent.id} className="relative py-20 lg:py-28">
      <div
        className="section-glow-divider absolute inset-x-0 top-0"
        aria-hidden
      />
      <Container>
        <Reveal className="mb-12 max-w-2xl">
          <SectionTitle>{servicesContent.title}</SectionTitle>
          <p className="mt-4 text-[14px] leading-relaxed text-white/50">
            {servicesContent.description}
          </p>
        </Reveal>

        <StaggerReveal className="grid gap-5 sm:grid-cols-2">
          {servicesContent.items.map((service) => {
            const Icon = iconMap[service.icon] ?? Layers;
            return (
              <StaggerItem key={service.id}>
                <GlassPanel className="group h-full p-6" interactive>
                  <div className="bg-primary/10 text-primary border-primary/20 group-hover:bg-primary/18 mb-4 flex size-10 items-center justify-center rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_-4px_rgba(79,140,255,0.4)]">
                    <Icon className="size-5" aria-hidden />
                  </div>
                  <h3 className="font-display mb-2 text-lg font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-white/50">
                    {service.description}
                  </p>
                </GlassPanel>
              </StaggerItem>
            );
          })}
        </StaggerReveal>

        <Reveal delay={0.2} className="mt-10 text-center">
          <Link
            href={servicesContent.cta.href}
            className="text-primary hover:text-primary/80 inline-flex items-center gap-2 text-[13px] font-medium transition-colors"
          >
            {servicesContent.cta.label}
            <ArrowRight className="size-3.5" />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
