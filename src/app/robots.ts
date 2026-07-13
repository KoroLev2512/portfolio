import type { MetadataRoute } from 'next'
import { getPublicSiteOrigin } from '@/shared/lib/publicSiteUrl'

export default function robots(): MetadataRoute.Robots {
  const origin = getPublicSiteOrigin() ?? 'https://dev-by-yurii.ru'
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${origin}/sitemap.xml`,
  }
}
