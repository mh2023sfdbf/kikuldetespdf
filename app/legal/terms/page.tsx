import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Felhasználási feltételek | Kiküldetési sablon',
  description: 'Kiküldetési sablon felhasználási feltételei.',
  openGraph: {
    title: 'Felhasználási feltételek | Kiküldetési sablon',
  },
}

export default function TermsPage() {
  return (
    <article className="prose prose-neutral max-w-none">
      <h1 className="font-heading font-bold text-heading-1 text-neutral-900">Felhasználási feltételek</h1>
      <p className="text-body-sm text-neutral-600">Utolsó frissítés: 2025.</p>

      <section className="mt-6">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-1">Szolgáltatás</h2>
        <p className="text-body text-neutral-700">
          A Kiküldetési sablon egy PDF-generáló alkalmazás belföldi és külföldi kiküldetési
          dokumentumokhoz. A generált dokumentumok a felhasználó által megadott adatok alapján
          készülnek; a szolgáltatás nem nyújt jogi vagy könyvelési tanácsadást.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-1">Felelősség</h2>
        <p className="text-body text-neutral-700">
          A dokumentumok tartalmáért és a könyvelési / adóügyi megfelelésért a felhasználó és a
          munkáltató a felelős. Az alkalmazás nem minősül hivatalos NAV jóváhagyású megoldásnak.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-1">Elfogadás</h2>
        <p className="text-body text-neutral-700">
          A szolgáltatás használatával a felhasználó elfogadja ezeket a feltételeket.
        </p>
      </section>
    </article>
  )
}
