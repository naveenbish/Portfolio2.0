/**
 * Isometric hero artwork, built the same way as the reference design:
 *
 *  - the word is laid out as pixel letters on a floor grid of 64-unit cells,
 *    rotated 90° so it runs up-right along the iso axis (first letter nearest);
 *  - every piece is a 32-unit-thick slab with plain side faces and a
 *    hairline-hatched top;
 *  - edges are strokes painted with a radial gradient that is darkest at the
 *    centre and fades toward the rim;
 *  - dashed guide lines run along both iso axes through letter corners.
 *
 * Pieces are convex polygons on a half-cell grid (square cells, half-width
 * blocks, triangles). Edges shared between touching pieces are cancelled, so
 * neighbours merge into one outline. Pure geometry: no random or time-based
 * input, so it prerenders deterministically.
 */
import {
  GLYPH_HEIGHT,
  GLYPH_WIDTH,
  PIXEL_GLYPHS,
  type PixelLetter,
} from "@/lib/pixel-font";

const WORD: readonly PixelLetter[] = ["N", "B"];
const LETTER_GAP = 1; // empty cells between letters
const CELL = 64;
const SLAB = 32;
const KX = CELL * Math.cos(Math.PI / 6); // 55.43: screen x per cell along each axis
const KY = CELL / 2; // 32: screen y per cell along each axis

/** Glyph-space point: (row, column), fractional allowed, in cell units. */
type GlyphPt = readonly [row: number, col: number];

type LetterArt = {
  /** Filled pixels. */
  rows: readonly string[];
  /** Extra convex pieces in glyph space (triangles, half blocks). */
  extras: readonly (readonly GlyphPt[])[];
};

const ART: Record<PixelLetter, LetterArt> = {
  N: {
    rows: PIXEL_GLYPHS.N,
    extras: [
      // top gap, cell (row 0, col 1): lower-left half, filling the corner between the stem and the diagonal
      [[0, 1], [1, 1], [1, 2]],
      // lower gap, cell (row 3, col 2): upper-right half, filling the corner between the diagonal and the stem
      [[3, 2], [3, 3], [4, 3]],
    ],
  },
  B: {
    // The two right-hand bowl bumps are only diagonal-connected, so they read as
    // stray blocks on the floor; half-width bridges flush with the bar ends close
    // each bowl instead and complete the B's right edge.
    rows: ["XXX.", "X...", "XXX.", "X...", "XXX."],
    extras: [
      [[1, 2.5], [2, 2.5], [2, 3], [1, 3]],
      [[3, 2.5], [4, 2.5], [4, 3], [3, 3]],
    ],
  },
};

// ---- floor pieces ----------------------------------------------------------
// Floor points are stored in half-cell units (integers) so comparisons are exact.
type Pt = readonly [a: number, b: number];
const key = ([a, b]: Pt) => `${a},${b}`;

/** Glyph (row, col) -> floor (a, b), turning the glyph 90° CCW. */
const toFloor = (bBase: number, [row, col]: GlyphPt): Pt => [
  Math.round(row * 2),
  Math.round((bBase + GLYPH_WIDTH - col) * 2),
];

/** Counter-clockwise in the (a, b) plane, which the edge-normal maths below relies on. */
function ccw(pts: Pt[]): Pt[] {
  let twice = 0;
  pts.forEach(([a1, b1], i) => {
    const [a2, b2] = pts[(i + 1) % pts.length];
    twice += a1 * b2 - a2 * b1;
  });
  return twice >= 0 ? pts : [...pts].reverse();
}

const pieces: Pt[][] = WORD.flatMap((letter, li) => {
  const bBase = (WORD.length - 1 - li) * (GLYPH_WIDTH + LETTER_GAP);
  const art = ART[letter];
  const out: Pt[][] = [];
  art.rows.forEach((row, r) =>
    [...row].forEach((ch, c) => {
      if (ch === "X") {
        const corners: GlyphPt[] = [[r, c], [r + 1, c], [r + 1, c + 1], [r, c + 1]];
        out.push(ccw(corners.map((p) => toFloor(bBase, p))));
      }
    }),
  );
  art.extras.forEach((poly) => out.push(ccw(poly.map((p) => toFloor(bBase, p)))));
  return out;
});

