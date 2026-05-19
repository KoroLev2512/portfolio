'use client'

import { Fragment, useMemo } from 'react'
import { type StaticImageData } from 'next/image'
import avatarImg from '@/../public/avatar.png'
import { ContactsBlock } from '@/shared/ui/ContactsBlock'
import { Pattern } from '@/shared/ui/Pattern'
import { fillNameInAlt, getTranslations } from '@/shared/i18n'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'
import { useAppContext } from '@/shared/lib/AppContext'
import { usePortfolioMapped, usePortfolioSanityDocs } from '@/shared/lib/PortfolioSanityContext'
import {
  resolveContactsSectionTitle,
  resolveHeroContactLinks,
} from '@/shared/lib/portfolioContacts'
import { HeroSection } from './home/HeroSection'
import { SkillsSection } from './home/SkillsSection'
import { ProjectsSection } from './home/ProjectsSection'
import { WorkSection } from './home/WorkSection'
import { EducationSection } from './home/EducationSection'

const SECTION_KEYS = ['skills', 'projects', 'workExperience', 'education'] as const
type SectionKey = (typeof SECTION_KEYS)[number]

export function HomePageClient({ hasExperiments = true }: { hasExperiments?: boolean }) {
  const { theme, lang, onToggleTheme, onChangeLang } = useAppContext()
  const sanityDocs = usePortfolioSanityDocs()
  const mapped = usePortfolioMapped()
  const t = getTranslations(lang, 'home') as Record<string, string>

  const heroPhotoSrc: StaticImageData | string =
    mapped?.personPhotoUrl && mapped.personPhotoUrl.length > 0 ? mapped.personPhotoUrl : avatarImg

  const heroBio = mapped?.hasHomepage
    ? mapped.heroBio.trim() !== ''
      ? mapped.heroBio
      : t.heroBio
    : t.heroBio

  const heroContacts = useMemo(() => resolveHeroContactLinks(mapped), [mapped])

  const defaultSkillGroups = [
    { title: t.hardSkills, tags: Array.from({ length: 20 }, () => 'Skill') },
    { title: t.softSkills, tags: Array.from({ length: 20 }, () => 'Skill') },
    { title: t.languages, tags: Array.from({ length: 20 }, () => 'Skill') },
  ]
  const skillGroups =
    mapped?.skillGroups && mapped.skillGroups.length > 0 ? mapped.skillGroups : defaultSkillGroups

  const middleOrder = (mapped?.middleSectionsOrder ?? [...SECTION_KEYS]).filter(
    (k): k is SectionKey => (SECTION_KEYS as readonly string[]).includes(k),
  )
  if (middleOrder.length === 0) middleOrder.push(...SECTION_KEYS)

  const contactsTitle = resolveContactsSectionTitle(mapped, t.contactsCta)
  const contactsButtons =
    mapped?.contactsButtons && mapped.contactsButtons.length > 0 ? mapped.contactsButtons : undefined

  const heroPortraitName = mapped?.personName?.trim() || t.name
  const isLoaded = sanityDocs?.homepage != null

  const sectionMap: Record<SectionKey, React.ReactNode> = {
    skills: <SkillsSection title={t.skillsTitle} groups={skillGroups} />,
    projects: (
      <ProjectsSection
        sectionTitle={t.projectsTitle}
        altProjectCoverNamed={t.altProjectCoverNamed}
        altProjectCoverSample={t.altProjectCoverSample}
        projects={mapped?.projects}
        hasExperiments={hasExperiments}
        theme={theme}
        experimentsTitle={t.experimentsTitle}
        experimentsDesc={t.experimentsDesc}
        altMockupsBg={t.altExperimentsMockupsBg}
        altGradient={t.altExperimentsGradient}
      />
    ),
    workExperience: (
      <WorkSection
        title={t.workTitle}
        entries={mapped?.workEntries ?? []}
        isLoaded={isLoaded}
      />
    ),
    education: (
      <EducationSection
        title={t.educationTitle}
        entries={mapped?.educationEntries ?? []}
        isLoaded={isLoaded}
      />
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

      <HeroSection
        photoSrc={heroPhotoSrc}
        photoAlt={fillNameInAlt(t.altPortraitNamed, heroPortraitName)}
        name={mapped?.personName?.trim() || t.name}
        role={mapped?.personRole?.trim() || t.position}
        bio={heroBio}
        contacts={heroContacts}
      />

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
      <Footer
        theme={theme}
        lang={lang}
        onToggleTheme={onToggleTheme}
        onChangeLang={onChangeLang}
        useReveal
      />
    </main>
  )
}
