/**
 * Только прямые обращения к `process.env.SANITY_STUDIO_*`.
 * Используется в `sanity.config.ts` (бандл студии в браузере).
 * Sanity подставляет эти переменные на этапе сборки Vite — без `?? NEXT_PUBLIC_*` и без `assertValue`.
 *
 * @see https://www.sanity.io/docs/environment-variables
 */
export const apiVersion = process.env.SANITY_STUDIO_API_VERSION || '2026-03-19'

/** Пустая строка, если не задано в .env — без throw в браузере студии */
export const projectId = process.env.SANITY_STUDIO_PROJECT_ID || ''

export const dataset = process.env.SANITY_STUDIO_DATASET || ''
