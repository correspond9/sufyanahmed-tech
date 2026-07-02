import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/content/blog";
import { getProjects } from "@/lib/content/projects";
import { servicesContent } from "@/constants/content";

/** Plain-text knowledge base for the AI assistant system prompt. */
export function buildKnowledgeBase(): string {
  const projects = getProjects();
  const posts = getAllPosts();

  const projectSummaries = projects
    .map(
      (p) =>
        `- ${p.name} (${p.status}): ${p.description}. Stack: ${p.tags.join(", ")}. URL: ${p.href}`,
    )
    .join("\n");

  const postSummaries = posts
    .map((p) => `- ${p.title}: ${p.description}`)
    .join("\n");

  const services = servicesContent.items
    .map((s) => `- ${s.title}: ${s.description}`)
    .join("\n");

  return `
Site: ${siteConfig.shortName} (${siteConfig.url})
Owner: ${siteConfig.author.name} — ${siteConfig.author.role}
Email: ${siteConfig.author.email}
Tagline: ${siteConfig.tagline}

Projects:
${projectSummaries}

Services:
${services}

Blog posts:
${postSummaries || "No posts yet."}

Rules: Answer only from this knowledge. If unsure, suggest contacting ${siteConfig.author.email}. Never invent projects, clients, or credentials.
`.trim();
}
