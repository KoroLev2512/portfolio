import styles from '../page.module.css'

type EducationEntry = {
  _key?: string
  organization: string
  specialization: string
  level: string
  period?: string
}

function EducationItem({
  organization = 'Organization Name',
  specialization = 'Name of the specialization',
  level = 'Level or type of education',
  period = 'YYYY — YYYY',
}: Partial<EducationEntry>) {
  return (
    <div className={`${styles.entry} text-reveal-body`}>
      <p className={styles['entry-left']}>{organization}</p>
      <div className={styles['entry-right']}>
        <p className={styles['entry-title']}>{specialization}</p>
        <p className={styles['entry-subtitle']}>{level}</p>
        <p className={styles['entry-subtitle']}>{period}</p>
      </div>
    </div>
  )
}

export function EducationSection({
  title,
  entries,
  isLoaded,
}: {
  title: string
  entries: EducationEntry[]
  isLoaded: boolean
}) {
  return (
    <section className="education section">
      <p className="section-title text-reveal-title">{title}</p>
      <div className={styles['entry-list']}>
        {entries.length > 0 ? (
          entries.map((e, i) => (
            <EducationItem
              key={e._key ?? `edu-${i}`}
              organization={e.organization}
              specialization={e.specialization}
              level={e.level}
              period={e.period}
            />
          ))
        ) : !isLoaded ? (
          <>
            <EducationItem />
            <EducationItem />
            <EducationItem />
            <EducationItem />
            <EducationItem />
          </>
        ) : null}
      </div>
    </section>
  )
}
