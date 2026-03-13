'use client'

import { useEffect } from 'react'
import { initRipple } from '@/shared/lib/ripple'
import { initImageReveal } from '@/shared/lib/imageReveal'
import { initLineReveal } from '@/shared/lib/lineReveal'

export function ClientBoot({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initRipple()
    initImageReveal()
    initLineReveal()
  }, [])

  return children
}

