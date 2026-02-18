import type { PDFFont } from 'pdf-lib'

export interface LabelValueLayoutInput {
  x: number
  y: number
  fullWidth: number
  labelWidth: number
  lineHeight: number
  minInlineWidth?: number
  gap?: number
}

export interface LabelValueLayoutResult {
  valueStartX: number
  valueStartY: number
  valueMaxWidth: number
  breakAfterLabel: boolean
}

const DEFAULT_LABEL_VALUE_GAP = 8
const DEFAULT_MIN_INLINE_VALUE_WIDTH = 70

export function widthAt(font: PDFFont, text: string, fontSize: number): number {
  if (!text) return 0
  try {
    return font.widthOfTextAtSize(text, fontSize)
  } catch {
    return 0
  }
}

export function fitChunkToWidth(
  chunk: string,
  maxWidth: number,
  font: PDFFont,
  fontSize: number
): string {
  if (!chunk) return ''
  if (widthAt(font, chunk, fontSize) <= maxWidth) return chunk
  let low = 1
  let high = chunk.length
  let best = ''
  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const part = chunk.slice(0, mid)
    if (widthAt(font, part, fontSize) <= maxWidth) {
      best = part
      low = mid + 1
    } else {
      high = mid - 1
    }
  }
  return best
}

export function wrapParagraphByWidth(
  paragraph: string,
  maxWidth: number,
  font: PDFFont,
  fontSize: number
): string[] {
  const p = paragraph.trim()
  if (!p) return ['']
  const words = p.split(/\s+/)
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (!current || widthAt(font, candidate, fontSize) <= maxWidth) {
      current = candidate
      continue
    }

    lines.push(current)
    current = ''

    if (widthAt(font, word, fontSize) <= maxWidth) {
      current = word
      continue
    }

    let rest = word
    while (rest.length > 0) {
      const part = fitChunkToWidth(rest, maxWidth, font, fontSize)
      if (!part) break
      lines.push(part)
      rest = rest.slice(part.length)
    }
  }

  if (current) lines.push(current)
  return lines.length ? lines : ['']
}

export function wrapTextByWidth(
  text: string,
  maxWidth: number,
  font: PDFFont,
  fontSize: number
): string[] {
  const lines: string[] = []
  const paragraphs = text.replace(/\r\n/g, '\n').split('\n')
  for (const paragraph of paragraphs) {
    lines.push(...wrapParagraphByWidth(paragraph, maxWidth, font, fontSize))
  }
  return lines.length ? lines : ['']
}

export function withEllipsis(
  text: string,
  maxWidth: number,
  font: PDFFont,
  fontSize: number
): string {
  const dots = '...'
  if (widthAt(font, text, fontSize) <= maxWidth) return text
  const dotWidth = widthAt(font, dots, fontSize)
  if (dotWidth >= maxWidth) return ''
  const fitted = fitChunkToWidth(text, maxWidth - dotWidth, font, fontSize)
  return `${fitted}${dots}`
}

export function computeLabelValueLayout(input: LabelValueLayoutInput): LabelValueLayoutResult {
  const gap = input.gap ?? DEFAULT_LABEL_VALUE_GAP
  const minInlineWidth = input.minInlineWidth ?? DEFAULT_MIN_INLINE_VALUE_WIDTH
  const inlineValueMaxWidth = input.fullWidth - input.labelWidth - gap
  const breakAfterLabel = inlineValueMaxWidth < minInlineWidth

  if (breakAfterLabel) {
    return {
      valueStartX: input.x,
      valueStartY: input.y - input.lineHeight,
      valueMaxWidth: input.fullWidth,
      breakAfterLabel,
    }
  }

  return {
    valueStartX: input.x + input.labelWidth + gap,
    valueStartY: input.y,
    valueMaxWidth: inlineValueMaxWidth,
    breakAfterLabel,
  }
}

export function computeLineBaselines(startY: number, lineCount: number, lineHeight: number): number[] {
  const ys: number[] = []
  for (let i = 0; i < lineCount; i += 1) ys.push(startY - i * lineHeight)
  return ys
}

export function hasBaselineOverlap(ys: number[], minGap: number): boolean {
  if (ys.length < 2) return false
  for (let i = 1; i < ys.length; i += 1) {
    const gap = Math.abs(ys[i - 1] - ys[i])
    if (gap < minGap) return true
  }
  return false
}
