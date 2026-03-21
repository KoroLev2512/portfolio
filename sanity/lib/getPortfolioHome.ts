import { client } from './client'
import { homepageQuery, siteSettingsQuery } from './queries'

export async function getPortfolioHomeDocuments() {
  try {
    const [homepage, siteSettings] = await Promise.all([
      client.fetch(homepageQuery),
      client.fetch(siteSettingsQuery),
    ])
    return { homepage, siteSettings }
  } catch {
    return { homepage: null, siteSettings: null }
  }
}
