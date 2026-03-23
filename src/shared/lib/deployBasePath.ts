/**
 * Должен совпадать с `basePath` / `assetPrefix` в `next.config.ts`.
 *
 * - **Корень домена** (dev-by-yurii.ru): задай `NEXT_PUBLIC_BASE_PATH=` (пусто) при сборке.
 * - **GitHub Pages / подпапка**: `NEXT_PUBLIC_BASE_PATH=/portfolio` (или свой путь).
 */
export function getDeployBasePath(): string {
  if (process.env.PREVIEW === '1') return ''
  if (process.env.VERCEL === '1') return ''
  if (process.env.NODE_ENV !== 'production') return ''
  const v = process.env.NEXT_PUBLIC_BASE_PATH
  if (v !== undefined) return v.trim()
  return '/portfolio'
}
