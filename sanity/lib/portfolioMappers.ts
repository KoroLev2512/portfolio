import type { Image } from 'sanity'

import { getTranslations, type Lang } from '@/shared/i18n'
import { hrefProjectBySlug, projectUrlSegmentFromSanitySlug } from '@/shared/lib/projectPath'
import { sanityImageUrl } from './imagePublic'

type LocalizedValue<T = string> = { ru?: T; en?: T }

function pickLocale<T = string>(field: LocalizedValue<T> | T | undefined, lang: Lang): T | undefined {
  if (field == null) return undefined
  if (typeof field !== 'object') return field as T
  const loc = field as LocalizedValue<T>
  return loc[lang] ?? loc.en ?? loc.ru
}

function pickSkillGroupItems(items: unknown, lang: Lang): string[] {
  if (items == null) return []
  if (Array.isArray(items)) {
    return items.filter((x): x is string => typeof x === 'string' && x.trim().length > 0)
  }
  if (typeof items === 'object') {
    const list = pickLocale(items as LocalizedValue<string[]>, lang)
    if (!Array.isArray(list)) return []
    return list.filter((x) => typeof x === 'string' && x.trim().length > 0)
  }
  return []
}

function labelFromHref(href: string): string {
  const h = href.trim()
  if (!h) return ''
  const lower = h.toLowerCase()
  if (lower.startsWith('mailto:')) return h.slice(7)
  if (lower.startsWith('tel:')) return h.slice(4)
  try {
    const url = new URL(h)
    const host = url.hostname.replace(/^www\./i, '')
    const path = url.pathname.replace(/\/$/, '')
    return path && path !== '/' ? `${host}${path}` : host
  } catch {
    return h
  }
}

function contactDisplayLabel(
  labelField: LocalizedValue<string> | string | undefined,
  lang: Lang,
  href: string,
): string {
  const fromLocale = pickLocale(labelField, lang)
  if (fromLocale != null && String(fromLocale).trim() !== '') {
    return String(fromLocale).trim()
  }
  return labelFromHref(href)
}

function contactHref(
  hrefField: LocalizedValue<string> | string | undefined,
  lang: Lang,
): string {
  const fromLocale = pickLocale(hrefField, lang)
  return typeof fromLocale === 'string' ? fromLocale.trim() : ''
}

function getSkillGroupTitle(
  kind: string | undefined,
  customTitle: string | undefined,
  lang: Lang,
): string {
  const t = getTranslations(lang, 'home') as Record<string, string>
  switch (kind) {
    case 'hard-skills':
      return t.hardSkills
    case 'soft-skills':
      return t.softSkills
    case 'languages':
      return t.languages
    case 'tools-stack':
      return t.toolsStack
    case 'custom':
    default:
      return customTitle?.trim() || t.skillGroupFallback
  }
}

function localizedHasContent(field: LocalizedValue<string> | string | undefined | null): boolean {
  if (field == null) return false
  if (typeof field === 'string') return field.trim().length > 0
  const loc = field as LocalizedValue<string>
  return [loc.ru, loc.en].some((s) => typeof s === 'string' && s.trim().length > 0)
}

function getEducationLevelLabel(
  educationType: LocalizedValue<string> | string | undefined,
  customEducationType: LocalizedValue<string> | string | undefined,
  lang: Lang,
): string {
  const resolved = pickLocale(educationType, lang)
  const custom = pickLocale(customEducationType, lang)
  if (resolved === 'custom') return custom || ''

  const dict: Record<string, Record<Lang, string>> = {
    'incomplete-higher': {
      ru: 'Неоконченное высшее',
      en: 'Incomplete higher education',
    },
    higher: { ru: 'Высшее образование', en: 'Higher education' },
    'professional-development': {
      ru: 'Повышение квалификации',
      en: 'Professional development',
    },
    course: { ru: 'Курс', en: 'Course' },
    'secondary-vocational': {
      ru: 'Среднее специальное',
      en: 'Secondary vocational education',
    },
  }
  return (resolved && dict[resolved]?.[lang]) || ''
}

export type PortfolioProjectCard = {
  name: string
  description: string
  skills: string[]
  coverUrl: string | null
  href: string
  slug?: string
}

export type PortfolioMapped = {
  hasHomepage: boolean
  hasSiteSettings: boolean
  personName?: string
  personRole?: string
  personPhotoUrl: string | null
  heroBio: string
  heroContacts: { label: string; href: string }[]
  skillGroups: { title: string; tags: string[] }[]
  projects: PortfolioProjectCard[]
  middleSectionsOrder: string[]
  workEntries: { _key?: string; company: string; position: string; period?: string }[]
  educationEntries: {
    _key?: string
    organization: string
    specialization: string
    level: string
    period?: string
  }[]
  contactsTitle: string | null
  contactsButtons: { label: string; href: string; variant: 'primary' | 'secondary' }[]
  footerAside: {
    show: boolean
    text: string
    linkLabel: string
    linkHref: string
  } | null
}

type SanityContact = {
  label?: LocalizedValue<string> | string
  href?: LocalizedValue<string> | string
  variant?: string
}

type SanityHomepageProject = {
  title?: LocalizedValue<string> | string
  slug?: string
  shortDescription?: LocalizedValue<string> | string
  tags?: LocalizedValue<string[]> | string[]
  coverImage?: Image
}

