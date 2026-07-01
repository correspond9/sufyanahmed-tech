"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Grid } from "@react-three/drei";
import type { Group, InstancedMesh } from "three";
import * as THREE from "three";

const CORE_COLOR = "#0A0F1F";
const EDGE_COLOR = "#4F8CFF";
const NODE_COLOR = "#111827";
const ACCENT_COLOR = "#6D5DF6";

interface NetworkNode {
  position: [number, number, number];
  scale: number;
  isCore?: boolean;
}

const NETWORK_NODES: NetworkNode[] = [
  { position: [0, 0, 0], scale: 0.38, isCore: true },
  { position: [1.55, 0.35, 0.25], scale: 0.11 },
  { position: [-1.35, 0.55, -0.2], scale: 0.11 },
  { position: [0.45, 1.15, 0.95], scale: 0.09 },
  { position: [-0.75, -0.45, 1.15], scale: 0.09 },
  { position: [1.05, -0.7, -0.95], scale: 0.09 },
  { position: [-1.15, -0.25, 0.75], scale: 0.09 },
  { position: [0.2, -1.0, -0.6], scale: 0.08 },
];

const CROSS_LINKS: [number, number][] = [
  [1, 3],
  [2, 6],
  [4, 5],
  [3, 4],
];

const PACKET_COUNT = 16;

function getSegmentEndpoints(
  from: THREE.Vector3,
  to: THREE.Vector3,
): [THREE.Vector3, THREE.Vector3] {
  return [from.clone(), to.clone()];
}

function NetworkLines() {
  const linePositions = useMemo(() => {
    const core = new THREE.Vector3(...NETWORK_NODES[0].position);
    const positions: number[] = [];

    NETWORK_NODES.slice(1).forEach((node) => {
      const target = new THREE.Vector3(...node.position);
      positions.push(core.x, core.y, core.z, target.x, target.y, target.z);
    });

    CROSS_LINKS.forEach(([a, b]) => {
      const from = new THREE.Vector3(...NETWORK_NODES[a].position);
      const to = new THREE.Vector3(...NETWORK_NODES[b].position);
      positions.push(from.x, from.y, from.z, to.x, to.y, to.z);
    });

    return new Float32Array(positions);
  }, []);

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[linePositions, 3]}
          count={linePositions.length / 3}
        />
      </bufferGeometry>
      <lineBasicMaterial color={EDGE_COLOR} transparent opacity={0.22} />
    </lineSegments>
  );
}

function NetworkNodes() {
  return (
    <>
      {NETWORK_NODES.map((node, index) => (
        <mesh key={index} position={node.position}>
          {node.isCore ? (
            <boxGeometry
              args={[node.scale * 2, node.scale * 2, node.scale * 2]}
            />
          ) : (
            <boxGeometry args={[node.scale, node.scale, node.scale]} />
          )}
          <meshStandardMaterial
            color={node.isCore ? CORE_COLOR : NODE_COLOR}
            emissive={node.isCore ? EDGE_COLOR : ACCENT_COLOR}
            emissiveIntensity={node.isCore ? 0.35 : 0.15}
            roughness={0.6}
            metalness={0.4}
          />
        </mesh>
      ))}

      <mesh position={NETWORK_NODES[0].position}>
        <boxGeometry
          args={[
            NETWORK_NODES[0].scale * 2.15,
            NETWORK_NODES[0].scale * 2.15,
            NETWORK_NODES[0].scale * 2.15,
          ]}
        />
        <meshBasicMaterial
          color={EDGE_COLOR}
          wireframe
          transparent
          opacity={0.18}
        />
      </mesh>
    </>
  );
}

function InfrastructureRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <group position={[0, -0.15, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <mesh ref={ringRef}>
        <torusGeometry args={[2.1, 0.004, 8, 80]} />
        <meshBasicMaterial color={EDGE_COLOR} transparent opacity={0.15} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.6, 0.003, 8, 64]} />
        <meshBasicMaterial color={ACCENT_COLOR} transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function DataFlowPackets() {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const segments = useMemo(() => {
    const core = new THREE.Vector3(...NETWORK_NODES[0].position);
    const result: [THREE.Vector3, THREE.Vector3][] = [];

    NETWORK_NODES.slice(1).forEach((node) => {
      result.push(
        getSegmentEndpoints(core, new THREE.Vector3(...node.position)),
      );
    });

    CROSS_LINKS.forEach(([a, b]) => {
      result.push(
        getSegmentEndpoints(
          new THREE.Vector3(...NETWORK_NODES[a].position),
          new THREE.Vector3(...NETWORK_NODES[b].position),
        ),
      );
    });

    return result;
  }, []);

  const packetConfig = useMemo(() => {
    return Array.from({ length: PACKET_COUNT }, (_, index) => ({
      segmentIndex: index % segments.length,
      speed: 0.15 + (index % 4) * 0.04,
      offset: (index / PACKET_COUNT) * 0.8,
    }));
  }, [segments.length]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.elapsedTime;

    packetConfig.forEach((packet, index) => {
      const [from, to] = segments[packet.segmentIndex];
      const t = (time * packet.speed + packet.offset) % 1;
      dummy.position.lerpVectors(from, to, t);
      dummy.scale.setScalar(0.025 + (index % 3) * 0.008);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(index, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PACKET_COUNT]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color={EDGE_COLOR}
        emissive={EDGE_COLOR}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </instancedMesh>
  );
}

export function HeroArchitectureScene() {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.15) * 0.04;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.12} />
      <pointLight position={[3, 4, 4]} color={EDGE_COLOR} intensity={2.2} />
      <pointLight position={[-3, -1, 3]} color={ACCENT_COLOR} intensity={1} />
      <directionalLight
        position={[0, 6, 2]}
        color={EDGE_COLOR}
        intensity={0.35}
      />

      <Grid
        infiniteGrid
        fadeDistance={7}
        fadeStrength={1.5}
        cellSize={0.35}
        sectionSize={1.75}
        sectionColor={EDGE_COLOR}
        cellColor="#1a2332"
        sectionThickness={0.6}
        cellThickness={0.4}
        position={[0, -1.35, 0]}
        args={[10, 10]}
      />

      <InfrastructureRing />
      <NetworkLines />
      <NetworkNodes />
      <DataFlowPackets />
    </group>
  );
}
