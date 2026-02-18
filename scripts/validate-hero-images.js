const fs = require('fs')
const path = require('path')

const checks = [
  { name: 'kikuldetespdf-generator-1.png', minBytes: 20_000, minW: 400, minH: 300 },
  { name: 'kikuldetespdf-generator-2.png', minBytes: 20_000, minW: 400, minH: 300 },
]

function readPngSize(buffer) {
  const sig = buffer.subarray(0, 8)
  const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  if (!sig.equals(pngSig)) return null
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  }
}

let failed = false

for (const check of checks) {
  const file = path.join(process.cwd(), 'public', check.name)
  if (!fs.existsSync(file)) {
    console.error(`[hero-images] Missing file: ${check.name}`)
    failed = true
    continue
  }

  const buffer = fs.readFileSync(file)
  const size = readPngSize(buffer)
  if (!size) {
    console.error(`[hero-images] Not a PNG file: ${check.name}`)
    failed = true
    continue
  }

  const tooSmallBytes = buffer.length < check.minBytes
  const tooSmallDims = size.width < check.minW || size.height < check.minH
  if (tooSmallBytes || tooSmallDims) {
    console.error(
      `[hero-images] Invalid hero image ${check.name} (${size.width}x${size.height}, ${buffer.length} bytes). ` +
      `Please replace it with the real uploaded image.`
    )
    failed = true
  }
}

if (failed) process.exit(1)
console.log('[hero-images] Hero images look valid')

