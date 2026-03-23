import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ClientBoot } from './ClientBoot'
import { AppProvider } from '@/shared/lib/AppContext'

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

const basePath =
  process.env.NODE_ENV === 'production' &&
  process.env.PREVIEW !== '1' &&
  process.env.VERCEL !== '1'
    ? '/portfolio'
    : ''

/** Канонический origin без завершающего слэша (для og:url / абсолютных og:image). Задай в проде: NEXT_PUBLIC_SITE_URL */
function getMetadataBase(): URL | undefined {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '')
  if (!raw) return undefined
  try {
    return new URL(raw.endsWith('/') ? raw.slice(0, -1) : raw)
  } catch {
    return undefined
  }
}

const ogImageRu = `${basePath}/metadata_ru.png`
const ogImageEn = `${basePath}/metadata_en.png`

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: 'Portfolio',
  description: 'Korolev Yurii – frontend developer portfolio',
  icons: {
    icon: `${basePath}/favicon.ico`,
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    alternateLocale: ['en_US'],
    siteName: 'Portfolio',
    /** Первая картинка чаще всего уходит в превью; дальше — запасная локаль */
    images: [
      { url: ogImageRu, alt: 'Portfolio — Russian' },
      { url: ogImageEn, alt: 'Portfolio — English' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogImageEn, ogImageRu],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppProvider>
          <ClientBoot>{children}</ClientBoot>
        </AppProvider>
      </body>
    </html>
  )
}
