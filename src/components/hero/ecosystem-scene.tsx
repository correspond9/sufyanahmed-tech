"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Billboard, Html, Sparkles } from "@react-three/drei";
import {
  Brain,
  Cloud,
  GitBranch,
  Layers,
  RefreshCw,
  TrendingUp,
  Wallet,
} from "lucide-react";
import * as THREE from "three";
import type { Group, Mesh } from "three";
import { heroContent } from "@/constants/content";

const ORBITAL_RINGS = [
  {
    radius: 1.35,
    tiltX: 1.15,
    tiltY: 0.2,
    speed: 0.28,
    color: "#4F8CFF",
  },
  {
    radius: 1.8,
    tiltX: 0.95,
    tiltY: -0.45,
    speed: -0.2,
    color: "#6D5DF6",
  },
  {
    radius: 2.2,
    tiltX: 1.35,
    tiltY: 0.55,
    speed: 0.14,
    color: "#4F8CFF",
  },
] as const;

const iconMap = {
  trending: TrendingUp,
  wallet: Wallet,
  exchange: RefreshCw,
  brain: Brain,
  git: GitBranch,
  layers: Layers,
  cloud: Cloud,
} as const;

function getOrbitPosition(
  ring: (typeof ORBITAL_RINGS)[number],
  baseAngle: number,
  time: number,
  floatOffset: number,
) {
  const theta = baseAngle + time * ring.speed;
  const local = new THREE.Vector3(
    ring.radius * Math.cos(theta),
    Math.sin(time * 1.35 + floatOffset) * 0.08,
    ring.radius * Math.sin(theta),
  );
  const rotation = new THREE.Euler(ring.tiltX, ring.tiltY, 0, "YXZ");
  local.applyEuler(rotation);
  return local;
}

function Atmosphere() {
  return (
    <>
      <Sparkles
        count={90}
        scale={[6, 5, 6]}
        size={2.2}
        speed={0.22}
        opacity={0.45}
        color="#6D9FFF"
      />
      <Sparkles
        count={40}
        scale={[4.5, 3.5, 4.5]}
        size={3.5}
        speed={0.12}
        opacity={0.2}
        color="#6D5DF6"
      />
    </>
  );
}

function OrbitalRings() {
  const ringsRef = useRef<Group>(null);

  useFrame((state) => {
    if (!ringsRef.current) return;
    ringsRef.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <group ref={ringsRef}>
      {ORBITAL_RINGS.map((ring, index) => (
        <group
          key={ring.radius}
          rotation={[ring.tiltX, ring.tiltY, index * 0.35]}
        >
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[ring.radius, 0.006, 12, 160]} />
            <meshBasicMaterial color={ring.color} transparent opacity={0.18} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[ring.radius, 0.018, 8, 160]} />
            <meshBasicMaterial color={ring.color} transparent opacity={0.04} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function CoreOrb() {
  const coreRef = useRef<Group>(null);
  const horizonRef = useRef<Mesh>(null);
  const wireRef = useRef<Mesh>(null);
  const glowRef = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.12;
    }
    if (horizonRef.current) {
      horizonRef.current.rotation.z = -t * 0.35;
      const pulse = 1 + Math.sin(t * 1.1) * 0.035;
      horizonRef.current.scale.setScalar(pulse);
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.18;
      wireRef.current.rotation.y = t * 0.24;
    }
    if (glowRef.current) {
      const breathe = 1 + Math.sin(t * 0.9) * 0.06;
      glowRef.current.scale.setScalar(breathe);
    }
  });

  return (
    <group ref={coreRef}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.15, 32, 32]} />
        <meshBasicMaterial
          color="#4F8CFF"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.52, 64, 64]} />
        <meshPhysicalMaterial
          color="#060d1a"
          emissive="#1a3a6e"
          emissiveIntensity={0.35}
          roughness={0.15}
          metalness={0.85}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      <mesh ref={wireRef}>
        <icosahedronGeometry args={[0.68, 1]} />
        <meshBasicMaterial
          color="#4F8CFF"
          wireframe
          transparent
          opacity={0.14}
        />
      </mesh>

      <mesh ref={horizonRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.82, 0.028, 16, 120]} />
        <meshStandardMaterial
          color="#4F8CFF"
          emissive="#4F8CFF"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.4}
          transparent
          opacity={0.85}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.82, 0.06, 8, 120]} />
        <meshBasicMaterial
          color="#6D5DF6"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function OrbitLinks() {
  const lineRef = useRef<THREE.LineSegments>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(heroContent.ecosystemNodes.length * 6);
    return positions;
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    const attr = lineRef.current.geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;
    const time = state.clock.elapsedTime;

    heroContent.ecosystemNodes.forEach((node, index) => {
      const ring = ORBITAL_RINGS[node.ring];
      const baseAngle = (node.angle * Math.PI) / 180;
      const pos = getOrbitPosition(ring, baseAngle, time, index * 1.7);
      const offset = index * 6;
      attr.array[offset] = 0;
      attr.array[offset + 1] = 0;
      attr.array[offset + 2] = 0;
      attr.array[offset + 3] = pos.x;
      attr.array[offset + 4] = pos.y;
      attr.array[offset + 5] = pos.z;
    });

    attr.needsUpdate = true;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[geometry, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#4F8CFF" transparent opacity={0.12} />
    </lineSegments>
  );
}

