import type { MetadataRoute } from 'next'
import { sanityFetch } from '@/sanity/lib/fetch'

const SITEMAP_QUERY = `*[
  _type == "post" && defined(slug.current)
  || _type == "caseStudy" && defined(slug.current)
  || (_type == "servicePage" && status == "published" && defined(slug.current))
]{
  _type,
  "slug": slug.current,
  publishedAt,
  _updatedAt
}`

type SitemapItem = {
  _type: string;
  slug: { current: string };
  publishedAt?: string;
  updatedAt?: string;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticUrls: MetadataRoute.Sitemap = [
    { url: 'https://providuscrm.co.uk', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://providuscrm.co.uk/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://providuscrm.co.uk/services', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: 'https://providuscrm.co.uk/industries', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://providuscrm.co.uk/platform-expertise', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://providuscrm.co.uk/case-studies', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: 'https://providuscrm.co.uk/blog', lastModified: new Date(), changeFrequency: 'daily', priority: 0.7 },
    { url: 'https://providuscrm.co.uk/contact', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ]

  const allItems = (await sanityFetch<SitemapItem[]>({
    query: SITEMAP_QUERY,
    tags: ['posts', 'case-studies', 'service-pages'],
    revalidate: 3600,
  })) ?? []

  const dynamicUrls = [
    ...allItems
      .filter((i) => i._type === 'post')
      .map((p) => ({
        url: `https://providuscrm.co.uk/blog/${p.slug.current}`,
        lastModified: new Date(p.publishedAt || Date.now()),
        changeFrequency: 'yearly' as const,
        priority: 0.7,
      })),
    ...allItems
      .filter((i) => i._type === 'caseStudy')
      .map((cs) => ({
        url: `https://providuscrm.co.uk/case-studies/${cs.slug.current}`,
        lastModified: new Date(cs.updatedAt || Date.now()),
        changeFrequency: 'yearly' as const,
        priority: 0.7,
      })),
    ...allItems
      .filter((i) => i._type === 'servicePage')
      .map((s) => ({
        url: `https://providuscrm.co.uk/services/${s.slug.current}`,
        lastModified: new Date(s.updatedAt || Date.now()),
        changeFrequency: 'yearly' as const,
        priority: 0.7,
      })),
  ]

  return [...staticUrls, ...dynamicUrls]
}
