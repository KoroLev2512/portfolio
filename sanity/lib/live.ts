import { defineLive } from 'next-sanity/live'

import { sanityAuthenticatedClient, sanityPublicClient } from './client'

const liveClient = sanityAuthenticatedClient ?? sanityPublicClient

export const { sanityFetch, SanityLive } = defineLive({
  client: liveClient,
})
