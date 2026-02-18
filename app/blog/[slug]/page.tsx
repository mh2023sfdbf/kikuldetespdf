import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostBySlug, getAllSlugs } from '@/lib/blog'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Blog | kikuldetespdf.hu' }
  return {
    title: `${post.title} | kikuldetespdf.hu`,
    description: post.metaDescription,
    openGraph: {
      title: post.title,
      description: post.metaDescription,
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('hu-HU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <article className="max-w-3xl mx-auto">
      <nav className="mb-8" aria-label="Breadcrumb">
        <Link
          href="/blog"
          className="footer-link text-body-sm text-neutral-600 hover:text-neutral-900"
        >
          ← Blog
        </Link>
      </nav>

      <header className="mb-10">
        <time
          dateTime={post.date}
          className="font-sans text-caption uppercase text-neutral-500 tracking-wide"
        >
          {formatDate(post.date)}
        </time>
        <h1 className="font-heading font-bold text-heading-1 text-neutral-900 mt-2 mb-4">
          {post.title}
        </h1>
        <p className="text-body text-neutral-700 leading-relaxed">{post.metaDescription}</p>
      </header>

      <div className="prose-custom">
        {post.sections.map((section, i) => (
          <section key={i} className="mb-10">
            <h2 className="font-sans text-heading-3 font-semibold text-neutral-900 border-b-2 border-pop w-fit mb-4">
              {section.h2}
            </h2>
            {section.paragraphs.map((p, j) => (
              <p key={j} className="text-body text-neutral-700 mb-4 leading-relaxed">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>

      <footer className="mt-12 pt-8 border-t border-neutral-200">
        <h3 className="font-sans text-caption uppercase font-medium text-neutral-900 tracking-wide mb-4">
          Kapcsolódó oldalak
        </h3>
        <ul className="flex flex-wrap gap-3">
          {post.relatedLinks.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="btn-ghost text-body-sm">
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6">
          <Link href="/blog" className="footer-link text-body-sm">
            Összes cikk
          </Link>
        </p>
      </footer>
    </article>
  )
}
