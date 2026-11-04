/**
 * Large outlined name for the bottom of the page, in the reference design's
 * blocky pixel style: 32-unit cells, one-cell strokes, a 6-row x-height under
 * 8-row capitals and ascenders. Each glyph is split into rectangles whose
 * outlines are stroked, so the seams between strokes show like in the original.
 *
 * The full name scales with its viewBox on every screen.
 * Pure geometry — deterministic at build.
 */

const CELL = 32;
const ROWS = 8;
const LETTER_GAP = 1; // blank cells between letters
const SPACE = 2; // extra blank cells for a space

/** Glyphs as 8 rows (0 = top of an ascender or capital). Only letters used by the name are defined. */
const GLYPHS: Record<string, readonly string[]> = {
  N: ["X...X", "XX..X", "XX..X", "X.X.X", "X.X.X", "X..XX", "X..XX", "X...X"],
  B: ["XXXX.", "X...X", "X...X", "XXXX.", "X...X", "X...X", "X...X", "XXXX."],
  a: [".....", ".....", ".XXXX", "X...X", "X...X", "X...X", "X..XX", ".XX.X"],
  v: [".....", ".....", "X...X", "X...X", "X...X", "X...X", ".X.X.", "..X.."],
  e: [".....", ".....", ".XXX.", "X...X", "XXXXX", "X....", "X...X", ".XXX."],
  n: [".....", ".....", "XXXX.", "X...X", "X...X", "X...X", "X...X", "X...X"],
  i: [".X", "..", "XX", ".X", ".X", ".X", ".X", ".X"],
  s: [".....", ".....", ".XXXX", "X....", ".XXX.", "....X", "....X", "XXXX."],
  h: ["X....", "X....", "XXXX.", "X...X", "X...X", "X...X", "X...X", "X...X"],
  t: ["....", ".X..", "XXXX", ".X..", ".X..", ".X..", ".X..", "..XX"],
};

type Rect = { col: number; row: number; w: number; h: number };

/** Greedy cover of a glyph's filled cells with rectangles (right, then down). */
function toRects(rows: readonly string[], offset: number): Rect[] {
  const taken = rows.map((r) => [...r].map(() => false));
  const free = (c: number, r: number) => rows[r]?.[c] === "X" && !taken[r][c];
  const rects: Rect[] = [];
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < rows[r].length; c++) {
      if (!free(c, r)) continue;
      let w = 1;
      while (free(c + w, r)) w++;
      let h = 1;
      while (Array.from({ length: w }, (_, i) => free(c + i, r + h)).every(Boolean)) h++;
      for (let rr = r; rr < r + h; rr++) for (let cc = c; cc < c + w; cc++) taken[rr][cc] = true;
      rects.push({ col: offset + c, row: r, w, h });
    }
  }
  return rects;
}

function layout(text: string) {
  const rects: Rect[] = [];
  let cursor = 0;
  for (const ch of text) {
    if (ch === " ") {
      cursor += SPACE;
      continue;
    }
    const glyph = GLYPHS[ch];
    if (!glyph) continue; // letters outside the table are skipped; add a glyph to support them
    rects.push(...toRects(glyph, cursor));
    cursor += glyph[0].length + LETTER_GAP;
  }
  return { rects, cells: Math.max(cursor - LETTER_GAP, 1) };
}

export function NameArt({ text, className }: { text: string; className?: string }) {
  const { rects, cells } = layout(text);
  // Coordinates start at 1 so the 2px outline stays inside the viewBox.
  const d = rects
    .map(({ col, row, w, h }) => {
      const x = col * CELL + 1;
      const y = row * CELL + 1;
      return `M${x} ${y}H${x + w * CELL}V${y + h * CELL}H${x}Z`;
    })
    .join("");

  return (
    <svg
      role="img"
      aria-label={text}
      viewBox={`0 0 ${cells * CELL + 2} ${ROWS * CELL + 2}`}
      fill="none"
      className={className}
    >
      <path d={d} strokeWidth={1} vectorEffect="non-scaling-stroke" strokeLinejoin="miter" className="fill-foreground/3 stroke-foreground/40" />
    </svg>
  );
}
