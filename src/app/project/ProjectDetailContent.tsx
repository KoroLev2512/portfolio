'use client'

import { Fragment } from 'react'
import type { MappedProjectBlock, MappedProjectSection } from '@/sanity/lib/projectDetailMapper'
import { ProjectDetailList } from '@/shared/ui/ProjectDetailList'
import { ProjectDetailBody } from '@/shared/ui/ProjectDetailBody'
import { ProjectDetailPhoto } from '@/shared/ui/ProjectDetailPhoto'
import { ProjectDetailSubtitleBlock } from '@/shared/ui/ProjectDetailSubtitleBlock'
import { ProjectDetailBlockTitle } from '@/shared/ui/ProjectDetailBlockTitle'
import styles from './project-detail.module.css'

export type ProjectDetailContentProps = {
  sections: MappedProjectSection[]
  closeImageModalAriaLabel: string
  imageFallbackCaption: string
}

function renderBlock(
  block: MappedProjectBlock,
  closeImageModalAriaLabel: string,
  imageFallbackCaption: string,
) {
  switch (block._type) {
    case 'blockTitle':
      return (
        <ProjectDetailBlockTitle
          key={block._key ?? block.text}
          className={`text-reveal-title ${styles['project-detail-padding']}`}
        >
          {block.text}
        </ProjectDetailBlockTitle>
      )
    case 'textBlock':
      return (
        <ProjectDetailBody key={block._key ?? block.text.slice(0, 24)} className={`text-reveal-body ${styles['project-detail-padding']}`}>
          {block.text}
        </ProjectDetailBody>
      )
    case 'listBlock':
      return (
        <ProjectDetailList
          key={block._key ?? block.items.join('-')}
          items={block.items}
          className={`text-reveal-body ${styles['project-detail-padding-list']}`}
        />
      )
    case 'imageBlock': {
      if (!block.url) return null
      return (
        <ProjectDetailPhoto
          key={block._key ?? block.url}
          projectImg={block.url}
          caption={block.caption?.trim() || block.alt || imageFallbackCaption}
          closeModalAriaLabel={closeImageModalAriaLabel}
        />
      )
    }
    case 'quoteBlock':
      return (
        <ProjectDetailSubtitleBlock
          key={block._key ?? block.quoteHeading}
          subtitle={block.quoteHeading}
          description={block.text}
          className="text-reveal-body"
        />
      )
    default:
      return null
  }
}

export function ProjectDetailContent({
  sections,
  closeImageModalAriaLabel,
  imageFallbackCaption,
}: ProjectDetailContentProps) {
  if (sections.length === 0) return null

  return (
    <>
      {sections.map((section, si) => (
        <Fragment key={section.title || `section-${si}`}>
          {section.title.trim() || section.blocks.length > 0 ? (
            <section
              className={`project-detail-content section ${styles['project-detail-section-unified']}`}
            >
              {section.title.trim() ? (
                <section className={styles['project-detail-section-title-inner']}>
                  <p className={`section-title ${styles['project-detail-section-title']} text-reveal-title`}>
                    {section.title}
                  </p>
                </section>
              ) : null}
              {section.blocks.map((block, bi) => (
                <Fragment key={block._key ?? `${block._type}-${si}-${bi}`}>
                  {renderBlock(block, closeImageModalAriaLabel, imageFallbackCaption)}
                </Fragment>
              ))}
            </section>
          ) : null}
        </Fragment>
      ))}
    </>
  )
}
