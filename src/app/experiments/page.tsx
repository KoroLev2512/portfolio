import type { Metadata } from 'next'
import { getExperiments } from '@/sanity/lib/getExperiments'
import { experiments as experimentsEn } from '@/shared/i18n/locales/en'
import ExperimentsPageClient from './ExperimentsPageClient'

export const metadata: Metadata = {
  title: `${experimentsEn.pageTitle} — Korolev Yurii`,
  description: experimentsEn.pageSubtitle,
  alternates: { canonical: '/experiments' },
  openGraph: {
    title: experimentsEn.pageTitle,
    description: experimentsEn.pageSubtitle,
  },
}

export default async function ExperimentsPage() {
  const experiments = await getExperiments()
  return <ExperimentsPageClient experiments={experiments} />
}
