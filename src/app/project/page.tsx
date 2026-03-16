'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ContactsBlock } from '@/shared/ui/ContactsBlock'
import { Pattern } from '@/shared/ui/Pattern'
import { ArrowIcon } from '@/shared/ui/ArrowIcon'
import { ChevronIcon } from '@/shared/ui/ChevronIcon'
import projectImg from '@/../public/project.png'
import { getTranslations, projectData, getProjectDescription } from '@/shared/i18n'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { useAppContext } from '@/shared/lib/AppContext'
import styles from './project-detail.module.css'

export default function ProjectPage() {
  const { theme, lang, onToggleTheme, onChangeLang } = useAppContext()

  const t = getTranslations(lang, 'project') as Record<string, string>
  const description = getProjectDescription(lang)

  return (
    <main className="portfolio">
      <Header theme={theme} lang={lang} onToggleTheme={onToggleTheme} onChangeLang={onChangeLang} logoHref="/" />

      <section className="section section-lines-top-down">
        <div className={styles['project-detail-hero']}>
          <Image src={projectImg} alt="" className={`${styles['project-detail-hero-img']} img-reveal`} />
        </div>
      </section>

      <section className="project-detail section">
        <h1 className={`${styles['project-detail-title']} text-reveal-title`}>{projectData.title}</h1>

        <div className={`${styles['project-detail-meta']} text-reveal-body`}>
          <div className={styles['project-detail-meta-row']}>
            <span className={styles['project-detail-meta-label']}>{t.metaCompany}</span>
            <span className={styles['project-detail-meta-value']}>{projectData.company}</span>
          </div>
          <div className={styles['project-detail-meta-row']}>
            <span className={styles['project-detail-meta-label']}>{t.metaSphere}</span>
            <span className={styles['project-detail-meta-value']}>{projectData.sphere}</span>
          </div>
          <div className={styles['project-detail-meta-row']}>
            <span className={styles['project-detail-meta-label']}>{t.metaTimeline}</span>
            <span className={styles['project-detail-meta-value']}>{projectData.timeline}</span>
          </div>
          <div className={styles['project-detail-meta-row']}>
            <span className={styles['project-detail-meta-label']}>{t.metaRole}</span>
            <span className={styles['project-detail-meta-value']}>{projectData.role}</span>
          </div>
          <div className={styles['project-detail-meta-row']}>
            <span className={styles['project-detail-meta-label']}>{t.metaLinks}</span>
            <div className={styles['project-detail-links']}>
              {projectData.links.map((link, i) => (
                <a key={i} href={link.href} className={styles['project-detail-link']}>
                  {link.label}
                  <ArrowIcon className="external-link-icon" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <p className={`${styles['project-detail-description']} text-reveal-body`}>{description}</p>
      </section>

      <Pattern />
      <section className={`project-detail-content ${styles['project-detail-section-title-block']} section`}>
        <p className={`section-title ${styles['project-detail-section-title']} text-reveal-title`}>{t.sectionTitle}</p>
        <h2 className={`${styles['project-detail-block-title']} text-reveal-title`}>{t.blockTitle}</h2>
        <p className={`${styles['project-detail-body']} text-reveal-body`}>{t.blockBody}</p>
        <ul className={`${styles['project-detail-list']} text-reveal-body`}>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      </section>

      <section className={`${styles['project-detail-photo']} section`}>
        <div className={styles['project-detail-mockups-second']}>
          <Image src={projectImg} alt="" className={`${styles['project-detail-hero-img']} ${styles['project-detail-hero-img-secondary']} img-reveal`} />
        </div>
        <p className={`${styles['project-detail-caption']} text-reveal-body`}>{t.imageCaption}</p>
      </section>

      <section className={`project-detail-content ${styles['project-detail-content-narrow']} section`}>
        <div className={`${styles['project-detail-subtitle-block']} text-reveal-body`}>
          <h2 className={`${styles['project-detail-subtitle']} text-reveal-title`}>{t.subtitle}</h2>
          <p className={styles['project-detail-body']}>{t.blockBody}</p>
        </div>
        <p className={`${styles['project-detail-body']} text-reveal-body`}>{t.blockBody}</p>
      </section>

      <section className={`${styles['project-detail-nav-section']} section`}>
        <nav className={`${styles['project-detail-nav']} text-reveal-body`} aria-label="Project navigation">
          <Link href="/#projects" className={`project-nav-btn ${styles['project-detail-nav-card']} ${styles['project-detail-nav-prev']}`}>
            <ChevronIcon angle={180} className={styles['project-detail-nav-arrow']} />
            <div className={styles['project-detail-nav-card-text']}>
              <span className={styles['project-detail-nav-label']}>{t.prevProject}</span>
              <span className={styles['project-detail-nav-name']}>{projectData.title}</span>
            </div>
          </Link>
          <Link href="/#projects" className={`project-nav-btn ${styles['project-detail-nav-card']} ${styles['project-detail-nav-next']}`}>
            <div className={styles['project-detail-nav-card-text']}>
              <span className={styles['project-detail-nav-label']}>{t.nextProject}</span>
              <span className={styles['project-detail-nav-name']}>{projectData.title}</span>
            </div>
            <ChevronIcon angle={0} className={styles['project-detail-nav-arrow']} />
          </Link>
        </nav>
      </section>

      <Pattern />
      <ContactsBlock title={t.contactsCta} useReveal />
      <Footer theme={theme} lang={lang} onToggleTheme={onToggleTheme} onChangeLang={onChangeLang} useReveal />
    </main>
  )
}
