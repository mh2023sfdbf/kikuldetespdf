# Fonts for PDF generation

Place **NotoSans-Regular.ttf** here for Hungarian characters (á, é, ő, ű, etc.) in generated PDFs.

**Quick setup:**

```bash
node scripts/download-noto-sans.js
```

Or download manually from:  
https://github.com/googlefonts/noto-fonts/raw/main/hinted/ttf/NotoSans/NotoSans-Regular.ttf  
and save as `NotoSans-Regular.ttf` in this folder.

If the file is missing, the app will try to load the font from a CDN when generating PDFs; having it here avoids network requests and works offline.
