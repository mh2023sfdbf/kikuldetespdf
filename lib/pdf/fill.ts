/**
 * Block-based PDF renderer for stable, non-overlapping layout.
 * Uses fixed sections, lanes, and reserved footer/signature bands.
 */
import { PDFDocument, StandardFonts, rgb, PDFPage, PDFFont } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { wrapTextByWidth, withEllipsis } from './layout'
import { A4, CONTENT_WIDTH, MARGIN_X, COLOR_TEXT, COLOR_LABEL, fromTop } from './design'
import { createMinimalKulfoldiTemplate, createMinimalBelfoldiTemplate } from './create-templates'
import type { ForeignTripData } from '../schemas'
import type { DomesticTripData } from '../schemas'

const NOTO_SANS_TTF_URL =
  'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSans/NotoSans-Regular.ttf'

const BODY_SIZE = 10
const LABEL_SIZE = 9
const TITLE_SIZE = 16
const SECTION_SIZE = 11
const LINE_HEIGHT = 16
const ROW_MIN_HEIGHT = 24
const LABEL_COL_WIDTH = 190
const VALUE_COL_GAP = 14

const TOP_TITLE = 56
const TOP_CONTENT_START = 110
const TOP_FOOTER_META = 668
const TOP_SIGNATURE_LABELS_FOREIGN = 784
const TOP_SIGNATURE_LABELS_DOMESTIC = 684
const TOP_BRAND = 814

function sanitizeForPdfFont(text: string): string {
  if (!text || typeof text !== 'string') return ''
  return text
    .replace(/ő/g, 'o')
    .replace(/Ő/g, 'O')
    .replace(/ű/g, 'u')
    .replace(/Ű/g, 'U')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ö/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ü/g, 'u')
    .replace(/Á/g, 'A')
    .replace(/É/g, 'E')
    .replace(/Í/g, 'I')
    .replace(/Ó/g, 'O')
    .replace(/Ö/g, 'O')
    .replace(/Ú/g, 'U')
    .replace(/Ü/g, 'U')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function safeString(v: unknown): string {
  if (v == null) return ''
  if (typeof v === 'number' && !Number.isFinite(v)) return ''
  return String(v)
}

async function loadHungarianFont(doc: PDFDocument): Promise<PDFFont | null> {
  if (typeof doc.registerFontkit !== 'function') return null
  try {
    doc.registerFontkit(fontkit)
  } catch {
    return null
  }

  let bytes: Uint8Array | null = null

  try {
    const path = await import('path')
    const fs = await import('fs/promises')
    const fontPath = path.join(process.cwd(), 'public', 'fonts', 'NotoSans-Regular.ttf')
    const buf = await fs.readFile(fontPath)
    bytes = new Uint8Array(buf)
  } catch {
    try {
      const res = await fetch(NOTO_SANS_TTF_URL)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      bytes = new Uint8Array(await res.arrayBuffer())
    } catch {
      return null
    }
  }

  if (!bytes || bytes.length === 0) return null
  try {
    return await doc.embedFont(bytes)
  } catch {
    return null
  }
}

function drawTextLine(
  page: PDFPage,
  font: PDFFont,
  text: string,
  x: number,
  yFromTopValue: number,
  size: number,
  useHungarian: boolean,
  color = rgb(COLOR_TEXT.red, COLOR_TEXT.green, COLOR_TEXT.blue)
): void {
  const raw = safeString(text).trim()
  if (!raw) return
  const safe = useHungarian ? raw : sanitizeForPdfFont(raw)
  if (!safe) return
  try {
    page.drawText(safe, { x, y: fromTop(yFromTopValue), size, font, color })
  } catch {
    // ignore unsupported glyphs
  }
}

interface RowData {
  label: string
  value: string
  maxLines?: number
}

