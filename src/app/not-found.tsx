'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ContactsBlock } from '@/shared/ui/ContactsBlock'
import { Pattern } from '@/shared/ui/Pattern'
import { ExperimentsCard } from '@/shared/ui/ExperimentsCard'
import mockupImg from '@/../public/mockup.webp'
import { getTranslations, type Lang } from '@/shared/i18n'
import { Header, type Theme } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { useAppContext } from '@/shared/lib/AppContext'
import { useContactsBlockProps } from '@/shared/lib/PortfolioSanityContext'
import styles from './not-found.module.css'

function NotFoundError({ lang }: { lang: Lang }) {
  const t = getTranslations(lang, 'notfound') as Record<string, string>
  return (
    <section className={`section ${styles['notfound-error']}`}>
      <div className={styles['notfound-message']}>
        <p className={`${styles['notfound-code']} text-reveal-title`}>{t.notfoundCode}</p>
        <p className={`${styles['notfound-title']} text-reveal-title`}>{t.notfoundTitle}</p>
      </div>
      <p className={`${styles['notfound-desc']} text-reveal-body`}>{t.notfoundDesc}</p>
      <div className="notfound-btn-wrap">
        <Link href="/" className={`btn btn-primary btn-primary-m ${styles['notfound-btn']} tag-reveal`}>
          {t.homeBtn}
        </Link>
      </div>
    </section>
  )
}

function ProjectCard({ name = 'Project Name', coverAlt }: { name?: string; coverAlt: string }) {
  return (
    <Link href="/" className="project-card project-card-link">
      <div className="project-cover">
        <Image
          src={mockupImg}
          alt={coverAlt}
          width={240}
          height={240}
          sizes="(max-width: 720px) 45vw, 240px"
          className="project-cover-img img-reveal"
        />
      </div>
      <div className="project-details">
        <div>
          <h3 className="project-name">{name}</h3>
          <div className="project-tags">
            {['Tag', 'Tag', 'Tag', 'Tag', 'Tag'].map((skill, i) => (
              <span key={i} className="project-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <p className="project-description">
          A description of the project in several lines, reflecting the general idea.
        </p>
      </div>
    </Link>
  )
}

function Recommendation({ theme, lang }: { theme: Theme; lang: Lang }) {
  const t = getTranslations(lang, 'notfound') as Record<string, string>
  const homeT = getTranslations(lang, 'home') as Record<string, string>
  return (
    <section className="section">
      <div className={styles['notfound-recommendation']}>
        <div className={styles['recommendation-groups']}>
          <div>
            <p className={`section-title ${styles['recommendation-title']} text-reveal-title`}>
              {t.projectsTitle}
            </p>
            <div className="projects-list">
              <ProjectCard coverAlt={t.altPlaceholderProjectCover} />
              <ProjectCard coverAlt={t.altPlaceholderProjectCover} />
            </div>
          </div>
          <div className={styles['recommendation-experiments']}>
            <p className={`section-title ${styles['recommendation-title']} text-reveal-title`}>
              {t.experimentsTitle}
            </p>
            <ExperimentsCard
              theme={theme}
              experimentsTitle={homeT.experimentsTitle}
              experimentsDesc={homeT.experimentsDesc}
              href="/experiments"
              altMockupsBg={homeT.altExperimentsMockupsBg}
              altGradient={homeT.altExperimentsGradient}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default function NotFound() {
  const { theme, lang, onToggleTheme, onChangeLang } = useAppContext()
  const contactsBlock = useContactsBlockProps()

  return (
    <main className="portfolio">
      <Header theme={theme} lang={lang} onToggleTheme={onToggleTheme} onChangeLang={onChangeLang} logoHref="/" />
      <NotFoundError lang={lang} />
      <Pattern />
      <Recommendation theme={theme} lang={lang} />
      <Pattern />
      <ContactsBlock
        sectionTitle={contactsBlock.sectionTitle}
        title={contactsBlock.title}
        buttons={contactsBlock.buttons}
        firstButtonHref={contactsBlock.buttons ? undefined : '/'}
        useReveal
      />
      <Footer theme={theme} lang={lang} onToggleTheme={onToggleTheme} onChangeLang={onChangeLang} useReveal />
    </main>
  )
}
