import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, sanityReadToken } from '../env'

const sharedConfig = {
  projectId,
  dataset,
  apiVersion,
} as const

/**
 * Публичный API — только **опубликованные** документы, **без токена**.
 * Если в `.env.local` лежит `SANITY_API_READ_TOKEN` от *другого* проекта, запросы с токеном падают с:
 * `401 Session does not match project host` (SIO-401-AWH).
 * Для главной и статического сайта токен не обязателен.
 */
export const sanityPublicClient = createClient({
  ...sharedConfig,
  /** В dev без CDN данные обновляются быстрее после Publish */
  useCdn: process.env.NODE_ENV === 'production',
})

/**
 * Тот же проект, но с токеном — для будущего preview / Live / черновиков.
 * Токен: https://www.sanity.io/manage → проект из `NEXT_PUBLIC_SANITY_PROJECT_ID` → API → Read token.
 */
export const sanityAuthenticatedClient =
  typeof sanityReadToken === 'string' && sanityReadToken.trim() !== ''
    ? createClient({
        ...sharedConfig,
        useCdn: false,
        token: sanityReadToken.trim(),
      })
    : null

/** Дефолт для `fetch` на сайте — без токена */
export const client = sanityPublicClient
