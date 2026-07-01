"use client";

import { Canvas } from "@react-three/fiber";
import { cn } from "@/lib/utils";
import { HeroArchitectureScene } from "@/components/hero/hero-architecture-scene";
import {
  HeroSceneForegroundLight,
  HeroVisualEffects,
} from "@/components/hero/hero-visual-effects";

interface HeroSceneCanvasProps {
  className?: string;
}

export function HeroSceneCanvas({ className }: HeroSceneCanvasProps) {
  return (
    <div
      className={cn(
        "relative h-full min-h-[320px] w-full lg:min-h-0",
        className,
      )}
      aria-hidden
    >
      <HeroVisualEffects />

      {/* Layer 5 — 3D architecture visualization */}
      <Canvas
        className="relative z-[1]"
        camera={{ position: [0, 0.3, 5.2], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <HeroArchitectureScene />
      </Canvas>

      {/* Layer 6 — foreground lighting */}
      <HeroSceneForegroundLight />

      {/* Floating gradient orbs */}
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="bg-primary/15 absolute -top-8 right-1/4 size-40 rounded-full blur-3xl motion-safe:animate-[float_14s_ease-in-out_infinite]" />
        <div className="bg-purple/10 absolute bottom-1/4 left-1/4 size-28 rounded-full blur-2xl motion-safe:animate-[float_18s_ease-in-out_infinite_reverse]" />
      </div>
    </div>
  );
}
