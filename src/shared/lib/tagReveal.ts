const GROUP_SELECTOR = '.skills-tags, .contacts-buttons, .notfound-btn-wrap'
const TAG_SELECTOR = '.tag-reveal'
const STAGGER_MS = 75

let observer: IntersectionObserver | undefined
let observerInitialized = false

function observeAll() {
  if (!observer || typeof document === 'undefined') return

  requestAnimationFrame(() => {
    document.querySelectorAll<HTMLElement>(GROUP_SELECTOR).forEach((el) => {
      if (!el.dataset.tagObserved) {
        el.dataset.tagObserved = '1'
        observer!.observe(el)
      }
    })
  })
}

export function initTagReveal() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return

  if (!observerInitialized) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const container = entry.target as HTMLElement
          const tags = container.querySelectorAll<HTMLElement>(TAG_SELECTOR)

          tags.forEach((tag, i) => {
            if (tag.classList.contains('revealed')) return
            const delay = i * STAGGER_MS
            tag.style.transitionDelay = `${delay}ms`
            requestAnimationFrame(() => tag.classList.add('revealed'))
          })

          observer!.unobserve(container)
        }
      },
      { threshold: 0.2 },
    )

    const mo = new MutationObserver(observeAll)
    mo.observe(document.body, { childList: true, subtree: true })

    observerInitialized = true
  }

  observeAll()
}

export function resetTagReveals() {
  if (typeof document === 'undefined') return

  document.querySelectorAll<HTMLElement>(TAG_SELECTOR).forEach((el) => {
    el.style.transition = 'none'
    el.classList.remove('revealed')
    el.style.transitionDelay = ''
  })

  // force reflow
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  document.body.offsetHeight

  document.querySelectorAll<HTMLElement>(TAG_SELECTOR).forEach((el) => {
    el.style.transition = ''
  })

  document.querySelectorAll<HTMLElement>(GROUP_SELECTOR).forEach((el) => {
    delete el.dataset.tagObserved
  })

  observeAll()
}