function drawRowsBlock(
  page: PDFPage,
  font: PDFFont,
  useHungarian: boolean,
  startTop: number,
  rows: RowData[]
): number {
  let cursor = startTop
  const labelColor = rgb(COLOR_LABEL.red, COLOR_LABEL.green, COLOR_LABEL.blue)

  for (const row of rows) {
    const labelRaw = safeString(row.label).trim()
    const valueRaw = safeString(row.value).trim()
    if (!valueRaw) continue

    const label = useHungarian ? labelRaw : sanitizeForPdfFont(labelRaw)
    const value = useHungarian ? valueRaw : sanitizeForPdfFont(valueRaw)

    const labelMax = LABEL_COL_WIDTH - VALUE_COL_GAP
    const labelText = withEllipsis(`${label}:`, labelMax, font, LABEL_SIZE)

    const valueX = MARGIN_X + LABEL_COL_WIDTH + VALUE_COL_GAP
    const valueW = CONTENT_WIDTH - LABEL_COL_WIDTH - VALUE_COL_GAP
    let lines = wrapTextByWidth(value, valueW, font, BODY_SIZE)
    if (row.maxLines != null && lines.length > row.maxLines) {
      lines = lines.slice(0, row.maxLines)
      lines[lines.length - 1] = withEllipsis(lines[lines.length - 1], valueW, font, BODY_SIZE)
    }

    const linesCount = Math.max(1, lines.length)
    const rowHeight = Math.max(ROW_MIN_HEIGHT, linesCount * LINE_HEIGHT + 6)

    drawTextLine(page, font, labelText, MARGIN_X, cursor, LABEL_SIZE, useHungarian, labelColor)

    for (let i = 0; i < linesCount; i += 1) {
      drawTextLine(page, font, lines[i] ?? '', valueX, cursor + i * LINE_HEIGHT, BODY_SIZE, useHungarian)
    }

    cursor += rowHeight
  }

  return cursor
}

function drawSectionHeader(
  page: PDFPage,
  font: PDFFont,
  useHungarian: boolean,
  title: string,
  yFromTopValue: number
): void {
  drawTextLine(page, font, title, MARGIN_X, yFromTopValue, SECTION_SIZE, useHungarian)
}

function formatCurrency(amount: number | undefined | null, currency: string): string {
  const n = Number(amount)
  if (!Number.isFinite(n) || n < 0) return `0 ${currency}`
  return `${Math.round(n).toLocaleString('hu-HU', { maximumFractionDigits: 0 })} ${safeString(currency) || 'HUF'}`
}

function drawFooterMeta(
  page: PDFPage,
  font: PDFFont,
  useHungarian: boolean,
  issuedDate: string,
  attachmentsCount: string,
  orderedByName: string,
  topY: number
): void {
  const labelColor = rgb(COLOR_LABEL.red, COLOR_LABEL.green, COLOR_LABEL.blue)
  const toSafe = (t: string) => (useHungarian ? t : sanitizeForPdfFont(t))

  drawTextLine(page, font, `${toSafe('Kelt')}:`, MARGIN_X, topY, LABEL_SIZE, true, labelColor)
  drawTextLine(page, font, issuedDate, MARGIN_X + 72, topY, BODY_SIZE, useHungarian)

  drawTextLine(page, font, `${toSafe('Mellékletek')}:`, MARGIN_X + 260, topY, LABEL_SIZE, true, labelColor)
  drawTextLine(page, font, attachmentsCount, MARGIN_X + 372, topY, BODY_SIZE, useHungarian)

  drawTextLine(page, font, `${toSafe('A kiküldetést elrendelő')}:`, MARGIN_X, topY + 30, LABEL_SIZE, true, labelColor)
  drawTextLine(page, font, orderedByName, MARGIN_X + 196, topY + 30, BODY_SIZE, useHungarian)
}

function drawBrandFooter(page: PDFPage, font: PDFFont, useHungarian: boolean): void {
  const site = useHungarian ? 'KIKULDETESPDF.HU' : 'KIKULDETESPDF.HU'
  const width = font.widthOfTextAtSize(site, BODY_SIZE)
  const x = MARGIN_X + (CONTENT_WIDTH - width) / 2
  drawTextLine(page, font, site, x, TOP_BRAND, BODY_SIZE, useHungarian)
}

async function drawSignature(
  page: PDFPage,
  base64Image: string,
  x: number,
  y: number,
  width = 120,
  height = 40
): Promise<void> {
  try {
    const base64 = base64Image.replace(/^data:image\/\w+;base64,/, '')
    const binary = new Uint8Array(Buffer.from(base64, 'base64'))
    const doc = page.doc as PDFDocument
    let image
    try {
      image = await doc.embedPng(binary)
    } catch {
      image = await doc.embedJpg(binary)
    }
    page.drawImage(image, { x, y: y - height, width, height })
  } catch {
    // ignore invalid image
  }
}

