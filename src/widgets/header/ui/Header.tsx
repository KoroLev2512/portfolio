'use client'

import { ImageWithLoader } from '@/shared/ui/ImageWithLoader'
import Link from 'next/link'
import { fillNameInAlt, getTranslations, type Lang } from '@/shared/i18n'
import { usePortfolioMapped, useSanityContentDisabled } from '@/shared/lib/PortfolioSanityContext'
import { resolveContactsSectionTitle } from '@/shared/lib/portfolioContacts'
import { getStubUiStrings } from '@/shared/lib/sanityStubUi'
import { stubPortraitSrc } from '@/shared/lib/stubPortraitAsset'
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
  logoHref?: string
  personName?: string
  personRole?: string
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
  const contentDisabled = useSanityContentDisabled()
  const stub = getStubUiStrings(lang)
  const isRuUi = lang === 'ru'
  const displayName = contentDisabled
    ? stub.personName
    : personName?.trim() || mapped?.personName?.trim() || t.name
  const displayRole = contentDisabled
    ? stub.personRole
    : personRole?.trim() || mapped?.personRole?.trim() || t.position
  const photoFromCms = mapped?.personPhotoUrl?.trim()
  const photoSrc = contentDisabled
    ? stubPortraitSrc
    : personPhotoSrc?.trim()
      ? personPhotoSrc
      : photoFromCms
        ? photoFromCms
        : avatarImg
  const ctaLabel = resolveContactsSectionTitle(mapped, t.contactsCta, { contentDisabled, lang })
  const photoAlt = fillNameInAlt(t.altPortraitNamed, displayName)

  const handleContactsClick = () => {
    if (typeof document === 'undefined') return
    const el = document.getElementById('contacts')
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const leftContent = (
    <>
      <ImageWithLoader
        fill
        wrapperClassName={styles['header-photo-wrap']}
        src={photoSrc}
        alt={photoAlt}
        className={styles['header-photo']}
        sizes="2.5rem"
        priority
        unoptimized={typeof photoSrc === 'string' && photoSrc.startsWith('http')}
      />
      <div>
        <span className={`${styles['header-name']} text-reveal-title`}>{displayName}</span>
        <span className={`${styles['header-position']} text-reveal-body`}> {displayRole}</span>
      </div>
    </>
  )

  return (
    <header className={styles.header}>
      {logoHref != null ? (
        <Link href={logoHref} className={`${styles['header-left']} ${styles['header-left-link']}`}>
          {leftContent}
        </Link>
      ) : (
        <div className={styles['header-left']}>{leftContent}</div>
      )}
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
