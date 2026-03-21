import { client } from './client'
import { homepageQuery, siteSettingsQuery } from './queries'

export async function getPortfolioHomeDocuments() {
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
