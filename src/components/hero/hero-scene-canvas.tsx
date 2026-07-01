"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group, InstancedMesh } from "three";
import * as THREE from "three";
import { cn } from "@/lib/utils";
import { HeroVisualEffects } from "@/components/hero/hero-visual-effects";

const PARTICLE_COUNT = 48;
const ORBIT_RADIUS = 2.2;

function SceneContent() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.15} />
      <pointLight position={[4, 3, 4]} color="#4F8CFF" intensity={2.5} />
      <pointLight position={[-4, -2, 3]} color="#6D5DF6" intensity={1.2} />
      <directionalLight position={[0, 5, 2]} color="#4F8CFF" intensity={0.4} />

      <mesh>
        <sphereGeometry args={[1.15, 48, 48]} />
        <meshStandardMaterial
          color="#0A0F1F"
          roughness={0.85}
          metalness={0.15}
          emissive="#111827"
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh>
        <icosahedronGeometry args={[1.5, 3]} />
        <meshBasicMaterial
          color="#4F8CFF"
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>

      <OrbitingParticles />
    </group>
  );
}

function OrbitingParticles() {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
      const angle = (index / PARTICLE_COUNT) * Math.PI * 2;
      const layer = index % 3;
      const radius = ORBIT_RADIUS + layer * 0.25;
      const y = Math.sin(angle * 3) * 0.4 + (layer - 1) * 0.3;

      return {
        radius,
        angle,
        y,
        speed: 0.3 + (index % 5) * 0.05,
        scale: 0.03 + (index % 4) * 0.01,
      };
    });
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    particles.forEach((particle, index) => {
      const currentAngle = particle.angle + time * particle.speed * 0.15;
      dummy.position.set(
        Math.cos(currentAngle) * particle.radius,
        particle.y + Math.sin(time * 0.5 + index) * 0.1,
        Math.sin(currentAngle) * particle.radius,
      );
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(index, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#4F8CFF"
        emissive="#4F8CFF"
        emissiveIntensity={1.5}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

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
      <Canvas
        className="relative z-[1]"
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
