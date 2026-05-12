const RIPPLE_SELECTORS =
  '.btn, .project-card, .project-nav-btn, .project-card-link, .experiments-gallery-tile'

export function initRipple() {
  if (typeof document === 'undefined') return

  document.addEventListener('mousedown', (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>(RIPPLE_SELECTORS)
    if (!target) return

    const rect = target.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const span = document.createElement('span')
    span.className = 'ripple'
    const toRem = (v: number) => `${v / 16}rem`
    span.style.width = span.style.height = toRem(size)
    span.style.left = toRem(x)
    span.style.top = toRem(y)

    const apply = () => {
      if (!target.isConnected) return
      target.appendChild(span)
      span.addEventListener('animationend', () => span.remove())
    }

    // Sync DOM insert on <a> can swallow the click in some engines; defer keeps navigation reliable.
    if (target instanceof HTMLAnchorElement) {
      window.setTimeout(apply, 0)
    } else {
      apply()
    }
  })
}

