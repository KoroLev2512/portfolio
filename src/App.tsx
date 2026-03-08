import { useState, useEffect, useRef, useCallback } from 'react'
import { flushSync } from 'react-dom'
import './App.css'
import './theme-transition.css'

const THEME_KEY = 'portfolio-theme'

type Theme = 'dark' | 'light'

// Figma asset URLs (valid for 7 days)
const IMG_ARROW = 'https://www.figma.com/api/mcp/asset/cfc72bb7-8bb1-4354-914e-f7a10c9d98a9'
const IMG_COVER = 'https://www.figma.com/api/mcp/asset/f56d3c3e-5aba-4974-9937-5871ced3bcab'

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path stroke="currentColor" strokeWidth="1.5" d="M10 2v2M10 16v2M18 10h-2M4 10H2M15.07 4.93l-1.41 1.41M6.34 13.66l-1.41 1.41M15.07 15.07l-1.41-1.41M6.34 6.34L4.93 4.93" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M17 10.5a7 7 0 11-7-7c.5 0 1 .06 1.5.17a5 5 0 010 9.66c-.5.11-1 .17-1.5.17z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ExternalLink({
  label,
  href = '#',
}: {
  label: string
  href?: string
}) {
  return (
    <a href={href} className="external-link">
      {label}
      <img src={IMG_ARROW} alt="" className="external-link-icon" />
    </a>
  )
}

function Header({ theme, onToggleTheme }: { theme: Theme; onToggleTheme: (e: React.MouseEvent<HTMLElement>) => void }) {
  return (
    <header className="header">
      <div className="header-left">
        <img src={IMG_COVER} alt="" className="header-photo" />
        <div>
          <span className="header-name">First name last name</span>
          <span className="header-position"> Position</span>
        </div>
      </div>
      <div className="header-right">
        <button className="btn btn-primary btn-primary-s">Get in touch</button>
        <div className="header-lang">
          <span className="header-lang-active">Ru</span>
          <span> / </span>
          <span>En</span>
        </div>
        <button
          className="theme-btn"
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero section">
      <div className="hero-container">
        <img src={IMG_COVER} alt="" className="hero-photo" />
        <div className="hero-info">
          <div>
            <p className="hero-name">First name last name</p>
            <p className="hero-position">Position</p>
          </div>
          <div className="hero-contacts">
            <ExternalLink label="example@mail.com" href="mailto:example@mail.com" />
            <ExternalLink label="t.me/username" href="https://t.me/username" />
          </div>
        </div>
      </div>
      <p className="hero-bio">
        I'm a passionate designer with five years of experience in the field. I
        specialize in creating user-centered designs that are both beautiful and
        functional. I'm excited to continue growing as a designer and make a
        positive impact on the world.
      </p>
    </section>
  )
}

function Pattern() {
  return <div className="pattern" aria-hidden />
}

function Tag({ label = 'Tag' }: { label?: string }) {
  return <span className="tag">{label}</span>
}

