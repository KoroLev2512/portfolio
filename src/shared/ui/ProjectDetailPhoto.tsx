'use client'

import Image, { type StaticImageData } from 'next/image'
import { useState } from 'react'
import { CancelIcon } from './CancelIcon'
import styles from './ProjectDetailPhoto.module.css'

interface ProjectDetailPhotoProps {
  projectImg: StaticImageData
  caption: string
}

export function ProjectDetailPhoto({ projectImg, caption }: ProjectDetailPhotoProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  return (
    <>
      <section>
        <button
          type="button"
          className={styles['project-detail-photo-button']}
          onClick={() => {
            if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) return
            setIsImageModalOpen(true)
          }}
          aria-label={caption}
        >
          <div className={styles['project-detail-mockups-second']}>
            <Image
              src={projectImg}
              alt=""
              className={`${styles['project-detail-hero-img']} img-reveal`}
            />
          </div>
        </button>
        <p className={`${styles['project-detail-caption']} text-reveal-body`}>{caption}</p>
      </section>

      {isImageModalOpen && (
        <div
          className={styles['project-detail-modal-overlay']}
          role="dialog"
          aria-modal="true"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div className={styles['project-detail-modal']} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles['project-detail-modal-close']}
              onClick={() => setIsImageModalOpen(false)}
              aria-label="Close image"
            >
              <CancelIcon />
            </button>
            <div className={styles['project-detail-modal-image-wrap']}>
              <Image src={projectImg} alt="" className={styles['project-detail-modal-image']} />
            </div>
            <p className={styles['project-detail-modal-caption']}>{caption}</p>
          </div>
        </div>
      )}
    </>
  )
}