// ---- projection ------------------------------------------------------------
const P = ([a, b]: Pt, z: number): [number, number] => [
  ((a - b) / 2) * KX,
  ((a + b) / 2) * KY - z,
];
const fmt = (n: number) => n.toFixed(2);
const pts = (ps: [number, number][]) => ps.map(([x, y]) => `${fmt(x)},${fmt(y)}`).join(" ");
const seg = (p: [number, number], q: [number, number]) =>
  `M${fmt(p[0])} ${fmt(p[1])}L${fmt(q[0])} ${fmt(q[1])}`;

// ---- shared edges ----------------------------------------------------------
type Edge = { p: Pt; q: Pt };

const allVertices = pieces.flat();

/** Splits an edge at any piece vertex lying strictly inside it (T-junctions). */
function split({ p, q }: Edge): Edge[] {
  const d: Pt = [q[0] - p[0], q[1] - p[1]];
  const len2 = d[0] * d[0] + d[1] * d[1];
  const inside = allVertices
    .filter((v) => {
      const w: Pt = [v[0] - p[0], v[1] - p[1]];
      const dot = w[0] * d[0] + w[1] * d[1];
      return d[0] * w[1] - d[1] * w[0] === 0 && dot > 0 && dot < len2;
    })
    .sort((u, v) => (u[0] - p[0]) * d[0] + (u[1] - p[1]) * d[1] - ((v[0] - p[0]) * d[0] + (v[1] - p[1]) * d[1]));
  const stops = [p, ...inside, q];
  return stops.slice(1).map((s, i) => ({ p: stops[i], q: s }));
}

const edgesByPiece: Edge[][] = pieces.map((poly) =>
  poly.flatMap((p, i) => split({ p, q: poly[(i + 1) % poly.length] })),
);

const directed = new Set(edgesByPiece.flat().map(({ p, q }) => `${key(p)}>${key(q)}`));
// An edge is internal when a neighbour owns the same segment in the opposite direction.
const boundaryByPiece = edgesByPiece.map((edges) =>
  edges.filter(({ p, q }) => !directed.has(`${key(q)}>${key(p)}`)),
);

/** Outward normal for a counter-clockwise polygon; visible faces point toward +a/+b. */
const faceVisible = ({ p, q }: Edge) => q[1] - p[1] - (q[0] - p[0]) > 0;

const visibleWalls = boundaryByPiece.flat().filter(faceVisible);
/** True when another visible wall touches `v` and runs the same way (the wall just continues). */
const continuesAt = (edge: Edge, v: Pt) =>
  visibleWalls.some((o) => {
    if (o === edge) return false;
    if (key(o.p) !== key(v) && key(o.q) !== key(v)) return false;
    const d1: Pt = [edge.q[0] - edge.p[0], edge.q[1] - edge.p[1]];
    const d2: Pt = [o.q[0] - o.p[0], o.q[1] - o.p[1]];
    return d1[0] * d2[1] - d1[1] * d2[0] === 0 && d1[0] * d2[0] + d1[1] * d2[1] > 0;
  });

type Drawn = { top: string; walls: string[]; edges: string };

function draw(poly: Pt[], boundary: Edge[]): Drawn {
  const edges: string[] = [];
  const walls: string[] = [];
  for (const e of boundary) {
    edges.push(seg(P(e.p, SLAB), P(e.q, SLAB)));
    if (!faceVisible(e)) continue;
    walls.push(pts([P(e.p, 0), P(e.q, 0), P(e.q, SLAB), P(e.p, SLAB)]));
    edges.push(seg(P(e.p, 0), P(e.q, 0)));
    if (!continuesAt(e, e.p)) edges.push(seg(P(e.p, 0), P(e.p, SLAB)));
    if (!continuesAt(e, e.q)) edges.push(seg(P(e.q, 0), P(e.q, SLAB)));
  }
  return { top: pts(poly.map((v) => P(v, SLAB))), walls, edges: edges.join("") };
}

