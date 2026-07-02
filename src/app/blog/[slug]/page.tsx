import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { Clock } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { mdxComponents } from "@/components/blog/mdx-components";
import { PostToc } from "@/components/blog/post-toc";
import { Container } from "@/components/ui/container";
import { GlassPanel } from "@/components/ui/glass";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/config/site";
import { extractToc, getAllPosts, getPostBySlug } from "@/lib/content/blog";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${siteConfig.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const toc = extractToc(post.content);

  return (
    <>
      <PageHeader
        label="Blog"
        title={post.title}
        description={post.description}
      />
      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="mb-8 flex flex-wrap items-center gap-4 text-[12px] text-white/40">
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-3.5" />
              {post.readingTime}
            </span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
            <Reveal>
              <GlassPanel className="p-6 sm:p-10">
                <article className="prose-invert max-w-none">
                  <MDXRemote
                    source={post.content}
                    components={mdxComponents}
                    options={{
                      mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [
                          rehypeSlug,
                          [rehypePrettyCode, { theme: "github-dark" }],
                        ],
                      },
                    }}
                  />
                </article>
              </GlassPanel>
            </Reveal>
            <Reveal delay={0.1} className="hidden lg:block">
              <div className="sticky top-28">
                <PostToc items={toc} />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
