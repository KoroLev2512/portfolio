export function getDeployBasePath(): string {
  if (process.env.PREVIEW === '1') return ''
  if (process.env.VERCEL === '1') return ''
  if (process.env.NODE_ENV !== 'production') return ''
  const v = process.env.NEXT_PUBLIC_BASE_PATH
  if (v !== undefined) return v.trim()
  return '/portfolio'
}
