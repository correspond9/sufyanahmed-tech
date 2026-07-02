"use client";

import { Canvas } from "@react-three/fiber";
import { EcosystemScene } from "@/components/hero/ecosystem-scene";

export function EcosystemCanvas() {
  return (
    <div className="hero-orbit-stage absolute inset-0 overflow-hidden px-3 sm:px-5">
      <div className="hero-orbit-halo pointer-events-none absolute top-1/2 left-1/2 size-[min(100%,520px)] -translate-x-1/2 -translate-y-1/2" />
      <div className="hero-orbit-leak pointer-events-none absolute top-[8%] right-[4%] size-48" />
      <div className="hero-orbit-leak-secondary pointer-events-none absolute bottom-[18%] left-[8%] size-36" />

      <Canvas
        className="relative z-[1] h-full w-full"
        camera={{ position: [0, 0.15, 9.4], fov: 32 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <EcosystemScene />
      </Canvas>
    </div>
  );
}
