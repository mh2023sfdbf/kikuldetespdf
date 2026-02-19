import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Költségelszámolás kiküldetéshez | kikuldetespdf.hu',
  description:
    'Kiküldetési költségelszámolás: utazási költség, szállás, napidíj, dologi kiadások. PDF sablon belföldre és külföldre, könyveléshez és NAV igazoláshoz.',
  openGraph: {
    title: 'Költségelszámolás kiküldetéshez',
    description: 'Kiküldetési költségek rögzítése és elszámolása – PDF generátor.',
  },
}

export default function KoltsegelszamolasKikuldetesPage() {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="font-heading font-bold text-heading-1 text-neutral-900 mb-4">
        Költségelszámolás kiküldetéshez
      </h1>
      <p className="text-body text-neutral-700 mb-8 leading-relaxed">
        A kiküldetési költségelszámolás a munkavállaló által a kiküldetés során felmerült vagy
        előre felvett kiadások (utazás, szállás, napidíj, egyéb) rögzítése és a munkáltató általi
        megállapítása. A dokumentum a könyvelés és az adóhatóság számára igazolja a kiadások
        jogosságát. Egyszerű PDF sablonnal készítheti el a költségelszámolást.
      </p>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          Milyen költségek kerülnek elszámolásra?
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          Belföldi kiküldetésnél: utazási költség (pl. vonatjegy), üzemanyag és amortizáció
          saját jármű esetén, napidíj (élelmezési költségtérítés), egyéb kiadások. Külföldi
          kiküldetésnél: repülőjegy vagy egyéb utazási költség, szállás, napidíj, dologi kiadások.
          A kikuldetespdf.hu sablonjai ezeket a kategóriákat külön mezőkben és táblázatokban
          tartalmazzák.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          Könyvelés és adóhatóság
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          A költségelszámolás a munkáltató könyvelésében a kiadások és a térítések
          nyilvántartásához szükséges. A dokumentum nem minősül hivatalos NAV jóváhagyású
          megoldásnak, de a szokásos kiküldetési struktúrát követi, így a könyvelő és a
          munkáltató gyakorlata szerint használható. A generált PDF letölthető, nyomtatható és
          archíválható.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          Költségelszámolás PDF készítése
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          Válassza a belföldi vagy külföldi sablont, töltse ki a kiküldetés adatait és a
          költségtételeket (repülőjegy, szállás, napidíj, egyéb – a sablontól függően). A
          generátor egy kattintással létrehozza a könyveléshez használható PDF dokumentumot.
        </p>
        <p className="mt-6">
          <Link href="/generate" className="btn-primary">
            Költségelszámolás PDF létrehozása
          </Link>
        </p>
      </section>

      <p className="text-body-sm text-neutral-600 mt-8">
        <Link href="/napidij-elszamolas" className="underline underline-offset-2 hover:text-neutral-900">
          Napidíj elszámolás
        </Link>
        {' · '}
        <Link href="/kikuldetesi-dokumentumok-konyveleshez" className="underline underline-offset-2 hover:text-neutral-900">
          Kiküldetési dokumentumok a könyveléshez
        </Link>
      </p>
    </article>
  )
}
