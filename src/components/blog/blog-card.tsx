import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/content/types";
import { GlassPanel } from "@/components/ui/glass";
import { routes } from "@/lib/navigation";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <GlassPanel className="group hover:border-primary/20 flex h-full flex-col p-6 transition-colors">
      <div className="mb-3 flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] font-medium text-white/50 uppercase"
          >
            {tag}
          </span>
        ))}
      </div>
      <h2 className="font-display mb-2 text-lg font-semibold text-white">
        <Link
          href={`${routes.blog}/${post.slug}`}
          className="hover:text-primary transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      <p className="mb-4 flex-1 text-[13px] leading-relaxed text-white/50">
        {post.description}
      </p>
      <div className="flex items-center justify-between gap-3 text-[11px] text-white/40">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </time>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3" />
          {post.readingTime}
        </span>
      </div>
      <Link
        href={`${routes.blog}/${post.slug}`}
        className="text-primary group-hover:text-primary/80 mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium"
      >
        Read article
        <ArrowRight className="size-3" />
      </Link>
    </GlassPanel>
  );
}
