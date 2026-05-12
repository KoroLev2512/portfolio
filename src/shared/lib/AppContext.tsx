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

  useLayoutEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', theme)
    if (hasRestoredTheme.current) {
      localStorage.setItem(THEME_KEY, theme)
    }
  }, [theme])

  /** Skip one reveal reset after reading lang from storage (en→ru etc.); must not block first user switch when lang stayed `en` (no re-render). */
  const skipNextRevealReset = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    queueMicrotask(() => {
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
      skipNextRevealReset.current = true
      setLang(nextLang)
      window.setTimeout(() => {
        if (skipNextRevealReset.current) {
          skipNextRevealReset.current = false
        }
      }, 0)
    })
  }, [])

  /** First [lang] run is before restore-from-localStorage (async microtask); skip persist or we'd overwrite saved lang with default `en`. */
  const skipLangPersistOnce = useRef(true)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (skipLangPersistOnce.current) {
      skipLangPersistOnce.current = false
      return
    }

    localStorage.setItem(LANG_KEY, lang)

    if (skipNextRevealReset.current) {
      skipNextRevealReset.current = false
      return
    }

    resetTextReveals()
    resetTagReveals()
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

      const transition = document.startViewTransition(() => {
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
