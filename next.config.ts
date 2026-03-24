import type { NextConfig } from 'next'

import { getDeployBasePath } from './src/shared/lib/deployBasePath'

const basePath = getDeployBasePath()

if (
  process.env.NODE_ENV === 'production' &&
  !process.env.NEXT_PUBLIC_SITE_URL?.trim() &&
  !process.env.VERCEL
) {
  console.warn(
    '\n[portfolio] NEXT_PUBLIC_SITE_URL не задан при сборке: в og:image и превью ссылок может оказаться неверный host (например localhost). ' +
      'Для dev-by-yurii.ru задай NEXT_PUBLIC_SITE_URL=https://dev-by-yurii.ru и пересобери.\n',
  )
}

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
