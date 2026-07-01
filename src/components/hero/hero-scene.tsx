"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { SceneErrorBoundary } from "@/components/hero/scene-error-boundary";

function SceneFallback() {
  return (
    <div
      className="relative flex h-full min-h-[380px] w-full items-center justify-center sm:min-h-[440px] lg:min-h-[520px]"
      aria-hidden
    >
      <div className="hero-scene-glow absolute inset-0" />
      <div className="bg-grid-fine absolute inset-0 opacity-40" />
      <div className="border-primary/20 relative size-48 rounded-full border">
        <div className="bg-primary/30 absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full shadow-[0_0_20px_rgba(79,140,255,0.6)]" />
        <div className="border-primary/15 absolute top-1/2 left-1/2 size-32 -translate-x-1/2 -translate-y-1/2 rounded-full border" />
        <div className="border-primary/10 absolute top-1/2 left-1/2 size-44 -translate-x-1/2 -translate-y-1/2 rounded-full border" />
      </div>
    </div>
  );
}

const HeroSceneCanvas = dynamic(
  () =>
    import("@/components/hero/hero-scene-canvas").then(
      (mod) => mod.HeroSceneCanvas,
    ),
  {
    ssr: false,
    loading: () => <SceneFallback />,
  },
);

interface HeroSceneProps {
  className?: string;
}

export function HeroScene({ className }: HeroSceneProps) {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <SceneErrorBoundary fallback={<SceneFallback />}>
        <HeroSceneCanvas className="h-full w-full" />
      </SceneErrorBoundary>
    </div>
  );
}
