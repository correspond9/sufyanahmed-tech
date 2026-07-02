import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import { projectsContent } from "@/constants/content";
import { Container } from "@/components/ui/container";
import { GlassPanel, SectionTitle } from "@/components/ui/glass";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { ProjectPreview } from "@/components/sections/project-preview";

const statusStyles = {
  Live: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  "In Progress": "bg-amber-500/15 text-amber-400 border-amber-500/25",
};

export function ProjectsSection() {
  return (
    <section id={projectsContent.id} className="relative py-20 lg:py-28">
      <div
        className="section-glow-divider absolute inset-x-0 top-0"
        aria-hidden
      />
      <Container>
        <div className="mb-12 flex items-end justify-between gap-4">
          <Reveal>
            <SectionTitle>{projectsContent.title}</SectionTitle>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href={projectsContent.viewAll.href}
              className="text-primary/80 hover:text-primary hidden items-center gap-1.5 text-[13px] font-medium transition-colors sm:inline-flex"
            >
              {projectsContent.viewAll.label}
              <ArrowRight className="size-3.5" />
            </Link>
          </Reveal>
        </div>

        <StaggerReveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectsContent.items.map((project) => (
            <StaggerItem key={project.id}>
              <GlassPanel
                className="group flex h-full flex-col overflow-hidden p-0"
                glow
              >
                <div className="p-3 pb-0">
                  <ProjectPreview
                    name={project.name}
                    theme={project.theme}
                    status={project.status}
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 pt-4">
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold text-white">
                      {project.name}
                    </h3>
                    <span
                      className={cn(
                        "shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase",
                        statusStyles[project.status],
                      )}
                    >
                      {project.status}
                    </span>
                  </div>
                  <p className="mb-4 flex-1 text-[13px] leading-relaxed text-white/50">
                    {project.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-[10px] font-medium text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={project.href}
                    className="text-primary group-hover:text-primary/80 inline-flex items-center gap-1.5 text-[12px] font-medium transition-colors"
                  >
                    {project.linkLabel}
                    <ExternalLink className="size-3" />
                  </Link>
                </div>
              </GlassPanel>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
