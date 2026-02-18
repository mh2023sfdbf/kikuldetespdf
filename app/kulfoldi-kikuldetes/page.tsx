import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Külföldi kiküldetési utasítás és költségelszámolás | kikuldetespdf.hu',
  description:
    'Külföldi kiküldetési PDF: utasítás, felvett előlegek, repülőjegy, szállás, napidíj elszámolás. Egyszerű sablon könyveléshez és NAV igazoláshoz.',
  openGraph: {
    title: 'Külföldi kiküldetési utasítás és költségelszámolás',
    description: 'Külföldi kiküldetési PDF generátor – repülő, szállás, napidíj.',
  },
}

export default function KulfoldiKikuldetesPage() {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="font-heading font-bold text-heading-1 text-neutral-900 mb-4">
        Külföldi kiküldetési utasítás és költségelszámolás
      </h1>
      <p className="text-body text-neutral-700 mb-8 leading-relaxed">
        A külföldi kiküldetési utasítás és költségelszámolás a nemzetközi üzleti utazások
        nyilvántartására szolgál: ország, dátumok, utazás módja, repülőjegy, szállás, napidíj és egyéb
        kiadások. Egyszerű űrlappal könyveléshez használható PDF-et készíthet.
      </p>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          A külföldi kiküldetési dokumentum részei
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          A sablon tipikusan három fő részből áll: (I.) Kiküldetési utasítás – a munkavállaló és a
          kiküldetés adatai, ország, város, dátumok, utazás módja; (II.) Felvett előlegek –
          előlegek összesítése; (III.) Költségelszámolás – utazási költségek (repülőjegy), szállás,
          napidíj, dologi kiadások. A generátor ezeket a szakaszokat és mezőket tartalmazza.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          Repülőjegy, szállás és napidíj külföldön
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          A külföldi kiküldetésnél gyakran el kell számolni a repülőjegyeket, a szállás költségeit és
          a napidíjat (HUF vagy külföldi pénznemben). A PDF sablonban ezeket a kategóriákat
          külön-külön tudja kitölteni, a könyvelés és az adóhatóság számára áttekinthető formában.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          Külföldi kiküldetési PDF készítése
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          A kikuldetespdf.hu-n válassza a „Külföldi” sablont, adja meg a munkáltató és
          munkavállaló adatait, az országot, várost, dátumokat, utazás módját, és opcionálisan a
          repülőjegy, szállás, napidíj és egyéb kiadás adatokat. A rendszer egy kattintással
          létrehozza a letölthető PDF dokumentumot.
        </p>
        <p className="mt-6">
          <Link href="/generate" className="btn-primary">
            Külföldi PDF létrehozása
          </Link>
        </p>
      </section>

      <p className="text-body-sm text-neutral-600 mt-8">
        <Link href="/belfoldi-kikuldetes" className="underline underline-offset-2 hover:text-neutral-900">
          Belföldi kiküldetési utasítás
        </Link>
        {' · '}
        <Link href="/napidij-elszamolas" className="underline underline-offset-2 hover:text-neutral-900">
          Napidíj elszámolás
        </Link>
      </p>
    </article>
  )
}
