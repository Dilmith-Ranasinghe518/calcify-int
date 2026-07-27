"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Environment,
  Lightformer,
} from "@react-three/drei";
import * as THREE from "three";
import { useScrollProgress } from "@/lib/useScrollProgress";

const VIOLET = "#7C5CFF";
const CYAN = "#22E4E0";
const MAGENTA = "#FF4FD8";

/* ------------------------------------------------------------------ *
 * Backdrop
 * The crystal can only refract something that exists behind it, so the
 * scene needs real content. This is a procedural iridescent nebula on
 * the inside of a large sphere — no HDR/env-map download required.
 * ------------------------------------------------------------------ */

const backdropVertex = /* glsl */ `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const backdropFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uViolet;
  uniform vec3 uCyan;
  uniform vec3 uMagenta;
  uniform vec3 uVoid;
  varying vec3 vPos;

  // Cheap value noise — enough for soft nebula banding.
  float hash(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
  }
  float noise(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float n = mix(
      mix(mix(hash(i), hash(i + vec3(1,0,0)), f.x),
          mix(hash(i + vec3(0,1,0)), hash(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(hash(i + vec3(0,0,1)), hash(i + vec3(1,0,1)), f.x),
          mix(hash(i + vec3(0,1,1)), hash(i + vec3(1,1,1)), f.x), f.y),
      f.z);
    return n;
  }

  void main() {
    vec3 dir = normalize(vPos);
    float t = uTime * 0.035;

    float n1 = noise(dir * 2.2 + vec3(t, t * 0.6, 0.0));
    float n2 = noise(dir * 4.5 - vec3(0.0, t * 0.8, t * 0.4));

    // Two overlapping colour fields, biased so violet dominates.
    vec3 col = mix(uViolet, uMagenta, smoothstep(0.35, 0.75, n1));
    col = mix(col, uCyan, smoothstep(0.55, 0.95, n2) * 0.65);

    // The crystal can only refract light that exists, so the nebula needs
    // real luminance — but it still has to read as deep space behind copy.
    float density = pow(smoothstep(0.18, 0.85, n1 * 0.65 + n2 * 0.35), 1.35);
    col = mix(uVoid, col * 1.5, density);

    // Bright core streaks give the facets something vivid to bend.
    float streak = pow(smoothstep(0.62, 0.98, n2), 3.0);
    col += (uCyan * 0.5 + uViolet * 0.5) * streak * 0.9;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Backdrop() {
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uViolet: { value: new THREE.Color(VIOLET) },
      uCyan: { value: new THREE.Color(CYAN) },
      uMagenta: { value: new THREE.Color(MAGENTA) },
      uVoid: { value: new THREE.Color("#04050A") },
    }),
    []
  );

  /* eslint-disable react-hooks/immutability -- imperative Three.js frame loop */
  useFrame(({ clock }) => {
    uniforms.uTime.value = clock.elapsedTime;
  });
  /* eslint-enable react-hooks/immutability */

  return (
    <mesh scale={[-1, 1, 1]}>
      {/* Inverted scale renders the inside face — cheaper than BackSide. */}
      <sphereGeometry args={[38, 48, 32]} />
      <shaderMaterial
        vertexShader={backdropVertex}
        fragmentShader={backdropFragment}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ *
 * Starfield
 * ------------------------------------------------------------------ */

const starVertex = /* glsl */ `
  attribute float aScale;
  varying float vScale;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * (110.0 / -mv.z);
    vScale = aScale;
  }
`;

const starFragment = /* glsl */ `
  varying float vScale;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float glow = pow(1.0 - d * 2.0, 2.0);
    gl_FragColor = vec4(vec3(0.86, 0.88, 1.0), glow * (0.25 + vScale * 0.5));
  }
