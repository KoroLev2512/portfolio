'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { resetTextReveals } from '@/shared/lib/imageReveal'
import { resetTagReveals } from '@/shared/lib/tagReveal'
import {
  applyTheme,
  getServerTheme,
  getTheme,
  notifyTheme,
  readStoredTheme,
  subscribeTheme,
  writeStoredTheme,
  type Theme,
} from '@/shared/lib/themeStore'
import type { Lang } from '@/shared/i18n'

export type { Theme }
export type { Lang }

const LANG_KEY = 'portfolio-lang'
const SWITCHING_CLASS = 'theme-switching'
const REVEAL_DURATION_MS = 450

function getLangFromPathname(pathname: string | null): Lang | null {
  if (!pathname) return null
  if (pathname === '/en' || pathname.startsWith('/en/')) return 'en'
  if (pathname === '/ru' || pathname.startsWith('/ru/')) return 'ru'
  return null
}

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
  const pathname = usePathname()
  const router = useRouter()
  const pathLang = getLangFromPathname(pathname)

  const [lang, setLang] = useState<Lang>(() => pathLang ?? 'en')
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      // A choice persisted in localStorage outranks the OS. This used to be a
      // ref that reset on every reload, so an OS appearance change silently
      // overrode the theme the user had picked.
      if (readStoredTheme() !== null) return
      applyTheme(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  const skipNextRevealReset = useRef(false)

  // Sync state with pathLang when URL changes to /en or /ru
  useEffect(() => {
    if (pathLang) {
      setLang(pathLang)
      if (typeof window !== 'undefined') {
        localStorage.setItem(LANG_KEY, pathLang)
      }
    }
  }, [pathLang])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (pathLang) return
    queueMicrotask(() => {
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
  }, [pathLang])

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

  const onToggleTheme = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return

    const root = document.documentElement
    const next: Theme = getTheme() === 'light' ? 'dark' : 'light'

    // Touching the attribute directly, without notifying React, keeps the
    // whole tree out of the snapshot window — flushSync used to re-render
    // every section right where the browser is blocked capturing frames.
    const commit = () => {
      applyTheme(next, { notify: false })
      writeStoredTheme(next)
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion || !document.startViewTransition) {
      commit()
      notifyTheme()
      return
    }

    const vw = window.innerWidth
    const vh = window.innerHeight
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const maxRadius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y))

    // Everything goes in as a percentage, never px. The snapshot box that
    // clip-path resolves against is sized in device pixels, so px coordinates
    // land at position / devicePixelRatio — dead on at DPR 1, half way across
    // the viewport on a Retina panel. Percentages resolve against the box
    // itself, whatever scale it is at. A percentage radius resolves against
    // sqrt(w² + h²) / sqrt(2) per CSS Shapes, hence the basis below.
    const radiusBasis = Math.hypot(vw, vh) / Math.SQRT2

    // The reveal is declared in CSS so it is already running on the first
    // rendered frame of the transition — no ready.then() gap to lose.
    root.style.setProperty('--theme-reveal-x', `${(x / vw) * 100}%`)
    root.style.setProperty('--theme-reveal-y', `${(y / vh) * 100}%`)
    root.style.setProperty('--theme-reveal-r', `${(maxRadius / radiusBasis) * 100}%`)
    root.style.setProperty('--theme-reveal-duration', `${REVEAL_DURATION_MS}ms`)
    root.classList.add(SWITCHING_CLASS)

    const transition = document.startViewTransition(commit)

    // React only learns about the new theme once the reveal is over: it needs
    // it for two aria labels, which nobody can read mid-animation anyway.
    const finish = () => {
      root.classList.remove(SWITCHING_CLASS)
      notifyTheme()
    }
    transition.finished.then(finish, finish)
  }, [])

  const onChangeLang = useCallback(
    (next: Lang) => {
      setLang(next)
      if (typeof window !== 'undefined') {
        localStorage.setItem(LANG_KEY, next)
      }
      if (pathname === '/en' && next === 'ru') {
        router.push('/ru')
      } else if (pathname === '/ru' && next === 'en') {
        router.push('/en')
      }
    },
    [pathname, router],
  )

  const value = useMemo<AppContextValue>(
    () => ({ theme, lang, onToggleTheme, onChangeLang }),
    [theme, lang, onToggleTheme, onChangeLang],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
