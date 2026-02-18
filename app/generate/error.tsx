'use client'

import { useEffect } from 'react'

export default function GenerateError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Generate page error:', error)
  }, [error])

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4">
      <div className="glass-card p-8 text-center max-w-lg">
        <h2 className="font-heading text-heading-2 font-semibold mb-3">A generáló oldal hibát észlelt</h2>
        <p className="text-body text-[rgb(var(--muted))] mb-6">
          Próbálja újra az oldal betöltését. Ha a hiba marad, használja a teljes újraindítást.
        </p>
        <button type="button" onClick={reset} className="btn-primary">
          Újrapróbálás
        </button>
      </div>
    </div>
  )
}
