import type { SVGProps } from 'react'

export type ArrowIconProps = SVGProps<SVGSVGElement> & {
  angle?: number
}

export function ArrowIcon({ angle, style, ...props }: ArrowIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      style={{
        transform: angle != null ? `rotate(${angle}deg)` : undefined,
        transformOrigin: 'center',
        ...style,
      }}
      {...props}
    >
      <path
        d="M12 11.3333C12 11.7015 11.7015 12 11.3333 12C10.9651 12 10.6667 11.7015 10.6667 11.3333V6.27604L5.13802 11.8047C4.87767 12.065 4.45566 12.065 4.19531 11.8047C3.93496 11.5443 3.93496 11.1223 4.19531 10.862L9.72396 5.33333H4.66667C4.29848 5.33333 4 5.03486 4 4.66667C4 4.29848 4.29848 4 4.66667 4H11.3333C11.7015 4 12 4.29848 12 4.66667V11.3333Z"
        fill="currentColor"
        fillOpacity={0.5}
      />
    </svg>
  )
}
