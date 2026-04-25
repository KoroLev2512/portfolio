'use client'

import Link from 'next/link'
import { ArrowIcon } from '@/shared/ui/ArrowIcon'
import { ThemeIcon } from '@/shared/ui/ThemeIcon'
import type { Lang } from '@/shared/i18n'
import { usePortfolioMapped } from '@/shared/lib/PortfolioSanityContext'
import styles from './Footer.module.css'

function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

export type Theme = 'dark' | 'light'

export type FooterProps = {
  theme: Theme
  lang: Lang
  onToggleTheme: (e: React.MouseEvent<HTMLElement>) => void
  onChangeLang: (lang: Lang) => void
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
  const mapped = usePortfolioMapped()
  const aside = mapped?.footerAside
  const designerHref = aside?.linkHref?.trim() || '#'
  const designerLabel =
    aside?.linkLabel?.trim() || (lang === 'ru' ? 'Денис Князев' : 'Denis Knyazev')

  const designerInner = (
    <>
      {designerLabel}
      <ArrowIcon className="external-link-icon" />
    </>
  )

  const designerLink =
    designerHref !== '#' && isInternalHref(designerHref) ? (
      <Link href={designerHref} className="external-link">
        {designerInner}
      </Link>
    ) : (
      <a
        href={designerHref}
        className="external-link"
        {...(designerHref !== '#' &&
        (designerHref.startsWith('http://') ||
          designerHref.startsWith('https://') ||
          designerHref.startsWith('mailto:') ||
          designerHref.startsWith('tel:'))
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {})}
      >
        {designerInner}
      </a>
    )

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
        {designerLink}
      </p>
    </footer>
  )
}
