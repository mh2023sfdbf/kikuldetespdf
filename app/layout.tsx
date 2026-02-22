import './globals.css'
import Script from 'next/script'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const GA_MEASUREMENT_ID = 'G-MCSENLV20T'

const PRODUCTION_ORIGIN = 'https://kikuldetespdf.hu'
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? (process.env.NEXT_PUBLIC_BASE_URL?.startsWith('https://kikuldetespdf.hu')
        ? process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, '')
        : PRODUCTION_ORIGIN)
    : (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3004')

export const metadata = {
  metadataBase: new URL(baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`),
  title: {
    default: 'kikuldetespdf.hu | Kiküldetési rendelvény PDF generálása',
    template: '%s | kikuldetespdf.hu',
  },
  description:
    'Belföldi és külföldi kiküldetési utasítás és költségelszámolás PDF generátor. NAV-barát sablonok, egyszerű űrlap.',
  openGraph: {
    title: 'kikuldetespdf.hu | Kiküldetési rendelvény PDF generálása',
    description: 'Kiküldetési utasítás és költségelszámolás PDF generátor.',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="hu">
      <body className="min-h-screen bg-[var(--calm-bg)] font-sans antialiased flex flex-col">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Nav />
        <main className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 md:py-16 flex-1 w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
