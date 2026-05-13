import type { Metadata } from 'next'
import { HomePageClient } from './HomePageClient'

export const metadata: Metadata = {
  title: 'Korolev Yurii',
  description: 'Frontend developer',
}

export default function HomePage() {
  return <HomePageClient />
}
