import type { NextConfig } from 'next'

import { getDeployBasePath } from './src/shared/lib/deployBasePath'

const basePath = getDeployBasePath()

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  assetPrefix: basePath,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
