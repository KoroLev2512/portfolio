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

const ABOVE_FOLD_TILES = 2

function isInternalHref(href: string) {
  return href.startsWith('/') && !href.startsWith('//')
}

function ExperimentTile({
  experiment,
  index,
  title,
  alt,
}: {
  experiment: ExperimentForUi
  index: number
  title: string | null
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
        // The caption already names the link; repeating it as alt text would
        // make screen readers announce the title twice.
        alt={title ? '' : alt}
        sizes={wide ? '(max-width: 45rem) 100vw, 45rem' : '(max-width: 45rem) 50vw, 22.5rem'}
        // The first row is above the fold and holds the LCP image; lazy
        // loading would only delay it. Everything below stays lazy.
        loading={index < ABOVE_FOLD_TILES ? 'eager' : 'lazy'}
        className={styles.galleryImg}
      />
      {title && (
        <div className={styles.galleryCaption}>
          <span className={`${styles.galleryCaptionBlur} experiments-caption-blur`} aria-hidden />
          <p className={styles.galleryCaptionTitle}>{title}</p>
        </div>
      )}
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

  const titleFor = (item: ExperimentForUi) => {
    const own = lang === 'ru' ? item.titleRu : item.titleEn
    const other = lang === 'ru' ? item.titleEn : item.titleRu
    return (own || other)?.trim() || null
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
              <ExperimentTile
                key={item.id}
                experiment={item}
                index={i}
                title={titleFor(item)}
                alt={t.imageAltFallback}
              />
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
