import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Belföldi kiküldetési utasítás és költségtérítés | kikuldetespdf.hu',
  description:
    'Belföldi kiküldetési rendelvény PDF sablon: hivatali és üzleti utazás költségtérítése, napidíj, járműadatok. Egyszerű űrlap, könyveléshez alkalmas dokumentum.',
  openGraph: {
    title: 'Belföldi kiküldetési utasítás és költségtérítés',
    description: 'Belföldi kiküldetési PDF generátor – költségtérítés, napidíj, útsorok.',
  },
}

export default function BelfoldiKikuldetesPage() {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="font-heading font-bold text-heading-1 text-neutral-900 mb-4">
        Belföldi kiküldetési utasítás és költségtérítés
      </h1>
      <p className="text-body text-neutral-700 mb-8 leading-relaxed">
        A belföldi kiküldetési rendelvény a magyarországi üzleti és hivatali utazások
        nyilvántartására, valamint a költségtérítés (napidíj, üzemanyag, amortizáció) elszámolására
        szolgál. Egyszerű űrlap kitöltésével könyveléshez használható PDF dokumentumot készíthet.
      </p>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          Mi tartozik a belföldi kiküldetési dokumentumba?
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          A belföldi sablon a munkáltató és munkavállaló adatait, a kiküldetés célját, időtartamát,
          a város vagy viszonylatot, valamint az utazás módját rögzíti. Opcionálisan tartalmazza a
          jármű adatait (rendszám, üzemanyag, fogyasztási norma, amortizáció) és az útsorokat
          (dátum, honnan–hova, cél, futásteljesítmény, üzemanyag- és amortizációs költség, napidíj).
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          Költségtérítés és napidíj belföldön
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          A belföldi kiküldetésnél a költségtérítés általában az üzemanyag és amortizáció
          elszámolását, valamint az élelmezési költségtérítés (napidíj) megjelölését tartalmazza. A
          generált PDF ezeket a mezőket és táblázatokat tartalmazza, így a könyvelő vagy
          munkáltató egyszerűen rögzítheti a kiadásokat.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          Belföldi kiküldetési PDF készítése
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          A kikuldetespdf.hu generátorban válassza a „Belföldi” sablont, töltse ki a munkáltató és
          munkavállaló adatait, a kiküldetés célját, dátumait és az utazás módját. Szükség esetén
          adja meg a jármű és útsor adatokat, majd egy kattintással töltse le a kész PDF-et.
        </p>
        <p className="mt-6">
          <Link href="/generate" className="btn-primary">
            Belföldi PDF létrehozása
          </Link>
        </p>
      </section>

      <p className="text-body-sm text-neutral-600 mt-8">
        <Link href="/kulfoldi-kikuldetes" className="underline underline-offset-2 hover:text-neutral-900">
          Külföldi kiküldetési utasítás
        </Link>
        {' · '}
        <Link href="/templates" className="underline underline-offset-2 hover:text-neutral-900">
          Sablonok
        </Link>
      </p>
    </article>
  )
}
