'use client'

import Image from 'next/image'
import Link from 'next/link'
import { getTranslations, type Lang } from '@/shared/i18n'
import { usePortfolioMapped } from '@/shared/lib/PortfolioSanityContext'
import { resolveContactsSectionTitle } from '@/shared/lib/portfolioContacts'
import { SendIcon } from '@/shared/ui/SendIcon'
import { ThemeIcon } from '@/shared/ui/ThemeIcon'
import avatarImg from '@/../public/avatar.png'
import styles from './Header.module.css'

export type Theme = 'dark' | 'light'

export type HeaderProps = {
  theme: Theme
  lang: Lang
  onToggleTheme: (e: React.MouseEvent<HTMLElement>) => void
  onChangeLang: (lang: Lang) => void
  /** Если задан, левая часть (логотип/имя) — ссылка на этот href (например "/" на страницах проекта и 404) */
  logoHref?: string
  /** Переопределение из Sanity (siteSettings) */
  personName?: string
  personRole?: string
  /** URL фото; если с CDN — с unoptimized */
  personPhotoSrc?: string | null
}

export function Header({
  theme,
  lang,
  onToggleTheme,
  onChangeLang,
  logoHref,
  personName,
  personRole,
  personPhotoSrc,
}: HeaderProps) {
  const t = getTranslations(lang, 'home') as Record<string, string>
  const mapped = usePortfolioMapped()
  const isRuUi = lang === 'ru'
  const displayName =
    personName?.trim() || mapped?.personName?.trim() || t.name
  const displayRole =
    personRole?.trim() || mapped?.personRole?.trim() || t.position
  const photoFromCms = mapped?.personPhotoUrl?.trim()
  const photoSrc =
    personPhotoSrc?.trim()
      ? personPhotoSrc
      : photoFromCms
        ? photoFromCms
        : avatarImg
  const ctaLabel = resolveContactsSectionTitle(mapped, t.contactsCta)

  const handleContactsClick = () => {
    if (typeof document === 'undefined') return
    const el = document.getElementById('contacts')
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const leftContent = (
    <>
      <Image
        src={photoSrc}
        alt=""
        width={40}
        height={40}
        className={`${styles['header-photo']} img-reveal`}
        priority
        unoptimized={typeof photoSrc === 'string' && photoSrc.startsWith('http')}
      />
      <div>
        <span className={`${styles['header-name']} text-reveal-title`}>{displayName}</span>
        <span className={`${styles['header-position']} text-reveal-body`}> {displayRole}</span>
      </div>
    </>
  )

  const LeftWrapper = logoHref != null
    ? ({ children }: { children: React.ReactNode }) => (
        <Link href={logoHref!} className={`${styles['header-left']} ${styles['header-left-link']}`}>
          {children}
        </Link>
      )
    : ({ children }: { children: React.ReactNode }) => <div className={styles['header-left']}>{children}</div>

  return (
    <header className={styles.header}>
      <LeftWrapper>
        {leftContent}
      </LeftWrapper>
      <div className={styles['header-right']}>
        <div className={`${styles['header-cta-group']} header-cta-group`}>
          <button
            className={`btn btn-primary btn-primary-s ${styles['header-cta-text']} tag-reveal`}
            type="button"
            onClick={handleContactsClick}
          >
            {ctaLabel}
          </button>
          <button
            className={`btn btn-primary ${styles['header-cta-icon']} tag-reveal`}
            type="button"
            aria-label={ctaLabel}
            onClick={handleContactsClick}
          >
            <SendIcon className={styles['header-cta-icon-img']} />
          </button>
        </div>
        <div className="header-lang">
          <button
            type="button"
            className={lang === 'ru' ? 'header-lang-active' : undefined}
            onClick={() => onChangeLang('ru')}
            aria-label={isRuUi ? 'Переключить на русский язык' : 'Switch to Russian'}
            title={isRuUi ? 'Русский' : 'Russian'}
          >
            Ру
          </button>
          <span> / </span>
          <button
            type="button"
            className={lang === 'en' ? 'header-lang-active' : undefined}
            onClick={() => onChangeLang('en')}
            aria-label={isRuUi ? 'Переключить на английский язык' : 'Switch to English'}
            title={isRuUi ? 'Английский' : 'English'}
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
    </header>
  )
}