function getTemplateBuffer(type: 'kulfoldi' | 'belfoldi'): Promise<Uint8Array> {
  return type === 'kulfoldi' ? createMinimalKulfoldiTemplate() : createMinimalBelfoldiTemplate()
}

export async function fillKulfoldiPdf(data: ForeignTripData): Promise<Uint8Array> {
  const templateBuffer = await getTemplateBuffer('kulfoldi')
  const doc = await PDFDocument.load(templateBuffer)
  const customFont = await loadHungarianFont(doc)
  const font = customFont ?? (await doc.embedFont(StandardFonts.Helvetica))
  const useHungarian = !!customFont
  const page = doc.getPage(0)

  drawTextLine(
    page,
    font,
    'Külföldi kiküldetési utasítás és költségelszámolás',
    MARGIN_X,
    TOP_TITLE,
    TITLE_SIZE,
    useHungarian
  )

  drawSectionHeader(page, font, useHungarian, 'I. Kiküldetési adatok', 98)
  let y = drawRowsBlock(page, font, useHungarian, TOP_CONTENT_START, [
    { label: 'Munkáltató', value: data.employerName },
    { label: 'Munkavállaló', value: data.employeeName },
    { label: 'Beosztás', value: data.employeePosition },
    { label: 'Ország', value: data.country },
    { label: 'Város / viszonylat', value: data.cityOrViszonylat },
    { label: 'Kezdő dátum', value: data.startDate },
    { label: 'Záró dátum', value: data.endDate },
    { label: 'Napok száma', value: data.days != null ? `${data.days} nap` : '' },
    { label: 'Kiküldetés célja', value: data.purposeText, maxLines: 2 },
  ])

  drawSectionHeader(page, font, useHungarian, 'II. Költségtételek', y + 14)
  const flight = data.costs?.flightTickets ?? []
  const acc = data.costs?.accommodation ?? []
  const other = data.costs?.otherCosts ?? []

  y = drawRowsBlock(page, font, useHungarian, y + 40, [
    {
      label: 'Repülőjegy',
      value:
        flight.length > 0
          ? flight
              .slice(0, 4)
              .map(
                (f) =>
                  `${f.docNo} | ${f.place} | ${f.date} | ${f.legalTitle} | ${formatCurrency(f.amount, f.currency)}`
              )
              .join('; ')
          : '',
      maxLines: 2,
    },
    {
      label: 'Szállás',
      value:
        acc.length > 0
          ? acc
              .slice(0, 4)
              .map((a) => `${a.docNo} | ${a.viszonylat} | ${a.from}-${a.to} | ${formatCurrency(a.amountTotal, a.currency)}`)
              .join('; ')
          : '',
      maxLines: 2,
    },
    {
      label: 'Egyéb költség',
      value:
        other.length > 0
          ? other
              .slice(0, 4)
              .map(
                (o) => `${o.docNo} | ${o.place} | ${o.date} | ${o.legalTitle} | ${formatCurrency(o.amount, o.currency)}`
              )
              .join('; ')
          : '',
      maxLines: 2,
    },
    { label: 'Utazás oda', value: data.travelModeOut },
    { label: 'Utazás vissza', value: data.travelModeBack },
    { label: 'Helyközi jogosultság', value: data.localTravelEligible ? 'igen' : 'nem' },
  ])

  drawSectionHeader(page, font, useHungarian, 'III. Megjegyzések', y + 14)
  drawRowsBlock(page, font, useHungarian, y + 40, [
    { label: 'Megjegyzés', value: data.notesAuto ?? '', maxLines: 2 },
    {
      label: 'Nyilatkozat',
      value: 'szállásköltség nem tartalmaz reggelit; térítésmentes étkezésben nem részesültem.',
      maxLines: 2,
    },
  ])

  drawFooterMeta(
    page,
    font,
    useHungarian,
    safeString(data.issuedDate),
    safeString(data.attachmentsCount),
    safeString(data.orderedByName || data.employerName),
    TOP_FOOTER_META
  )

  drawTextLine(page, font, 'Aláírás (munkavállaló)', MARGIN_X, TOP_SIGNATURE_LABELS_FOREIGN, LABEL_SIZE, useHungarian)
  drawTextLine(page, font, 'Aláírás (elrendelő)', MARGIN_X + 280, TOP_SIGNATURE_LABELS_FOREIGN, LABEL_SIZE, useHungarian)

  if (data.signatures?.employeeSignature) {
    await drawSignature(page, data.signatures.employeeSignature, MARGIN_X, fromTop(TOP_SIGNATURE_LABELS_FOREIGN - 8))
  }
  if (data.signatures?.orderedBySignature) {
    await drawSignature(page, data.signatures.orderedBySignature, MARGIN_X + 280, fromTop(TOP_SIGNATURE_LABELS_FOREIGN - 8))
  }

  drawBrandFooter(page, font, useHungarian)
  return doc.save()
}

