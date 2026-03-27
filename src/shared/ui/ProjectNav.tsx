'use client'

import Link from 'next/link'
import { ChevronIcon } from '@/shared/ui/ChevronIcon'
import styles from './ProjectNav.module.css'

export type ProjectNavLink = {
  href: string
  name: string
}

export type ProjectNavProps = {
  prevProjectLabel: string
  nextProjectLabel: string
  prev: ProjectNavLink | null
  next: ProjectNavLink | null
}

export function ProjectNav({
  prevProjectLabel,
  nextProjectLabel,
  prev,
  next,
}: ProjectNavProps) {
  if (!prev && !next) return null

  return (
    <section className={`${styles['project-detail-nav-section']} section`}>
      <nav className={`${styles['project-detail-nav']} text-reveal-body`} aria-label="Project navigation">
        <div className={styles['project-detail-nav-slot']}>
          {prev ? (
            <Link href={prev.href} className={`project-nav-btn ${styles['project-detail-nav-card']} ${styles['project-detail-nav-prev']}`}>
              <ChevronIcon angle={180} className={styles['project-detail-nav-arrow']} />
              <div className={styles['project-detail-nav-card-text']}>
                <span className={styles['project-detail-nav-label']}>{prevProjectLabel}</span>
                <span className={styles['project-detail-nav-name']}>{prev.name}</span>
              </div>
            </Link>
          ) : null}
        </div>
        <div className={styles['project-detail-nav-slot']}>
          {next ? (
            <Link href={next.href} className={`project-nav-btn ${styles['project-detail-nav-card']} ${styles['project-detail-nav-next']}`}>
              <div className={styles['project-detail-nav-card-text']}>
                <span className={styles['project-detail-nav-label']}>{nextProjectLabel}</span>
                <span className={styles['project-detail-nav-name']}>{next.name}</span>
              </div>
              <ChevronIcon angle={0} className={styles['project-detail-nav-arrow']} />
            </Link>
          ) : null}
        </div>
      </nav>
    </section>
  )
}
