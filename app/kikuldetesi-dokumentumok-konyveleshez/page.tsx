import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kiküldetési dokumentumok a könyveléshez | kikuldetespdf.hu',
  description:
    'Milyen kiküldetési dokumentumok kellenek a könyveléshez? Utasítás, költségelszámolás, mellékletek. NAV-barát sablon, egyszerű PDF generátor.',
  openGraph: {
    title: 'Kiküldetési dokumentumok a könyveléshez',
    description: 'Könyveléshez szükséges kiküldetési dokumentumok – PDF sablon.',
  },
}

export default function KikuldetesiDokumentumokKonyveleshezPage() {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="font-heading font-bold text-heading-1 text-neutral-900 mb-4">
        Kiküldetési dokumentumok a könyveléshez
      </h1>
      <p className="text-body text-neutral-700 mb-8 leading-relaxed">
        A munkavállaló kiküldetésével kapcsolatos kiadások és térítések könyveléséhez a
        munkáltatónak rendelkezésre kell állnia a kiküldetési utasítással, a költségelszámolással
        és – szükség esetén – a mellékletekkel. Összefoglaljuk, milyen dokumentumokra van szükség,
        és hogyan készíthet könyveléshez alkalmas PDF-et.
      </p>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          Kiküldetési utasítás (rendelvény)
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          A kiküldetési utasítás a munkáltató által kiadott írásbeli megbízás, amely tartalmazza a
          munkavállaló adatait, a kiküldetés célját, időtartamát, helyét és az utazással járó
          jogokat. Ez a dokumentum alapja a későbbi költségelszámolásnak és a könyvelésnek – e nélkül
          a kiadások nem megfelelően igazolhatók.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          Költségelszámolás és mellékletek
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          A költségelszámolás a felmerült vagy előre felvett kiadások (utazás, szállás, napidíj,
          egyéb) felsorolása és összesítése. A könyveléshez általában a számlák, bizonylatok
          mellékleteként csatolása szükséges – a generált PDF-ben a mellékletek számát rögzíteni
          lehet, és az aláírási mezőkön opcionálisan az aláírás is megjelenhet.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          Belföldi és külföldi sablon
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          A könyveléshez használt dokumentum struktúrája belföldi és külföldi kiküldetésnél eltér:
          a külföldi sablon tartalmazza az országot, a repülőjegy és szállás kategóriákat, a
          belföldi pedig a jármű és útsor adatokat. A kikuldetespdf.hu mindkét típusú, könyveléshez
          használható PDF-et előállítja egyszerű űrlap kitöltésével.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          PDF generálás könyveléshez
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          Regisztráció nélkül kitöltheti a kiküldetési űrlapot, kiválasztja a belföldi vagy
          külföldi sablont, és letölti a kész PDF dokumentumot. A fájl A4 formátumú, nyomtatható,
          és a szokásos kiküldetési utasítás és költségelszámolás struktúráját követi – a
          munkáltató és a könyvelő igénye szerint használható.
        </p>
        <p className="mt-6">
          <Link href="/generate" className="btn-primary">
            PDF létrehozása
          </Link>
        </p>
      </section>

      <p className="text-body-sm text-neutral-600 mt-8">
        <Link href="/kikuldetesi-rendelveny" className="underline underline-offset-2 hover:text-neutral-900">
          Kiküldetési rendelvény
        </Link>
        {' · '}
        <Link href="/how-it-works" className="underline underline-offset-2 hover:text-neutral-900">
          Hogyan működik
        </Link>
      </p>
    </article>
  )
}
