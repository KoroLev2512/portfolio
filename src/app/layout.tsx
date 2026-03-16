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

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Korolev Yurii – frontend developer portfolio',
  icons: {
    icon: `${basePath}/favicon.ico`,
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
