import type { SVGProps } from 'react'

export type ArrowIconProps = SVGProps<SVGSVGElement> & {
  angle?: number
  color?: string
  fillOpacity?: number
}

export function ArrowIcon({ angle, color, fillOpacity = 0.5, style, ...props }: ArrowIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={`icon-rotate ${props.className ?? ''}`}
      style={{
        ...style,
        '--icon-angle': angle != null ? `${angle}deg` : '0deg',
      } as React.CSSProperties}
      {...props}
    >
      <path
        d="M12 11.33C12 11.7 11.7 12 11.33 12C10.97 12 10.67 11.7 10.67 11.33V6.28L5.14 11.8C4.88 12.07 4.46 12.07 4.2 11.8C3.93 11.54 3.93 11.12 4.2 10.86L9.72 5.33H4.67C4.3 5.33 4 5.03 4 4.67C4 4.3 4.3 4 4.67 4H11.33C11.7 4 12 4.3 12 4.67V11.33Z"
        fill={color ?? 'currentColor'}
        fillOpacity={fillOpacity}
      />
    </svg>
  )
}

