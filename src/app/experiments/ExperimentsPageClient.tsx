'use client'

import Link from 'next/link'
import { ImageWithLoader } from '@/shared/ui/ImageWithLoader'
import { ContactsBlock } from '@/shared/ui/ContactsBlock'
import { Pattern } from '@/shared/ui/Pattern'
import { getTranslations, type Lang } from '@/shared/i18n'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { useAppContext } from '@/shared/lib/AppContext'
import { useContactsBlockProps } from '@/shared/lib/PortfolioSanityContext'
import type { ExperimentForUi } from '@/sanity/lib/getExperiments'
import styles from './page.module.css'

function ExperimentsTitleBlock({ lang }: { lang: Lang }) {
  const t = getTranslations(lang, 'experiments') as Record<string, string>
  return (
    <section className={`${styles.titleSection} section`}>
      <h1 className={`${styles.pageTitle} text-reveal-title`}>{t.pageTitle}</h1>
      <p className={`${styles.pageSubtitle} text-reveal-body`}>{t.pageSubtitle}</p>
    </section>
  )
}

function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

function ExperimentTile({
  experiment,
  index,
  alt,
}: {
  experiment: ExperimentForUi
  index: number
  alt: string
}) {
  const wide = (index + 1) % 3 === 0
  const tileClass = `experiments-gallery-tile ${styles.galleryTile} ${wide ? styles.galleryWide : ''}`
  const inner = (
    <div className={styles.galleryTileInner}>
      <ImageWithLoader
        fill
        wrapperClassName={styles.galleryImageLoader}
        src={experiment.imageUrl!}
        alt={alt}
        sizes={wide ? '(max-width: 45rem) 100vw, 45rem' : '(max-width: 45rem) 50vw, 22.5rem'}
        className={styles.galleryImg}
      />
    </div>
  )

  if (isInternalHref(experiment.href)) {
    return (
      <Link href={experiment.href} className={tileClass}>
        {inner}
      </Link>
    )
  }

  return (
    <a
      href={experiment.href}
      className={tileClass}
      target="_blank"
      rel="noopener noreferrer"
    >
      {inner}
    </a>
  )
}

export default function ExperimentsPageClient({ experiments }: { experiments: ExperimentForUi[] }) {
  const { theme, lang, onToggleTheme, onChangeLang } = useAppContext()
  const t = getTranslations(lang, 'experiments') as Record<string, string>
  const contactsBlock = useContactsBlockProps()

  const altFor = (item: ExperimentForUi) => {
    const title = lang === 'ru' ? item.titleRu : item.titleEn
    const fallback = lang === 'ru' ? item.titleEn : item.titleRu
    return (title || fallback || t.imageAltFallback).trim()
  }

  return (
    <main className="portfolio">
      <Header theme={theme} lang={lang} onToggleTheme={onToggleTheme} onChangeLang={onChangeLang} logoHref="/" />
      <ExperimentsTitleBlock lang={lang} />
      <Pattern />
      <section className="section">
        {experiments.length === 0 ? (
          <p className={`${styles.pageSubtitle} text-reveal-body`}>{t.emptyGallery}</p>
        ) : (
          <div className={styles.gallery} aria-label={t.pageTitle}>
            {experiments.map((item, i) => (
              <ExperimentTile key={item.id} experiment={item} index={i} alt={altFor(item)} />
            ))}
          </div>
        )}
      </section>
      <Pattern />
      <ContactsBlock
        sectionTitle={contactsBlock.sectionTitle}
        title={contactsBlock.title}
        buttons={contactsBlock.buttons}
        useReveal
      />
      <Footer theme={theme} lang={lang} onToggleTheme={onToggleTheme} onChangeLang={onChangeLang} useReveal />
    </main>
  )
}
