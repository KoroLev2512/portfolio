import { isSanityConfigured } from '../env'
import { client } from './client'
import { homepageQuery, siteSettingsQuery } from './queries'

export async function getPortfolioHomeDocuments() {
  if (!isSanityConfigured) {
    if (process.env.VERCEL === '1') {
      console.warn(
        '[sanity] Нет NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET — контент главной с CMS не подгружается. Задай переменные в Vercel → Settings → Environment Variables.',
      )
    }
    return { homepage: null, siteSettings: null }
  }

  try {
    const [homepage, siteSettings] = await Promise.all([
      client.fetch(homepageQuery),
      client.fetch(siteSettingsQuery),
    ])
    return { homepage, siteSettings }
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[getPortfolioHomeDocuments] Sanity fetch failed:', err)
    }
    return { homepage: null, siteSettings: null }
  }
}
