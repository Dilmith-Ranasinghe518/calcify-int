/**
 * Static stand-in for the WebGL Lattice — used under prefers-reduced-motion,
 * when WebGL is unavailable, and as the pre-mount placeholder so the page
 * never shows an empty void while the canvas initialises.
 *
 * Drawn as an isometric projection of the grid state (the Lattice's calmest
 * form), generated in code to stay consistent with the live scene.
 */

const DIM = 5;
const SPACING = 46;

type Node = { x: number; y: number; depth: number };

function project(x: number, y: number, z: number): Node {
  // Simple isometric projection.
  const px = (x - z) * 0.866;
  const py = y + (x + z) * 0.5;
  return { x: px * SPACING, y: py * SPACING, depth: (x + z) / (2 * (DIM - 1)) };
}

function build() {
  const nodes: Node[] = [];
  const edges: { a: Node; b: Node; depth: number }[] = [];
  const at = (x: number, y: number, z: number) =>
    nodes[x + y * DIM + z * DIM * DIM];

  for (let z = 0; z < DIM; z++)
    for (let y = 0; y < DIM; y++)
      for (let x = 0; x < DIM; x++)
        nodes[x + y * DIM + z * DIM * DIM] = project(
          x - (DIM - 1) / 2,
          y - (DIM - 1) / 2,
          z - (DIM - 1) / 2
        );

  for (let z = 0; z < DIM; z++)
    for (let y = 0; y < DIM; y++)
      for (let x = 0; x < DIM; x++) {
        const self = at(x, y, z);
        const push = (n: Node) =>
          edges.push({ a: self, b: n, depth: (self.depth + n.depth) / 2 });
        if (x + 1 < DIM) push(at(x + 1, y, z));
        if (y + 1 < DIM) push(at(x, y + 1, z));
        if (z + 1 < DIM) push(at(x, y, z + 1));
      }

  return { nodes, edges };
}

const { nodes, edges } = build();

export default function LatticePoster() {
  return (
    <svg
      viewBox="-260 -260 520 520"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full opacity-70"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="#5B6EF5" strokeWidth="0.6">
        {edges.map((e, i) => (
          <line
            key={i}
            x1={e.a.x}
            y1={e.a.y}
            x2={e.b.x}
            y2={e.b.y}
            opacity={0.05 + e.depth * 0.16}
          />
        ))}
      </g>
      <g fill="#5B6EF5">
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={1 + n.depth * 1.6}
            opacity={0.18 + n.depth * 0.5}
          />
        ))}
      </g>
      {/* Core node, accent-pulse — mirrors the converged state. */}
      <circle cx="0" cy="0" r="3.4" fill="#3FE0D0" opacity="0.85" />
    </svg>
  );
}
