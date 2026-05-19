'use client'

import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useAppContext } from '@/shared/lib/AppContext'
import { getTranslations } from '@/shared/i18n'
import { resolveContactsSectionTitle } from '@/shared/lib/portfolioContacts'
import { mapSanityToPortfolio, type PortfolioMapped } from '@/sanity/lib/portfolioMappers'
import type { PortfolioHomeDocuments } from '@/sanity/lib/getPortfolioHome'

export type PortfolioSanityDocuments = PortfolioHomeDocuments

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

export function usePortfolioMapped(): PortfolioMapped | null {
  const docs = usePortfolioSanityDocs()
  const { lang } = useAppContext()
  return useMemo(() => {
    if (docs == null) return null
    if (docs.homepage == null && docs.siteSettings == null) return null
    return mapSanityToPortfolio(docs.homepage, docs.siteSettings, lang)
  }, [docs, lang])
}

export function useContactsBlockProps() {
  const { lang } = useAppContext()
  const mapped = usePortfolioMapped()
  const t = getTranslations(lang, 'home') as Record<string, string>
  const title = resolveContactsSectionTitle(mapped, t.contactsCta)
  const buttons =
    mapped?.contactsButtons && mapped.contactsButtons.length > 0 ? mapped.contactsButtons : undefined
  return {
    sectionTitle: t.contactsTitle,
    title,
    buttons,
  }
}
