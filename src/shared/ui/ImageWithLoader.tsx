'use client'

import Image, { type ImageProps } from 'next/image'
import { type CSSProperties, useState } from 'react'
import styles from './ImageWithLoader.module.css'

export type ImageWithLoaderProps = ImageProps & {
  wrapperClassName?: string
  loaderClassName?: string
}

export function ImageWithLoader({
  wrapperClassName = '',
  loaderClassName = '',
  className = '',
  onLoadingComplete,
  fill,
  width,
  height,
  alt,
  ...imageRest
}: ImageWithLoaderProps) {
  const [loaded, setLoaded] = useState(false)

  const aspectRatioStyle: CSSProperties | undefined =
    !fill &&
    typeof width === 'number' &&
    typeof height === 'number' &&
    width > 0 &&
    height > 0
      ? { aspectRatio: `${width} / ${height}` }
      : undefined

  const handleComplete: NonNullable<ImageProps['onLoadingComplete']> = (img) => {
    setLoaded(true)
    onLoadingComplete?.(img)
  }

  const imageClassName = [className, 'img-reveal', loaded ? 'revealed' : ''].filter(Boolean).join(' ')

  const rootClass = [styles.root, fill ? styles.rootFill : '', wrapperClassName].filter(Boolean).join(' ')

  return (
    <div className={rootClass} style={aspectRatioStyle}>
      {!loaded ? (
        <div
          className={[styles.shimmer, loaderClassName].filter(Boolean).join(' ')}
          aria-hidden
        />
      ) : null}
      <Image
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        {...imageRest}
        className={imageClassName}
        data-reveal-when-loaded=""
        onLoadingComplete={handleComplete}
      />
    </div>
  )
}
