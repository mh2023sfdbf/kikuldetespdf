import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF generátor | Kiküldetési utasítás és költségelszámolás',
  description:
    'Belföldi vagy külföldi kiküldetési PDF létrehozása: töltse ki az űrlapot és töltse le a könyveléshez használható dokumentumot.',
  openGraph: {
    title: 'PDF generátor | kikuldetespdf.hu',
    description: 'Kiküldetési utasítás és költségelszámolás PDF generátor.',
  },
  robots: { index: true, follow: true },
}

export default function GenerateLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