type SanityHomepage = {
  heroContacts?: SanityContact[]
  heroAbout?: LocalizedValue<string> | string
  skillGroups?: {
    kind?: string
    title?: LocalizedValue<string> | string
    showTitle?: boolean
    items?: LocalizedValue<string[]>
  }[]
  workExperienceItems?: {
    _key?: string
    company?: LocalizedValue<string> | string
    position?: LocalizedValue<string> | string
    period?: LocalizedValue<string> | string
  }[]
  educationItems?: {
    _key?: string
    institution?: LocalizedValue<string> | string
    program?: LocalizedValue<string> | string
    educationType?: string
    customEducationType?: LocalizedValue<string> | string
    period?: LocalizedValue<string> | string
  }[]
  middleSectionsOrder?: string[]
  homepageProjects?: SanityHomepageProject[]
}

type SanitySiteSettings = {
  personName?: LocalizedValue<string> | string
  personRole?: LocalizedValue<string> | string
  personPhoto?: Image
  contactsTitle?: LocalizedValue<string> | string
  contactsButtons?: SanityContact[]
  showFooterAside?: boolean
  footerAsideText?: LocalizedValue<string> | string
  footerAsideLinkLabel?: LocalizedValue<string> | string
  footerAsideLinkHref?: string
}

function mapProjects(projects: SanityHomepageProject[] | undefined, lang: Lang): PortfolioProjectCard[] {
  return (projects ?? []).map((project) => {
    const coverUrl = project.coverImage
      ? sanityImageUrl(project.coverImage, 512, { format: 'webp', quality: 82 })
      : null
    const tags = pickLocale(project.tags, lang) ?? []
    const rawSlug = typeof project.slug === 'string' ? project.slug.trim() : ''
    const segment = rawSlug ? projectUrlSegmentFromSanitySlug(rawSlug) : ''
    return {
      name: pickLocale(project.title, lang) || 'Project',
      description: pickLocale(project.shortDescription, lang) || '',
      skills: tags.length ? tags : ['Tag'],
      coverUrl,
      slug: segment || undefined,
      href: rawSlug ? hrefProjectBySlug(rawSlug) : '/',
    }
  })
}

export function mapSanityToPortfolio(
  homepage: SanityHomepage | null | undefined,
  siteSettings: SanitySiteSettings | null | undefined,
  lang: Lang,
): PortfolioMapped | null {
  if (homepage == null && siteSettings == null) return null

  const heroContacts = (homepage?.heroContacts ?? [])
    .map((item) => {
      const href = contactHref(item.href, lang)
      return {
        label: contactDisplayLabel(item.label, lang, href),
        href,
      }
    })
    .filter((item) => item.href.length > 0)

  const skillGroups = (homepage?.skillGroups ?? [])
    .map((group) => {
      const items = pickSkillGroupItems(group.items, lang)
      const title =
        group.showTitle === false
          ? ''
          : getSkillGroupTitle(group.kind, pickLocale(group.title, lang), lang)
      return { title, tags: items }
    })
    .filter((g) => g.tags.length > 0)

  const workEntries = (homepage?.workExperienceItems ?? [])
      .filter(
        (item) =>
          localizedHasContent(item?.company) ||
          localizedHasContent(item?.position) ||
          localizedHasContent(item?.period),
      )
      .map((item) => ({
        _key: item._key,
        company: (pickLocale(item.company, lang) ?? '').trim(),
        position: (pickLocale(item.position, lang) ?? '').trim(),
        period: pickLocale(item.period, lang)?.trim(),
      }))
      .filter((e) => e.company || e.position)

  const educationEntries = (homepage?.educationItems ?? [])
      .filter(
        (item) =>
          localizedHasContent(item?.institution) ||
          localizedHasContent(item?.program) ||
          localizedHasContent(item?.period) ||
          Boolean(item?.educationType),
      )
      .map((item) => ({
        _key: item._key,
        organization: (pickLocale(item.institution, lang) ?? '').trim(),
        specialization: (pickLocale(item.program, lang) ?? '').trim(),
        level: getEducationLevelLabel(item.educationType, item.customEducationType, lang),
        period: pickLocale(item.period, lang)?.trim(),
      }))
      .filter((e) => e.organization || e.specialization || e.level)

  const personPhotoUrl = siteSettings?.personPhoto
    ? sanityImageUrl(siteSettings.personPhoto, 384, { format: 'webp', quality: 82 })
    : null

  const contactsButtons =
    siteSettings?.contactsButtons
      ?.map((item) => {
        const href = contactHref(item.href, lang)
        return {
          label: contactDisplayLabel(item.label, lang, href),
          href,
          variant: item.variant === 'primary' ? ('primary' as const) : ('secondary' as const),
        }
      })
      .filter((item) => item.href.length > 0) ?? []

  const contactsTitle = siteSettings?.contactsTitle
    ? (pickLocale(siteSettings.contactsTitle, lang) ?? null)
    : null

  const footerAside =
    siteSettings != null
      ? {
          show: siteSettings.showFooterAside ?? false,
          text: pickLocale(siteSettings.footerAsideText, lang) ?? '',
          linkLabel: pickLocale(siteSettings.footerAsideLinkLabel, lang) ?? '',
          linkHref: siteSettings.footerAsideLinkHref ?? '',
        }
      : null

  return {
    hasHomepage: Boolean(homepage),
    hasSiteSettings: Boolean(siteSettings),
    personName: siteSettings ? pickLocale(siteSettings.personName, lang) : undefined,
    personRole: siteSettings ? pickLocale(siteSettings.personRole, lang) : undefined,
    personPhotoUrl,
    heroBio: homepage ? (pickLocale(homepage.heroAbout, lang) ?? '') : '',
    heroContacts,
    skillGroups,
    projects: mapProjects(homepage?.homepageProjects, lang),
    middleSectionsOrder: homepage?.middleSectionsOrder ?? [
      'skills',
      'projects',
      'workExperience',
      'education',
    ],
    workEntries,
    educationEntries,
    contactsTitle,
    contactsButtons,
    footerAside,
  }
}
