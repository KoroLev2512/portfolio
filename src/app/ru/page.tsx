import type { Metadata } from 'next'
import { HomePageClient } from '../HomePageClient'
import { getExperiments } from '@/sanity/lib/getExperiments'
import { getPortfolioHomeDocuments } from '@/sanity/lib/getPortfolioHome'

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await getPortfolioHomeDocuments()
  const title =
    siteSettings?.seoTitle?.ru ||
    siteSettings?.personName?.ru ||
    'Королев Юрий'

  const description =
    siteSettings?.seoDescription?.ru ||
    'Фронтенд-разработчик'

  return {
    title,
    description,
    alternates: { canonical: '/ru' },
    openGraph: {
      title,
      description,
      locale: 'ru_RU',
      alternateLocale: ['en_US'],
    },
  }
}

export default async function RussianHomePage() {
  const experiments = await getExperiments()
  return <HomePageClient hasExperiments={experiments.length > 0} />
}
