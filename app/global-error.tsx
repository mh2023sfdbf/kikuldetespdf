'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.error('Global error:', error)

  return (
    <html lang="hu">
      <body className="min-h-screen bg-white text-black flex items-center justify-center p-6">
        <div className="max-w-lg text-center">
          <h1 className="text-3xl font-semibold mb-3">Alkalmazáshiba</h1>
          <p className="text-lg mb-6">
            Az oldal átmenetileg nem elérhető. Kérjük, frissítse az oldalt.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center rounded-lg bg-black px-5 py-2 font-medium text-white"
            >
              Újrapróbálás
            </button>
            <a
              href="/"
              className="inline-flex items-center rounded-lg border border-black px-5 py-2 font-medium"
            >
              Vissza a kezdőlapra
            </a>
          </div>
        </div>
      </body>
    </html>
  )
}
