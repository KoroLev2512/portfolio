import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'
const isPreview = process.env.PREVIEW === '1'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd && !isPreview ? '/portfolio' : '',
  assetPrefix: isProd && !isPreview ? '/portfolio' : '',
  images: {
    unoptimized: true,
  },
}

export default nextConfig
