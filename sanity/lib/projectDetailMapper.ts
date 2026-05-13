import type { Image } from 'sanity'

import type { Lang } from '@/shared/i18n'
import { sanityImageUrl } from './imagePublic'

type LocalizedValue<T = string> = { ru?: T; en?: T }

function pickLocale<T = string>(field: LocalizedValue<T> | T | undefined, lang: Lang): T | undefined {
  if (field == null) return undefined
  if (typeof field !== 'object') return field as T
  const loc = field as LocalizedValue<T>
  return loc[lang] ?? loc.en ?? loc.ru
}

function linkLabel(
  labelField: LocalizedValue<string> | string | undefined,
  lang: Lang,
  href: string,
): string {
  const fromLocale = pickLocale(labelField, lang)
  if (fromLocale != null && String(fromLocale).trim() !== '') {
    return String(fromLocale).trim()
  }
  const h = href.trim()
  if (!h) return ''
  try {
    const url = new URL(h)
    const host = url.hostname.replace(/^www\./i, '')
    return host
  } catch {
    return h
  }
}

export type MappedProjectBlock =
  | { _type: 'blockTitle'; _key?: string; text: string }
  | { _type: 'textBlock'; _key?: string; text: string }
  | { _type: 'listBlock'; _key?: string; items: { lineKey: string; text: string }[] }
  | { _type: 'imageBlock'; _key?: string; url: string | null; alt: string; caption?: string }
  | { _type: 'quoteBlock'; _key?: string; quoteHeading: string; text: string }

export type MappedProjectSection = {
  title: string
  blocks: MappedProjectBlock[]
}

export type MappedProjectDetail = {
  title: string
  slug: string
  heroImageUrl: string | null
  description: string
  company: string
  sphere: string
  timeline: string
  role: string
  links: { label: string; href: string }[]
  sections: MappedProjectSection[]
}

type RawLink = { label?: LocalizedValue<string> | string; href?: string }

type RawBlock = {
  _type?: string
  _key?: string
  text?: LocalizedValue<string> | string
  items?: LocalizedValue<string[]>
  image?: Image
  alt?: LocalizedValue<string> | string
  caption?: LocalizedValue<string> | string
  quoteHeading?: LocalizedValue<string> | string
  title?: LocalizedValue<string> | string
}

type RawSection = {
  title?: LocalizedValue<string> | string
  blocks?: RawBlock[]
}

export type SanityProjectDocument = {
  _id?: string
  title?: LocalizedValue<string> | string
  slug?: string
  coverImage?: Image
  shortDescription?: LocalizedValue<string> | string
  heroDescription?: LocalizedValue<string> | string
  client?: LocalizedValue<string> | string
  domain?: LocalizedValue<string> | string
  timeline?: LocalizedValue<string> | string
  role?: LocalizedValue<string> | string
  links?: RawLink[]
  sections?: RawSection[]
} | null

function mapBlock(block: RawBlock | undefined, lang: Lang): MappedProjectBlock | null {
  if (!block?._type) return null
  const key = block._key
  switch (block._type) {
    case 'blockTitle': {
      const text = pickLocale(block.text, lang)?.trim() ?? ''
      if (!text) return null
      return { _type: 'blockTitle', _key: key, text }
    }
    case 'textBlock': {
      const text = pickLocale(block.text, lang)?.trim() ?? ''
      if (!text) return null
      return { _type: 'textBlock', _key: key, text }
    }
    case 'listBlock': {
      const items = pickLocale(block.items, lang) ?? []
      const list = Array.isArray(items)
        ? items.filter((x): x is string => typeof x === 'string' && x.trim().length > 0)
        : []
      if (list.length === 0) return null
      const blockKey = key ?? 'list'
      const rows = list.map((text, line) => ({
        lineKey: `${blockKey}-line-${line}`,
        text,
      }))
      return { _type: 'listBlock', _key: key, items: rows }
    }
    case 'imageBlock': {
      const url = block.image ? sanityImageUrl(block.image, 1400, { format: 'webp', quality: 82 }) : null
      const alt = pickLocale(block.alt, lang)?.trim() || ''
      const caption = pickLocale(block.caption, lang)?.trim()
      return { _type: 'imageBlock', _key: key, url, alt, caption }
    }
    case 'quoteBlock': {
      const quoteHeading = pickLocale(block.quoteHeading ?? block.title, lang)?.trim() ?? ''
      const text = pickLocale(block.text, lang)?.trim() ?? ''
      if (!quoteHeading && !text) return null
      return { _type: 'quoteBlock', _key: key, quoteHeading, text }
    }
    default:
      return null
  }
}

export function mapSanityProjectDetail(doc: SanityProjectDocument, lang: Lang): MappedProjectDetail | null {
  if (doc == null) return null
  const slug = typeof doc.slug === 'string' ? doc.slug.trim() : ''
  if (!slug) return null

  const title = pickLocale(doc.title, lang)?.trim() || 'Project'
  const heroImageUrl = doc.coverImage
    ? sanityImageUrl(doc.coverImage, 1600, { format: 'webp', quality: 82 })
    : null

  const description =
    pickLocale(doc.heroDescription, lang)?.trim() || pickLocale(doc.shortDescription, lang)?.trim() || ''

  const links =
    (doc.links ?? [])
      .filter((l): l is RawLink & { href: string } => typeof l?.href === 'string' && l.href.trim().length > 0)
      .map((l) => ({
        label: linkLabel(l.label, lang, l.href.trim()),
        href: l.href.trim(),
      })) ?? []

  const sections: MappedProjectSection[] = (doc.sections ?? [])
    .map((section) => {
      const sectionTitle = pickLocale(section.title, lang)?.trim() ?? ''
      const blocks = (section.blocks ?? [])
        .map((b) => mapBlock(b, lang))
        .filter((b): b is MappedProjectBlock => b != null)
      if (!sectionTitle && blocks.length === 0) return null
      return { title: sectionTitle, blocks }
    })
    .filter((s): s is MappedProjectSection => s != null && (s.title.length > 0 || s.blocks.length > 0))

  return {
    title,
    slug,
    heroImageUrl,
    description,
    company: pickLocale(doc.client, lang)?.trim() ?? '',
    sphere: pickLocale(doc.domain, lang)?.trim() ?? '',
    timeline: pickLocale(doc.timeline, lang)?.trim() ?? '',
    role: pickLocale(doc.role, lang)?.trim() ?? '',
    links,
    sections,
  }
}
