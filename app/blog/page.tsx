import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog – Kiküldetés, napidíj, költségelszámolás | kikuldetespdf.hu',
  description:
    'Cikkek a kiküldetési rendelvényről, belföldi és külföldi kiküldetésről, napidíj elszámolásról és a könyveléshez szükséges dokumentumokról. Tippek és sablonok.',
  openGraph: {
    title: 'Blog – Kiküldetés és költségelszámolás | kikuldetespdf.hu',
    description: 'Cikkek a kiküldetési dokumentumokról, napidíjról és könyvelésről.',
  },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function BlogPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <header className="mb-12">
        <h1 className="font-heading font-bold text-heading-1 md:text-display text-neutral-900 mb-3">
          Blog
        </h1>
        <p className="text-body text-neutral-600">
          Kiküldetési rendelvény, napidíj, költségelszámolás és könyvelés – cikkek, útmutatók és
          tippek.
        </p>
      </header>

      <ul className="space-y-0 divide-y divide-neutral-200">
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block py-6 md:py-8 group focus:outline-none focus-visible:ring-2 focus-visible:ring-pop focus-visible:ring-offset-2 rounded-lg"
            >
              <time
                dateTime={post.date}
                className="font-sans text-caption uppercase text-neutral-500 tracking-wide"
              >
                {formatDate(post.date)}
              </time>
              <h2 className="font-heading font-semibold text-heading-3 md:text-heading-2 text-neutral-900 mt-1 group-hover:text-neutral-700 transition-colors">
                {post.title}
              </h2>
              <p className="text-body-sm text-neutral-600 mt-2 line-clamp-2">{post.metaDescription}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
