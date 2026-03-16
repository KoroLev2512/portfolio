'use client'

import React from 'react'
import styles from './ProjectDetailBody.module.css'

export type ProjectDetailBodyProps = {
  children: React.ReactNode
  className?: string
}

export function ProjectDetailBody({
  children,
  className = '',
}: ProjectDetailBodyProps) {
  const fullClassName = className ? `${styles['project-detail-body']} ${className}` : styles['project-detail-body']

  return (
    <p className={fullClassName}>
      {children}
    </p>
  )
}
