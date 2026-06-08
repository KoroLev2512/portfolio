import { createImageUrlBuilder } from '@sanity/image-url'

function getBuilder() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  if (!projectId || !dataset) return null
  return createImageUrlBuilder({ projectId, dataset })
}

export type SanityImageFormat = 'webp' | 'jpg' | 'png' | 'pjpg'

export type SanityImageSource = {
  _type?: string
  asset?: { _ref: string; _type: string } | undefined
  hotspot?: { x?: number; y?: number; height?: number; width?: number } | undefined
  crop?: { top?: number; bottom?: number; left?: number; right?: number } | undefined
}

export function sanityImageUrl(
  source: SanityImageSource | undefined | null,
  width: number,
  options?: { quality?: number; format?: SanityImageFormat },
): string | null {
  const builder = getBuilder()
  if (!builder || !source) return null
  const quality = options?.quality ?? 85
  try {
    let img = builder.image(source).width(width).quality(quality)
    if (options?.format) {
      img = img.format(options.format)
    }
    return img.url()
  } catch {
    return null
  }
}
