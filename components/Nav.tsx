'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { href: '/', label: 'Kezdőlap' },
  { href: '/how-it-works', label: 'Hogyan működik' },
  { href: '/templates', label: 'Sablonok' },
  { href: '/blog', label: 'Blog' },
]

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <nav className="bg-[var(--calm-bg)] sticky top-0 z-10 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between py-5">
            <Link
              href="/"
              className="flex items-center gap-3 font-sans text-caption uppercase font-medium text-neutral-900 hover:text-neutral-800 transition-colors"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border-[3px] border-neutral-900 bg-pop shrink-0 text-neutral-900" aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <path d="M14 2v6h6" />
                  <path d="M16 13H8" />
                  <path d="M16 17H8" />
                  <path d="M10 9H8" />
                </svg>
              </span>
              kikuldetespdf.hu
            </Link>

            {/* Desktop: links + CTA */}
            <div className="hidden sm:flex items-center gap-6">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className="nav-link-calm text-body-sm">
                  {label}
                </Link>
              ))}
              <Link href="/generate" className="btn-primary">
                PDF generálás
              </Link>
            </div>

            {/* Mobile: hamburger */}
            <div className="flex sm:hidden items-center gap-2">
              <Link href="/generate" className="btn-primary text-sm px-4 py-2">
                PDF
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="flex items-center justify-center w-10 h-10 transition-transform duration-200 hover:scale-105 active:scale-95"
                aria-label={mobileOpen ? 'Menü bezárása' : 'Menü megnyitása'}
                aria-expanded={mobileOpen}
              >
                <svg className="w-6 h-6 text-neutral-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay + panel (marta-ui-kit style) */}
      <div
        className={`fixed inset-0 z-50 transition-[visibility] duration-300 ${mobileOpen ? 'visible' : 'invisible pointer-events-none'}`}
        style={{ transitionDelay: mobileOpen ? '0ms' : '300ms' }}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-neutral-900 transition-opacity duration-300 ease-out cursor-pointer ${mobileOpen ? 'opacity-80' : 'opacity-0'}`}
          aria-label="Menü bezárása"
        />
        <div
          className={`fixed top-0 left-0 bottom-0 w-4/5 max-w-xs z-10 bg-white h-full overflow-y-auto rounded-r-2xl shadow-xl border-r-[3px] border-neutral-900 transition-transform duration-300 ease-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
          role="dialog"
          aria-modal="true"
          aria-label="Navigáció"
        >
          <div className="flex justify-between items-center p-6">
            <span className="text-caption font-sans uppercase font-medium text-neutral-900">
              kikuldetespdf.hu
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-full hover:bg-pop-muted border-2 border-transparent hover:border-neutral-900 transition-colors"
              aria-label="Menü bezárása"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            <ul className="space-y-1">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-3 px-4 text-neutral-800 hover:bg-pop-muted rounded-lg border-2 border-transparent hover:border-neutral-900 transition-all duration-200 hover:text-neutral-900 font-medium"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Link
                href="/generate"
                onClick={() => setMobileOpen(false)}
                className="block w-full py-3 px-4 text-center font-medium btn-primary"
              >
                PDF generálás
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
