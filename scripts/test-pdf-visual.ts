import assert from 'node:assert/strict'
import { foreignDemoData, domesticDemoData } from '../lib/demo-data'
import { computeForeignDerived, computeDomesticDerived } from '../lib/schemas'
import { fillKulfoldiPdf, fillBelfoldiPdf } from '../lib/pdf/fill'

async function run() {
  const foreign = computeForeignDerived(foreignDemoData)
  const domestic = computeDomesticDerived(domesticDemoData)

  const f = await fillKulfoldiPdf(foreign)
  const d = await fillBelfoldiPdf(domestic)

  assert.ok(f.byteLength > 5000, 'foreign pdf should not be empty')
  assert.ok(d.byteLength > 5000, 'domestic pdf should not be empty')

  console.log('PDF visual smoke tests passed')
}

run().catch((error) => {
  console.error('PDF visual smoke tests failed')
  console.error(error)
  process.exit(1)
})
