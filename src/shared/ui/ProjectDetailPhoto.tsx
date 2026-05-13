'use client'

import Image, { type StaticImageData } from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ImageWithLoader } from '@/shared/ui/ImageWithLoader'
import { CancelIcon } from './CancelIcon'
import styles from './ProjectDetailPhoto.module.css'

interface ProjectDetailPhotoProps {
  projectImg: StaticImageData | string
  caption: string
  closeModalAriaLabel: string
}

const MODAL_ANIMATION_MS = 260

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
  const [isImageModalVisible, setIsImageModalVisible] = useState(false)
  const closeTimerRef = useRef<number | null>(null)
  const unoptimized = typeof projectImg === 'string'
  const { width, height } = useMemo(() => nextImageDimensions(projectImg), [projectImg])

  const openModal = () => {
    if (typeof window !== 'undefined' && window.matchMedia('(max-width: 48rem)').matches) return
    if (closeTimerRef.current) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
    setIsImageModalOpen(true)
    requestAnimationFrame(() => setIsImageModalVisible(true))
  }

  const closeModal = () => {
    if (!isImageModalOpen) return
    setIsImageModalVisible(false)
    if (typeof window === 'undefined') {
      setIsImageModalOpen(false)
      return
    }
    closeTimerRef.current = window.setTimeout(() => {
      setIsImageModalOpen(false)
      closeTimerRef.current = null
    }, MODAL_ANIMATION_MS)
  }

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        window.clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  return (
    <>
      <section>
        <button
          type="button"
          className={styles['project-detail-photo-button']}
          onClick={openModal}
          aria-label={caption}
        >
          <div className={styles['project-detail-mockups-second']}>
            <ImageWithLoader
              src={projectImg}
              alt={caption}
              width={width}
              height={height}
              sizes="(max-width: 48rem) 100vw, 45rem"
              className={styles['project-detail-hero-img']}
              unoptimized={unoptimized}
              wrapperClassName={styles['project-detail-photo-loader']}
            />
          </div>
        </button>
        <p className={`${styles['project-detail-caption']} text-reveal-body`}>{caption}</p>
      </section>

      {isImageModalOpen && (
        <div
          className={`${styles['project-detail-modal-overlay']} ${isImageModalVisible ? styles['project-detail-modal-overlay-visible'] : ''}`}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            className={styles['project-detail-modal-backdrop']}
            aria-label={closeModalAriaLabel}
            onClick={closeModal}
          />
          <div
            className={`${styles['project-detail-modal']} ${isImageModalVisible ? styles['project-detail-modal-visible'] : ''}`}
          >
            <button
              type="button"
              className={styles['project-detail-modal-close']}
              onClick={closeModal}
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
                sizes="(max-width: 62.5rem) 100vw, 60rem"
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
