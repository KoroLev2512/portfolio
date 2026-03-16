'use client'

import React from 'react'
import styles from './ProjectDetailBlockTitle.module.css'

export type ProjectDetailBlockTitleProps = {
  children: React.ReactNode
  className?: string
}

export function ProjectDetailBlockTitle({
  children,
  className = '',
}: ProjectDetailBlockTitleProps) {
  const fullClassName = className ? `${styles['project-detail-block-title']} ${className}` : styles['project-detail-block-title']

  return (
    <h2 className={fullClassName}>
      {children}
    </h2>
  )
}
