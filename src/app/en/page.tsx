import type { Metadata } from 'next'
import { HomePageClient } from '../HomePageClient'
import { getExperiments } from '@/sanity/lib/getExperiments'
import { getPortfolioHomeDocuments } from '@/sanity/lib/getPortfolioHome'

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await getPortfolioHomeDocuments()
  const title =
    siteSettings?.seoTitle?.en ||
    siteSettings?.personName?.en ||
    'Korolev Yurii'

  const description =
    siteSettings?.seoDescription?.en ||
    'Frontend developer'

  return {
    title,
    description,
    alternates: { canonical: '/en' },
    openGraph: {
      title,
      description,
      locale: 'en_US',
      alternateLocale: ['ru_RU'],
    },
  }
}

export default async function EnglishHomePage() {
  const experiments = await getExperiments()
  return <HomePageClient hasExperiments={experiments.length > 0} />
}
