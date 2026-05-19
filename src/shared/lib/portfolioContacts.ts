import type { PortfolioMapped } from '@/sanity/lib/portfolioMappers'

export function resolveContactsSectionTitle(mapped: PortfolioMapped | null, fallback: string): string {
  const fromCms = mapped?.contactsTitle?.trim()
  return fromCms ? fromCms : fallback
}

export function resolveHeroContactLinks(
  mapped: PortfolioMapped | null,
): { label: string; href: string }[] {
  if (mapped?.heroContacts && mapped.heroContacts.length > 0) {
    return mapped.heroContacts
  }
  if (mapped?.contactsButtons && mapped.contactsButtons.length > 0) {
    return mapped.contactsButtons.map(({ label, href }) => ({ label, href }))
  }
  return []
}