// Far pieces first so nearer ones paint over them.
const depth = (poly: Pt[]) => poly.reduce((s, [a, b]) => s + a + b, 0) / poly.length;
const drawn = pieces
  .map((poly, i) => ({ poly, boundary: boundaryByPiece[i] }))
  .sort((x, y) => depth(x.poly) - depth(y.poly))
  .map(({ poly, boundary }) => draw(poly, boundary));

// ---- bounds & guides -------------------------------------------------------
const corners = pieces.flatMap((poly) => poly.flatMap((v) => [P(v, 0), P(v, SLAB)]));
const minX = Math.min(...corners.map((c) => c[0])) - 0.5;
const maxX = Math.max(...corners.map((c) => c[0])) + 0.5;
const minY = Math.min(...corners.map((c) => c[1])) - 0.5;
const maxY = Math.max(...corners.map((c) => c[1])) + 0.5;
const width = maxX - minX;
const height = maxY - minY;

const floor = (a: number, b: number): [number, number] => P([a * 2, b * 2], 0);
const bMax = WORD.length * GLYPH_WIDTH + (WORD.length - 1) * LETTER_GAP;
const SLOPE = Math.tan(Math.PI / 6);
const through = ([x, y]: [number, number], dir: 1 | -1) => {
  const reach = 2400;
  return { x1: x - reach, y1: y + dir * SLOPE * reach, x2: x + reach, y2: y - dir * SLOPE * reach };
};
const guides = [
  through(floor(GLYPH_HEIGHT, GLYPH_WIDTH), 1), // up-right, through the front corner of the last letter
  through(floor(GLYPH_HEIGHT, bMax), -1), // down-right, through the nearest corner of the first letter
  through(floor(0, GLYPH_WIDTH + LETTER_GAP), -1), // down-right, through the far gap corner
];

export function IsoArt({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox={`${fmt(minX)} ${fmt(minY)} ${fmt(width)} ${fmt(height)}`}
      preserveAspectRatio="xMaxYMid meet"
      fill="none"
      className={`overflow-visible ${className ?? ""}`}
    >
      <defs>
        <pattern id="iso-hatch" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <path
            d="M-1 1l2 -2M0 10l10 -10M9 11l2 -2"
            strokeWidth="1"
            style={{ stroke: "color-mix(in oklab, var(--foreground) 12%, var(--background))" }}
          />
        </pattern>
        <radialGradient
          id="iso-stroke"
          gradientUnits="userSpaceOnUse"
          cx={(minX + maxX) / 2}
          cy={(minY + maxY) / 2}
          r={width * 0.4}
        >
          <stop style={{ stopColor: "color-mix(in oklab, var(--foreground) 72%, var(--background))" }} />
          <stop
            offset="1"
            style={{ stopColor: "color-mix(in oklab, var(--foreground) 16%, var(--background))" }}
          />
        </radialGradient>
      </defs>

      <g className="stroke-line" strokeWidth="1" strokeDasharray="4 2">
        {guides.map((g, i) => (
          <line key={i} {...g} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      {drawn.map((d, i) => (
        <g key={i}>
          {d.walls.map((w, j) => (
            <polygon key={j} points={w} className="fill-background" />
          ))}
          <polygon points={d.top} className="fill-background" />
          <polygon points={d.top} fill="url(#iso-hatch)" />
          <path
            d={d.edges}
            stroke="url(#iso-stroke)"
            strokeWidth="1"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </g>
      ))}
    </svg>
  );
}
