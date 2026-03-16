'use client'

import Image from 'next/image'
import Link from 'next/link'
import darkImg from '@/../public/dark.png'
import lightImg from '@/../public/light.png'
import mockupsImg from '@/../public/mockups.png'
import styles from './ExperimentsCard.module.css'

type Theme = 'dark' | 'light'

export function ExperimentsCard({
  theme,
  experimentsTitle,
  experimentsDesc,
  href,
}: {
  theme: Theme
  experimentsTitle: string
  experimentsDesc: string
  href?: string
}) {
  const content = (
    <>
      <p className={styles['experiments-title']}>{experimentsTitle}</p>
      <p className={styles['experiments-desc']}>{experimentsDesc}</p>
      <div className={styles['experiments-bg']}>
        <Image
          src={mockupsImg}
          alt="background-mockups"
          className={styles['experiments-bg-img']}
        />
      </div>
      <div className={styles['experiments-gradient']}>
        <Image
          src={theme === 'dark' ? darkImg : lightImg}
          alt=""
          className={styles['experiments-gradient-img']}
          fill
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
