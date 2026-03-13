const SELECTOR = '.img-reveal, .text-reveal-title, .text-reveal-body, .project-card'
const TEXT_SELECTOR = '.text-reveal-title, .text-reveal-body'
const STAGGER_MS = 75

let observer: IntersectionObserver | undefined

export function initImageReveal() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return
  if (observer) return

  observer = new IntersectionObserver(
    (entries) => {
      const groups = new Map<Element | null, Element[]>()

      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const section = entry.target.closest(
          '.section, .notfound-error, .notfound-recommendation, .contacts, header, footer',
        )
        if (!groups.has(section)) groups.set(section, [])
        groups.get(section)!.push(entry.target)
        observer!.unobserve(entry.target)
      }

      for (const [, elements] of groups) {
        elements.forEach((el, i) => {
          const delay = i * STAGGER_MS
          if (delay > 0) {
            ;(el as HTMLElement).style.transitionDelay = `${delay}ms`
          }
          requestAnimationFrame(() => el.classList.add('revealed'))
        })
      }
    },
    { threshold: 0.2 },
  )

  function observe() {
    document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
      if (!el.classList.contains('revealed')) {
        observer!.observe(el)
      }
    })
  }

  observe()

  const mo = new MutationObserver(observe)
  mo.observe(document.body, { childList: true, subtree: true })
}

export function resetTextReveals() {
  if (!observer || typeof document === 'undefined') return
  const elements = document.querySelectorAll<HTMLElement>(TEXT_SELECTOR)

  elements.forEach((el) => {
    el.style.transition = 'none'
    el.classList.remove('revealed')
    el.style.transitionDelay = ''
  })

  // force reflow
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  document.body.offsetHeight

  elements.forEach((el) => {
    el.style.transition = ''
  })

  requestAnimationFrame(() => {
    elements.forEach((el) => observer!.observe(el))
  })
}

