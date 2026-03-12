const LINE_SELECTOR = '.section:not(.lines-revealed), .pattern:not(.pattern-revealed)'

export function initLineReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const el = entry.target

        if (el.classList.contains('section')) {
          el.classList.add('lines-revealed')
        }
        if (el.classList.contains('pattern')) {
          el.classList.add('pattern-revealed')
        }

        observer.unobserve(el)
      }
    },
    { threshold: 0, rootMargin: '0px 0px 50px 0px' },
  )

  function observe() {
    requestAnimationFrame(() => {
      document
        .querySelectorAll<HTMLElement>(LINE_SELECTOR)
        .forEach((el) => observer.observe(el))
    })
  }

  observe()

  const mo = new MutationObserver(observe)
  mo.observe(document.body, { childList: true, subtree: true })
}
