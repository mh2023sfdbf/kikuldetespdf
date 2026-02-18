# Hibaelhárítás / Troubleshooting

## „Internal Server Error” lokálisan (localhost:3004)

Ha a böngészőben **Internal Server Error** jelenik meg:

1. **Állítsd le a dev szervert** (terminálban `Ctrl+C`).
2. **Töröld a build cache-t**, majd indítsd újra:
   ```bash
   npm run dev:doctor
   ```
   Ez törli a `.next` mappát és elindítja a dev szervert a 3004-es porton.
3. **Hard refresh a böngészőben**: `Cmd+Shift+R` (Mac) vagy `Ctrl+Shift+R` (Windows/Linux), vagy nyisd meg az oldalt inkognitóban.

Ha még mindig 500 a válasz, nézd meg a **terminál kimenetét** (ahol a `npm run dev` fut) – ott megjelenik a valódi hibaüzenet és stack trace.

## Gyakori okok

- **Régi cache**: A `.next` mappa régi állapotot tárolt (pl. hiányzó képek miatt). A `dev:doctor` ezt törli.
- **Böngésző cache**: A böngésző a korábbi 500-as választ mutatja. Hard refresh vagy inkognitó segít.
- **Más port**: A `package.json` alapértelmezetten 3004-et használ. Ha máshol futtatod, a megfelelő URL: `http://localhost:<port>`.

## Egyéb parancsok

| Parancs | Leírás |
|--------|--------|
| `npm run dev` | Dev szerver 3004-en (cache megmarad) |
| `npm run dev:doctor` | Cache törlése + dev szerver (ajánlott 500 után) |
| `npm run dev:clean` | Ugyanaz, mint a `dev:doctor` |
| `npm run build` | Production build (ellenőrzés) |
