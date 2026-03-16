'use client'

import Image from 'next/image'
import Link from 'next/link'
import avatarImg from '@/../public/avatar.png'
import mockupImg from '@/../public/mockup.png'
import { ContactsBlock } from '@/shared/ui/ContactsBlock'
import { Pattern } from '@/shared/ui/Pattern'
import { ArrowIcon } from '@/shared/ui/ArrowIcon'
import { ExperimentsCard } from '@/shared/ui/ExperimentsCard'
import { getTranslations, type Lang } from '@/shared/i18n'
import { Header, type Theme } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { useAppContext } from '@/shared/lib/AppContext'
import styles from './page.module.css'

function ExternalLink({ label, href = '#' }: { label: string; href?: string }) {
  return (
    <a href={href} className="external-link">
      {label}
      <ArrowIcon className="external-link-icon" />
    </a>
  )
}

function Hero({ lang }: { lang: Lang }) {
  const t = getTranslations(lang, 'home') as Record<string, string>
  return (
    <section className={`${styles.hero} section`}>
      <div className={styles['hero-container']}>
        <Image src={avatarImg} alt="" className={`${styles['hero-photo']} img-reveal`} priority />
        <div className={styles['hero-info']}>
          <div className="hero-name-block text-reveal-title">
            <p className={styles['hero-name']}>{t.name}</p>
            <p className={styles['hero-position']}>{t.position}</p>
          </div>
          <div className={`${styles['hero-contacts']} text-reveal-body`}>
            <ExternalLink label="example@mail.com" href="mailto:example@mail.com" />
            <ExternalLink label="t.me/username" href="https://t.me/username" />
          </div>
        </div>
      </div>
      <p className={`${styles['hero-bio']} text-reveal-body`}>{t.heroBio}</p>
    </section>
  )
}

function Tag({ label = 'Tag' }: { label?: string }) {
  return <span className="tag tag-reveal">{label}</span>
}

function Skills({ lang }: { lang: Lang }) {
  const t = getTranslations(lang, 'home') as Record<string, string>
  const skills20 = Array.from({ length: 20 }, () => 'Skill')

  return (
    <section className="skills section">
      <p className="section-title text-reveal-title">{t.skillsTitle}</p>
      <div className={styles['skills-container']}>
        <div className={styles['skills-group']}>
          <p className={`${styles['skills-group-title']} text-reveal-body`}>{t.hardSkills}</p>
          <div className={`${styles['skills-tags']} skills-tags`}>
            {skills20.map((label, i) => (
              <Tag key={i} label={label} />
            ))}
          </div>
        </div>
        <div className={styles['skills-group']}>
          <p className={`${styles['skills-group-title']} text-reveal-body`}>{t.softSkills}</p>
          <div className={`${styles['skills-tags']} skills-tags`}>
            {skills20.map((label, i) => (
              <Tag key={i} label={label} />
            ))}
          </div>
        </div>
        <div className={styles['skills-group']}>
          <p className={`${styles['skills-group-title']} text-reveal-body`}>{t.languages}</p>
          <div className={`${styles['skills-tags']} skills-tags`}>
            {skills20.map((label, i) => (
              <Tag key={i} label={label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  name = 'Project Name',
  skills = ['Tag', 'Tag', 'Tag', 'Tag', 'Tag', 'Tag'],
  description = 'A description of the project in several lines, reflecting the general idea.',
}: {
  name?: string
  skills?: string[]
  description?: string
}) {
  return (
    <Link href="/project" className="project-card project-card-link">
      <div className="project-cover">
        <Image src={mockupImg} alt="" className="project-cover-img img-reveal" />
      </div>
      <div className="project-details">
        <div>
          <h3 className="project-name">{name}</h3>
          <div className="project-tags">
            {skills.map((skill, i) => (
              <span key={i} className="project-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <p className="project-description">{description}</p>
      </div>
    </Link>
  )
}

function Projects({ theme, lang }: { theme: Theme; lang: Lang }) {
  return (
    <section id="projects" className="projects section">
      <p className="section-title text-reveal-title">{(getTranslations(lang, 'home') as Record<string, string>).projectsTitle}</p>
      <div className="projects-list">
        <ProjectCard />
        <ProjectCard />
        <ExperimentsCard
          theme={theme}
          experimentsTitle={(getTranslations(lang, 'home') as Record<string, string>).experimentsTitle}
          experimentsDesc={(getTranslations(lang, 'home') as Record<string, string>).experimentsDesc}
        />
      </div>
    </section>
  )
}

function JobEntry({
  company = 'Company Name',
  position = 'Frontend developer',
  period = 'Mmm YYYY — Mmm YYYY',
}: {
  company?: string
  position?: string
  period?: string
}) {
  return (
    <div className={`${styles.entry} text-reveal-body`}>
      <p className={styles['entry-left']}>{company}</p>
      <div className={styles['entry-right']}>
        <p className={styles['entry-title']}>{position}</p>
        <p className={styles['entry-subtitle']}>{period}</p>
      </div>
    </div>
  )
}

function WorkExperience({ lang }: { lang: Lang }) {
  return (
    <section className="work-experience section">
      <p className="section-title text-reveal-title">{(getTranslations(lang, 'home') as Record<string, string>).workTitle}</p>
      <div className={styles['entry-list']}>
        <JobEntry />
        <JobEntry />
        <JobEntry />
        <JobEntry />
        <JobEntry />
      </div>
    </section>
  )
}

function EducationEntry({
  organization = 'Organization Name',
  specialization = 'Name of the specialization',
  level = 'Level or type of education',
  period = 'YYYY — YYYY',
}: {
  organization?: string
  specialization?: string
  level?: string
  period?: string
}) {
  return (
    <div className={`${styles.entry} text-reveal-body`}>
      <p className={styles['entry-left']}>{organization}</p>
      <div className={styles['entry-right']}>
        <p className={styles['entry-title']}>{specialization}</p>
        <p className={styles['entry-subtitle']}>{level}</p>
        <p className={styles['entry-subtitle']}>{period}</p>
      </div>
    </div>
  )
}

function Education({ lang }: { lang: Lang }) {
  return (
    <section className="education section">
      <p className="section-title text-reveal-title">{(getTranslations(lang, 'home') as Record<string, string>).educationTitle}</p>
      <div className={styles['entry-list']}>
        <EducationEntry />
        <EducationEntry />
        <EducationEntry />
        <EducationEntry />
        <EducationEntry />
      </div>
    </section>
  )
}

export default function HomePage() {
  const { theme, lang, onToggleTheme, onChangeLang } = useAppContext()

  return (
    <main className="portfolio">
      <Header theme={theme} lang={lang} onToggleTheme={onToggleTheme} onChangeLang={onChangeLang} />
      <Hero lang={lang} />
      <Pattern />
      <Skills lang={lang} />
      <Pattern />
      <Projects theme={theme} lang={lang} />
      <Pattern />
      <WorkExperience lang={lang} />
      <Pattern />
      <Education lang={lang} />
      <Pattern />
      <ContactsBlock
        sectionTitle={(getTranslations(lang, 'home') as Record<string, string>).contactsTitle}
        title={(getTranslations(lang, 'home') as Record<string, string>).contactsCta}
        useReveal
      />
      <Footer theme={theme} lang={lang} onToggleTheme={onToggleTheme} onChangeLang={onChangeLang} useReveal />
    </main>
  )
}
