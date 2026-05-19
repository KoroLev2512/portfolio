import styles from '../page.module.css'

type WorkEntry = { _key?: string; company: string; position: string; period?: string }

function JobEntry({
  company = 'Company Name',
  position = 'Frontend developer',
  period = 'Mmm YYYY — Mmm YYYY',
}: Partial<WorkEntry>) {
  return (
    <div className={`${styles.entry} text-reveal-body`}>
      <p className={styles['entry-left']}>{company}</p>
      <div className={styles['entry-right']}>
        <p className={styles['entry-title']}>{position}</p>
        <p className={styles['entry-subtitle']}>{period}</p>
      </div>
    </div>
  )
}

export function WorkSection({
  title,
  entries,
  isLoaded,
}: {
  title: string
  entries: WorkEntry[]
  isLoaded: boolean
}) {
  return (
    <section className="work-experience section">
      <p className="section-title text-reveal-title">{title}</p>
      <div className={styles['entry-list']}>
        {entries.length > 0 ? (
          entries.map((e, i) => (
            <JobEntry
              key={e._key ?? `work-${i}`}
              company={e.company}
              position={e.position}
              period={e.period}
            />
          ))
        ) : !isLoaded ? (
          <>
            <JobEntry />
            <JobEntry />
            <JobEntry />
            <JobEntry />
            <JobEntry />
          </>
        ) : null}
      </div>
    </section>
  )
}
