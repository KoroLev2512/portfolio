/**
 * Сегмент корневого пути `/{slug}`: ведущие `/` в `slug.current` из Sanity
 * давали бы `%2F…` в URL. В адресе используем сегмент без них.
 */
export function projectUrlSegmentFromSanitySlug(sanitySlug: string): string {
  const t = sanitySlug.trim()
  if (!t) return ''
  const stripped = t.replace(/^\/+/, '')
  return stripped.length > 0 ? stripped : t
}

/**
 * Возможные значения `slug.current` в CMS для сегмента из URL
 * (в Studio могли завести `chapterfour` или `/chapterfour`).
 */
export function sanitySlugCandidatesForRouteSegment(routeSegment: string): string[] {
  const t = routeSegment.trim()
  if (!t) return []
  const next = new Set<string>([t])
  if (!t.startsWith('/')) next.add(`/${t}`)
  return [...next]
}

/**
 * Ссылка на страницу проекта: корневой путь `/{slug}`.
 */
export function hrefProjectBySlug(sanitySlug: string): string {
  const segment = projectUrlSegmentFromSanitySlug(sanitySlug)
  if (!segment) return '/'
  return `/${encodeURIComponent(segment)}`
}
