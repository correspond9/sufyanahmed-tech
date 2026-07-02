import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { ProjectPreview } from "@/components/sections/project-preview";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { getProjects } from "@/lib/content/projects";
import { routes } from "@/lib/navigation";
import { cn, isExternalLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore products built by Sufyan Ahmed Ansari — TradingNexus, Financio, XchangeByte, and more.",
  alternates: { canonical: `${siteConfig.url}/projects` },
  openGraph: {
    title: `Projects | ${siteConfig.shortName}`,
    description:
      "Production-ready platforms, SaaS products, and systems in development.",
    url: `${siteConfig.url}/projects`,
  },
};

const statusStyles = {
  Live: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  "In Progress": "bg-amber-500/15 text-amber-400 border-amber-500/25",
};

export default function ProjectsPage() {
  const projects = getProjects();

  return (
    <>
      <PageHeader
        label="Work"
        title="Projects & Products"
        description="Real products built with production-grade engineering, premium UX, and scalable architecture."
      />
      <section className="pb-20 lg:pb-28">
        <Container>
          <StaggerReveal className="space-y-8">
            {projects.map((project) => (
              <StaggerItem key={project.id}>
                <GlassPanel
                  id={project.id}
                  className="scroll-mt-28 overflow-hidden p-0"
                  glow
                >
                  <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
                    <div className="border-b border-white/[0.06] p-4 lg:border-r lg:border-b-0">
                      <ProjectPreview
                        id={project.id}
                        name={project.name}
                        theme={project.theme}
                        status={project.status}
                        href={project.href}
                        logo={project.logo}
                        preview={project.preview}
                      />
                    </div>
                    <div className="flex flex-col p-6 sm:p-8">
                      <div className="mb-4 flex flex-wrap items-center gap-3">
                        <h2 className="font-display text-2xl font-semibold text-white">
                          {project.name}
                        </h2>
                        <span
                          className={cn(
                            "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase",
                            statusStyles[project.status],
                          )}
                        >
                          {project.status}
                        </span>
                      </div>
                      <p className="mb-5 text-[14px] leading-relaxed text-white/55">
                        {project.longDescription}
                      </p>
                      <ul className="mb-6 space-y-2">
                        {project.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="before:bg-primary/70 flex items-start gap-2 text-[13px] text-white/50 before:mt-2 before:size-1 before:shrink-0 before:rounded-full before:content-['']"
                          >
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <div className="mb-6 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium text-white/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-auto flex flex-wrap items-center gap-4">
                        {isExternalLink(project.href) ? (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors"
                          >
                            {project.linkLabel}
                            <ExternalLink className="size-3.5" />
                          </a>
                        ) : (
                          <Link
                            href={project.href}
                            className="text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-[13px] font-medium transition-colors"
                          >
                            {project.linkLabel}
                            <ExternalLink className="size-3.5" />
                          </Link>
                        )}
                        <Link
                          href={`${routes.projects}/${project.id}`}
                          className="inline-flex items-center gap-1 text-[13px] text-white/50 hover:text-white/80"
                        >
                          Read case study
                          <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </GlassPanel>
              </StaggerItem>
            ))}
          </StaggerReveal>
          <Reveal delay={0.2} className="mt-12 text-center">
            <Link
              href={routes.contact}
              className="text-primary hover:text-primary/80 text-[13px] font-medium transition-colors"
            >
              Have a project in mind? Get in touch →
            </Link>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
