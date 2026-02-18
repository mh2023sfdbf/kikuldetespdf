import assert from 'node:assert/strict'
import { PDFDocument, StandardFonts } from 'pdf-lib'
import {
  wrapTextByWidth,
  withEllipsis,
  widthAt,
  computeLabelValueLayout,
  computeLineBaselines,
  hasBaselineOverlap,
} from '../lib/pdf/layout'

async function loadFont() {
  const doc = await PDFDocument.create()
  return doc.embedFont(StandardFonts.Helvetica)
}

async function testWrapTextByWidth() {
  const font = await loadFont()
  const maxWidth = 120
  const fontSize = 10
  const text =
    'Travel costs with long document identifiers and comments to verify stable and non-overlapping line wrapping.'
  const lines = wrapTextByWidth(text, maxWidth, font, fontSize)

  assert.ok(lines.length > 1, 'expected wrapped output to produce multiple lines')
  for (const line of lines) {
    assert.ok(widthAt(font, line, fontSize) <= maxWidth, `line overflowed: "${line}"`)
  }
}

async function testWithEllipsis() {
  const font = await loadFont()
  const fontSize = 10
  const maxWidth = 120
  const raw = 'kikuldetespdf.hu-professional-layout-quality-check'
  const out = withEllipsis(raw, maxWidth, font, fontSize)

  assert.ok(out.endsWith('...'), 'expected ellipsis suffix')
  assert.ok(widthAt(font, out, fontSize) <= maxWidth, 'ellipsis result overflowed')
}

function testLabelValueBreak() {
  const layout = computeLabelValueLayout({
    x: 52,
    y: 620,
    fullWidth: 420,
    labelWidth: 350,
    lineHeight: 18,
  })

  assert.equal(layout.breakAfterLabel, true)
  assert.equal(layout.valueStartX, 52)
  assert.equal(layout.valueStartY, 602)
  assert.equal(layout.valueMaxWidth, 420)
}

function testLineBaselineSpacing() {
  const ys = computeLineBaselines(700, 5, 18)
  assert.equal(hasBaselineOverlap(ys, 18), false)
  assert.equal(hasBaselineOverlap(ys, 18.1), true)
}

async function run() {
  await testWrapTextByWidth()
  await testWithEllipsis()
  testLabelValueBreak()
  testLineBaselineSpacing()
  console.log('PDF layout tests passed')
}

run().catch((error) => {
  console.error('PDF layout tests failed')
  console.error(error)
  process.exit(1)
})
