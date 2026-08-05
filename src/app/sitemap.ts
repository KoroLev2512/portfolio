export const dynamic = 'force-static'

import type { MetadataRoute } from 'next'
import { getStaticExportProjectSlugs } from '@/sanity/lib/getProjectBySlug'
import { getPublicSiteOrigin } from '@/shared/lib/publicSiteUrl'
import { projectUrlSegmentFromSanitySlug } from '@/shared/lib/projectPath'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const origin = getPublicSiteOrigin() ?? 'https://dev-by-yurii.ru'

  const rawSlugs = await getStaticExportProjectSlugs()
  const projectUrls: MetadataRoute.Sitemap = rawSlugs
    .map(projectUrlSegmentFromSanitySlug)
    .filter(Boolean)
    .map((seg) => ({
      url: `${origin}/${seg}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  return [
    { url: origin, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${origin}/en`, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${origin}/ru`, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${origin}/experiments`, changeFrequency: 'monthly', priority: 0.6 },
    ...projectUrls,
  ]
}
