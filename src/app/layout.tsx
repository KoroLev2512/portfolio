import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ClientBoot } from './ClientBoot'
import { AppProvider } from '@/shared/lib/AppContext'
import { PortfolioSanityProvider } from '@/shared/lib/PortfolioSanityContext'
import { getPortfolioHomeDocuments } from '@/sanity/lib/getPortfolioHome'
import { getDeployBasePath } from '@/shared/lib/deployBasePath'
import {
  absoluteUrlForPublicFile,
  getMetadataBaseUrl,
  getPublicSiteOrigin,
} from '@/shared/lib/publicSiteUrl'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  preload: false,
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  preload: false,
})

const basePath = getDeployBasePath()

const ogImageEnAbs = absoluteUrlForPublicFile('metadata_en.png')
const ogImageRuAbs = absoluteUrlForPublicFile('metadata_ru.png')
const ogImageEn = ogImageEnAbs ?? `${basePath}/metadata_en.png`
const ogImageRu = ogImageRuAbs ?? `${basePath}/metadata_ru.png`

export const metadata: Metadata = {
  metadataBase: getMetadataBaseUrl(),
  title: 'Korolev Yurii',
  description: 'Frontend developer',
  icons: {
    icon: absoluteUrlForPublicFile('favicon.ico') ?? `${basePath}/favicon.ico`,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['ru_RU'],
    siteName: 'Portfolio',
    url: getPublicSiteOrigin(),
    images: [
      { url: ogImageEn, alt: 'Portfolio — English' },
      { url: ogImageRu, alt: 'Portfolio — Russian' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogImageEn, ogImageRu],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const sanityDocs = await getPortfolioHomeDocuments()
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProvider>
          <PortfolioSanityProvider sanityDocs={sanityDocs}>
            <ClientBoot>{children}</ClientBoot>
          </PortfolioSanityProvider>
        </AppProvider>
      </body>
    </html>
  )
}
