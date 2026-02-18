import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <div className="glass-card p-10 text-center max-w-md">
        <h2 className="font-heading font-bold text-heading-1 text-[rgb(var(--foreground))] mb-3">
          Az oldal nem található
        </h2>
        <p className="text-body text-[rgb(var(--muted))] mb-8">
          A kért oldal nem létezik vagy el lett távolítva.
        </p>
        <Link href="/" className="btn-primary">
          Vissza a kezdőlapra
        </Link>
      </div>
    </div>
  )
}