export async function fillBelfoldiPdf(data: DomesticTripData): Promise<Uint8Array> {
  const templateBuffer = await getTemplateBuffer('belfoldi')
  const doc = await PDFDocument.load(templateBuffer)
  const customFont = await loadHungarianFont(doc)
  const font = customFont ?? (await doc.embedFont(StandardFonts.Helvetica))
  const useHungarian = !!customFont
  const page = doc.getPage(0)

  drawTextLine(
    page,
    font,
    'Belföldi kiküldetési utasítás és költségelszámolás',
    MARGIN_X,
    TOP_TITLE,
    TITLE_SIZE,
    useHungarian
  )

  drawSectionHeader(page, font, useHungarian, 'I. Kiküldetési adatok', 98)
  let y = drawRowsBlock(page, font, useHungarian, TOP_CONTENT_START, [
    { label: 'Munkáltató', value: data.employerName },
    { label: 'Munkavállaló', value: data.employeeName },
    { label: 'Beosztás', value: data.employeePosition },
    { label: 'Város / viszonylat', value: data.cityOrViszonylat },
    { label: 'Kezdő dátum', value: data.startDate },
    { label: 'Záró dátum', value: data.endDate },
    { label: 'Napok száma', value: data.days != null ? `${data.days} nap` : '' },
    { label: 'Kiküldetés célja', value: data.purposeText, maxLines: 2 },
  ])

  drawSectionHeader(page, font, useHungarian, 'II. Költségek', y + 14)
  const items = data.costs?.items ?? []
  y = drawRowsBlock(page, font, useHungarian, y + 40, [
    {
      label: 'Költségösszesítő',
      value:
        items.length > 0
          ? items.map((i) => `${i.docNo} ${i.description} ${formatCurrency(i.amount, i.currency)}`).join('; ')
          : '',
      maxLines: 2,
    },
    { label: 'Utazás módja', value: data.travelMode },
  ])

  drawSectionHeader(page, font, useHungarian, 'III. Megjegyzések', y + 14)
  drawRowsBlock(page, font, useHungarian, y + 40, [
    { label: 'Megjegyzés', value: data.notesAuto ?? '', maxLines: 2 },
  ])

  drawFooterMeta(
    page,
    font,
    useHungarian,
    safeString(data.issuedDate),
    safeString(data.attachmentsCount),
    safeString(data.orderedByName || data.employerName),
    TOP_FOOTER_META - 120
  )

  drawTextLine(page, font, 'Aláírás (munkavállaló)', MARGIN_X, TOP_SIGNATURE_LABELS_DOMESTIC, LABEL_SIZE, useHungarian)
  drawTextLine(page, font, 'Aláírás (elrendelő)', MARGIN_X + 280, TOP_SIGNATURE_LABELS_DOMESTIC, LABEL_SIZE, useHungarian)

  if (data.signatures?.employeeSignature) {
    await drawSignature(page, data.signatures.employeeSignature, MARGIN_X, fromTop(TOP_SIGNATURE_LABELS_DOMESTIC - 8))
  }
  if (data.signatures?.orderedBySignature) {
    await drawSignature(page, data.signatures.orderedBySignature, MARGIN_X + 280, fromTop(TOP_SIGNATURE_LABELS_DOMESTIC - 8))
  }

  drawBrandFooter(page, font, useHungarian)
  return doc.save()
}
