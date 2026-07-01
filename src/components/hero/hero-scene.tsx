"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const HeroSceneCanvas = dynamic(
  () =>
    import("@/components/hero/hero-scene-canvas").then(
      (mod) => mod.HeroSceneCanvas,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="bg-surface/30 relative h-full min-h-[320px] w-full animate-pulse lg:min-h-0"
        aria-hidden
      />
    ),
  },
);

interface HeroSceneProps {
  className?: string;
}

export function HeroScene({ className }: HeroSceneProps) {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <HeroSceneCanvas className="h-full w-full" />
    </div>
  );
}
