import { ProjectDetailBody } from './ProjectDetailBody'
import styles from './ProjectDetailSubtitleBlock.module.css'

interface ProjectDetailSubtitleBlockProps {
  subtitle: string
  description: string
  className?: string
}

export function ProjectDetailSubtitleBlock({
  subtitle,
  description,
  className = '',
}: ProjectDetailSubtitleBlockProps) {
  return (
    <div className={`${styles['project-detail-subtitle-block']} ${className}`}>
      <h2 className={styles['project-detail-subtitle']}>{subtitle}</h2>
      <ProjectDetailBody className={styles['project-detail-body']}>{description}</ProjectDetailBody>
    </div>
  )
}
