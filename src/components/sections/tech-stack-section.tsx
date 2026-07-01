import { techStackContent } from "@/constants/content";
import { Section } from "@/components/ui/section";
import {
  SectionHeader,
  StaggerReveal,
  StaggerItem,
} from "@/components/ui/reveal";

export function TechStackSection() {
  return (
    <Section id={techStackContent.id} spacing="lg" className="relative">
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden />
      <SectionHeader
        eyebrow={techStackContent.eyebrow}
        title={techStackContent.title}
        description={techStackContent.description}
      />

      <StaggerReveal className="grid gap-6 sm:grid-cols-2">
        {techStackContent.categories.map((category) => (
          <StaggerItem key={category.name}>
            <div className="glass-card rounded-xl p-6">
              <h3 className="font-display text-foreground mb-4 text-lg font-semibold">
                {category.name}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {category.technologies.map((tech) => (
                  <li key={tech}>
                    <span className="text-foreground/85 hover:border-primary/25 hover:bg-primary/[0.06] inline-flex items-center rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-[13px] font-medium transition-colors">
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </Section>
  );
}
