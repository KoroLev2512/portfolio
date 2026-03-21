'use client'

import { Fragment, useMemo } from 'react'
import Image, { type StaticImageData } from 'next/image'
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
import { mapSanityToPortfolio } from '@/sanity/lib/portfolioMappers'
import styles from './page.module.css'

/** Если в Sanity нет контактов или запрос не вернул документы — не оставляем hero пустым */
const FALLBACK_HERO_CONTACTS = [
  { label: 'icestorm2512@gmail.com', href: 'mailto:icestorm2512@gmail.com' },
  { label: 't.me/korolev_2512', href: 'https://t.me/korolev_2512' },
]

const SECTION_KEYS = ['skills', 'projects', 'workExperience', 'education'] as const
type SectionKey = (typeof SECTION_KEYS)[number]

function ExternalLink({ label, href = '#' }: { label: string; href?: string }) {
  return (
    <a href={href} className="external-link">
      {label}
      <ArrowIcon className="external-link-icon" />
    </a>
  )
}

function Tag({ label = 'Tag' }: { label?: string }) {
  return <span className="tag tag-reveal">{label}</span>
}

function ProjectCard({
  name = 'Project Name',
  skills = ['Tag', 'Tag', 'Tag', 'Tag', 'Tag', 'Tag'],
  description = 'A description of the project in several lines, reflecting the general idea.',
  coverUrl,
  href = '/project',
}: {
  name?: string
  skills?: string[]
  description?: string
  coverUrl?: string | null
  href?: string
}) {
  const coverSrc: StaticImageData | string = coverUrl ?? mockupImg
  return (
    <Link href={href} className="project-card project-card-link">
      <div className="project-cover">
        <Image
          src={coverSrc}
          alt=""
          width={240}
          height={240}
          className="project-cover-img img-reveal"
          unoptimized={typeof coverSrc === 'string'}
        />
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

export type SanityHomeDocs = {
  homepage: unknown
  siteSettings: unknown
}

export function HomePageClient({ sanityDocs }: { sanityDocs: SanityHomeDocs | null }) {
  const { theme, lang, onToggleTheme, onChangeLang } = useAppContext()
  const t = getTranslations(lang, 'home') as Record<string, string>

  const mapped = useMemo(() => {
    if (!sanityDocs?.homepage && !sanityDocs?.siteSettings) return null
    return mapSanityToPortfolio(
      sanityDocs.homepage as Parameters<typeof mapSanityToPortfolio>[0],
      sanityDocs.siteSettings as Parameters<typeof mapSanityToPortfolio>[1],
      lang,
    )
  }, [sanityDocs, lang])

  const heroPhoto =
    mapped?.personPhotoUrl && mapped.personPhotoUrl.length > 0 ? mapped.personPhotoUrl : null
  const heroPhotoSrc: StaticImageData | string = heroPhoto ?? avatarImg

  const heroBio = mapped?.hasHomepage
    ? mapped.heroBio.trim() !== ''
      ? mapped.heroBio
      : t.heroBio
    : t.heroBio

  /**
   * Hero: 1) homepage.heroContacts 2) кнопки из site settings 3) запасные ссылки (как в схеме Sanity),
   * если CMS пустой или страница без Sanity.
   */
  const heroContacts = useMemo(() => {
    if (mapped?.heroContacts && mapped.heroContacts.length > 0) return mapped.heroContacts
    if (mapped?.contactsButtons && mapped.contactsButtons.length > 0) {
      return mapped.contactsButtons.map(({ label, href }) => ({ label, href }))
    }
    return FALLBACK_HERO_CONTACTS
  }, [mapped?.heroContacts, mapped?.contactsButtons])

  const defaultSkillGroups = [
    { title: t.hardSkills, tags: Array.from({ length: 20 }, () => 'Skill') },
    { title: t.softSkills, tags: Array.from({ length: 20 }, () => 'Skill') },
    { title: t.languages, tags: Array.from({ length: 20 }, () => 'Skill') },
  ]
  const skillGroups =
    mapped?.skillGroups && mapped.skillGroups.length > 0 ? mapped.skillGroups : defaultSkillGroups

  const middleOrder = (mapped?.middleSectionsOrder ?? [...SECTION_KEYS]).filter((k): k is SectionKey =>
    (SECTION_KEYS as readonly string[]).includes(k),
  )
  if (middleOrder.length === 0) {
    middleOrder.push(...SECTION_KEYS)
  }

  const contactsTitle = mapped?.contactsTitle?.trim() ? mapped.contactsTitle : t.contactsCta
  const contactsButtons =
    mapped?.contactsButtons && mapped.contactsButtons.length > 0 ? mapped.contactsButtons : undefined

  const sectionMap: Record<SectionKey, React.ReactNode> = {
    skills: (
      <section className="skills section">
        <p className="section-title text-reveal-title">{t.skillsTitle}</p>
        <div className={styles['skills-container']}>
          {skillGroups.map((group, gi) => (
            <div className={styles['skills-group']} key={gi}>
              {group.title ? (
                <p className={`${styles['skills-group-title']} text-reveal-body`}>{group.title}</p>
              ) : null}
              <div className={`${styles['skills-tags']} skills-tags`}>
                {group.tags.map((label, i) => (
                  <Tag key={i} label={label} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    ),
    projects: (
      <section id="projects" className="projects section">
        <p className="section-title text-reveal-title">{t.projectsTitle}</p>
        <div className="projects-list">
          {mapped?.projects && mapped.projects.length > 0 ? (
            mapped.projects.map((p, i) => (
              <ProjectCard
                key={i}
                name={p.name}
                description={p.description}
                skills={p.skills}
                coverUrl={p.coverUrl}
                href={p.href}
              />
            ))
          ) : (
            <>
              <ProjectCard />
              <ProjectCard />
            </>
          )}
          <ExperimentsCard
            theme={theme}
            experimentsTitle={t.experimentsTitle}
            experimentsDesc={t.experimentsDesc}
            href="/experiments"
          />
        </div>
      </section>
    ),
    workExperience: (
      <section className="work-experience section">
        <p className="section-title text-reveal-title">{t.workTitle}</p>
        <div className={styles['entry-list']}>
          {mapped?.workEntries && mapped.workEntries.length > 0 ? (
            mapped.workEntries.map((e, i) => (
              <JobEntry
                key={e._key ?? `work-${i}`}
                company={e.company}
                position={e.position}
                period={e.period}
              />
            ))
          ) : sanityDocs?.homepage == null ? (
            <>
              <JobEntry />
              <JobEntry />
              <JobEntry />
              <JobEntry />
              <JobEntry />
            </>
          ) : null}
        </div>
      </section>
    ),
    education: (
      <section className="education section">
        <p className="section-title text-reveal-title">{t.educationTitle}</p>
        <div className={styles['entry-list']}>
          {mapped?.educationEntries && mapped.educationEntries.length > 0 ? (
            mapped.educationEntries.map((e, i) => (
              <EducationEntry
                key={e._key ?? `edu-${i}`}
                organization={e.organization}
                specialization={e.specialization}
                level={e.level}
                period={e.period}
              />
            ))
          ) : sanityDocs?.homepage == null ? (
            <>
              <EducationEntry />
              <EducationEntry />
              <EducationEntry />
              <EducationEntry />
              <EducationEntry />
            </>
          ) : null}
        </div>
      </section>
    ),
  }

  return (
    <main className="portfolio">
      <Header
        theme={theme}
        lang={lang}
        onToggleTheme={onToggleTheme}
        onChangeLang={onChangeLang}
        personName={mapped?.personName}
        personRole={mapped?.personRole}
        personPhotoSrc={mapped?.personPhotoUrl}
      />

      <section className={`${styles.hero} section`}>
        <div className={styles['hero-container']}>
          <Image
            src={heroPhotoSrc}
            alt=""
            width={160}
            height={160}
            className={`${styles['hero-photo']} img-reveal`}
            priority
            unoptimized={typeof heroPhotoSrc === 'string' && heroPhotoSrc.startsWith('http')}
          />
          <div className={styles['hero-info']}>
            <div className="hero-name-block text-reveal-title">
              <p className={styles['hero-name']}>{mapped?.personName?.trim() || t.name}</p>
              <p className={styles['hero-position']}>{mapped?.personRole?.trim() || t.position}</p>
            </div>
            {heroContacts.length > 0 ? (
              <div className={`${styles['hero-contacts']} text-reveal-body`}>
                {heroContacts.map((c, i) => (
                  <ExternalLink key={i} label={c.label} href={c.href} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <p className={`${styles['hero-bio']} text-reveal-body`}>{heroBio}</p>
      </section>

      <Pattern />

      {middleOrder.map((key) => (
        <Fragment key={key}>
          {sectionMap[key]}
          <Pattern />
        </Fragment>
      ))}

      <ContactsBlock
        sectionTitle={t.contactsTitle}
        title={contactsTitle}
        buttons={contactsButtons}
        useReveal
      />
      <Footer theme={theme} lang={lang} onToggleTheme={onToggleTheme} onChangeLang={onChangeLang} useReveal />
    </main>
  )
}
