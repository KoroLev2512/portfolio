import { HomePageClient } from './HomePageClient'
import { getPortfolioHomeDocuments } from '@/sanity/lib/getPortfolioHome'

export default async function HomePage() {
  const sanityDocs = await getPortfolioHomeDocuments()
  const hasAny = sanityDocs.homepage != null || sanityDocs.siteSettings != null
  return <HomePageClient sanityDocs={hasAny ? sanityDocs : null} />
}
