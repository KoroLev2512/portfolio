import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ClientBoot } from './ClientBoot'
import { AppProvider } from '@/shared/lib/AppContext'
import { PortfolioSanityProvider } from '@/shared/lib/PortfolioSanityContext'
import { getPortfolioHomeDocuments } from '@/sanity/lib/getPortfolioHome'
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

const staticOgImage = absoluteUrlForPublicFile('metadata_en.png')
const staticFaviconUrl = absoluteUrlForPublicFile('favicon.ico')

const metadataBase =
  getMetadataBaseUrl() ??
  new URL(`http://localhost:${process.env.PORT ?? '3000'}`)

const yandexMetrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID

export async function generateMetadata(): Promise<Metadata> {
  const { siteSettings } = await getPortfolioHomeDocuments()
  const { sanityImageUrl } = await import('@/sanity/lib/imagePublic')

  const title =
    siteSettings?.seoTitle?.en ||
    siteSettings?.seoTitle?.ru ||
    siteSettings?.personName?.en ||
    'Korolev Yurii'

  const description =
    siteSettings?.seoDescription?.en ||
    siteSettings?.seoDescription?.ru ||
    'Frontend developer'

  const faviconSanity = siteSettings?.favicon
    ? sanityImageUrl(siteSettings.favicon, 64, { format: 'png' })
    : null
  const faviconIcon = faviconSanity ?? staticFaviconUrl

  const ogUrl = siteSettings?.seoImageEn
    ? sanityImageUrl(siteSettings.seoImageEn, 1200, { format: 'png' })
    : staticOgImage
  const socialImages = ogUrl ? [{ url: ogUrl, alt: title }] : undefined

  return {
    metadataBase,
    title,
    description,
    verification: {
      yandex: 'bfea9322e4369314',
    },
    icons: faviconIcon ? { icon: faviconIcon } : undefined,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      alternateLocale: ['ru_RU'],
      siteName: 'Portfolio',
      url: getPublicSiteOrigin(),
      images: socialImages,
    },
    twitter: {
      card: 'summary_large_image',
      images: socialImages?.map((img) => img.url),
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const sanityDocs = await getPortfolioHomeDocuments()
  const yandexMetrikaSrc = yandexMetrikaId
    ? `https://mc.yandex.ru/metrika/tag.js?id=${yandexMetrikaId}`
    : null

  return (
    <html lang="en" suppressHydrationWarning>
      {yandexMetrikaSrc && (
        <head>
          <Script src={yandexMetrikaSrc} strategy="afterInteractive" />
          <Script id="yandex-metrika-init" strategy="afterInteractive">
            {`
              window.ym = window.ym || function() {
                (window.ym.a = window.ym.a || []).push(arguments);
              };
              window.ym.l = Date.now();
              ym(${yandexMetrikaId}, "init", {
                clickmap: true,
                trackLinks: true,
                accurateTrackBounce: true,
                webvisor: true
              });
            `}
          </Script>
        </head>
      )}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {yandexMetrikaId && (
          <noscript>
            <div>
              {/* Yandex noscript pixel — must be raw <img>; next/image is not appropriate here. */}
              {/* eslint-disable-next-line @next/next/no-img-element -- tracking pixel in <noscript> */}
              <img
                src={`https://mc.yandex.ru/watch/${yandexMetrikaId}`}
                style={{ position: 'absolute', left: '-9999px' }}
                alt=""
              />
            </div>
          </noscript>
        )}
        <AppProvider>
          <PortfolioSanityProvider sanityDocs={sanityDocs}>
            <ClientBoot>{children}</ClientBoot>
          </PortfolioSanityProvider>
        </AppProvider>
      </body>
    </html>
  )
}
