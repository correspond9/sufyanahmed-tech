import { certificationsContent } from "@/constants/content";
import { Section } from "@/components/ui/section";
import {
  SectionHeader,
  StaggerReveal,
  StaggerItem,
} from "@/components/ui/reveal";

export function CertificationsSection() {
  return (
    <Section id={certificationsContent.id} spacing="lg" className="relative">
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden />
      <SectionHeader
        eyebrow={certificationsContent.eyebrow}
        title={certificationsContent.title}
        description={certificationsContent.description}
      />

      <StaggerReveal className="grid gap-5 md:grid-cols-2">
        {certificationsContent.items.map((item) => (
          <StaggerItem key={item.title}>
            <div className="glass-card flex h-full flex-col rounded-xl p-6">
              <div className="mb-3 flex items-start justify-between gap-4">
                <h3 className="font-display text-foreground text-lg font-semibold">
                  {item.title}
                </h3>
                <span className="text-muted-foreground shrink-0 text-[11px] font-medium tracking-wide">
                  {item.year}
                </span>
              </div>
              <p className="text-primary/80 mb-2 text-xs font-medium tracking-wide uppercase">
                {item.issuer}
              </p>
              <p className="text-muted-foreground/90 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </Section>
  );
}
