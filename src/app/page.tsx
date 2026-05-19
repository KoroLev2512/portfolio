import type { Metadata } from 'next'
import { HomePageClient } from './HomePageClient'
import { getExperiments } from '@/sanity/lib/getExperiments'

export const metadata: Metadata = {
  title: 'Korolev Yurii',
  description: 'Frontend developer',
}

export default async function HomePage() {
  const experiments = await getExperiments()
  return <HomePageClient hasExperiments={experiments.length > 0} />
}
