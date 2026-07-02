import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { BlogCard } from "@/components/blog/blog-card";
import { Container } from "@/components/ui/container";
import { Reveal, StaggerReveal, StaggerItem } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { getAllPosts, getAllTags } from "@/lib/content/blog";
import { routes } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Engineering notes, product thinking, and lessons from building TradingNexus, Financio, and more.",
  alternates: { canonical: `${siteConfig.url}/blog` },
};

interface BlogPageProps {
  searchParams: Promise<{ tag?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { tag } = await searchParams;
  const allPosts = getAllPosts();
  const tags = getAllTags();
  const posts = tag ? allPosts.filter((p) => p.tags.includes(tag)) : allPosts;

  return (
    <>
      <PageHeader
        label="Blog"
        title="Engineering & Product Notes"
        description="Thoughts on building production software, FinTech platforms, and AI-assisted development workflows."
      />
      <section className="pb-20 lg:pb-28">
        <Container>
          {tags.length > 0 && (
            <Reveal className="mb-8 flex flex-wrap gap-2">
              <Link
                href={routes.blog}
                className={cn(
                  "rounded-full border px-3 py-1 text-[12px] font-medium transition-colors",
                  !tag
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-white/[0.08] text-white/50 hover:text-white/80",
                )}
              >
                All
              </Link>
              {tags.map((t) => (
                <Link
                  key={t}
                  href={`${routes.blog}?tag=${t}`}
                  className={cn(
                    "rounded-full border px-3 py-1 text-[12px] font-medium transition-colors",
                    tag === t
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-white/[0.08] text-white/50 hover:text-white/80",
                  )}
                >
                  {t}
                </Link>
              ))}
            </Reveal>
          )}
          <StaggerReveal className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <StaggerItem key={post.slug}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerReveal>
          {posts.length === 0 && (
            <p className="text-center text-[14px] text-white/50">
              No posts found for this tag.
            </p>
          )}
        </Container>
      </section>
    </>
  );
}
