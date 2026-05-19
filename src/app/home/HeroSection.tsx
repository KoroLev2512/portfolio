import { type StaticImageData } from 'next/image'
import { ImageWithLoader } from '@/shared/ui/ImageWithLoader'
import { ArrowIcon } from '@/shared/ui/ArrowIcon'
import styles from '../page.module.css'

function ExternalLink({ label, href = '#' }: { label: string; href?: string }) {
  return (
    <a href={href} className="external-link">
      {label}
      <ArrowIcon className="external-link-icon" />
    </a>
  )
}

type HeroSectionProps = {
  photoSrc: StaticImageData | string
  photoAlt: string
  name: string
  role: string
  bio: string
  contacts: { label: string; href: string }[]
}

export function HeroSection({ photoSrc, photoAlt, name, role, bio, contacts }: HeroSectionProps) {
  return (
    <section className={`${styles.hero} section`}>
      <div className={styles['hero-container']}>
        <ImageWithLoader
          src={photoSrc}
          alt={photoAlt}
          width={160}
          height={160}
          className={styles['hero-photo']}
          wrapperClassName={styles['hero-photo-wrap']}
          priority
          unoptimized={typeof photoSrc === 'string' && photoSrc.startsWith('http')}
        />
        <div className={styles['hero-info']}>
          <div className="hero-name-block text-reveal-title">
            <p className={styles['hero-name']}>{name}</p>
            <p className={styles['hero-position']}>{role}</p>
          </div>
          {contacts.length > 0 ? (
            <div className={`${styles['hero-contacts']} text-reveal-body`}>
              {contacts.map((c) => (
                <ExternalLink key={c.href} label={c.label} href={c.href} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <p className={`${styles['hero-bio']} text-reveal-body`}>{bio}</p>
    </section>
  )
}
