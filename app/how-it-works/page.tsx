import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hogyan működik | Kiküldetési sablon',
  description: 'Lépésről lépésre: belföldi és külföldi kiküldetési PDF létrehozása a Kiküldetési sablonnal.',
  openGraph: {
    title: 'Hogyan működik | Kiküldetési sablon',
    description: 'Lépésről lépésre: belföldi és külföldi kiküldetési PDF létrehozása.',
  },
}

export default function HowItWorksPage() {
  return (
    <article className="prose prose-neutral max-w-none">
      <h1 className="font-heading font-bold text-heading-1 text-neutral-900">Hogyan működik?</h1>
      <p className="text-body text-neutral-700">
        A Kiküldetési sablon segít létrehozni a belföldi és külföldi kiküldetési utasítás és
        költségelszámolás dokumentumot, amely a könyveléshez szükséges tipikus mezőket tartalmazza.
      </p>

      <section className="mt-8">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-1">1. Típus választása</h2>
        <p className="text-body text-neutral-700">
          Kezdésként válassza: <strong>Belföldi</strong> vagy <strong>Külföldi</strong> kiküldetés.
          A megjelenő mezők és a generált PDF sablon ehhez igazodik.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-1">2. Alapadatok</h2>
        <p className="text-body text-neutral-700">
          Töltse ki a munkáltató nevét, a kiküldött munkavállaló adatait, beosztást, a kiküldetés
          célját és a kelt (engedély kelte) mezőt.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-1">3. Utazás</h2>
        <p className="text-body text-neutral-700">
          Dátumok, hely (város/viszonylat, külföldinél ország), utazás módja. A rendszer a napok
          számát automatikusan számolja.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-1">4. Napidíj és költségek</h2>
        <p className="text-body text-neutral-700">
          Ha napidíj jár, kapcsolja be és adja meg a napi összeget. A költségeknél (repülőjegy,
          szállás, egyéb) csak a releváns kategóriákat töltse ki; a PDF-ben csak ezek jelennek meg.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-1">5. Mellékletek és aláírások</h2>
        <p className="text-body text-neutral-700">
          Mellékletek száma kötelező. Az aláírásokat opcionálisan feltöltheti (képes fájl); ha nem,
          a PDF-ben üres aláírási mező marad.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-1">6. PDF letöltése</h2>
        <p className="text-body text-neutral-700">
          Összefoglaló után kattintson a „PDF letöltése” gombra. A dokumentum a választott sablon
          (belföldi vagy külföldi) szerint készül el, nyomtatható A4 formátumban.
        </p>
      </section>

      <p className="mt-8">
        <Link href="/generate" className="btn-primary">
          PDF létrehozása
        </Link>
      </p>
    </article>
  )
}
