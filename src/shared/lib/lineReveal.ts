import { LINE_SELECTOR } from './revealSelectors'

let lineObserver: IntersectionObserver | undefined
let lineMutationObserver: MutationObserver | undefined

export function initLineReveal() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return
  if (lineObserver) return

  lineObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target as HTMLElement

        if (el.classList.contains('section')) {
          el.classList.add('lines-revealed')
        }
        if (el.classList.contains('pattern')) {
          el.classList.add('pattern-revealed')
        }

        lineObserver!.unobserve(el)
      }
    },
    { threshold: 0, rootMargin: '0px 0px 50px 0px' },
  )

  function observe() {
    requestAnimationFrame(() => {
      document.querySelectorAll<HTMLElement>(LINE_SELECTOR).forEach((el) => lineObserver!.observe(el))
    })
  }

  observe()

  lineMutationObserver = new MutationObserver(observe)
  lineMutationObserver.observe(document.body, { childList: true, subtree: true })
}

export function destroyLineReveal() {
  lineObserver?.disconnect()
  lineObserver = undefined
  lineMutationObserver?.disconnect()
  lineMutationObserver = undefined
}

