"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const INK = "#F5F5F6";
const ACCENT = "#4D7CFF";

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

      {/*
        Lat/long wireframe rather than an icosahedron: a subdivided icosphere
        wireframes into scattered triangles that read as spiky noise, whereas
        sphereGeometry's segments give the clean meridian/parallel grid that
        actually looks like a globe.
      */}
      <mesh>
        {/* Fewer segments on the mobile/low path — same silhouette, less fill. */}
        <sphereGeometry args={[2.6, detail >= 2 ? 24 : 16, detail >= 2 ? 16 : 12]} />
        <meshBasicMaterial color={INK} wireframe transparent opacity={0.28} />
      </mesh>

      {/*
        Rings are tilted well away from edge-on. A torus viewed near its own
        plane collapses into a straight line, which just looks like a stray
        diagonal stroke across the hero.
      */}
      <mesh rotation={[1.25, 0.15, 0.35]}>
        <torusGeometry args={[3.45, 0.014, 8, 160]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>

      <mesh rotation={[1.05, -0.4, -0.25]}>
        <torusGeometry args={[3.05, 0.007, 8, 160]} />
        <meshBasicMaterial color={INK} transparent opacity={0.28} />
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
