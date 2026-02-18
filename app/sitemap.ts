import type { MetadataRoute } from 'next'

const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://kikuldetesi-sablon.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/how-it-works`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/templates`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/generate`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/kikuldetesi-rendelveny`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/belfoldi-kikuldetes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/kulfoldi-kikuldetes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/napidij-elszamolas`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/koltegelszamolas-kikuldetes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/kikuldetesi-dokumentumok-konyveleshez`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${BASE}/legal/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/legal/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/blog/kikuldetesi-rendelveny-mintak-sablonok`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/belfoldi-kikuldetes-lepesrol-lepesre`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/kulfoldi-kikuldetes-dokumentumok`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog/koltegelszamolas-konyveles-kikuldetes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
