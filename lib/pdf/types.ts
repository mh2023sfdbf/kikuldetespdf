/**
 * Field placement for template overlay (pdf-lib).
 * PDF coordinate system: origin bottom-left, A4 = 595 x 842 pt.
 */

export type Align = 'left' | 'center' | 'right'

export interface FieldPlacement {
  pageIndex: number
  x: number
  y: number
  fontSize: number
  maxWidth?: number
  align?: Align
  lineHeight?: number // override default (for title etc.)
  /** Max lines to draw (prevents overlap with next block). Truncate with "..." if exceeded. */
  maxLines?: number
}

export type FieldMap = Record<string, FieldPlacement>
