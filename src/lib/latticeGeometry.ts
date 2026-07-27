/**
 * Procedural geometry for the Lattice — DESIGN_SPEC.md Sections 1 and 4.
 *
 * Everything here is built in code: no .glb, no external model files.
 *
 * The four scroll states share one point set and one FIXED edge list. Edges
 * come from grid-neighbour connectivity computed once at build time, never
 * from per-frame distance checks — that is what keeps the scene cheap.
 */

export type LatticeStates = {
  count: number;
  /** Flat [x,y,z, ...] arrays, one per morph target. */
  cloud: Float32Array;
  sphere: Float32Array;
  grid: Float32Array;
  converge: Float32Array;
  /** Index pairs into the point set. Length is edgeCount * 2. */
  edges: Uint16Array;
};

/** Deterministic PRNG so the "random" cloud is stable across reloads. */
function makeRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

/**
 * Builds all four states from a gx*gy*gz grid.
 * The grid dimension drives the point count, so connectivity stays regular.
 */
export function buildLattice(dim: number, spread = 9): LatticeStates {
  const count = dim * dim * dim;
  const rand = makeRandom(0x5b6ef5);

  const cloud = new Float32Array(count * 3);
  const sphere = new Float32Array(count * 3);
  const grid = new Float32Array(count * 3);
  const converge = new Float32Array(count * 3);

  const step = spread / (dim - 1);
  const half = spread / 2;

  // Golden angle for an evenly distributed Fibonacci sphere.
  const golden = Math.PI * (3 - Math.sqrt(5));
  const radius = spread * 0.42;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;

    // --- Grid: ordered lattice, the "structured / precise" state ---
    const gx = i % dim;
    const gy = Math.floor(i / dim) % dim;
    const gz = Math.floor(i / (dim * dim));
    grid[i3] = gx * step - half;
    grid[i3 + 1] = gy * step - half;
    grid[i3 + 2] = gz * step - half;

    // --- Cloud: loose drifting field, "unstructured potential" ---
    // Kept reasonably tight: a very wide scatter stretches the fixed edges
    // into long crossing lines that read as noise rather than a network.
    cloud[i3] = (rand() - 0.5) * spread * 1.35;
    cloud[i3 + 1] = (rand() - 0.5) * spread * 0.95;
    cloud[i3 + 2] = (rand() - 0.5) * spread * 1.35;

    // --- Sphere: Fibonacci distribution over a shell ---
    const y = 1 - (i / Math.max(count - 1, 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    sphere[i3] = Math.cos(theta) * r * radius;
    sphere[i3 + 1] = y * radius;
    sphere[i3 + 2] = Math.sin(theta) * r * radius;

    // --- Converge: everything collapses toward a single node ---
    // A little jitter keeps it reading as many nodes, not one dot.
    converge[i3] = (rand() - 0.5) * 0.5;
    converge[i3 + 1] = (rand() - 0.5) * 0.5;
    converge[i3 + 2] = (rand() - 0.5) * 0.5;
  }

  // --- Fixed edges: connect each node to its +x, +y, +z grid neighbour ---
  const pairs: number[] = [];
  const at = (x: number, y: number, z: number) => x + y * dim + z * dim * dim;

  for (let z = 0; z < dim; z++) {
    for (let y = 0; y < dim; y++) {
      for (let x = 0; x < dim; x++) {
        const self = at(x, y, z);
        if (x + 1 < dim) pairs.push(self, at(x + 1, y, z));
        if (y + 1 < dim) pairs.push(self, at(x, y + 1, z));
        if (z + 1 < dim) pairs.push(self, at(x, y, z + 1));
      }
    }
  }

  return {
    count,
    cloud,
    sphere,
    grid,
    converge,
    edges: Uint16Array.from(pairs),
  };
}

/**
 * Scroll-progress -> morph keyframes.
 * Maps overall page progress (0..1) onto the four states from Section 1.
 */
export type StateKey = "cloud" | "sphere" | "grid" | "converge";

const KEYFRAMES: { at: number; state: StateKey }[] = [
  { at: 0.0, state: "cloud" }, // Hero
  { at: 0.28, state: "sphere" }, // Stats
  { at: 0.52, state: "grid" }, // Services / Why Us
  { at: 0.84, state: "grid" }, // hold through Testimonial
  { at: 1.0, state: "converge" }, // CTA
];

/** Returns which two states to blend and how far between them (0..1). */
export function resolveMorph(progress: number): {
  from: StateKey;
  to: StateKey;
  t: number;
} {
  const p = Math.min(Math.max(progress, 0), 1);

  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const a = KEYFRAMES[i];
    const b = KEYFRAMES[i + 1];
    if (p >= a.at && p <= b.at) {
      const span = b.at - a.at;
      const local = span === 0 ? 0 : (p - a.at) / span;
      // Smoothstep keeps the transition from feeling mechanical.
      const t = local * local * (3 - 2 * local);
      return { from: a.state, to: b.state, t };
    }
  }

  const last = KEYFRAMES[KEYFRAMES.length - 1].state;
  return { from: last, to: last, t: 1 };
}
