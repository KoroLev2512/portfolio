import { cache } from 'react'
import { unstable_cache } from 'next/cache'

import type { HomepageQueryResult, SiteSettingsQueryResult } from '../../sanity.types'
import { dataset, isSanityConfigured, projectId } from '../env'
import { client } from './client'
import { homepageQuery, siteSettingsQuery } from './queries'

const REVALIDATE_SEC = (() => {
  const raw = process.env.SANITY_FETCH_REVALIDATE_SECONDS
  const n = raw != null && raw !== '' ? Number.parseInt(raw, 10) : Number.NaN
  return Number.isFinite(n) && n >= 0 ? n : 300
})()

export type PortfolioHomeDocuments = {
  homepage: HomepageQueryResult
  siteSettings: SiteSettingsQueryResult
}

async function fetchSanityHomepageData(): Promise<PortfolioHomeDocuments> {
  const [homepage, siteSettings] = await Promise.all([
    client.fetch<HomepageQueryResult>(homepageQuery),
    client.fetch<SiteSettingsQueryResult>(siteSettingsQuery),
  ])
  return { homepage, siteSettings }
}

const getCachedSanityHomepage = unstable_cache(fetchSanityHomepageData, ['sanity-portfolio-home', projectId, dataset], {
  revalidate: REVALIDATE_SEC,
  tags: ['sanity:portfolio-home'],
})

async function getPortfolioHomeDocumentsImpl(): Promise<PortfolioHomeDocuments> {
  if (!isSanityConfigured) {
    if (process.env.VERCEL === '1') {
      console.warn(
        '[sanity] Нет NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET — контент главной с CMS не подгружается. Задай переменные в Vercel → Settings → Environment Variables.',
      )
    }
    return { homepage: null, siteSettings: null }
  }

  try {
    return await getCachedSanityHomepage()
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[getPortfolioHomeDocuments] Sanity fetch failed:', err)
    }
    return { homepage: null, siteSettings: null }
  }
}

export const getPortfolioHomeDocuments = cache(getPortfolioHomeDocumentsImpl)
