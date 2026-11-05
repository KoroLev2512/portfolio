'use client'

import { useSyncExternalStore } from 'react'
import { getTranslations } from '@/shared/i18n'
import { useAppContext } from '@/shared/lib/AppContext'
import styles from './CookieBanner.module.css'

const STORAGE_KEY = 'portfolio-cookies-accepted'
const listeners = new Set<() => void>()

function isAccepted() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    // Storage blocked: showing the banner on every visit is the lesser evil.
    return false
  }
}

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  return () => {
    listeners.delete(onChange)
  }
}

function accept() {
  try {
    localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // Not persisted; the banner still hides until the next page load.
  }
  for (const listener of listeners) listener()
}

export function CookieBanner() {
  const { lang } = useAppContext()
  // Server snapshot says "accepted" so the static HTML never contains the
  // banner and returning visitors don't see it flash before hydration.
  const accepted = useSyncExternalStore(subscribe, isAccepted, () => true)
  if (accepted) return null

  const t = getTranslations(lang, 'home')

  return (
    <section className={styles.banner} role="region" aria-label={t.cookieLabel}>
      <p className={styles.text}>{t.cookieText}</p>
      <button type="button" className={`btn btn-primary btn-primary-s ${styles.button}`} onClick={accept}>
        {t.cookieAccept}
      </button>
    </section>
  )
}
