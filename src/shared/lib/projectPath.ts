export function projectUrlSegmentFromSanitySlug(sanitySlug: string): string {
  const t = sanitySlug.trim()
  if (!t) return ''
  const stripped = t.replace(/^\/+/, '')
  return stripped.length > 0 ? stripped : t
}

export function sanitySlugCandidatesForRouteSegment(routeSegment: string): string[] {
  const t = routeSegment.trim()
  if (!t) return []
  const next = new Set<string>([t])
  if (!t.startsWith('/')) next.add(`/${t}`)
  return [...next]
}

export function hrefProjectBySlug(sanitySlug: string): string {
  const segment = projectUrlSegmentFromSanitySlug(sanitySlug)
  if (!segment) return '/'
  return `/${encodeURIComponent(segment)}`
}
