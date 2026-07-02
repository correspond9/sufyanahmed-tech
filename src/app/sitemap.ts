import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { getAllPosts } from "@/lib/content/blog";
import { getProjectSlugs } from "@/lib/content/projects";
import { routes } from "@/lib/navigation";

const staticPages = [
  { path: routes.home, priority: 1, changeFrequency: "monthly" as const },
  { path: routes.projects, priority: 0.9, changeFrequency: "monthly" as const },
  { path: routes.blog, priority: 0.85, changeFrequency: "weekly" as const },
  {
    path: routes.certifications,
    priority: 0.7,
    changeFrequency: "yearly" as const,
  },
  { path: routes.contact, priority: 0.8, changeFrequency: "monthly" as const },
  { path: routes.privacy, priority: 0.3, changeFrequency: "yearly" as const },
  { path: routes.terms, priority: 0.3, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries = staticPages.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${siteConfig.url}${path === routes.home ? "" : path}`,
      lastModified,
      changeFrequency,
      priority,
    }),
  );

  const projectEntries = getProjectSlugs().map((slug) => ({
    url: `${siteConfig.url}/projects/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const blogEntries = getAllPosts().map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticEntries, ...projectEntries, ...blogEntries];
}
