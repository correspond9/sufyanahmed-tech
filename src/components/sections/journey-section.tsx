import { journeyContent } from "@/constants/content";
import { Section } from "@/components/ui/section";
import { SectionHeader, Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Production: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
  "In Progress": "text-amber-400 border-amber-400/20 bg-amber-400/10",
  Active: "text-sky-400 border-sky-400/20 bg-sky-400/10",
};

export function JourneySection() {
  return (
    <Section id={journeyContent.id} spacing="lg" className="relative">
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden />
      <SectionHeader
        eyebrow={journeyContent.eyebrow}
        title={journeyContent.title}
        description={journeyContent.description}
      />

      <div className="relative">
        <div
          className="bg-border/40 absolute top-0 bottom-0 left-[7px] w-px md:left-1/2 md:-translate-x-px"
          aria-hidden
        />

        <ol className="space-y-10 md:space-y-0">
          {journeyContent.milestones.map((milestone, index) => (
            <Reveal key={milestone.title} delay={index * 0.1}>
              <li
                className={cn(
                  "relative grid gap-6 md:grid-cols-2 md:gap-12",
                  index % 2 === 0
                    ? "md:[&>div:first-child]:pr-10 md:[&>div:first-child]:text-right"
                    : "md:[&>div:first-child]:order-2 md:[&>div:first-child]:pl-10",
                )}
              >
                <div className="flex flex-col justify-center">
                  <span className="text-primary mb-2 text-sm font-semibold tracking-wide">
                    {milestone.year}
                  </span>
                  <h3 className="font-display text-foreground mb-2 text-xl font-semibold">
                    {milestone.title}
                  </h3>
                  <p className="text-muted-foreground/90 text-sm leading-relaxed sm:text-base">
                    {milestone.description}
                  </p>
                  {"status" in milestone && milestone.status && (
                    <span
                      className={cn(
                        "mt-3 inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                        statusStyles[milestone.status] ?? "",
                      )}
                    >
                      {milestone.status}
                    </span>
                  )}
                </div>

                <div className="hidden md:block" aria-hidden />

                <div
                  className="border-primary bg-background absolute top-6 left-0 size-[15px] rounded-full border-2 shadow-[0_0_12px_rgba(79,140,255,0.5)] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2"
                  aria-hidden
                />
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
