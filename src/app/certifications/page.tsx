import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { certificationsContent } from "@/constants/content";
import { routes } from "@/lib/navigation";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Certifications and credentials of Sufyan Ahmed Ansari across finance, technology, and fitness.",
  alternates: { canonical: `${siteConfig.url}/certifications` },
  openGraph: {
    title: `Certifications | ${siteConfig.shortName}`,
    description: "NISM, NSE, NIIT, and Gold's Gym trainer credentials.",
    url: `${siteConfig.url}/certifications`,
  },
};

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        label="Credentials"
        title="Certifications"
        description={certificationsContent.description}
      />
      <section className="pb-20 lg:pb-28">
        <Container>
          <StaggerReveal className="grid gap-5 md:grid-cols-2">
            {certificationsContent.items.map((cert) => (
              <StaggerItem key={cert.id}>
                <GlassPanel
                  id={cert.id}
                  className="h-full scroll-mt-28 p-6 sm:p-8"
                >
                  <p className="text-primary/80 mb-2 text-[11px] font-semibold tracking-wide uppercase">
                    {cert.category}
                  </p>
                  <h2 className="font-display mb-1 text-xl font-semibold text-white">
                    {cert.name}
                  </h2>
                  <p className="text-primary mb-4 text-[13px] font-medium">
                    {cert.subtitle}
                  </p>
                  <p className="text-[13px] leading-relaxed text-white/50">
                    {cert.description}
                  </p>
                </GlassPanel>
              </StaggerItem>
            ))}
          </StaggerReveal>
          <Reveal delay={0.15} className="mt-12 text-center">
            <Link
              href={routes.contact}
              className="text-primary hover:text-primary/80 text-[13px] font-medium transition-colors"
            >
              Discuss a collaboration →
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
