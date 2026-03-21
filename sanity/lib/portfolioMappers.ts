import type { Image } from 'sanity'

import { getTranslations, type Lang } from '@/shared/i18n'
import { sanityImageUrl } from './imagePublic'

type LocalizedValue<T = string> = { ru?: T; en?: T }

function pickLocale<T = string>(field: LocalizedValue<T> | T | undefined, lang: Lang): T | undefined {
  if (field == null) return undefined
  if (typeof field !== 'object') return field as T
  const loc = field as LocalizedValue<T>
  return loc[lang] ?? loc.en ?? loc.ru
}

/** Подпись для ссылки, если в CMS не заполнена локаль */
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
      return lang === 'ru' ? 'Инструменты / стек' : 'Tools / Stack'
    case 'custom':
    default:
      return customTitle || (lang === 'ru' ? 'Навыки' : 'Skills')
  }
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
  workEntries: { company: string; position: string; period?: string }[]
  educationEntries: {
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
  href?: string
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
    company?: LocalizedValue<string> | string
    position?: LocalizedValue<string> | string
    period?: LocalizedValue<string> | string
  }[]
  educationItems?: {
    institution?: LocalizedValue<string> | string
    program?: LocalizedValue<string> | string
    educationType?: LocalizedValue<string> | string
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
    const coverUrl = project.coverImage ? sanityImageUrl(project.coverImage, 1200) : null
    const tags = pickLocale(project.tags, lang) ?? []
    return {
      name: pickLocale(project.title, lang) || 'Project',
      description: pickLocale(project.shortDescription, lang) || '',
      skills: tags.length ? tags : ['Tag'],
      coverUrl,
      href: '/project',
    }
  })
}

export function mapSanityToPortfolio(
  homepage: SanityHomepage | null | undefined,
  siteSettings: SanitySiteSettings | null | undefined,
  lang: Lang,
): PortfolioMapped | null {
  if (homepage == null && siteSettings == null) return null

  const heroContacts =
    homepage?.heroContacts
      ?.filter((item): item is SanityContact & { href: string } =>
        typeof item?.href === 'string' && item.href.trim().length > 0,
      )
      .map((item) => {
        const href = item.href.trim()
        return {
          label: contactDisplayLabel(item.label, lang, href),
          href,
        }
      }) ?? []

  const skillGroups =
    homepage?.skillGroups
      ?.map((group) => {
        const items = pickLocale(group.items, lang) ?? []
        const title =
          group.showTitle === false
            ? ''
            : getSkillGroupTitle(group.kind, pickLocale(group.title, lang), lang)
        return { title, tags: items }
      })
      .filter((g) => g.tags.length > 0) ?? []

  const workEntries =
    homepage?.workExperienceItems
      ?.filter((item) => item.company && item.position)
      .map((item) => ({
        company: pickLocale(item.company, lang) ?? '',
        position: pickLocale(item.position, lang) ?? '',
        period: pickLocale(item.period, lang),
      })) ?? []

  const educationEntries =
    homepage?.educationItems
      ?.filter((item) => item.institution && item.program)
      .map((item) => ({
        organization: pickLocale(item.institution, lang) ?? '',
        specialization: pickLocale(item.program, lang) ?? '',
        level: getEducationLevelLabel(item.educationType, item.customEducationType, lang),
        period: pickLocale(item.period, lang),
      })) ?? []

  const personPhotoUrl = siteSettings?.personPhoto
    ? sanityImageUrl(siteSettings.personPhoto, 1200)
    : null

  const contactsButtons =
    siteSettings?.contactsButtons
      ?.filter(
        (item): item is SanityContact & { href: string } =>
          typeof item?.href === 'string' && item.href.trim().length > 0,
      )
      .map((item) => {
        const href = item.href.trim()
        return {
          label: contactDisplayLabel(item.label, lang, href),
          href,
          variant: item.variant === 'primary' ? ('primary' as const) : ('secondary' as const),
        }
      }) ?? []

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
