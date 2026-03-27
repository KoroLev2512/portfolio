'use client'

import { ImageWithLoader } from '@/shared/ui/ImageWithLoader'
import Link from 'next/link'
import darkImg from '@/../public/dark.webp'
import lightImg from '@/../public/light.webp'
import mockupsImg from '@/../public/mockups.webp'
import styles from './ExperimentsCard.module.css'

type Theme = 'dark' | 'light'

export function ExperimentsCard({
  theme,
  experimentsTitle,
  experimentsDesc,
  href,
  altMockupsBg,
  altGradient,
}: {
  theme: Theme
  experimentsTitle: string
  experimentsDesc: string
  href?: string
  altMockupsBg: string
  altGradient: string
}) {
  const content = (
    <>
      <p className={styles['experiments-title']}>{experimentsTitle}</p>
      <p className={styles['experiments-desc']}>{experimentsDesc}</p>
      <div className={styles['experiments-bg']}>
        <ImageWithLoader
          fill
          wrapperClassName={styles['experiments-bg-loader']}
          src={mockupsImg}
          alt={altMockupsBg}
          className={styles['experiments-bg-img']}
          sizes="(max-width: 48rem) 92vw, 40rem"
        />
      </div>
      <div className={styles['experiments-gradient']}>
        <ImageWithLoader
          fill
          wrapperClassName={styles['experiments-gradient-loader']}
          src={theme === 'dark' ? darkImg : lightImg}
          alt={altGradient}
          className={styles['experiments-gradient-img']}
          sizes="(max-width: 48rem) 90vw, 16.25rem"
        />
      </div>
    </>
  )

  if (href) {
    return (
      <Link href={href} className={`${styles['experiments-card']} experiments-card ${styles['experiments-card-link']} experiments-card-link`}>
        {content}
      </Link>
    )
  }

  return <article className={`${styles['experiments-card']} experiments-card`}>{content}</article>
}
