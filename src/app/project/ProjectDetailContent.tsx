'use client'
import { type StaticImageData } from 'next/image'
import { ProjectDetailList } from '@/shared/ui/ProjectDetailList'
import { ProjectDetailBody } from '@/shared/ui/ProjectDetailBody'
import { ProjectDetailPhoto } from '@/shared/ui/ProjectDetailPhoto'
import { ProjectDetailSubtitleBlock } from '@/shared/ui/ProjectDetailSubtitleBlock'
import {ProjectDetailBlockTitle} from "@/shared/ui/ProjectDetailBlockTitle";
import styles from './project-detail.module.css'

export type ProjectDetailContentProps = {
  t: Record<string, string>
  projectData: {
    title: string
  }
  projectImg: StaticImageData
}

export function ProjectDetailContent({
  t,
  projectData,
  projectImg,
}: ProjectDetailContentProps) {
  const listItems = [
    'Item 1',
    'Item 2',
    'Item 3',
  ]

  return (
    <>
      <section className={`project-detail-content ${styles['project-detail-section-title-block']} section`}>
        <p className={`section-title ${styles['project-detail-section-title']} text-reveal-title`}>
          {t.sectionTitle}
        </p>
      </section>
      <section className={`${styles['project-detail-content-block']} section`}>
        <ProjectDetailBlockTitle className={`text-reveal-title ${styles['project-detail-padding']}`}>
          {t.blockTitle}
        </ProjectDetailBlockTitle>
        <ProjectDetailBody className={`text-reveal-body ${styles['project-detail-padding']}`}>
          {t.blockBody}
        </ProjectDetailBody>
        <ProjectDetailList items={listItems} className={`text-reveal-body ${styles['project-detail-padding-list']}`} />
        <ProjectDetailPhoto projectImg={projectImg} caption={t.imageCaption} />
        <ProjectDetailSubtitleBlock
            subtitle={t.subtitle}
            description={t.blockBody}
            className="text-reveal-body"
        />
        <ProjectDetailBody className={`text-reveal-body ${styles['project-detail-padding']}`}>
          {t.blockBody}
        </ProjectDetailBody>
      </section>
    </>
  )
}
