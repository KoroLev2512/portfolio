import { cache } from 'react'
import { unstable_cache } from 'next/cache'

import { sanitySlugCandidatesForRouteSegment } from '@/shared/lib/projectPath'

import { dataset, isSanityConfigured, projectId } from '../env'
import { client } from './client'
import { allProjectSlugsQuery, homepageProjectSlugsQuery, projectBySlugQuery } from './queries'
import type { SanityProjectDocument } from './projectDetailMapper'

const REVALIDATE_SEC = (() => {
  const raw = process.env.SANITY_FETCH_REVALIDATE_SECONDS
  const n = raw != null && raw !== '' ? Number.parseInt(raw, 10) : Number.NaN
  return Number.isFinite(n) && n >= 0 ? n : 300
})()

async function getProjectBySlugImpl(routeSlug: string): Promise<SanityProjectDocument> {
  if (!isSanityConfigured) return null
  const slugs = sanitySlugCandidatesForRouteSegment(routeSlug)
  if (slugs.length === 0) return null
  try {
    return await unstable_cache(
      async () => {
        try {
          return await client.fetch(projectBySlugQuery, { slugs })
        } catch (err) {
          if (process.env.NODE_ENV === 'development') {
            console.error('[getProjectBySlug] fetch failed:', err)
          }
          return null
        }
      },
      ['sanity-project', projectId, dataset, routeSlug],
      { revalidate: REVALIDATE_SEC, tags: ['sanity:portfolio-home', `sanity:project:${routeSlug}`] },
    )()
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[getProjectBySlug] cache failed:', err)
    }
    return null
  }
}

export const getProjectBySlug = cache(getProjectBySlugImpl)

async function fetchHomepageProjectSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return []
  try {
    const slugs = await client.fetch<string[]>(homepageProjectSlugsQuery)
    return (slugs ?? []).filter((s): s is string => typeof s === 'string' && s.trim().length > 0)
  } catch {
    return []
  }
}

const getCachedHomepageSlugs = unstable_cache(
  fetchHomepageProjectSlugs,
  ['sanity-portfolio-project-slugs', projectId, dataset],
  { revalidate: REVALIDATE_SEC, tags: ['sanity:portfolio-home'] },
)

export async function getHomepageProjectSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return []
  try {
    return await getCachedHomepageSlugs()
  } catch {
    return []
  }
}

function normalizeSlugList(slugs: unknown): string[] {
  if (!Array.isArray(slugs)) return []
  return slugs.filter((s): s is string => typeof s === 'string' && s.trim().length > 0).map((s) => s.trim())
}

async function fetchAllProjectSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return []
  try {
    const slugs = await client.fetch<string[]>(allProjectSlugsQuery)
    return normalizeSlugList(slugs)
  } catch {
    return []
  }
}

const getCachedAllProjectSlugs = unstable_cache(
  fetchAllProjectSlugs,
  ['sanity-all-project-slugs', projectId, dataset],
  { revalidate: REVALIDATE_SEC, tags: ['sanity:portfolio-home', 'sanity:projects'] },
)

export async function getStaticExportProjectSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return []
  try {
    const [homepageOrder, allSlugs] = await Promise.all([
      getCachedHomepageSlugs(),
      getCachedAllProjectSlugs(),
    ])
    const home = normalizeSlugList(homepageOrder)
    const all = normalizeSlugList(allSlugs)
    const seen = new Set<string>()
    const out: string[] = []
    for (const s of home) {
      if (seen.has(s)) continue
      seen.add(s)
      out.push(s)
    }
    for (const s of all) {
      if (seen.has(s)) continue
      seen.add(s)
      out.push(s)
    }
    return out
  } catch {
    return []
  }
}
