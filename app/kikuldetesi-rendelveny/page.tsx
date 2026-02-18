import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Kiküldetési rendelvény: mi az és mikor kell? | kikuldetespdf.hu',
  description:
    'A kiküldetési rendelvény a munkavállaló üzleti utazásának hivatalos nyilvántartása. Ismerje meg, mikor kell, milyen adatokat tartalmaz, és hogyan készíthet NAV-barát dokumentumot.',
  openGraph: {
    title: 'Kiküldetési rendelvény: mi az és mikor kell?',
    description: 'A kiküldetési rendelvény tartalma, kötelezettség és egyszerű PDF generálás.',
  },
}

export default function KikuldetesiRendelvenyPage() {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="font-heading font-bold text-heading-1 text-neutral-900 mb-4">
        Kiküldetési rendelvény: mi az és mikor kell?
      </h1>
      <p className="text-body text-neutral-700 mb-8 leading-relaxed">
        A kiküldetési rendelvény (más néven kiküldetési utasítás) a munkavállaló által végzett üzleti,
        hivatali utazás nyilvántartására és a költségtérítés elszámolására szolgáló dokumentum.
        Ismerje meg, mikor kötelező, milyen adatokat kell tartalmaznia, és hogyan készíthet
        könyvelésre alkalmas PDF-et egyszerűen.
      </p>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          Mi az a kiküldetési rendelvény?
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          A kiküldetési rendelvény a munkáltató által kiadott, írásbeli utasítás, amely rögzíti a
          munkavállaló kiküldetésének célját, időtartamát, helyét és az utazással járó jogokat
          (napidíj, költségtérítés). A dokumentum a belföldi és külföldi üzleti utazások
          nyilvántartására egyaránt használható, és a könyveléshez, valamint az adóhatóság számára
          történő igazoláshoz szükséges.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          Mikor kell kiküldetési rendelvényt készíteni?
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          Akkor kell kiküldetési utasítást és költségelszámolást készíteni, ha a munkavállaló
          hivatali vagy üzleti célú utazást végez (belföldön vagy külföldön), és napidíjra, utazási
          költségtérítésre vagy egyéb kiadás megtérítésére jogosult. A dokumentum a munkáltató
          könyvelésében és az adóellenőrzésnél igazolja a kiadás jogosságát.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          Belföldi és külföldi kiküldetés
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          A belföldi kiküldetési rendelvény a magyarországi üzleti utazásokat, a külföldi
          kiküldetési utasítás és költségelszámolás pedig a nemzetközi utazásokat dokumentálja. A
          két típus eltérő mezőket és táblázatokat tartalmaz (pl. külföldinél ország, repülőjegy,
          szállás), ezért érdemes a megfelelő sablont választani.
        </p>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          A <strong>kikuldetespdf.hu</strong> generátorral mindkét típusú dokumentumot gyorsan,
          űrlap kitöltésével készítheti el, majd egy kattintással letöltheti a PDF-et.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          PDF generálás egyszerűen
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          Regisztráció nélkül, ingyenesen kitöltheti a kiküldetési űrlapot, kiválasztja a belföldi
          vagy külföldi sablont, és a rendszer létrehozza a könyveléshez használható PDF dokumentumot.
          A generált fájl nyomtatható, A4 formátumú, és a szokásos kiküldetési struktúrát követi.
        </p>
        <p className="mt-6">
          <Link href="/generate" className="btn-primary">
            PDF létrehozása
          </Link>
        </p>
      </section>

      <p className="text-body-sm text-neutral-600 mt-8">
        <Link href="/how-it-works" className="underline underline-offset-2 hover:text-neutral-900">
          Hogyan működik a generátor
        </Link>
        {' · '}
        <Link href="/templates" className="underline underline-offset-2 hover:text-neutral-900">
          Sablonok
        </Link>
      </p>
    </article>
  )
}
