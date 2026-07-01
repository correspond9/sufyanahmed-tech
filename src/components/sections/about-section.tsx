import { aboutContent } from "@/constants/content";
import { Section } from "@/components/ui/section";
import {
  SectionHeader,
  Reveal,
  StaggerReveal,
  StaggerItem,
} from "@/components/ui/reveal";

export function AboutSection() {
  return (
    <Section id={aboutContent.id} spacing="lg" className="relative">
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden />
      <SectionHeader
        eyebrow={aboutContent.eyebrow}
        title={aboutContent.title}
        description={aboutContent.description}
      />

      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div className="space-y-6">
          {aboutContent.paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.08}>
              <p className="text-muted-foreground/90 text-base leading-[1.8] sm:text-[17px]">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <StaggerReveal className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {aboutContent.highlights.map((item) => (
            <StaggerItem key={item.label}>
              <div className="glass-card rounded-xl p-5">
                <p className="text-muted-foreground mb-1.5 text-[11px] font-medium tracking-[0.1em] uppercase">
                  {item.label}
                </p>
                <p className="text-foreground text-sm font-medium">
                  {item.value}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </Section>
  );
}
