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

const ogImageEn = absoluteUrlForPublicFile('metadata_en.png')
const ogImageRu = absoluteUrlForPublicFile('metadata_ru.png')
const faviconUrl = absoluteUrlForPublicFile('favicon.ico')

const socialImages =
  ogImageEn && ogImageRu
    ? [
        { url: ogImageEn, alt: 'Portfolio — English' },
        { url: ogImageRu, alt: 'Portfolio — Russian' },
      ]
    : undefined

const metadataBase =
  getMetadataBaseUrl() ??
  new URL(`http://localhost:${process.env.PORT ?? '3000'}`)

const yandexMetrikaId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID

export const metadata: Metadata = {
  metadataBase,
  title: 'Korolev Yurii',
  description: 'Frontend developer',
  verification: {
    yandex: 'bfea9322e4369314',
  },
  icons: faviconUrl ? { icon: faviconUrl } : undefined,
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
    images: socialImages?.map((i) => i.url),
  },
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
