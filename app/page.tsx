import Link from 'next/link'
import FAQAccordion from '@/components/FAQAccordion'

const FAQ = [
  {
    question: 'Belföldi és külföldi kiküldetésre is készíthetek PDF-et?',
    answer: 'Igen. A generátor első lépésében választhat a belföldi vagy a külföldi kiküldetés között. A megjelenő mezők és a generált sablon ehhez igazodik.',
  },
  {
    question: 'A generált dokumentum megfelel a könyvelésnek?',
    answer: 'A PDF a szokásos kiküldetési utasítás és költségelszámolás struktúráját követi, és a könyveléshez szükséges tipikus mezőket tartalmazza. Nem minősül hivatalos NAV jóváhagyású megoldásnak; a végleges elfogadás a munkáltató és könyvelő gyakorlatától függ.',
  },
  {
    question: 'Kell regisztrálnom vagy bejelentkeznem?',
    answer: 'Nem. Az alkalmazás vendég módban használható; regisztráció és bejelentkezés nem szükséges a PDF létrehozásához.',
  },
  {
    question: 'Hol tárolják az adataimat?',
    answer: 'Az űrlap adatait csak a PDF generálás idejére használjuk; alapértelmezetten nem tároljuk őket állandóan. Később opcionálisan bevezethetünk mentési funkciót (pl. bejelentkezés után).',
  },
]

export default function HomePage() {
  return (
    <div>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center w-full max-w-5xl mx-auto">
        <div className="glass-card p-6 sm:p-10 md:p-14 animate-fadeIn text-center lg:text-left">
          <h1 className="font-heading font-bold text-[1.625rem] leading-[1.15] sm:text-display md:text-display-lg text-neutral-900 mb-4 sm:mb-5">
            Kiküldetési rendelvény PDF generálása
          </h1>
          <p className="text-body-sm sm:text-body md:text-body-lg text-neutral-700 max-w-xl mx-auto lg:mx-0 mb-6 sm:mb-10">
            Töltse ki az űrlapot, válassza a kiküldetés típusát, és egy kattintással letöltheti a
            könyveléshez használható PDF dokumentumot.
          </p>
          <Link href="/generate" className="btn-primary px-6 sm:px-8 py-2.5 sm:py-3 inline-block">
            PDF létrehozása
          </Link>
        </div>
        <div className="animate-fadeIn flex justify-center lg:justify-end order-first lg:order-none">
          <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-2xl h-[280px] sm:h-[380px] md:h-[460px] lg:h-[500px]">
            <div className="absolute left-2 top-4 sm:left-5 sm:top-6 h-48 w-36 sm:h-64 sm:w-52 md:h-80 md:w-64 rounded-lg overflow-hidden shadow-[0_18px_40px_rgba(15,15,15,0.18)] rotate-[-6deg] bg-neutral-100">
              <img
                src="/kikuldetespdf-generator-1.png"
                alt="Kikuldetespdf generátor előnézet 1"
                className="absolute p-1.5 sm:p-2 bg-white w-full h-full object-cover"
              />
            </div>
            <div className="absolute right-2 bottom-4 sm:right-3 sm:bottom-4 h-36 w-52 sm:h-48 sm:w-72 md:h-64 md:w-96 rounded-lg overflow-hidden shadow-[0_20px_45px_rgba(15,15,15,0.22)] rotate-[5deg] bg-neutral-100">
              <img
                src="/kikuldetespdf-generator-2.png"
                alt="Kikuldetespdf generátor előnézet 2"
                className="absolute p-1.5 sm:p-2 bg-white w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <FAQAccordion items={FAQ} />
    </div>
  )
}
