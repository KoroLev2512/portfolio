'use client'

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { resetTextReveals } from '@/shared/lib/imageReveal'
import { resetTagReveals } from '@/shared/lib/tagReveal'
import type { Lang } from '@/shared/i18n'

export type Theme = 'dark' | 'light'
export type { Lang }

const THEME_KEY = 'portfolio-theme'
const LANG_KEY = 'portfolio-lang'

type AppContextValue = {
  theme: Theme
  lang: Lang
  onToggleTheme: (e: React.MouseEvent<HTMLElement>) => void
  onChangeLang: (lang: Lang) => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function useAppContext() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useAppContext must be used inside AppProvider')
  return ctx
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [lang, setLang] = useState<Lang>('en')
  const hasRestoredTheme = useRef(false)

  // Sync data-theme attribute
  useLayoutEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', theme)
    if (hasRestoredTheme.current) {
      localStorage.setItem(THEME_KEY, theme)
    }
  }, [theme])

  // Restore theme and lang from localStorage on first mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null
    const nextTheme: Theme =
      storedTheme === 'dark' || storedTheme === 'light'
        ? storedTheme
        : window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
    setTheme(nextTheme)
    hasRestoredTheme.current = true

    const storedLang = localStorage.getItem(LANG_KEY) as Lang | null
    let nextLang: Lang = 'en'
    if (storedLang === 'ru' || storedLang === 'en') {
      nextLang = storedLang
    } else if (typeof navigator !== 'undefined') {
      nextLang = navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en'
    }
    setLang(nextLang)
  }, [])

  // Persist lang changes and re-trigger reveal animations
  const langMounted = useRef(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem(LANG_KEY, lang)
    
    // Only reset if lang was already mounted (to avoid resetting on initial restore)
    if (langMounted.current) {
      resetTextReveals()
      resetTagReveals()
    } else {
      langMounted.current = true
    }
  }, [lang])

  const onToggleTheme = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (typeof document === 'undefined' || typeof window === 'undefined') {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
        return
      }

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const nextTheme: Theme = theme === 'light' ? 'dark' : 'light'

      if (!document.startViewTransition) {
        setTheme(nextTheme)
        return
      }

      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )

      const transition = (document as any).startViewTransition(() => {
        flushSync(() => setTheme(nextTheme))
      })

      transition.ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 700,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            pseudoElement: '::view-transition-new(root)',
          },
        )
      })
    },
    [theme],
  )

  const onChangeLang = useCallback((next: Lang) => {
    setLang(next)
  }, [])

  return (
    <AppContext.Provider value={{ theme, lang, onToggleTheme, onChangeLang }}>
      {children}
    </AppContext.Provider>
  )
}
