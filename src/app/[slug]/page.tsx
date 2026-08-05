import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { ProjectDetailPageClient } from '../project/ProjectDetailPageClient'
import { getProjectBySlug, getStaticExportProjectSlugs } from '@/sanity/lib/getProjectBySlug'
import { mapSanityProjectDetail } from '@/sanity/lib/projectDetailMapper'
import { projectUrlSegmentFromSanitySlug } from '@/shared/lib/projectPath'

export const dynamicParams = false

const RESERVED_ROOT_SLUGS = new Set(['experiments', 'en', 'ru'])

const STATIC_EXPORT_SLUG_PLACEHOLDER = '__static_export_no_projects__'

type PageProps = {
  params: Promise<{ slug: string }>
}

function normalizeRouteSlugParam(raw: string): string {
  let decoded = raw
  try {
    decoded = decodeURIComponent(raw)
  } catch {
    decoded = raw
  }
  return projectUrlSegmentFromSanitySlug(decoded)
}

export async function generateStaticParams() {
  const rawSlugs = await getStaticExportProjectSlugs()
  const seen = new Set<string>()
  const out: { slug: string }[] = []
  for (const raw of rawSlugs) {
    const seg = projectUrlSegmentFromSanitySlug(raw)
    if (!seg || RESERVED_ROOT_SLUGS.has(seg.toLowerCase())) continue
    if (seen.has(seg)) continue
    seen.add(seg)
    out.push({ slug: seg })
  }
  if (out.length === 0) {
    return [{ slug: STATIC_EXPORT_SLUG_PLACEHOLDER }]
  }
  return out
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params
  if (rawSlug === STATIC_EXPORT_SLUG_PLACEHOLDER) return {}
  const slug = normalizeRouteSlugParam(rawSlug)
  if (RESERVED_ROOT_SLUGS.has(slug.toLowerCase())) return {}
  const doc = await getProjectBySlug(slug)
  if (!doc) return {}
  const mapped = mapSanityProjectDetail(doc, 'en')
  if (!mapped) return {}
  return {
    title: mapped.title,
    description: mapped.description.trim() || undefined,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: mapped.title,
      description: mapped.description.trim() || undefined,
    },
  }
}

export default async function ProjectBySlugPage({ params }: PageProps) {
  const { slug: rawSlug } = await params
  if (rawSlug === STATIC_EXPORT_SLUG_PLACEHOLDER) notFound()
  const slug = normalizeRouteSlugParam(rawSlug)
  if (RESERVED_ROOT_SLUGS.has(slug.toLowerCase())) notFound()
  const doc = await getProjectBySlug(slug)
  if (!doc) notFound()
  if (!mapSanityProjectDetail(doc, 'en')) notFound()
  return <ProjectDetailPageClient sanityDoc={doc} slug={slug} />
}
