import type { PortfolioMapped } from '@/sanity/lib/portfolioMappers'
import type { Lang } from '@/shared/i18n'
import { getStubUiStrings } from '@/shared/lib/sanityStubUi'

export const FALLBACK_HERO_CONTACTS = [
  { label: 'icestorm2512@gmail.com', href: 'mailto:icestorm2512@gmail.com' },
  { label: 't.me/korolev_2512', href: 'https://t.me/korolev_2512' },
] as const

type CmsFallbackOptions = { contentDisabled?: boolean; lang?: Lang }

export function resolveContactsSectionTitle(
  mapped: PortfolioMapped | null,
  fallback: string,
  options?: CmsFallbackOptions,
): string {
  if (options?.contentDisabled && options.lang) {
    return getStubUiStrings(options.lang).contactsCta
  }
  const fromCms = mapped?.contactsTitle?.trim()
  return fromCms ? fromCms : fallback
}

export function resolveHeroContactLinks(
  mapped: PortfolioMapped | null,
  options?: CmsFallbackOptions,
): { label: string; href: string }[] {
  if (options?.contentDisabled && options.lang) {
    return getStubUiStrings(options.lang).heroContacts.map((c) => ({ label: c.label, href: c.href }))
  }
  if (mapped?.heroContacts && mapped.heroContacts.length > 0) {
    return mapped.heroContacts
  }
  if (mapped?.contactsButtons && mapped.contactsButtons.length > 0) {
    return mapped.contactsButtons.map(({ label, href }) => ({ label, href }))
  }
  return [...FALLBACK_HERO_CONTACTS]
}
