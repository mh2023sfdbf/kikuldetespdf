/**
 * Minimal blank A4 templates.
 * All text and branding are drawn by fill.ts.
 */
import { PDFDocument } from 'pdf-lib'
import { A4 } from './design'

export async function createMinimalKulfoldiTemplate(): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  doc.addPage([A4.width, A4.height])
  return doc.save()
}

export async function createMinimalBelfoldiTemplate(): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  doc.addPage([A4.width, A4.height])
  return doc.save()
}
