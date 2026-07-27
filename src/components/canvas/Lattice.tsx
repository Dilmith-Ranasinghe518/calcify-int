"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { buildLattice, resolveMorph, type StateKey } from "@/lib/latticeGeometry";
import { useLatticeScroll } from "@/lib/useLatticeScroll";

const SIGNAL = new THREE.Color("#5B6EF5");
const PULSE = new THREE.Color("#3FE0D0");

/**
 * Edge strength per state. The pairs are fixed, so in the unstructured cloud
 * they cross at random and read as noise — keeping them near-invisible there
 * lets the network visibly "resolve" as the nodes find their order.
 */
const EDGE_OPACITY: Record<string, number> = {
  cloud: 0.04,
  sphere: 0.13,
  grid: 0.2,
  converge: 0.3,
};

/* ------------------------------------------------------------------ *
 * Shaders
 * Points are drawn as soft radial glows rather than PointsMaterial's
 * hard squares, and edges fade with depth so the far side of the
 * structure recedes instead of flattening into noise.
 * ------------------------------------------------------------------ */

const pointVertex = /* glsl */ `
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aScale;
  varying float vDepth;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    // Size attenuation, clamped so near points don't balloon.
    gl_PointSize = uSize * aScale * uPixelRatio * (12.0 / -mv.z);
    vDepth = -mv.z;
  }
`;

const pointFragment = /* glsl */ `
  uniform vec3 uColor;
  varying float vDepth;

  void main() {
    // Radial falloff -> soft round dot with a hot core.
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float glow = pow(1.0 - d * 2.0, 2.2);
    float fade = smoothstep(46.0, 10.0, vDepth);
    gl_FragColor = vec4(uColor, glow * fade);
  }
`;

const lineVertex = /* glsl */ `
  varying float vDepth;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vDepth = -mv.z;
  }
`;

const lineFragment = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vDepth;
  void main() {
    float fade = smoothstep(44.0, 12.0, vDepth);
    gl_FragColor = vec4(uColor, uOpacity * fade);
  }
`;

/* ------------------------------------------------------------------ */

function LatticeMesh({ dim }: { dim: number }) {
  const states = useMemo(() => buildLattice(dim), [dim]);
  const progress = useLatticeScroll();

  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Live buffers, mutated in place each frame — no per-frame allocation.
  const { positions, linePositions, scales } = useMemo(() => {
    const positions = new Float32Array(states.count * 3);
    positions.set(states.cloud);
    const linePositions = new Float32Array(states.edges.length * 3);
    const scales = new Float32Array(states.count);
    for (let i = 0; i < states.count; i++) {
      // Slight per-node size variation so it reads organic, not printed.
      scales[i] = 0.65 + ((i * 37) % 100) / 100 * 0.7;
    }
    return { positions, linePositions, scales };
  }, [states]);

  const pointUniforms = useMemo(
    () => ({
      uColor: { value: SIGNAL.clone() },
      uSize: { value: 5.5 },
      // Resolved once at mount rather than assigned during render, which
      // would be a mutation-during-render bug.
      uPixelRatio: {
        value: Math.min(
          typeof window !== "undefined" ? window.devicePixelRatio : 1,
          2
        ),
      },
    }),
    []
  );

  const lineUniforms = useMemo(
    () => ({
      uColor: { value: SIGNAL.clone() },
      uOpacity: { value: 0.18 },
    }),
    []
  );

  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  // The frame loop deliberately mutates preallocated typed arrays and uniform
  // objects in place. That is the correct Three.js pattern — allocating new
  // buffers 60 times a second would thrash GC. These objects are never React
  // state and are never read during render, so the compiler's immutability
  // rule does not apply here. Scoped to this callback only.
  /* eslint-disable react-hooks/immutability -- imperative Three.js frame loop */
  useFrame(({ clock, pointer, camera }, delta) => {
    const geom = pointsRef.current?.geometry;
    const lineGeom = linesRef.current?.geometry;
    if (!geom || !lineGeom) return;

    const { from, to, t } = resolveMorph(progress.current);
    const a = states[from as StateKey] as Float32Array;
    const b = states[to as StateKey] as Float32Array;
    const time = clock.elapsedTime;

    // How "loose" the current blend is — drift only applies to the cloud.
    const drift = from === "cloud" ? 1 - t : 0;

    for (let i = 0; i < states.count; i++) {
      const i3 = i * 3;
      let x = a[i3] + (b[i3] - a[i3]) * t;
      let y = a[i3 + 1] + (b[i3 + 1] - a[i3 + 1]) * t;
      let z = a[i3 + 2] + (b[i3 + 2] - a[i3 + 2]) * t;

      if (drift > 0 && !reduced) {
        const p = i * 0.35;
        x += Math.sin(time * 0.24 + p) * 0.42 * drift;
        y += Math.cos(time * 0.19 + p * 1.3) * 0.42 * drift;
        z += Math.sin(time * 0.21 + p * 0.7) * 0.42 * drift;
      }

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
    }

    // Rebuild edge endpoints from the fixed index pairs.
    const edges = states.edges;
    for (let e = 0; e < edges.length; e++) {
      const src = edges[e] * 3;
      const dst = e * 3;
      linePositions[dst] = positions[src];
      linePositions[dst + 1] = positions[src + 1];
      linePositions[dst + 2] = positions[src + 2];
    }

    geom.attributes.position.needsUpdate = true;
    lineGeom.attributes.position.needsUpdate = true;

    // Colour shifts toward accent-pulse as everything converges.
    const conv = to === "converge" ? t : 0;
    (pointUniforms.uColor.value as THREE.Color)
      .copy(SIGNAL)
      .lerp(PULSE, conv);

    // Edges strengthen as the structure resolves.
    const oa = EDGE_OPACITY[from];
    const ob = EDGE_OPACITY[to];
    lineUniforms.uOpacity.value = oa + (ob - oa) * t;

    if (groupRef.current && !reduced) {
      // Slow independent rotation, strongest in the sphere state.
      groupRef.current.rotation.y += delta * 0.045;
      groupRef.current.rotation.x = Math.sin(time * 0.08) * 0.12;

      // Pointer parallax on the camera, magnitude capped (Section 4).
      camera.position.x += (pointer.x * 1.6 - camera.position.x) * 0.03;
      camera.position.y += (pointer.y * 1.0 - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);
    }
  });
  /* eslint-enable react-hooks/immutability */

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={pointVertex}
          fragmentShader={pointFragment}
          uniforms={pointUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={lineVertex}
          fragmentShader={lineFragment}
          uniforms={lineUniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}

export default function Lattice({ dim = 6 }: { dim?: number }) {
  return (
    <Canvas
      // Cap DPR: retina at 3x on a particle scene is wasted fill rate.
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 20], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      // The page background already provides the void colour.
      style={{ background: "transparent" }}
    >
      {/*
        No EffectComposer/Bloom: its render targets output opaque black over a
        transparent canvas, and the glow it would add is already achieved by
        additive blending in the point shader — for one less full-screen pass,
        which matters on the mobile budget in Section 6.
      */}
      <LatticeMesh dim={dim} />
    </Canvas>
  );
}
