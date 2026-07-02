import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => {
    const id = String(children)
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    return (
      <h2
        id={id}
        className="font-display mt-10 mb-4 text-2xl font-semibold text-white"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = String(children)
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    return (
      <h3
        id={id}
        className="font-display mt-8 mb-3 text-xl font-semibold text-white"
      >
        {children}
      </h3>
    );
  },
  p: ({ children }) => (
    <p className="mb-4 text-[15px] leading-relaxed text-white/60">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="mb-4 list-disc space-y-2 pl-5 text-[15px] text-white/60">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-decimal space-y-2 pl-5 text-[15px] text-white/60">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => (
    <Link
      href={href ?? "#"}
      className="text-primary hover:text-primary/80 underline-offset-2 hover:underline"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </Link>
  ),
  table: ({ children }) => (
    <div className="mb-6 overflow-x-auto rounded-xl border border-white/[0.08]">
      <table className="w-full text-left text-[13px] text-white/60">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-white/[0.08] bg-white/[0.04] px-4 py-2 font-semibold text-white/80">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-white/[0.06] px-4 py-2">{children}</td>
  ),
  pre: ({ children }) => (
    <pre className="mb-6 overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0a0f1f] p-4 text-[13px]">
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="text-primary/90 rounded bg-white/[0.06] px-1.5 py-0.5 text-[13px]">
      {children}
    </code>
  ),
};
