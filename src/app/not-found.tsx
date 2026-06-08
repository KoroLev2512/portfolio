'use client'

import { type StaticImageData } from 'next/image'
import { ImageWithLoader } from '@/shared/ui/ImageWithLoader'
import Link from 'next/link'
import { ContactsBlock } from '@/shared/ui/ContactsBlock'
import { Pattern } from '@/shared/ui/Pattern'
import { ExperimentsCard } from '@/shared/ui/ExperimentsCard'
import mockupImg from '@/../public/mockup.webp'
import { fillNameInAlt, getTranslations, type Lang } from '@/shared/i18n'
import { Header, type Theme } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { useAppContext } from '@/shared/lib/AppContext'
import { useContactsBlockProps, usePortfolioMapped } from '@/shared/lib/PortfolioSanityContext'
import type { PortfolioProjectCard } from '@/sanity/lib/portfolioMappers'
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

function ProjectCard({ project, coverAlt }: { project: PortfolioProjectCard; coverAlt: string }) {
  const coverSrc: StaticImageData | string = project.coverUrl ?? mockupImg
  return (
    <Link href={project.href} className="project-card project-card-link">
      <div className="project-cover">
        <ImageWithLoader
          fill
          loading="lazy"
          wrapperClassName="project-cover-loader"
          src={coverSrc}
          alt={coverAlt}
          sizes="(max-width: 45rem) 45vw, 15rem"
          className="project-cover-img"
          unoptimized={typeof coverSrc === 'string'}
        />
      </div>
      <div className="project-details">
        <div>
          <h3 className="project-name">{project.name}</h3>
          <div className="project-tags">
            {project.skills.map((skill) => (
              <span key={skill} className="project-tag">{skill}</span>
            ))}
          </div>
        </div>
        <p className="project-description">{project.description}</p>
      </div>
    </Link>
  )
}

function Recommendation({ theme, lang }: { theme: Theme; lang: Lang }) {
  const t = getTranslations(lang, 'notfound') as Record<string, string>
  const homeT = getTranslations(lang, 'home') as Record<string, string>
  const mapped = usePortfolioMapped()
  const projects = mapped?.projects ?? []
  return (
    <section className="section">
      <div className={styles['notfound-recommendation']}>
        <div className={styles['recommendation-groups']}>
          <div>
            <p className={`section-title ${styles['recommendation-title']} text-reveal-title`}>
              {t.projectsTitle}
            </p>
            <div className="projects-list">
              {projects.map((p) => (
                <ProjectCard
                  key={p.slug ?? p.href}
                  project={p}
                  coverAlt={fillNameInAlt(homeT.altProjectCoverNamed, p.name)}
                />
              ))}
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
