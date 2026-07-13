import styles from '../page.module.css'

function Tag({ label = 'Tag' }: { label?: string }) {
  return <span className="tag tag-reveal">{label}</span>
}

type SkillGroup = { title: string; tags: string[] }

export function SkillsSection({ title, groups }: { title: string; groups: SkillGroup[] }) {
  return (
    <section className="skills section">
      <h2 className="section-title text-reveal-title">{title}</h2>
      <div className={styles['skills-container']}>
        {groups.map((group) => (
          <div className={styles['skills-group']} key={group.title}>
            {group.title ? (
              <p className={`${styles['skills-group-title']} text-reveal-body`}>{group.title}</p>
            ) : null}
            <div className={`${styles['skills-tags']} skills-tags`}>
              {group.tags.map((label) => (
                <Tag key={label} label={label} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
