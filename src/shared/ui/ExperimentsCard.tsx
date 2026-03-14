'use client'

import Image from 'next/image'
import Link from 'next/link'
import darkImg from '@/../public/dark.png'
import lightImg from '@/../public/light.png'
import mockupsImg from '@/../public/mockups.png'

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
      <p className="experiments-title">{experimentsTitle}</p>
      <p className="experiments-desc">{experimentsDesc}</p>
      <div className="experiments-bg">
        <Image
          src={mockupsImg}
          alt="background-mockups"
          className="experiments-bg-img"
        />
      </div>
      <div className="experiments-gradient">
        <Image
          src={theme === 'dark' ? darkImg : lightImg}
          alt=""
          className="experiments-gradient-img"
          fill
        />
      </div>
    </>
  )

  if (href) {
    return (
      <Link href={href} className="experiments-card experiments-card-link">
        {content}
      </Link>
    )
  }

  return <article className="experiments-card">{content}</article>
}
