'use client'

import { useEffect } from 'react'
import { initRipple } from '@/shared/lib/ripple'
import { initImageReveal, destroyImageReveal } from '@/shared/lib/imageReveal'
import { initLineReveal, destroyLineReveal } from '@/shared/lib/lineReveal'
import { initTagReveal, destroyTagReveal } from '@/shared/lib/tagReveal'

export function ClientBoot({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initRipple()
    initImageReveal()
    initLineReveal()
    initTagReveal()

    return () => {
      destroyImageReveal()
      destroyLineReveal()
      destroyTagReveal()
    }
  }, [])

  return children
}