function Skills() {
  const hardSkills = [
    'Tag', 'Tag', 'Tag', 'Tag', 'Tag', 'Tag', 'Tag',
    'Tag', 'Tag', 'Tag', 'Tag', 'Tag', 'Tag', 'Tag',
  ]
  const softSkills = [
    'Tag', 'Tag', 'Tag', 'Tag', 'Tag', 'Tag', 'Tag',
    'Tag', 'Tag', 'Tag', 'Tag', 'Tag', 'Tag', 'Tag',
  ]

  return (
    <section className="skills section">
      <p className="section-title">[ Skills ]</p>
      <div className="skills-container">
        <div className="skills-group">
          <p className="skills-group-title">Hard Skills</p>
          <div className="skills-tags">
            {hardSkills.map((label, i) => (
              <Tag key={i} label={label} />
            ))}
          </div>
        </div>
        <div className="skills-group">
          <p className="skills-group-title">Soft Skills</p>
          <div className="skills-tags">
            {softSkills.map((label, i) => (
              <Tag key={i} label={label} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  name = 'Project Name',
  skills = ['Skill', 'Skill', 'Skill', 'Skill', 'Skill'],
  description = 'A description of the project in several lines, reflecting the general idea.',
}: {
  name?: string
  skills?: string[]
  description?: string
}) {
  return (
    <article className="project-card">
      <img src={IMG_COVER} alt="" className="project-cover" />
      <div className="project-details">
        <div>
          <h3 className="project-name">{name}</h3>
          <div className="project-tags">
            {skills.map((skill, i) => (
              <span key={i} className="project-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <p className="project-description">{description}</p>
      </div>
    </article>
  )
}

function Projects() {
  return (
    <section className="projects section">
      <p className="section-title">[ Projects ]</p>
      <div className="projects-list">
        <ProjectCard />
        <ProjectCard />
      </div>
    </section>
  )
}

function JobEntry({
  company = 'Company Name',
  position = 'Position',
  period = 'Mmm YYYY — Mmm YYYY',
}: {
  company?: string
  position?: string
  period?: string
}) {
  return (
    <div className="entry">
      <p className="entry-left">{company}</p>
      <div className="entry-right">
        <p className="entry-title">{position}</p>
        <p className="entry-subtitle">{period}</p>
      </div>
    </div>
  )
}

function WorkExperience() {
  return (
    <section className="work-experience section">
      <p className="section-title">[ Work Experience ]</p>
      <div className="entry-list">
        <JobEntry />
        <JobEntry />
        <JobEntry />
        <JobEntry />
        <JobEntry />
      </div>
    </section>
  )
}

function EducationEntry({
  organization = 'Organization Name',
  specialization = 'Name of the specialization',
  level = 'Level or type of education',
  period = 'YYYY — YYYY',
}: {
  organization?: string
  specialization?: string
  level?: string
  period?: string
}) {
  return (
    <div className="entry">
      <p className="entry-left">{organization}</p>
      <div className="entry-right">
        <p className="entry-title">{specialization}</p>
        <p className="entry-subtitle">{level}</p>
        <p className="entry-subtitle">{period}</p>
      </div>
    </div>
  )
}

function Education() {
  return (
    <section className="education section">
      <p className="section-title">[ Education ]</p>
      <div className="entry-list">
        <EducationEntry />
        <EducationEntry />
        <EducationEntry />
        <EducationEntry />
        <EducationEntry />
      </div>
    </section>
  )
}

function Contacts() {
  return (
    <section className="contacts section">
      <p className="section-title">[ Contacts ]</p>
      <p className="contacts-title">Get in touch with me</p>
      <div className="contacts-buttons">
        <button className="btn btn-primary btn-primary-m">Button</button>
        <button className="btn btn-secondary">Button</button>
        <button className="btn btn-secondary">Button</button>
        <button className="btn btn-secondary">Button</button>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer-text">©2026. All rights reserved</p>
      <a href="#" className="footer-link">
        Designed by Denis Knyazev
        <img src={IMG_ARROW} alt="" className="external-link-icon" />
      </a>
    </footer>
  )
}

function PageContent({
  theme,
  onToggleTheme,
}: {
  theme: Theme
  onToggleTheme: (e: React.MouseEvent<HTMLElement>) => void
}) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <Hero />
      <Pattern />
      <Skills />
      <Pattern />
      <Projects />
      <Pattern />
      <WorkExperience />
      <Pattern />
      <Education />
      <Pattern />
      <Contacts />
      <Footer />
    </>
  )
}

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [isAnimating, setIsAnimating] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const triggerTransition = useCallback(
    (x: number, y: number) => {
      if (isAnimating) return

      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      )
      const nextTheme: Theme = theme === 'light' ? 'dark' : 'light'

      const startVT = (document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> } }).startViewTransition
      if (startVT) {
        setIsAnimating(true)

        const transition = startVT.call(document, () => {
          flushSync(() => setTheme(nextTheme))
        })

        transition.ready.then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${maxRadius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 700,
              easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          )
        })

        transition.finished.then(() => {
          setIsAnimating(false)
        })
        return
      }

      const overlay = overlayRef.current
      if (!overlay) {
        setTheme(nextTheme)
        return
      }

      setIsAnimating(true)
      overlay.style.display = 'block'
      overlay.scrollTop = window.scrollY
      overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`

      requestAnimationFrame(() => {
        const animation = overlay.animate(
          [
            { clipPath: `circle(0px at ${x}px ${y}px)` },
            { clipPath: `circle(${maxRadius}px at ${x}px ${y}px)` },
          ],
          { duration: 700, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'forwards' }
        )

        animation.onfinish = () => {
          const savedScroll = overlay.scrollTop
          setTheme(nextTheme)
          requestAnimationFrame(() => {
            window.scrollTo(0, savedScroll)
            overlay.style.display = 'none'
            overlay.style.clipPath = ''
            animation.cancel()
            setIsAnimating(false)
          })
        }
      })
    },
    [theme, isAnimating]
  )

  const handleToggleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      triggerTransition(rect.left + rect.width / 2, rect.top + rect.height / 2)
    },
    [triggerTransition]
  )

  const nextTheme: Theme = theme === 'light' ? 'dark' : 'light'

  return (
    <main className="portfolio">
      <PageContent theme={theme} onToggleTheme={handleToggleClick} />

      <div
        ref={overlayRef}
        data-theme={nextTheme}
        style={{
          display: 'none',
          position: 'fixed',
          inset: 0,
          zIndex: 9998,
          overflowY: 'auto',
          background: 'var(--bg)',
        }}
      >
        <main className="portfolio">
          <PageContent theme={nextTheme} onToggleTheme={handleToggleClick} />
        </main>
      </div>
    </main>
  )
}

export default App
