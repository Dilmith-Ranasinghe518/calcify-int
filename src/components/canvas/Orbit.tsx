"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const INK = "#F5F5F6";
const ACCENT = "#E8262E";

/**
 * Wireframe globe with a red orbital ring.
 *
 * Chosen over glass/transmission deliberately: bright line work reads clearly
 * against pure black, where a refractive solid rendered as a dark silhouette.
 * It also needs no environment map, no post-processing pass, and no extra
 * scene render per frame — just three.js and R3F.
 */
function Globe({ detail }: { detail: number }) {
  const group = useRef<THREE.Group>(null);

  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // Vertex positions of the sphere, reused as glowing nodes.
  const nodes = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.6, detail);
    const pos = geo.attributes.position.array as Float32Array;
    geo.dispose();
    return new Float32Array(pos);
  }, [detail]);

  useFrame(({ clock, pointer }, delta) => {
    const g = group.current;
    if (!g || reduced) return;

    const t = clock.elapsedTime;
    g.rotation.y += delta * 0.13;
    g.rotation.x = Math.sin(t * 0.22) * 0.14;

    // Capped pointer parallax.
    g.position.x += (pointer.x * 0.32 - g.position.x) * 0.04;
    g.position.y += (pointer.y * 0.22 - g.position.y) * 0.04;
  });

  return (
    <group ref={group}>
      {/* Solid core, page-black: occludes the far side of the wireframe so
          the globe reads as a volume instead of a flat tangle of lines. */}
      <mesh>
        <sphereGeometry args={[2.54, 48, 32]} />
        <meshBasicMaterial color="#020202" />
      </mesh>

      {/* Wireframe shell */}
      <mesh>
        <icosahedronGeometry args={[2.6, detail]} />
        <meshBasicMaterial
          color={INK}
          wireframe
          transparent
          opacity={0.34}
        />
      </mesh>

      {/* Vertex nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodes, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color={INK}
          size={0.045}
          transparent
          opacity={0.85}
          sizeAttenuation
        />
      </points>

      {/* Red orbital ring, tilted off-axis */}
      <mesh rotation={[Math.PI / 2.6, 0, Math.PI / 7]}>
        <torusGeometry args={[3.5, 0.012, 8, 128]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>

      {/* Second, fainter ring the other way */}
      <mesh rotation={[Math.PI / 1.9, Math.PI / 5, 0]}>
        <torusGeometry args={[3.15, 0.006, 8, 128]} />
        <meshBasicMaterial color={INK} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

export default function Orbit({ detail = 2 }: { detail?: number }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Globe detail={detail} />
    </Canvas>
  );
}
