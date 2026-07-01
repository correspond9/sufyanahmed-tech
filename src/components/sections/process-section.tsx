import { processContent } from "@/constants/content";
import { Section } from "@/components/ui/section";
import {
  SectionHeader,
  StaggerReveal,
  StaggerItem,
} from "@/components/ui/reveal";

export function ProcessSection() {
  return (
    <Section id={processContent.id} spacing="lg" className="relative">
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden />
      <SectionHeader
        eyebrow={processContent.eyebrow}
        title={processContent.title}
        description={processContent.description}
      />

      <StaggerReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {processContent.steps.map((step) => (
          <StaggerItem key={step.number}>
            <div className="glass-card group hover:border-primary/20 h-full rounded-xl p-6 transition-colors">
              <span className="text-primary/40 group-hover:text-primary/70 font-display mb-4 block text-3xl font-bold transition-colors">
                {step.number}
              </span>
              <h3 className="font-display text-foreground mb-2 text-lg font-semibold">
                {step.title}
              </h3>
              <p className="text-muted-foreground/90 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </Section>
  );
}
