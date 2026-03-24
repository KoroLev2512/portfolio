import { getDeployBasePath } from '@/shared/lib/deployBasePath'

/** Канонический origin без завершающего слэша, из NEXT_PUBLIC_SITE_URL */
export function getPublicSiteOrigin(): string | undefined {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (!raw) return undefined
  try {
    const u = new URL(raw.endsWith('/') ? raw.slice(0, -1) : raw)
    return u.href.replace(/\/$/, '')
  } catch {
    return undefined
  }
}

/** База для Metadata API (og:, иконки по относительным путям) */
export function getMetadataBaseUrl(): URL | undefined {
  const fromEnv = getPublicSiteOrigin()
  if (fromEnv) {
    try {
      return new URL(`${fromEnv}/`)
    } catch {
      /* fall through */
    }
  }
  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) {
    try {
      return new URL(`https://${vercel.replace(/^\/+/, '')}`)
    } catch {
      return undefined
    }
  }
  return undefined
}

/**
 * Абсолютный URL файла из `public/` для og:image, Twitter и т.д.
 * Работает только если задан NEXT_PUBLIC_SITE_URL при сборке.
 */
export function absoluteUrlForPublicFile(filename: string): string | undefined {
  const origin = getPublicSiteOrigin()
  if (!origin) return undefined
  const name = filename.replace(/^\/+/, '')
  const bp = getDeployBasePath()
  const path = `${bp}/${name}`.replace(/\/{2,}/g, '/')
  try {
    return new URL(path, `${origin}/`).href
  } catch {
    return undefined
  }
}
