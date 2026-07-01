interface ProjectMockupProps {
  name: string;
  accent: string;
  gradient: string;
}

export function ProjectMockup({ name, accent, gradient }: ProjectMockupProps) {
  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-gradient-to-br ${gradient}`}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.06),transparent_60%)]" />

      <div className="absolute inset-3 flex flex-col overflow-hidden rounded-md border border-white/[0.08] bg-[#0A0F1F]/80 backdrop-blur-sm">
        <div className="flex items-center gap-1.5 border-b border-white/[0.06] px-3 py-2">
          <span className="size-2 rounded-full bg-[#ff5f57]/80" />
          <span className="size-2 rounded-full bg-[#febc2e]/80" />
          <span className="size-2 rounded-full bg-[#28c840]/80" />
          <span className="text-muted-foreground/60 ml-2 font-mono text-[9px]">
            {name.toLowerCase()}
          </span>
        </div>

        <div className="flex flex-1 gap-2 p-3">
          <div className="w-1/4 space-y-1.5">
            <div className="h-1.5 w-full rounded-full bg-white/[0.08]" />
            <div className="h-1.5 w-3/4 rounded-full bg-white/[0.06]" />
            <div className="h-1.5 w-5/6 rounded-full bg-white/[0.06]" />
            <div className="mt-3 h-1.5 w-full rounded-full bg-white/[0.05]" />
            <div className="h-1.5 w-2/3 rounded-full bg-white/[0.05]" />
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <div className="flex gap-2">
              <div
                className="h-8 flex-1 rounded-md opacity-80"
                style={{ background: `${accent}22` }}
              />
              <div className="h-8 w-1/4 rounded-md bg-white/[0.05]" />
            </div>
            <div className="flex-1 rounded-md border border-white/[0.04] bg-white/[0.02] p-2">
              <svg
                viewBox="0 0 200 60"
                className="h-full w-full"
                preserveAspectRatio="none"
              >
                <polyline
                  points="0,50 30,35 60,42 90,20 120,28 150,12 180,18 200,8"
                  fill="none"
                  stroke={accent}
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                />
                <polyline
                  points="0,50 30,35 60,42 90,20 120,28 150,12 180,18 200,8 200,60 0,60"
                  fill={accent}
                  fillOpacity="0.08"
                />
              </svg>
            </div>
            <div className="flex gap-2">
              <div className="h-4 w-1/3 rounded bg-white/[0.06]" />
              <div className="h-4 w-1/4 rounded bg-white/[0.04]" />
              <div className="h-4 w-1/5 rounded bg-white/[0.04]" />
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute -right-6 -bottom-6 size-32 rounded-full blur-3xl"
        style={{ background: `${accent}18` }}
      />
    </div>
  );
}
