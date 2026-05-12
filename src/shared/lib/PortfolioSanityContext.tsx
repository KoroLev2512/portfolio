'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useAppContext } from '@/shared/lib/AppContext'
import { getTranslations } from '@/shared/i18n'
import { resolveContactsSectionTitle } from '@/shared/lib/portfolioContacts'
import { mapSanityToPortfolio, type PortfolioMapped } from '@/sanity/lib/portfolioMappers'

export type PortfolioSanityDocuments = {
  homepage: unknown
  siteSettings: unknown
  /** When true, Next.js skipped Sanity — use neutral stub copy (see `getStubUiStrings`). */
  sanityContentDisabled?: boolean
}

const PortfolioSanityContext = createContext<PortfolioSanityDocuments | null>(null)

export function PortfolioSanityProvider({
  sanityDocs,
  children,
}: {
  sanityDocs: PortfolioSanityDocuments
  children: ReactNode
}) {
  return <PortfolioSanityContext.Provider value={sanityDocs}>{children}</PortfolioSanityContext.Provider>
}

export function usePortfolioSanityDocs(): PortfolioSanityDocuments | null {
  return useContext(PortfolioSanityContext)
}

export function useSanityContentDisabled(): boolean {
  const docs = usePortfolioSanityDocs()
  return Boolean(docs?.sanityContentDisabled)
}

export function usePortfolioMapped(): PortfolioMapped | null {
  const docs = usePortfolioSanityDocs()
  const { lang } = useAppContext()
  return useMemo(() => {
    if (docs == null) return null
    const { homepage, siteSettings } = docs
    if (homepage == null && siteSettings == null) return null
    return mapSanityToPortfolio(
      homepage as Parameters<typeof mapSanityToPortfolio>[0],
      siteSettings as Parameters<typeof mapSanityToPortfolio>[1],
      lang,
    )
  }, [docs, lang])
}

export function useContactsBlockProps() {
  const { lang } = useAppContext()
  const mapped = usePortfolioMapped()
  const contentDisabled = useSanityContentDisabled()
  const t = getTranslations(lang, 'home') as Record<string, string>
  const title = resolveContactsSectionTitle(mapped, t.contactsCta, { contentDisabled, lang })
  const buttons =
    mapped?.contactsButtons && mapped.contactsButtons.length > 0 ? mapped.contactsButtons : undefined
  return {
    sectionTitle: t.contactsTitle,
    title,
    buttons,
  }
}
