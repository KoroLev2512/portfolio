export type Theme = 'dark' | 'light'

export const THEME_KEY = 'portfolio-theme'

// The data-theme attribute on <html> is the single source of truth: it is set
// before first paint by the inline script in <head>, and React subscribes to
// it rather than owning it. That keeps the whole tree out of the
// startViewTransition() snapshot window.
const listeners = new Set<() => void>()

export function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_KEY)
    return stored === 'dark' || stored === 'light' ? stored : null
  } catch {
    return null
  }
}

export function writeStoredTheme(theme: Theme) {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch {
    // private mode / storage disabled — the choice just won't persist
  }
}

export function prefersDarkScheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function getTheme(): Theme {
  if (typeof document === 'undefined') return 'dark'
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function getServerTheme(): Theme {
  return 'dark'
}

export function notifyTheme() {
  for (const listener of listeners) listener()
}

/** Set `notify: false` to update the DOM without waking React up yet. */
export function applyTheme(theme: Theme, { notify = true }: { notify?: boolean } = {}) {
  document.documentElement.dataset.theme = theme
  if (notify) notifyTheme()
}

export function subscribeTheme(onChange: () => void) {
  listeners.add(onChange)
  return () => {
    listeners.delete(onChange)
  }
}
