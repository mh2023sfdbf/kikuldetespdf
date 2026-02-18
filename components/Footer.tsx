import Link from 'next/link'

const landingPages = [
  { href: '/kikuldetesi-rendelveny', label: 'Kiküldetési rendelvény' },
  { href: '/belfoldi-kikuldetes', label: 'Belföldi kiküldetés' },
  { href: '/kulfoldi-kikuldetes', label: 'Külföldi kiküldetés' },
  { href: '/napidij-elszamolas', label: 'Napidíj elszámolás' },
  { href: '/koltegelszamolas-kikuldetes', label: 'Költségelszámolás' },
  { href: '/kikuldetesi-dokumentumok-konyveleshez', label: 'Dokumentumok a könyveléshez' },
]

const siteLinks = [
  { href: '/', label: 'Kezdőlap' },
  { href: '/how-it-works', label: 'Hogyan működik' },
  { href: '/templates', label: 'Sablonok' },
  { href: '/blog', label: 'Blog' },
  { href: '/generate', label: 'PDF generálás' },
]

const legalLinks = [
  { href: '/legal/privacy', label: 'Adatvédelem' },
  { href: '/legal/terms', label: 'Felhasználási feltételek' },
]

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="footer-link text-body-sm text-neutral-700 hover:text-neutral-900 transition-colors"
    >
      {label}
    </Link>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[var(--calm-bg)] mt-auto w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 xl:gap-12 w-full max-w-full">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 min-w-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-sans text-caption uppercase font-medium text-neutral-900 hover:text-neutral-800 transition-colors"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg border-[3px] border-neutral-900 bg-pop shrink-0 text-neutral-900"
                aria-hidden
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
              </span>
              kikuldetespdf.hu
            </Link>
            <p className="mt-3 text-body-sm text-neutral-600 max-w-xs">
              Belföldi és külföldi kiküldetési PDF generátor. Könyveléshez használható sablonok.
            </p>
          </div>

          {/* Cikkek – landing pages */}
          <div className="min-w-0">
            <h3 className="font-sans text-caption uppercase font-medium text-neutral-900 tracking-wide mb-4">
              Cikkek
            </h3>
            <ul className="space-y-2">
              {landingPages.map(({ href, label }) => (
                <li key={href}>
                  <FooterLink href={href} label={label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Oldalak */}
          <div className="min-w-0">
            <h3 className="font-sans text-caption uppercase font-medium text-neutral-900 tracking-wide mb-4">
              Oldalak
            </h3>
            <ul className="space-y-2">
              {siteLinks.map(({ href, label }) => (
                <li key={href}>
                  <FooterLink href={href} label={label} />
                </li>
              ))}
            </ul>
          </div>

          {/* Jogi */}
          <div className="min-w-0">
            <h3 className="font-sans text-caption uppercase font-medium text-neutral-900 tracking-wide mb-4">
              Jogi
            </h3>
            <ul className="space-y-2">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <FooterLink href={href} label={label} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-body-sm text-neutral-600">
            © {new Date().getFullYear()} kikuldetespdf.hu
          </p>
          <Link
            href="/generate"
            className="btn-primary text-body-sm px-5 py-2.5"
          >
            PDF létrehozása
          </Link>
        </div>
      </div>
    </footer>
  )
}
