'use client'

import { ArrowIcon } from '@/shared/ui/ArrowIcon'
import { ThemeIcon } from '@/shared/ui/ThemeIcon'
import type { Lang } from '@/shared/i18n'
import styles from './Footer.module.css'

export type Theme = 'dark' | 'light'

export type FooterProps = {
  theme: Theme
  lang: Lang
  onToggleTheme: (e: React.MouseEvent<HTMLElement>) => void
  onChangeLang: (lang: Lang) => void
  /** Добавить класс text-reveal-body к блоку текста футера (главная, 404) */
  useReveal?: boolean
}

export function Footer({
  theme,
  lang,
  onToggleTheme,
  onChangeLang,
  useReveal = false,
}: FooterProps) {
  const textClass = useReveal ? `${styles['footer-text']} text-reveal-body` : styles['footer-text']

  return (
    <footer className={styles.footer}>
      <div className={styles['footer-mobile-controls']}>
        <div className="header-lang">
          <button
            type="button"
            className={lang === 'ru' ? 'header-lang-active' : undefined}
            onClick={() => onChangeLang('ru')}
          >
            Ру
          </button>
          <span> / </span>
          <button
            type="button"
            className={lang === 'en' ? 'header-lang-active' : undefined}
            onClick={() => onChangeLang('en')}
          >
            En
          </button>
        </div>
        <button
          className="theme-btn"
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          <ThemeIcon className="theme-btn-icon" />
        </button>
      </div>
      <p className={textClass}>©2026. All rights reserved</p>
      <p className={textClass}>
        <span className={styles['footer-designed-label']}>{lang === 'ru' ? 'Задизайнил' : 'Designed by'}</span>
        <a href="#" className={styles['footer-link']}>
          {lang === 'ru' ? 'Денис Князев' : 'Denis Knyazev'}
          <ArrowIcon className="external-link-icon" />
        </a>
      </p>
    </footer>
  )
}
