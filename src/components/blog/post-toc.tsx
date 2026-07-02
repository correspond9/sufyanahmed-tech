import type { TocItem } from "@/lib/content/types";
import { GlassPanel } from "@/components/ui/glass";

interface PostTocProps {
  items: TocItem[];
}

export function PostToc({ items }: PostTocProps) {
  if (items.length === 0) return null;

  return (
    <GlassPanel className="p-5">
      <p className="mb-3 text-[11px] font-semibold tracking-wide text-white/50 uppercase">
        On this page
      </p>
      <nav aria-label="Table of contents">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? "pl-3" : undefined}>
              <a
                href={`#${item.id}`}
                className="hover:text-primary text-[13px] text-white/50 transition-colors"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </GlassPanel>
  );
}
