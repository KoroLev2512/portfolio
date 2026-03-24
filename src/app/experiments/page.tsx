'use client'

import Image from 'next/image'
import mockupImg from '@/../public/mockup.webp'
import mockupsImg from '@/../public/mockups.webp'
import { ContactsBlock } from '@/shared/ui/ContactsBlock'
import { Pattern } from '@/shared/ui/Pattern'
import { getTranslations, type Lang } from '@/shared/i18n'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { useAppContext } from '@/shared/lib/AppContext'
import { useContactsBlockProps } from '@/shared/lib/PortfolioSanityContext'
import styles from './page.module.css'

const GALLERY: { wide: boolean; image: 'single' | 'triple' }[] = [
  { wide: false, image: 'triple' },
  { wide: false, image: 'single' },
  { wide: true, image: 'single' },
  { wide: false, image: 'single' },
  { wide: false, image: 'triple' },
  { wide: true, image: 'triple' },
]

function GalleryTile({
  wide,
  variant,
  alt,
}: {
  wide: boolean
  variant: 'single' | 'triple'
  alt: string
}) {
  const src = variant === 'triple' ? mockupsImg : mockupImg

  return (
    <div
      className={`experiments-gallery-tile ${styles.galleryTile} ${wide ? styles.galleryWide : ''}`}
    >
      <div className={styles.galleryTileInner}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={wide ? '(max-width: 720px) 100vw, 720px' : '(max-width: 720px) 50vw, 360px'}
          className={styles.galleryImg}
        />
      </div>
    </div>
  )
}

function ExperimentsTitleBlock({ lang }: { lang: Lang }) {
  const t = getTranslations(lang, 'experiments') as Record<string, string>
  return (
    <section className={`${styles.titleSection} section`}>
      <h1 className={`${styles.pageTitle} text-reveal-title`}>{t.pageTitle}</h1>
      <p className={`${styles.pageSubtitle} text-reveal-body`}>{t.pageSubtitle}</p>
    </section>
  )
}

export default function ExperimentsPage() {
  const { theme, lang, onToggleTheme, onChangeLang } = useAppContext()
  const t = getTranslations(lang, 'experiments') as Record<string, string>
  const contactsBlock = useContactsBlockProps()

  return (
    <main className="portfolio">
      <Header theme={theme} lang={lang} onToggleTheme={onToggleTheme} onChangeLang={onChangeLang} logoHref="/" />
      <ExperimentsTitleBlock lang={lang} />
      <Pattern />
      <section className="section">
        <div className={styles.gallery} aria-label={t.pageTitle}>
          {GALLERY.map((item, i) => (
            <GalleryTile
              key={i}
              wide={item.wide}
              variant={item.image}
              alt={item.image === 'triple' ? t.altGalleryMockupsRow : t.altGalleryMockup}
            />
          ))}
        </div>
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
