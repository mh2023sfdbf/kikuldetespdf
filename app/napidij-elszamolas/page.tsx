import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Napidíj elszámolás és könyvelés | kikuldetespdf.hu',
  description:
    'Napidíj (élelmezési költségtérítés) elszámolása kiküldetésnél: belföld és külföld, HUF és deviza. PDF sablon napidíj mezőkkel, könyveléshez.',
  openGraph: {
    title: 'Napidíj elszámolás és könyvelés',
    description: 'Napidíj rögzítése kiküldetési dokumentumban – egyszerű PDF generátor.',
  },
}

export default function NapidijElszamolasPage() {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="font-heading font-bold text-heading-1 text-neutral-900 mb-4">
        Napidíj elszámolás és könyvelés
      </h1>
      <p className="text-body text-neutral-700 mb-8 leading-relaxed">
        A napidíj (élelmezési költségtérítés) a kiküldetés során felmerülő napi összeg, amit a
        munkavállaló a kiküldetési dokumentumban elszámol. Belföldön és külföldön egyaránt
        használatos, HUF-ban vagy devizában. Ismerje meg, hogyan jelenik meg a napidíj a
        kiküldetési PDF-ben és hogyan készíthet könyvelésre alkalmas dokumentumot.
      </p>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          Mi a napidíj a kiküldetésnél?
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          A napidíj az üzleti utazás során az élelmezési költségek megtérítésére szolgáló napi
          összeg. A munkáltató és a munkavállaló között megállapodás, illetve jogszabály szerint
          kerül megállapításra. A kiküldetési utasítás és költségelszámolás dokumentumban a napidíj
          járása, a napi összeg és a napok számának alapján számított összesített összeg szerepel.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          Napidíj belföldön és külföldön
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          Belföldi kiküldetésnél a napidíj általában HUF-ban kerül megállapításra. Külföldi
          kiküldetésnél gyakran devizában (pl. EUR, USD) adható meg, a dokumentumban pedig a napi
          összeg, a napok száma és a számított összeg jelenik meg. A kikuldetespdf.hu generátor
          mindkét sablonban tartalmaz napidíj mezőket.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
          PDF dokumentum napidíjjal
        </h2>
        <p className="text-body text-neutral-700 mb-4 leading-relaxed">
          A kiküldetési PDF generátorban a „Napidíj jár” opció bekapcsolásával megadhatja a napi
          összeget és a pénznemet. A rendszer a kiküldetés napjainak számát a megadott kezdő és záró
          dátum alapján számolja, és a dokumentumban a napidíj összesített összege is megjelenik –
          könyveléshez és igazoláshoz kész dokumentummal.
        </p>
        <p className="mt-6">
          <Link href="/generate" className="btn-primary">
            PDF létrehozása napidíjjal
          </Link>
        </p>
      </section>

      <p className="text-body-sm text-neutral-600 mt-8">
        <Link href="/koltsegelszamolas-kikuldetes" className="underline underline-offset-2 hover:text-neutral-900">
          Költségelszámolás kiküldetéshez
        </Link>
        {' · '}
        <Link href="/kulfoldi-kikuldetes" className="underline underline-offset-2 hover:text-neutral-900">
          Külföldi kiküldetés
        </Link>
      </p>
    </article>
  )
}
