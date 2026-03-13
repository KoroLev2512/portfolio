import { useId } from 'react'

export function Pattern() {
  const id = useId().replace(/:/g, '-')
  const patternId = `pattern-${id}`
  const innerId = `pattern-inner-${id}`

  return (
    <div className="pattern">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="100%"
        height="40"
        viewBox="0 0 720 40"
        fill="none"
        aria-hidden
        preserveAspectRatio="xMidYMid slice"
      >
        <rect width="720" height="40" fill={`url(#${patternId})`} />
        <rect x="0.5" y="0.5" width="719" height="39" stroke="var(--border)" fill="none" />
        <defs>
          <pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            patternTransform="matrix(11.3137 0 0 11.3137 347.979 7.97924)"
            preserveAspectRatio="none"
            viewBox="-0.707031 -0.707056 11.3137 11.3137"
            width="1"
            height="1"
          >
            <line
              id={innerId}
              x1="-0.353553"
              y1="22.2739"
              x2="22.2739"
              y2="-0.353553"
              stroke="var(--border)"
            />
            <use href={`#${innerId}`} transform="translate(-22.6274 -22.6274)" />
            <use href={`#${innerId}`} transform="translate(-11.3137 -22.6274)" />
            <use href={`#${innerId}`} transform="translate(0 -22.6274)" />
            <use href={`#${innerId}`} transform="translate(-22.6274 -11.3137)" />
            <use href={`#${innerId}`} transform="translate(-11.3137 -11.3137)" />
            <use href={`#${innerId}`} transform="translate(0 -11.3137)" />
            <use href={`#${innerId}`} transform="translate(-22.6274 0)" />
            <use href={`#${innerId}`} transform="translate(-11.3137 0)" />
            <use href={`#${innerId}`} transform="translate(0 0)" />
          </pattern>
        </defs>
      </svg>
    </div>
  )
}

