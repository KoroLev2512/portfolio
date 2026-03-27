'use client'

import { type StaticImageData } from 'next/image'
import { ImageWithLoader } from '@/shared/ui/ImageWithLoader'
import { useMemo } from 'react'
import mockupImg from '@/../public/mockup.webp'
import {
  mapSanityProjectDetail,
  type SanityProjectDocument,
} from '@/sanity/lib/projectDetailMapper'
import { ContactsBlock } from '@/shared/ui/ContactsBlock'
import { Pattern } from '@/shared/ui/Pattern'
import { ArrowIcon } from '@/shared/ui/ArrowIcon'
import { fillNameInAlt, getTranslations } from '@/shared/i18n'
import { hrefProjectBySlug } from '@/shared/lib/projectPath'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { useAppContext } from '@/shared/lib/AppContext'
import { useContactsBlockProps, usePortfolioMapped } from '@/shared/lib/PortfolioSanityContext'
import { ProjectDetailContent } from './ProjectDetailContent'
import { ProjectNav } from '@/shared/ui/ProjectNav'
import styles from './project-detail.module.css'

export type ProjectDetailPageClientProps = {
  sanityDoc: SanityProjectDocument
  slug: string
}

export function ProjectDetailPageClient({ sanityDoc, slug }: ProjectDetailPageClientProps) {
  const { theme, lang, onToggleTheme, onChangeLang } = useAppContext()
  const contactsBlock = useContactsBlockProps()
  const portfolio = usePortfolioMapped()

  const t = getTranslations(lang, 'project') as Record<string, string>

  const mapped = useMemo(() => mapSanityProjectDetail(sanityDoc, lang), [sanityDoc, lang])

  const nav = useMemo(() => {
    const projects = portfolio?.projects ?? []
    const idx = projects.findIndex((p) => p.slug === slug)
    const prevProject = idx > 0 ? projects[idx - 1] : null
    const nextProject = idx >= 0 && idx < projects.length - 1 ? projects[idx + 1] : null
    const prevSlug = prevProject?.slug?.trim()
    const nextSlug = nextProject?.slug?.trim()
    return {
      prev: prevSlug ? { href: hrefProjectBySlug(prevSlug), name: prevProject?.name ?? '' } : null,
      next: nextSlug ? { href: hrefProjectBySlug(nextSlug), name: nextProject?.name ?? '' } : null,
    }
  }, [portfolio?.projects, slug])

  const showProjectNav = nav.prev != null || nav.next != null

  if (!mapped) return null

  const heroAlt = fillNameInAlt(t.altPageHeroNamed, mapped.title)
  const heroSrc: StaticImageData | string = mapped.heroImageUrl ?? mockupImg

  return (
    <main className="portfolio">
      <Header theme={theme} lang={lang} onToggleTheme={onToggleTheme} onChangeLang={onChangeLang} logoHref="/" />

      <section
        className={`section section-lines-top-down project-detail ${styles['project-detail-intro']}`}
      >
        <div className={styles['project-detail-hero']}>
          <ImageWithLoader
            src={heroSrc}
            alt={heroAlt}
            className={styles['project-detail-hero-img']}
            width={1600}
            height={900}
            sizes="100vw"
            unoptimized={typeof heroSrc === 'string'}
            wrapperClassName={styles['project-detail-hero-loader']}
            priority
          />
        </div>
        <section className={styles['project-detail-head-inner']}>
          <h1 className={`${styles['project-detail-title']} text-reveal-title`}>{mapped.title}</h1>
          <div className={`${styles['project-detail-meta']} text-reveal-body`}>
            {mapped.company ? (
              <div className={styles['project-detail-meta-row']}>
                <span className={styles['project-detail-meta-label']}>{t.metaCompany}</span>
                <span className={styles['project-detail-meta-value']}>{mapped.company}</span>
              </div>
            ) : null}
            {mapped.sphere ? (
              <div className={styles['project-detail-meta-row']}>
                <span className={styles['project-detail-meta-label']}>{t.metaSphere}</span>
                <span className={styles['project-detail-meta-value']}>{mapped.sphere}</span>
              </div>
            ) : null}
            {mapped.timeline ? (
              <div className={styles['project-detail-meta-row']}>
                <span className={styles['project-detail-meta-label']}>{t.metaTimeline}</span>
                <span className={styles['project-detail-meta-value']}>{mapped.timeline}</span>
              </div>
            ) : null}
            {mapped.role ? (
              <div className={styles['project-detail-meta-row']}>
                <span className={styles['project-detail-meta-label']}>{t.metaRole}</span>
                <span className={styles['project-detail-meta-value']}>{mapped.role}</span>
              </div>
            ) : null}
            {mapped.links.length > 0 ? (
              <div className={styles['project-detail-meta-row']}>
                <span className={styles['project-detail-meta-label']}>{t.metaLinks}</span>
                <div className={styles['project-detail-links']}>
                  {mapped.links.map((link, i) => (
                    <a key={`${link.href}-${i}`} href={link.href} className={styles['project-detail-link']}>
                      {link.label}
                      <ArrowIcon className="external-link-icon" />
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          {mapped.description.trim() ? (
            <p className={`${styles['project-detail-description']} text-reveal-body`}>{mapped.description}</p>
          ) : null}
        </section>
      </section>
      <Pattern />
      <ProjectDetailContent
        sections={mapped.sections}
        closeImageModalAriaLabel={t.closeImageModal}
        imageFallbackCaption={t.imageCaption}
      />
      {showProjectNav ? (
        <ProjectNav
          prevProjectLabel={t.prevProject}
          nextProjectLabel={t.nextProject}
          prev={nav.prev}
          next={nav.next}
        />
      ) : null}
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
