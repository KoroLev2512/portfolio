'use client'

import Link from 'next/link'
import styles from './ContactsBlock.module.css'

export type ContactButtonItem = {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

export type ContactsBlockProps = {
  /** Например: "[ Контакты ]" / "[ Contacts ]". Не рендерится, если не передан */
  sectionTitle?: string
  /** Заголовок блока: "Свяжитесь со мной" / "Get in touch with me" */
  title: string
  /** Если задан, первая кнопка — ссылка на этот href (например "/" на 404) */
  firstButtonHref?: string
  /** Кнопки из CMS (Sanity). Если заданы — рендерятся вместо заглушек */
  buttons?: ContactButtonItem[]
  /** Добавить классы text-reveal-title / tag-reveal для анимации (главная) */
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