function EcosystemNode({
  node,
  floatOffset,
}: {
  node: (typeof heroContent.ecosystemNodes)[number];
  floatOffset: number;
}) {
  const groupRef = useRef<Group>(null);
  const ring = ORBITAL_RINGS[node.ring];
  const baseAngle = useMemo(() => (node.angle * Math.PI) / 180, [node.angle]);
  const Icon = iconMap[node.icon];

  useFrame((state) => {
    if (!groupRef.current) return;
    const pos = getOrbitPosition(
      ring,
      baseAngle,
      state.clock.elapsedTime,
      floatOffset,
    );
    groupRef.current.position.copy(pos);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <boxGeometry args={[0.42, 0.22, 0.03]} />
        <meshPhysicalMaterial
          color="#0c1424"
          emissive="#4F8CFF"
          emissiveIntensity={0.12}
          roughness={0.25}
          metalness={0.55}
          transparent
          opacity={0.75}
        />
      </mesh>

      <Billboard follow>
        <Html
          center
          distanceFactor={6.8}
          className="pointer-events-none select-none"
          zIndexRange={[40, 0]}
        >
          <div className="flex min-w-[132px] items-center gap-2.5 rounded-xl border border-white/14 bg-[#020617]/92 px-3 py-2 shadow-[0_0_28px_-4px_rgba(79,140,255,0.45),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-xl">
            <div className="from-primary/35 to-purple/25 flex size-8 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-gradient-to-br shadow-[0_0_16px_rgba(79,140,255,0.25)]">
              <Icon className="text-primary size-4" strokeWidth={2} />
            </div>
            <div className="text-left">
              <p className="text-[11px] leading-tight font-semibold text-white/92">
                {node.label}
              </p>
              <p className="text-[9px] leading-tight text-white/48">
                {node.subtitle}
              </p>
            </div>
          </div>
        </Html>
      </Billboard>
    </group>
  );
}

export function EcosystemScene() {
  const rigRef = useRef<Group>(null);

  useFrame((state) => {
    if (!rigRef.current) return;
    const t = state.clock.elapsedTime;
    rigRef.current.rotation.y = Math.sin(t * 0.08) * 0.07;
    rigRef.current.rotation.x = Math.sin(t * 0.11) * 0.035 + 0.03;
  });

  return (
    <group ref={rigRef}>
      <ambientLight intensity={0.28} />
      <pointLight position={[5, 4, 5]} color="#4F8CFF" intensity={4} />
      <pointLight position={[-4, -2, 4]} color="#6D5DF6" intensity={2} />
      <pointLight position={[0, -3, 2]} color="#4F8CFF" intensity={1.2} />
      <spotLight
        position={[0, 6, 0]}
        angle={0.45}
        penumbra={1}
        intensity={0.6}
        color="#4F8CFF"
      />

      <Atmosphere />
      <OrbitalRings />
      <OrbitLinks />
      <CoreOrb />

      {heroContent.ecosystemNodes.map((node, index) => (
        <EcosystemNode key={node.label} node={node} floatOffset={index * 1.7} />
      ))}
    </group>
  );
}
