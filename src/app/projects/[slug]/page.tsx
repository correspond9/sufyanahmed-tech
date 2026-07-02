import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, Layers } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectPreview } from "@/components/sections/project-preview";
import { Container } from "@/components/ui/container";
import { GlassPanel, SectionTitle } from "@/components/ui/glass";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content/projects";
import { isExternalLink } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.name} — Case Study`,
    description: project.longDescription,
    alternates: { canonical: `${siteConfig.url}/projects/${project.id}` },
  };
}

const statusStyles = {
  Live: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  "In Progress": "bg-amber-500/15 text-amber-400 border-amber-500/25",
};

export default async function ProjectCaseStudyPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <>
      <PageHeader
        label="Case Study"
        title={project.name}
        description={project.longDescription}
      />
      <section className="pb-20 lg:pb-28">
        <Container className="space-y-8">
          <Reveal>
            <GlassPanel className="overflow-hidden p-0">
              <div className="grid lg:grid-cols-2">
                <div className="border-b border-white/[0.06] p-4 lg:border-r lg:border-b-0">
                  <ProjectPreview
                    name={project.name}
                    theme={project.theme}
                    status={project.status}
                  />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <span
                    className={cn(
                      "mb-3 w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase",
                      statusStyles[project.status],
                    )}
                  >
                    {project.status}
                  </span>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[10px] text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {isExternalLink(project.href) ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary inline-flex items-center gap-1.5 text-[13px] font-medium"
                    >
                      {project.linkLabel}
                      <ExternalLink className="size-3.5" />
                    </a>
                  ) : (
                    <Link
                      href={project.href}
                      className="text-primary inline-flex items-center gap-1.5 text-[13px] font-medium"
                    >
                      {project.linkLabel}
                    </Link>
                  )}
                </div>
              </div>
            </GlassPanel>
          </Reveal>

          <Reveal>
            <GlassPanel className="p-6 sm:p-8">
              <SectionTitle as="h2" className="mb-6">
                Case Study
              </SectionTitle>
              <div className="grid gap-6 md:grid-cols-3">
                {(
                  [
                    ["Challenge", project.caseStudy.challenge],
                    ["Solution", project.caseStudy.solution],
                    ["Outcome", project.caseStudy.outcome],
                  ] as const
                ).map(([label, body]) => (
                  <div key={label}>
                    <h3 className="font-display text-primary mb-2 text-sm font-semibold">
                      {label}
                    </h3>
                    <p className="text-[13px] leading-relaxed text-white/55">
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </Reveal>

          <Reveal>
            <GlassPanel className="p-6 sm:p-8">
              <div className="mb-6 flex items-center gap-2">
                <Layers className="text-primary size-5" />
                <SectionTitle as="h2">Architecture Library</SectionTitle>
              </div>
              <p className="mb-6 text-[14px] leading-relaxed text-white/55">
                {project.architecture.summary}
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.architecture.layers.map((layer) => (
                  <div
                    key={layer.name}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                  >
                    <p className="font-display mb-1 text-sm font-semibold text-white">
                      {layer.name}
                    </p>
                    <p className="text-primary/80 mb-2 text-[11px] font-medium">
                      {layer.tech}
                    </p>
                    <p className="text-[12px] leading-relaxed text-white/50">
                      {layer.role}
                    </p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
