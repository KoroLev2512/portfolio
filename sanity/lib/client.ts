import { createClient } from 'next-sanity'

import {
  apiVersion,
  dataset,
  isSanityConfigured,
  projectId,
  sanityReadToken,
} from '../env'

const STUB_PROJECT = 'missing-sanity-env'
const STUB_DATASET = 'missing-sanity-dataset'

const sharedConfig = isSanityConfigured
  ? ({ projectId, dataset, apiVersion } as const)
  : ({ projectId: STUB_PROJECT, dataset: STUB_DATASET, apiVersion } as const)

export const sanityPublicClient = createClient({
  ...sharedConfig,
  useCdn: process.env.NODE_ENV === 'production',
})

export const sanityAuthenticatedClient =
  isSanityConfigured &&
  typeof sanityReadToken === 'string' &&
  sanityReadToken.trim() !== ''
    ? createClient({
        projectId: sharedConfig.projectId,
        dataset: sharedConfig.dataset,
        apiVersion: sharedConfig.apiVersion,
        useCdn: false,
        token: sanityReadToken.trim(),
      })
    : null

export const client = sanityPublicClient