`;

function Starfield({ count = 900 }: { count?: number }) {
  const { positions, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    let seed = 1337;
    const rnd = () => {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      return seed / 0x100000000;
    };
    for (let i = 0; i < count; i++) {
      // Distribute on a shell so stars sit behind the crystal.
      const u = rnd() * 2 - 1;
      const theta = rnd() * Math.PI * 2;
      const r = 26 + rnd() * 9;
      const s = Math.sqrt(1 - u * u);
      positions[i * 3] = Math.cos(theta) * s * r;
      positions[i * 3 + 1] = u * r;
      positions[i * 3 + 2] = Math.sin(theta) * s * r;
      scales[i] = 0.25 + rnd() * 0.75;
    }
    return { positions, scales };
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={starVertex}
        fragmentShader={starFragment}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ *
 * The crystal
 * ------------------------------------------------------------------ */

function Crystal({ quality }: { quality: "high" | "low" }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const progress = useScrollProgress();

  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useFrame(({ clock, pointer }, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const p = progress.current;
    const t = clock.elapsedTime;

    if (!reduced) {
      // Continuous slow tumble, accelerated slightly by scroll.
      mesh.rotation.y += delta * (0.16 + p * 0.5);
      mesh.rotation.x = Math.sin(t * 0.16) * 0.28 + p * 0.9;
      mesh.rotation.z = Math.cos(t * 0.12) * 0.16;
    }

    // Scroll journey. Held well to the right of centre so it never sits
    // behind the headline — the copy column owns the left half.
    const targetX = 2.75 - p * 6.2;
    const targetY = -0.4 + Math.sin(p * Math.PI) * 1.6;
    const targetZ = -1.5 - p * 5;
    mesh.position.x += (targetX - mesh.position.x) * 0.06;
    mesh.position.y += (targetY - mesh.position.y) * 0.06;
    mesh.position.z += (targetZ - mesh.position.z) * 0.06;

    // Breathes larger at the top of the page, tightens as you scroll.
    const s = 1 - p * 0.28 + (reduced ? 0 : Math.sin(t * 0.5) * 0.02);
    mesh.scale.setScalar(s * 2.15);

    if (!reduced) {
      // Capped pointer parallax.
      mesh.position.x += pointer.x * 0.5;
      mesh.position.y += pointer.y * 0.32;
    }
  });

  return (
    <mesh ref={meshRef} position={[2.6, -0.3, -2]}>
      {/* Faceted icosahedron — sharp edges give clean dispersion streaks. */}
      <icosahedronGeometry args={[1, 0]} />
      <MeshTransmissionMaterial
        // Slightly under 1 so the crystal keeps some body and never fully
        // disappears against the backdrop.
        transmission={0.94}
        thickness={1.8}
        roughness={0.06}
        ior={1.7}
        // Thin-film interference: the oil-slick rainbow across the surface.
        // This is what sells it as a prism rather than tinted plastic.
        iridescence={1}
        iridescenceIOR={1.45}
        iridescenceThicknessRange={[120, 900]}
        // The rainbow fringing that makes this read as a real prism.
        chromaticAberration={quality === "high" ? 0.85 : 0.45}
        anisotropicBlur={quality === "high" ? 0.35 : 0.1}
        distortion={0.32}
        distortionScale={0.45}
        temporalDistortion={0.12}
        samples={quality === "high" ? 6 : 3}
        resolution={quality === "high" ? 512 : 192}
        backside={quality === "high"}
        backsideThickness={1.4}
        color="#ffffff"
      />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */

export default function Prism({
  quality = "high",
}: {
  quality?: "high" | "low";
}) {
  return (
    <Canvas
      dpr={[1, quality === "high" ? 1.6 : 1.2]}
      camera={{ position: [0, 0, 9], fov: 45 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#04050A"]} />

      {/* Coloured rim lights drive the dispersion bands. */}
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 4, 6]} intensity={90} color={VIOLET} />
      <pointLight position={[-7, -2, 4]} intensity={70} color={CYAN} />
      <pointLight position={[0, 6, -6]} intensity={55} color={MAGENTA} />

      {/*
        Transmission needs an environment to refract and reflect, or the glass
        renders as a black silhouette. This builds one from in-scene emissive
        panels — no HDR file to download, host, or license. frames={1} bakes it
        once at mount rather than re-rendering the cubemap every frame.
      */}
      <Environment resolution={256} frames={1} environmentIntensity={1.6}>
        {/*
          Base fill lifts unlit facets off pure black — but it has to stay
          dark. A bright uniform environment makes clear glass invisible,
          because there is no contrast left for the facets to bend.
        */}
        <color attach="background" args={["#0E0826"]} />

        {/* Wrap-around band so mid-facets catch colour as the crystal turns */}
        <Lightformer
          form="ring"
          intensity={2.2}
          color={VIOLET}
          position={[0, 0, -12]}
          scale={[24, 24, 1]}
        />
        <Lightformer
          form="rect"
          intensity={2.4}
          color={CYAN}
          position={[0, -9, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[20, 20, 1]}
        />
        <Lightformer
          form="rect"
          intensity={6}
          color={VIOLET}
          position={[8, 5, 6]}
          scale={[14, 14, 1]}
        />
        <Lightformer
          form="rect"
          intensity={5}
          color={CYAN}
          position={[-9, -3, 5]}
          scale={[14, 14, 1]}
        />
        <Lightformer
          form="circle"
          intensity={4.5}
          color={MAGENTA}
          position={[0, 8, -7]}
          scale={[10, 10, 1]}
        />
        <Lightformer
          form="ring"
          intensity={3}
          color="#ffffff"
          position={[3, -6, -4]}
          scale={[8, 8, 1]}
        />
      </Environment>

      <Backdrop />
      <Starfield count={quality === "high" ? 900 : 350} />
      <Crystal quality={quality} />
    </Canvas>
  );
}
