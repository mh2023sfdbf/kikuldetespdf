/**
 * Pro minimal PDF design tokens (Apple-inspired).
 * Consistent margins, typography scale, and spacing for a clean document.
 */
export const A4 = { width: 595, height: 842 }

// Margins (pt) – generous whitespace
export const MARGIN_X = 52
export const MARGIN_TOP = 48
export const MARGIN_BOTTOM = 48
export const CONTENT_WIDTH = A4.width - MARGIN_X * 2

// Vertical rhythm (pt) – enough space so wrapped lines don’t overlap
export const LINE_HEIGHT_TITLE = 24
export const LINE_HEIGHT_SECTION = 18
export const LINE_HEIGHT_BODY = 18
export const LINE_HEIGHT_CAPTION = 12
export const SECTION_GAP = 36
export const FIELD_GAP = 14

// Font sizes (pt)
export const FONT_TITLE = 18
export const FONT_SECTION = 11
export const FONT_BODY = 10
export const FONT_CAPTION = 9

// Colors (0–1) – subtle black, muted labels, light rules. Pass to rgb(r,g,b) in pdf-lib.
export const COLOR_TEXT = { red: 0.12, green: 0.12, blue: 0.12 } as const
export const COLOR_LABEL = { red: 0.4, green: 0.4, blue: 0.4 } as const
export const COLOR_RULE = { red: 0.92, green: 0.92, blue: 0.92 } as const
/** Brand accent for PDF badge (electric lime #B8FF3C). */
export const COLOR_POP = { red: 184 / 255, green: 1, blue: 60 / 255 } as const

/** Convert "from top" (design) to pdf-lib Y (bottom-left origin). */
export function fromTop(yFromTop: number): number {
  return A4.height - yFromTop
}
