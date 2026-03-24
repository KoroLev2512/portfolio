'use client'

import Image, { type StaticImageData } from 'next/image'
import { useMemo, useState } from 'react'
import { CancelIcon } from './CancelIcon'
import styles from './ProjectDetailPhoto.module.css'

interface ProjectDetailPhotoProps {
  projectImg: StaticImageData | string
  caption: string
  closeModalAriaLabel: string
}

/** Размеры из имени ассета Sanity (`…-3440x1439.png?…`) */
function parseSanityAssetDimensions(src: string): { w: number; h: number } | null {
  const m = src.match(/-(\d+)x(\d+)\.[^./?]+(?:\?|$)/i)
  if (!m) return null
  const w = Number(m[1])
  const h = Number(m[2])
  if (!Number.isFinite(w) || !Number.isFinite(h) || w <= 0 || h <= 0) return null
  return { w, h }
}

function nextImageDimensions(img: StaticImageData | string): { width: number; height: number } {
  if (typeof img !== 'string') {
    return { width: img.width, height: img.height }
  }
  const d = parseSanityAssetDimensions(img)
  if (d) {
    const cap = 1400
    if (d.w <= cap) return { width: d.w, height: d.h }
    const scale = cap / d.w
    return { width: cap, height: Math.max(1, Math.round(d.h * scale)) }
  }
  return { width: 1400, height: 787 }
}

export function ProjectDetailPhoto({ projectImg, caption, closeModalAriaLabel }: ProjectDetailPhotoProps) {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const unoptimized = typeof projectImg === 'string'
  const { width, height } = useMemo(() => nextImageDimensions(projectImg), [projectImg])

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
              alt={caption}
              width={width}
              height={height}
              sizes="(max-width: 768px) 100vw, 720px"
              className={`${styles['project-detail-hero-img']} img-reveal`}
              unoptimized={unoptimized}
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
              aria-label={closeModalAriaLabel}
            >
              <CancelIcon />
            </button>
            <div className={styles['project-detail-modal-image-wrap']}>
              <Image
                src={projectImg}
                alt={caption}
                width={width}
                height={height}
                sizes="(max-width: 1000px) 100vw, 960px"
                className={styles['project-detail-modal-image']}
                unoptimized={unoptimized}
              />
            </div>
            <p className={styles['project-detail-modal-caption']}>{caption}</p>
          </div>
        </div>
      )}
    </>
  )
}
