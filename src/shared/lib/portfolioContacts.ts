import type { PortfolioMapped } from '@/sanity/lib/portfolioMappers'

export const FALLBACK_HERO_CONTACTS = [
  { label: 'icestorm2512@gmail.com', href: 'mailto:icestorm2512@gmail.com' },
  { label: 't.me/korolev_2512', href: 'https://t.me/korolev_2512' },
] as const

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
  return [...FALLBACK_HERO_CONTACTS]
}
