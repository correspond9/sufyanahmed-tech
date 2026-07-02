import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectPreviewProps {
  id: string;
  name: string;
  theme: "dark" | "light";
  status: string;
  href?: string;
  logo?: string;
  preview?: string;
}

function getHostname(href?: string) {
  if (!href) return null;

  try {
    return new URL(href).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

export function ProjectPreview({
  id,
  name,
  theme,
  status,
  href,
  logo,
  preview,
}: ProjectPreviewProps) {
  const isLight = theme === "light";
  const hostname = getHostname(href) ?? name.toLowerCase();
  const hasMedia = Boolean(logo && preview);

  if (!hasMedia) {
    return <LegacyProjectPreview name={name} theme={theme} status={status} />;
  }

  return (
    <div
      className={cn(
        "relative flex aspect-[16/10] flex-col overflow-hidden rounded-xl border",
        isLight
          ? "border-white/10 bg-[#f8fafc]"
          : "border-white/[0.06] bg-[#0c1222]",
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b px-3 py-2",
          isLight
            ? "border-black/5 bg-white/80"
            : "border-white/5 bg-[#0a1020]/90",
        )}
      >
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-red-400/80" />
          <span className="size-2 rounded-full bg-yellow-400/80" />
          <span className="size-2 rounded-full bg-green-400/80" />
        </div>
        <div
          className={cn(
            "flex min-w-0 flex-1 items-center gap-2 rounded-md border px-2 py-1",
            isLight
              ? "border-slate-200 bg-slate-50"
              : "border-white/8 bg-white/[0.04]",
          )}
        >
          <div className="relative size-4 shrink-0 overflow-hidden rounded-sm">
            <Image
              src={logo!}
              alt=""
              fill
              className="object-contain"
              sizes="16px"
            />
          </div>
          <span
            className={cn(
              "truncate font-mono text-[9px]",
              isLight ? "text-slate-500" : "text-white/45",
            )}
          >
            {hostname}
          </span>
        </div>
      </div>

      <div className="relative min-h-0 flex-1">
        <Image
          src={preview!}
          alt={`${name} website preview`}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
          priority={id === "financio"}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t to-transparent",
            isLight ? "from-white/80" : "from-[#0c1222]/85",
          )}
        />
      </div>
    </div>
  );
}

function LegacyProjectPreview({
  name,
  theme,
  status,
}: Pick<ProjectPreviewProps, "name" | "theme" | "status">) {
  const isLight = theme === "light";
  const isPlaceholder = status === "In Progress";

  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden rounded-xl border",
        isLight
          ? "border-white/10 bg-[#f8fafc]"
          : "border-white/[0.06] bg-[#0c1222]",
      )}
      aria-hidden
    >
      {isPlaceholder ? (
        <div className="flex h-full items-center justify-center">
          <div className="from-primary to-purple flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl font-bold text-white shadow-[0_0_40px_rgba(79,140,255,0.3)]">
            {name.charAt(0)}
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-1.5 border-b border-black/5 px-3 py-2 dark:border-white/5">
            <span className="size-2 rounded-full bg-red-400/80" />
            <span className="size-2 rounded-full bg-yellow-400/80" />
            <span className="size-2 rounded-full bg-green-400/80" />
            <span
              className={cn(
                "ml-2 font-mono text-[9px]",
                isLight ? "text-slate-400" : "text-white/30",
              )}
            >
              {name.toLowerCase()}
            </span>
          </div>
          <div className="p-3">
            <div className="mb-2 flex gap-2">
              <div
                className={cn(
                  "h-6 flex-1 rounded-md",
                  isLight ? "bg-slate-200" : "bg-white/5",
                )}
              />
              <div
                className={cn(
                  "h-6 w-1/4 rounded-md",
                  isLight ? "bg-slate-100" : "bg-white/[0.03]",
                )}
              />
            </div>
            <div
              className={cn(
                "mb-2 h-20 rounded-lg border",
                isLight
                  ? "border-slate-200 bg-white"
                  : "border-white/5 bg-white/[0.02]",
              )}
            >
              <svg
                viewBox="0 0 200 50"
                className="h-full w-full p-2"
                preserveAspectRatio="none"
              >
                <polyline
                  points="0,40 40,30 80,35 120,15 160,25 200,10"
                  fill="none"
                  stroke="#4F8CFF"
                  strokeWidth="2"
                  opacity="0.7"
                />
              </svg>
            </div>
            <div className="flex gap-2">
              <div
                className={cn(
                  "h-3 w-1/3 rounded",
                  isLight ? "bg-slate-100" : "bg-white/5",
                )}
              />
              <div
                className={cn(
                  "h-3 w-1/4 rounded",
                  isLight ? "bg-slate-100" : "bg-white/5",
                )}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
