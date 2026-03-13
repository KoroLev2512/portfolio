import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // статика для GitHub Pages
  output: 'export',
  // для user-страницы (https://KoroLev2512.github.io) basePath/assetPrefix не нужны
}

export default nextConfig
