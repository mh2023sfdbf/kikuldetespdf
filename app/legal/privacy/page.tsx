import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Adatvédelmi nyilatkozat | Kiküldetési sablon',
  description: 'Kiküldetési sablon adatvédelmi nyilatkozata.',
  openGraph: {
    title: 'Adatvédelmi nyilatkozat | Kiküldetési sablon',
  },
}

export default function PrivacyPage() {
  return (
    <article className="prose prose-neutral max-w-none">
      <h1 className="font-heading font-bold text-heading-1 text-neutral-900">Adatvédelmi nyilatkozat</h1>
      <p className="text-body-sm text-neutral-600">Utolsó frissítés: 2025.</p>

      <section className="mt-6">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-1">Általános</h2>
        <p className="text-body text-neutral-700">
          A Kiküldetési sablon szolgáltatás használata során az Ön által megadott adatokat (űrlap
          tartalma, aláírások) kizárólag a PDF generáláshoz használjuk. Az adatokat nem tároljuk
          állandóan, kivéve, ha később opcionális mentési funkciót kapcsolunk be (pl. Supabase).
        </p>
      </section>

      <section className="mt-6">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-1">Sütik és analitika</h2>
        <p className="text-body text-neutral-700">
          Opcionálisan Plausible analitikát használhatunk, amely nem követ sütikkel; a látogatási
          statisztikák névtelenek maradnak.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-1">Kapcsolat</h2>
        <p className="text-body text-neutral-700">
          Adatvédelmi kérdésekkel a szolgáltatás üzemeltetőjével lehet felvenni a kapcsolatot.
        </p>
      </section>
    </article>
  )
}
