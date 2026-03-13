'use client'

import { useEffect } from 'react'
import { initRipple } from '@/shared/lib/ripple'
import { initImageReveal } from '@/shared/lib/imageReveal'
import { initLineReveal } from '@/shared/lib/lineReveal'
import { initTagReveal } from '@/shared/lib/tagReveal'

export function ClientBoot({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initRipple()
    initImageReveal()
    initLineReveal()
    initTagReveal()
  }, [])

  return children
}

