import type { MetadataRoute } from 'next'

const PRODUCTION_ORIGIN = 'https://kikuldetespdf.hu'
const BASE =
  process.env.NEXT_PUBLIC_BASE_URL?.startsWith('https://kikuldetespdf.hu') === true
    ? process.env.NEXT_PUBLIC_BASE_URL.replace(/\/$/, '')
    : PRODUCTION_ORIGIN

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/'] },
    sitemap: `${BASE}/sitemap.xml`,
  }
}
