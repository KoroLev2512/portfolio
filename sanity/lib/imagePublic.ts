/**
 * Только NEXT_PUBLIC_* — без импорта `client` / строгого `env.ts`.
 * Безопасно для client components (не бросает при отсутствии токенов / server-only env).
 */
import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

function getBuilder() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  if (!projectId || !dataset) return null
  return createImageUrlBuilder({ projectId, dataset })
}

/** URL картинки или `null`, если нет env или ассета */
export function sanityImageUrl(source: Image | undefined, width: number, quality = 85): string | null {
  const builder = getBuilder()
  if (!builder || !source) return null
  try {
    return builder.image(source).width(width).quality(quality).url()
  } catch {
    return null
  }
}
