'use client'

import Image from 'next/image'
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
        <Image
          src={mockupsImg}
          alt={altMockupsBg}
          className={styles['experiments-bg-img']}
          sizes="(max-width: 768px) 92vw, 640px"
        />
      </div>
      <div className={styles['experiments-gradient']}>
        <Image
          src={theme === 'dark' ? darkImg : lightImg}
          alt={altGradient}
          className={styles['experiments-gradient-img']}
          fill
          sizes="(max-width: 768px) 90vw, 260px"
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
