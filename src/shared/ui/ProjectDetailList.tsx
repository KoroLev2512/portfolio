'use client'

import styles from './ProjectDetailList.module.css'

export type ProjectDetailListProps = {
  items: string[]
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
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  )
}
