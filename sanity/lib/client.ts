import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, sanityReadToken } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: sanityReadToken ? false : true,
  token: sanityReadToken,
})
