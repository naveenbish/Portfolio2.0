/** 4×5 pixel letters shared by the logo mark, the hero's isometric art and the favicon. */
export const PIXEL_GLYPHS = {
  N: ["X..X", "XX.X", "X.XX", "X..X", "X..X"],
  B: ["XXX.", "X..X", "XXX.", "X..X", "XXX."],
} as const;

export type PixelLetter = keyof typeof PIXEL_GLYPHS;

export const GLYPH_WIDTH = 4;
export const GLYPH_HEIGHT = 5;
