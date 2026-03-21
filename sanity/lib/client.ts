import { createClient } from 'next-sanity'

import {
  apiVersion,
  dataset,
  isSanityConfigured,
  projectId,
  sanityReadToken,
} from '../env'

/** Заглушка только чтобы `createClient` существовал при сборке без env; `fetch` не вызываем без `isSanityConfigured` */
const STUB_PROJECT = 'missing-sanity-env'
const STUB_DATASET = 'production'

const sharedConfig = isSanityConfigured
  ? ({ projectId, dataset, apiVersion } as const)
  : ({ projectId: STUB_PROJECT, dataset: STUB_DATASET, apiVersion } as const)

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

/** Дефолт для `fetch` на сайте — без токена */
export const client = sanityPublicClient
