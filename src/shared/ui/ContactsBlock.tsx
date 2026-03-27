'use client'

import Link from 'next/link'
import styles from './ContactsBlock.module.css'

export type ContactButtonItem = {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

export type ContactsBlockProps = {
  sectionTitle?: string
  title: string
  firstButtonHref?: string
  buttons?: ContactButtonItem[]
  useReveal?: boolean
}

export function ContactsBlock({
  sectionTitle,
  title,
  firstButtonHref,
  buttons,
  useReveal = false,
}: ContactsBlockProps) {
  const titleClass = useReveal ? `${styles['contacts-title']} text-reveal-title` : styles['contacts-title']
  const sectionTitleClass = useReveal ? 'section-title text-reveal-title' : 'section-title'
  const btnClass = useReveal ? 'btn tag-reveal' : 'btn'

  const renderDefaultButtons = () => (
    <>
      {firstButtonHref != null ? (
        <Link href={firstButtonHref} className={`${btnClass} btn-primary btn-primary-m`}>
          Button
        </Link>
      ) : (
        <button type="button" className={`${btnClass} btn-primary btn-primary-m`}>
          Button
        </button>
      )}
      <button type="button" className={`${btnClass} btn-secondary`}>
        Button
      </button>
      <button type="button" className={`${btnClass} btn-secondary`}>
        Button
      </button>
      <button type="button" className={`${btnClass} btn-secondary`}>
        Button
      </button>
    </>
  )

  return (
    <section id="contacts" className="contacts section">
      {sectionTitle != null && sectionTitle !== '' && (
        <p className={sectionTitleClass}>{sectionTitle}</p>
      )}
      <p className={titleClass}>{title}</p>
      <div className={`${styles['contacts-buttons']} contacts-buttons`}>
        {buttons != null && buttons.length > 0
          ? buttons.map((b, i) => {
              const isPrimary = b.variant === 'primary' || i === 0
              return (
                <Link
                  key={`${b.href}-${i}`}
                  href={b.href}
                  className={
                    isPrimary
                      ? `${btnClass} btn-primary btn-primary-m`
                      : `${btnClass} btn-secondary`
                  }
                >
                  {b.label}
                </Link>
              )
            })
          : renderDefaultButtons()}
      </div>
    </section>
  )
}
