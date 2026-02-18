'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Route error:', error)
  }, [error])

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="glass-card p-10 text-center max-w-md">
        <h2 className="font-heading font-bold text-heading-1 text-[rgb(var(--foreground))] mb-3">
          Váratlan hiba történt
        </h2>
        <p className="text-body text-[rgb(var(--muted))] mb-8">
          Frissítse az oldalt, vagy próbálja újra.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button type="button" onClick={reset} className="btn-primary">
            Újrapróbálás
          </button>
          <Link href="/" className="btn-secondary">
            Kezdőlap
          </Link>
        </div>
      </div>
    </div>
  )
}
