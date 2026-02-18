import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sablonok | Kiküldetési sablon',
  description: 'Belföldi és külföldi kiküldetési sablonok: struktúra, szakaszok, könyvelési megfelelőség.',
  openGraph: {
    title: 'Sablonok | Kiküldetési sablon',
    description: 'Belföldi és külföldi kiküldetési sablonok.',
  },
}

export default function TemplatesPage() {
  return (
    <article className="prose prose-neutral max-w-none">
      <h1 className="font-heading font-bold text-heading-1 text-neutral-900">Sablonok</h1>
      <p className="text-body text-neutral-700">
        A Kiküldetési sablon két típusú dokumentumot generál: belföldi és külföldi kiküldetési
        utasítás és költségelszámolás. Mindkettő a könyveléshez szükséges tipikus mezőket és
        szakaszokat tartalmazza.
      </p>

      <section className="mt-8">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-1">Külföldi kiküldetés</h2>
        <p className="text-body text-neutral-700">
          A külföldi sablon a „Külföldi kiküldetési utasítás és költségelszámolás” struktúráját
          követi: I. Kiküldetési utasítás, II. Felvett előlegek / Elszámolások összesítése,
          III. Költségelszámolás (7–10. táblázatok: utazási költségek, szállás, napidíj, dologi
          kiadások), Egyéb feljegyzések, nyilatkozat a szállásról és az ellátásról, kelt,
          mellékletek száma és aláírási mezők.
        </p>
        <p className="mt-2">
          <a href="/templates/kulfoldi-minta.xls" download className="text-neutral-800 hover:text-neutral-900 font-medium transition-colors underline underline-offset-2 decoration-pop hover:decoration-neutral-900">
            Excel minta letöltése (külföldi)
          </a>
        </p>
      </section>

      <section className="mt-6">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-1">Belföldi kiküldetés</h2>
        <p className="text-body text-neutral-700">
          A belföldi sablon a magyarországi kiküldetés adatait és költségeit tartalmazza: kiküldetési
          rendelvény – hivatali, üzleti utazás költségtérités (munkáltató, munkavállaló, járműadatok,
          útsorok: Dátuma, Honnan, Hova, Célja, Futásteljesítmény, Üzemanyag, Amortizáció, Napidíj).
        </p>
        <p className="mt-2">
          <a href="/templates/belfoldi-minta.xls" download className="text-neutral-800 hover:text-neutral-900 font-medium transition-colors underline underline-offset-2 decoration-pop hover:decoration-neutral-900">
            Excel minta letöltése (belföldi)
          </a>
        </p>
      </section>

      <p className="mt-8 text-body-sm text-neutral-600">
        Az alkalmazás nem minősül hivatalos NAV jóváhagyású megoldásnak. A dokumentum a könyveléshez
        szükséges mezőket és szerkezetet biztosítja; a végleges elfogadás a munkáltató és a
        könyvelő gyakorlatától függ.
      </p>

      <p className="mt-6">
        <Link href="/generate" className="btn-primary">
          PDF létrehozása
        </Link>
      </p>
    </article>
  )
}
