'use client'

import styles from './ProjectDetailList.module.css'

export type ProjectDetailListProps = {
  items: { lineKey: string; text: string }[]
  className?: string
}

export function ProjectDetailList({
  items,
  className = '',
}: ProjectDetailListProps) {
  if (!items || items.length === 0) return null

  const listClass = className ? `${styles['project-detail-list']} ${className}` : styles['project-detail-list']

  return (
    <ul className={listClass}>
      {items.map((row) => (
        <li key={row.lineKey}>{row.text}</li>
      ))}
    </ul>
  )
}
