'use client'

import Link from 'next/link'
import { ChevronIcon } from '@/shared/ui/ChevronIcon'
import styles from './ProjectNav.module.css'

export type ProjectNavProps = {
  prevProjectLabel: string
  nextProjectLabel: string
  prevHref: string
  nextHref: string
  prevName: string
  nextName: string
}

export function ProjectNav({
  prevProjectLabel,
  nextProjectLabel,
  prevHref,
  nextHref,
  prevName,
  nextName,
}: ProjectNavProps) {
  return (
    <section className={`${styles['project-detail-nav-section']} section`}>
      <nav className={`${styles['project-detail-nav']} text-reveal-body`} aria-label="Project navigation">
        <Link href={prevHref} className={`project-nav-btn ${styles['project-detail-nav-card']} ${styles['project-detail-nav-prev']}`}>
          <ChevronIcon angle={180} className={styles['project-detail-nav-arrow']} />
          <div className={styles['project-detail-nav-card-text']}>
            <span className={styles['project-detail-nav-label']}>{prevProjectLabel}</span>
            <span className={styles['project-detail-nav-name']}>{prevName}</span>
          </div>
        </Link>
        <Link href={nextHref} className={`project-nav-btn ${styles['project-detail-nav-card']} ${styles['project-detail-nav-next']}`}>
          <div className={styles['project-detail-nav-card-text']}>
            <span className={styles['project-detail-nav-label']}>{nextProjectLabel}</span>
            <span className={styles['project-detail-nav-name']}>{nextName}</span>
          </div>
          <ChevronIcon angle={0} className={styles['project-detail-nav-arrow']} />
        </Link>
      </nav>
    </section>
  )
}
