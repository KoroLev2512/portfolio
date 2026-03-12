const RIPPLE_SELECTORS = '.btn, .project-card, .project-nav-btn, .project-card-link'

export function initRipple() {
  document.addEventListener('mousedown', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>(RIPPLE_SELECTORS)
    if (!target) return

    const rect = target.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const span = document.createElement('span')
    span.className = 'ripple'
    span.style.width = span.style.height = `${size}px`
    span.style.left = `${x}px`
    span.style.top = `${y}px`

    target.appendChild(span)
    span.addEventListener('animationend', () => span.remove())
  })
}
