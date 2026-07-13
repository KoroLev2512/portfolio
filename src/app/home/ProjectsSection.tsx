import { type StaticImageData } from 'next/image'
import Link from 'next/link'
import mockupImg from '@/../public/mockup.webp'
import { ImageWithLoader } from '@/shared/ui/ImageWithLoader'
import { ExperimentsCard } from '@/shared/ui/ExperimentsCard'
import { fillNameInAlt } from '@/shared/i18n'
import type { PortfolioProjectCard } from '@/sanity/lib/portfolioMappers'
import type { Theme } from '@/widgets/header'

function ProjectCard({
  name = 'Project Name',
  skills = ['Tag', 'Tag', 'Tag', 'Tag', 'Tag', 'Tag'],
  description = 'A description of the project in several lines, reflecting the general idea.',
  coverUrl,
  coverAlt,
  href = '/',
  eager = false,
}: {
  name?: string
  skills?: string[]
  description?: string
  coverUrl?: string | null
  coverAlt: string
  href?: string
  eager?: boolean
}) {
  const coverSrc: StaticImageData | string = coverUrl ?? mockupImg
  return (
    <Link href={href} className="project-card project-card-link">
      <div className="project-cover">
        <ImageWithLoader
          fill
          loading={eager ? 'eager' : 'lazy'}
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
          <h3 className="project-name">{name}</h3>
          <div className="project-tags">
            {skills.map((skill) => (
              <span key={skill} className="project-tag">
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

type ProjectsSectionProps = {
  sectionTitle: string
  altProjectCoverNamed: string
  altProjectCoverSample: string
  projects: PortfolioProjectCard[] | undefined
  hasExperiments: boolean
  theme: Theme
  experimentsTitle: string
  experimentsDesc: string
  altMockupsBg: string
  altGradient: string
}

export function ProjectsSection({
  sectionTitle,
  altProjectCoverNamed,
  altProjectCoverSample,
  projects,
  hasExperiments,
  theme,
  experimentsTitle,
  experimentsDesc,
  altMockupsBg,
  altGradient,
}: ProjectsSectionProps) {
  return (
    <section id="projects" className="projects section">
      <h2 className="section-title text-reveal-title">{sectionTitle}</h2>
      <div className="projects-list">
        {projects && projects.length > 0 ? (
          projects.map((p, i) => (
            <ProjectCard
              key={p.href}
              name={p.name}
              description={p.description}
              skills={p.skills}
              coverUrl={p.coverUrl}
              coverAlt={fillNameInAlt(altProjectCoverNamed, p.name)}
              href={p.href}
              eager={i === 0}
            />
          ))
        ) : (
          <>
            <ProjectCard coverAlt={altProjectCoverSample} />
            <ProjectCard coverAlt={altProjectCoverSample} />
          </>
        )}
        {hasExperiments && (
          <ExperimentsCard
            theme={theme}
            experimentsTitle={experimentsTitle}
            experimentsDesc={experimentsDesc}
            href="/experiments"
            altMockupsBg={altMockupsBg}
            altGradient={altGradient}
          />
        )}
      </div>
    </section>
  )
}
