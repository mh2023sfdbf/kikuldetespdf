import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { foreignDemoData, domesticDemoData } from '../lib/demo-data'
import { computeForeignDerived, computeDomesticDerived } from '../lib/schemas'
import { fillKulfoldiPdf, fillBelfoldiPdf } from '../lib/pdf/fill'

async function run() {
  const foreign = computeForeignDerived(foreignDemoData)
  const domestic = computeDomesticDerived(domesticDemoData)

  const [foreignPdf, domesticPdf] = await Promise.all([
    fillKulfoldiPdf(foreign),
    fillBelfoldiPdf(domestic),
  ])

  const publicDir = path.join(process.cwd(), 'public')
  await writeFile(path.join(publicDir, 'pelda-kulfoldi-filled.pdf'), foreignPdf)
  await writeFile(path.join(publicDir, 'pelda-belfoldi-filled.pdf'), domesticPdf)

  console.log('Example PDFs regenerated in /public')
}

run().catch((error) => {
  console.error('Failed to regenerate example PDFs')
  console.error(error)
  process.exit(1)
})
