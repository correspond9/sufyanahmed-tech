import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass";
import { Reveal } from "@/components/ui/reveal";

interface LegalSection {
  heading: string;
  body: string;
}

interface LegalDocumentProps {
  updated: string;
  sections: readonly LegalSection[];
}

export function LegalDocument({ updated, sections }: LegalDocumentProps) {
  return (
    <section className="pb-20 lg:pb-28">
      <Container>
        <Reveal>
          <GlassPanel className="mx-auto max-w-3xl p-6 sm:p-10">
            <p className="mb-8 text-[12px] text-white/40">
              Last updated: {updated}
            </p>
            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="font-display mb-3 text-lg font-semibold text-white">
                    {section.heading}
                  </h2>
                  <p className="text-[14px] leading-relaxed text-white/55">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </GlassPanel>
        </Reveal>
      </Container>
    </section>
  );
}
