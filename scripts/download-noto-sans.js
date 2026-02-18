#!/usr/bin/env node
/**
 * Downloads Noto Sans Regular TTF to public/fonts for Hungarian PDF support.
 * Run: node scripts/download-noto-sans.js
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const URL = 'https://cdn.jsdelivr.net/gh/googlefonts/noto-fonts@main/hinted/ttf/NotoSans/NotoSans-Regular.ttf';
const outDir = path.join(__dirname, '..', 'public', 'fonts');
const outFile = path.join(outDir, 'NotoSans-Regular.ttf');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

https.get(URL, (res) => {
  if (res.statusCode !== 200) {
    console.error('Download failed:', res.statusCode, res.statusMessage);
    process.exit(1);
  }
  const chunks = [];
  res.on('data', (chunk) => chunks.push(chunk));
  res.on('end', () => {
    const buf = Buffer.concat(chunks);
    fs.writeFileSync(outFile, buf);
    console.log('Saved:', outFile, `(${buf.length} bytes)`);
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
