import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projectsContent } from "@/constants/content";
import { Section } from "@/components/ui/section";
import {
  SectionHeader,
  StaggerReveal,
  StaggerItem,
} from "@/components/ui/reveal";
import { ProjectMockup } from "@/components/sections/project-mockup";
import { cn } from "@/lib/utils";

const statusStyles: Record<string, string> = {
  Production: "text-emerald-400 border-emerald-400/20 bg-emerald-400/10",
  "In Progress": "text-amber-400 border-amber-400/20 bg-amber-400/10",
};

export function ProjectsSection() {
  return (
    <Section id={projectsContent.id} spacing="lg" className="relative">
      <div className="section-divider absolute inset-x-0 top-0" aria-hidden />
      <SectionHeader
        eyebrow={projectsContent.eyebrow}
        title={projectsContent.title}
        description={projectsContent.description}
      />

      <StaggerReveal className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        {projectsContent.projects.map((project) => (
          <StaggerItem key={project.id}>
            <article className="glass-card group flex h-full flex-col overflow-hidden rounded-2xl">
              <div className="p-4 pb-0">
                <ProjectMockup
                  name={project.name}
                  accent={project.accent}
                  gradient={project.gradient}
                />
              </div>

              <div className="flex flex-1 flex-col p-6 pt-5">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-foreground text-xl font-semibold">
                      {project.name}
                    </h3>
                    <p className="text-primary/80 text-sm">{project.tagline}</p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
                      statusStyles[project.status] ?? "",
                    )}
                  >
                    {project.status}
                  </span>
                </div>

                <p className="text-muted-foreground/90 mb-5 flex-1 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-muted-foreground rounded-md border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={project.href}
                  className="text-primary hover:text-primary/80 inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                >
                  Discuss this project
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </Section>
  );
}
