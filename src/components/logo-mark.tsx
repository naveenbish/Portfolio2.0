import {
  GLYPH_HEIGHT,
  GLYPH_WIDTH,
  PIXEL_GLYPHS,
  type PixelLetter,
} from "@/lib/pixel-font";

/** Pixel monogram drawn on a 4×5 grid per letter. `pixel` is the px size of one cell. */
export function LogoMark({
  letters = ["N", "B"],
  pixel = 5,
  className,
}: {
  letters?: readonly PixelLetter[];
  pixel?: number;
  className?: string;
}) {
  const gap = 1;
  const width = letters.length * GLYPH_WIDTH + (letters.length - 1) * gap;

  return (
    <svg
      role="img"
      aria-label="Home"
      viewBox={`0 0 ${width} ${GLYPH_HEIGHT}`}
      width={width * pixel}
      height={GLYPH_HEIGHT * pixel}
      shapeRendering="crispEdges"
      fill="currentColor"
      className={className}
    >
      {letters.map((letter, li) =>
        PIXEL_GLYPHS[letter].flatMap((row, y) =>
          [...row].map((cell, x) =>
            cell === "X" ? (
              <rect
                key={`${letter}-${x}-${y}`}
                x={li * (GLYPH_WIDTH + gap) + x}
                y={y}
                width="1"
                height="1"
              />
            ) : null,
          ),
        ),
      )}
    </svg>
  );
}
