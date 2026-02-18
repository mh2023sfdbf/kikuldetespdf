# Kiküldetési sablon

Belföldi és külföldi kiküldetési utasítás és költségelszámolás PDF generátor. Magyar nyelvű űrlap, NAV-barát sablonok.

## Funkciók

- **Belföldi és külföldi** kiküldetés típus választó
- Lépésenkénti varázsló: típus → alapadatok → utazás → napidíj → költségek → mellékletek és aláírások → PDF letöltés
- **pdf-lib** alapú sablon kitöltés (koordináta térképek: `lib/pdf/maps/kulfoldi.ts`, `lib/pdf/maps/belfoldi.ts`)
- Ha nincs külső sablon PDF, a rendszer minimális beépített sablont használ
- Automatikus „Egyéb feljegyzések” szöveg a kiválasztott költségek alapján
- Demo adatok gomb
- SSG marketing oldalak (/, /how-it-works, /templates, /legal/*), SEO (sitemap, robots, FAQ JSON-LD)

## Tech stack

- Next.js 14 App Router, TypeScript
- Tailwind CSS, Framer Motion
- react-hook-form, zod
- pdf-lib (sablon overlay, nem @react-pdf/renderer)

## Telepítés és futtatás

```bash
npm install
npm run dev
```

A dev szerver alapértelmezetten a 3001-es porton indul. Más port: `npm run dev -- -p 3004`.

## Build és deploy (Vercel)

```bash
npm run build
npm start
```

Vercelre: kösd a repót, a build parancs `next build`, a kimenet a `.next` mappa. Opcionálisan állíts be `NEXT_PUBLIC_BASE_URL` a sitemap és robots alap URL-jéhez.

## Projektstruktúra

- `app/` – oldalak (/, /generate, /how-it-works, /templates, /legal/privacy, /legal/terms) és `app/api/pdf` (POST)
- `lib/schemas.ts` – zod sémák (közös mezők, ForeignTrip, DomesticTrip, API body)
- `lib/demo-data.ts` – demo adatok a varázslóhoz
- `lib/pdf/` – PDF generálás: `maps/` (koordináták), `fill.ts` (kitöltés), `create-templates.ts` (fallback sablonok)
- `components/` – UI (Button, Input), varázsló lépések (StepType, StepBasics, …)

## Sablonok

A külföldi és belföldi PDF sablonok jelenleg a kódban generált minimális A4 sablonok. Ha van könyvelő által biztosított sablon PDF:

- **Külföldi:** helyezd a `public/templates/kulfoldi-template.pdf` helyre (és a `lib/pdf/fill.ts`-ben töltsd be ezt a fájlt, ha létezik).
- **Belföldi:** ugyanígy `public/templates/belfoldi-template.pdf`.

A koordináta térképek (`lib/pdf/maps/kulfoldi.ts`, `belfoldi.ts`) a mezők pozícióit tartalmazzák; szükség szerint finomhangolhatók.

## Megjegyzés

Az alkalmazás nem minősül hivatalos NAV jóváhagyású megoldásnak. A dokumentumok a könyveléshez szükséges tipikus mezőket és szerkezetet tartalmazzák; a végleges elfogadás a munkáltató és a könyvelő gyakorlatától függ.
