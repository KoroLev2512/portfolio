import imageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlForImage(source: Image | undefined) {
  return builder.image(source as Image)
}
