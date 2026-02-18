const XLSX = require('xlsx');
const path = require('path');

const files = [
  '/Users/marta/Desktop/kulfoldi-kikuldetesi-utalvany-minta_87af35bce4.xls',
  '/Users/marta/Desktop/belfoldi-kikuldetesi-utal_f4cabbe997 (1).xls',
];

function inspect(path) {
  try {
    const wb = XLSX.readFile(path, { cellDates: true });
    console.log('\n===', path.split('/').pop(), '===');
    console.log('Sheet names:', wb.SheetNames);
    wb.SheetNames.forEach((name, i) => {
      const ws = wb.Sheets[name];
      const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
      console.log(`\nSheet "${name}" (index ${i}): rows ${range.s.r + 1}-${range.e.r + 1}, cols ${range.s.c}-${range.e.c}`);
      const json = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      json.slice(0, 75).forEach((row, ri) => {
        const line = row.map(c => (c === undefined || c === null ? '' : String(c)).slice(0, 40)).join(' | ');
        if (line.trim()) console.log(`${(ri + 1).toString().padStart(2)}: ${line}`);
      });
    });
  } catch (e) {
    console.error(path, e.message);
  }
}

files.forEach(inspect);
