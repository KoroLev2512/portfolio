import { useState, useLayoutEffect, useEffect, useCallback, useRef } from 'react'
import { flushSync } from 'react-dom'
import { resetTextReveals } from '../../../shared/lib/imageReveal'
import { Pattern } from '../../../shared/ui/Pattern'
import '../../../App.css'
import '../../../theme-transition.css'

const THEME_KEY = 'portfolio-theme'
const LANG_KEY = 'portfolio-lang'

type Theme = 'dark' | 'light'
type Lang = 'ru' | 'en'

const IMG_AVATAR = '/avatar.png'
const IMG_ARROW = 'https://www.figma.com/api/mcp/asset/85595e10-ea13-44c1-b82d-e5d0aa1b1b88'
const IMG_THEME = 'https://www.figma.com/api/mcp/asset/4a3be44b-9468-4950-8c87-9264e527cec9'
const IMG_COVER = 'https://www.figma.com/api/mcp/asset/f56d3c3e-5aba-4974-9937-5871ced3bcab'
const IMG_SEND = 'https://www.figma.com/api/mcp/asset/eac692e1-edac-4c82-86b6-6a8def63e79c'
const IMG_EXPERIMENTS_BG = 'https://www.figma.com/api/mcp/asset/1bbcd1e2-f113-49c7-b8e6-dc9d207ce02d'
const IMG_GRADIENT = 'https://www.figma.com/api/mcp/asset/5a0afb81-d26c-4ceb-aadc-01641ecd9ba4'

const TEXTS = {
  ru: {
    position: 'Фронтенд‑разработчик',
    heroBio:
      'Я фронтенд‑разработчик, который любит аккуратные интерфейсы и понятные продукты. Работал с React, TypeScript и дизайн‑системами. Хочу делать интерфейсы, которыми приятно пользоваться каждый день.',
    skillsTitle: '[ Навыки ]',
    hardSkills: 'Hard skills',
    softSkills: 'Soft skills',
    languages: 'Languages',
    projectsTitle: '[ Проекты ]',
    experimentsTitle: 'Experiments',
    experimentsDesc: 'Здесь вы найдёте скриншоты, концепты и небольшие интерфейсные эксперименты',
    workTitle: '[ Опыт работы ]',
    educationTitle: '[ Образование ]',
    contactsTitle: '[ Контакты ]',
    contactsCta: 'Свяжитесь со мной',
    headerCta: 'Связаться',
    footerDesigned: 'Дизайн — Denis Knyazev',
  },
  en: {
    position: 'Frontend developer',
    heroBio:
      "I'm a passionate frontend developer who cares about clean interfaces and clear products. I work with React, TypeScript and design systems, and I want to build interfaces people enjoy using every day.",
    skillsTitle: '[ Skills ]',
    hardSkills: 'Hard Skills',
    softSkills: 'Soft Skills',
    languages: 'Languages',
    projectsTitle: '[ Projects ]',
    experimentsTitle: 'Experiments',
    experimentsDesc: 'Here you will find screenshots, concepts, and small interface experiments',
    workTitle: '[ Work Experience ]',
    educationTitle: '[ Education ]',
    contactsTitle: '[ Contacts ]',
    contactsCta: 'Get in touch with me',
    headerCta: 'Get in touch',
    footerDesigned: 'Designed by Denis Knyazev',
  },
} as const

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

function Header({
  theme,
  lang,
  onToggleTheme,
  onChangeLang,
}: {
  theme: Theme
  lang: Lang
  onToggleTheme: (e: React.MouseEvent<HTMLElement>) => void
  onChangeLang: (lang: Lang) => void
}) {
  const t = TEXTS[lang]
  return (
    <header className="header">
      <div className="header-left">
        <img src={IMG_AVATAR} alt="" className="header-photo" />
        <div>
          <span className="header-name">Korolev Yurii</span>
          <span className="header-position"> {t.position}</span>
        </div>
      </div>
      <div className="header-right">
        <button className="btn btn-primary btn-primary-s header-cta-text">{t.headerCta}</button>
        <button className="btn btn-primary btn-primary-icon header-cta-icon" aria-label={t.headerCta}>
          <img src={IMG_SEND} alt="" className="header-cta-icon-img" />
        </button>
        <div className="header-lang">
          <button
            type="button"
            className={lang === 'ru' ? 'header-lang-active' : undefined}
            onClick={() => onChangeLang('ru')}
          >
            Ru
          </button>
          <span> / </span>
          <button
            type="button"
            className={lang === 'en' ? 'header-lang-active' : undefined}
            onClick={() => onChangeLang('en')}
          >
            En
          </button>
        </div>
        <button
          className="theme-btn"
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          <img src={IMG_THEME} alt="" className="theme-btn-icon" />
        </button>
      </div>
    </header>
  )
}

function Hero({ lang }: { lang: Lang }) {
  const t = TEXTS[lang]
  return (
    <section className="hero section">
      <div className="hero-container">
        <img src={IMG_AVATAR} alt="" className="hero-photo img-reveal" />
        <div className="hero-info">
          <div>
            <p className="hero-name text-reveal-title">Korolev Yurii</p>
            <p className="hero-position text-reveal-body">{t.position}</p>
          </div>
          <div className="hero-contacts text-reveal-body">
            <ExternalLink label="example@mail.com" href="mailto:example@mail.com" />
            <ExternalLink label="t.me/username" href="https://t.me/username" />
          </div>
        </div>
      </div>
      <p className="hero-bio text-reveal-body">{t.heroBio}</p>
    </section>
  )
}

function Tag({ label = 'Tag' }: { label?: string }) {
  return <span className="tag">{label}</span>
}

function Skills({ lang }: { lang: Lang }) {
  const t = TEXTS[lang]
  const skills20 = Array.from({ length: 20 }, () => 'Skill')

  return (
    <section className="skills section">
      <p className="section-title text-reveal-title">{t.skillsTitle}</p>
      <div className="skills-container">
        <div className="skills-group text-reveal-body">
          <p className="skills-group-title">{t.hardSkills}</p>
          <div className="skills-tags">
            {skills20.map((label, i) => (
              <Tag key={i} label={label} />
            ))}
          </div>
        </div>
        <div className="skills-group text-reveal-body">
          <p className="skills-group-title">{t.softSkills}</p>
          <div className="skills-tags">
            {skills20.map((label, i) => (
              <Tag key={i} label={label} />
            ))}
          </div>
        </div>
        <div className="skills-group text-reveal-body">
          <p className="skills-group-title">{t.languages}</p>
          <div className="skills-tags">
            {skills20.map((label, i) => (
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
  skills = ['Tag', 'Tag', 'Tag', 'Tag', 'Tag', 'Tag'],
  description = 'A description of the project in several lines, reflecting the general idea.',
}: {
  name?: string
  skills?: string[]
  description?: string
}) {
  return (
    <article className="project-card">
      <img src={IMG_COVER} alt="" className="project-cover img-reveal" />
      <div className="project-details">
        <div>
          <h3 className="project-name text-reveal-body">{name}</h3>
          <div className="project-tags text-reveal-body">
            {skills.map((skill, i) => (
              <span key={i} className="project-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <p className="project-description text-reveal-body">{description}</p>
      </div>
    </article>
  )
}

function ExperimentsCard({ lang }: { lang: Lang }) {
  const t = TEXTS[lang]
  return (
    <article className="experiments-card">
      <p className="experiments-title text-reveal-body">{t.experimentsTitle}</p>
      <p className="experiments-desc text-reveal-body">{t.experimentsDesc}</p>
      <div className="experiments-bg">
        <img src={IMG_EXPERIMENTS_BG} alt="" className="experiments-bg-img" />
      </div>
      <div className="experiments-gradient">
        <img src={IMG_GRADIENT} alt="" className="experiments-gradient-img" />
      </div>
    </article>
  )
}

function Projects({ lang }: { lang: Lang }) {
  return (
    <section id="projects" className="projects section">
      <p className="section-title text-reveal-title">{TEXTS[lang].projectsTitle}</p>
      <div className="projects-list">
        <ProjectCard />
        <ProjectCard />
        <ExperimentsCard lang={lang} />
      </div>
    </section>
  )
}

function JobEntry({
  company = 'Company Name',
  position = 'Frontend developer',
  period = 'Mmm YYYY — Mmm YYYY',
}: {
  company?: string
  position?: string
  period?: string
}) {
  return (
    <div className="entry text-reveal-body">
      <p className="entry-left">{company}</p>
      <div className="entry-right">
        <p className="entry-title">{position}</p>
        <p className="entry-subtitle">{period}</p>
      </div>
    </div>
  )
}

function WorkExperience({ lang }: { lang: Lang }) {
  return (
    <section className="work-experience section">
      <p className="section-title text-reveal-title">{TEXTS[lang].workTitle}</p>
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
    <div className="entry text-reveal-body">
      <p className="entry-left">{organization}</p>
      <div className="entry-right">
        <p className="entry-title">{specialization}</p>
        <p className="entry-subtitle">{level}</p>
        <p className="entry-subtitle">{period}</p>
      </div>
    </div>
  )
}

function Education({ lang }: { lang: Lang }) {
  return (
    <section className="education section">
      <p className="section-title text-reveal-title">{TEXTS[lang].educationTitle}</p>
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

function Contacts({ lang }: { lang: Lang }) {
  return (
    <section className="contacts section">
      <p className="section-title text-reveal-title">{TEXTS[lang].contactsTitle}</p>
      <p className="contacts-title text-reveal-title">{TEXTS[lang].contactsCta}</p>
      <div className="contacts-buttons text-reveal-body">
        <button className="btn btn-primary btn-primary-m">Button</button>
        <button className="btn btn-secondary">Button</button>
        <button className="btn btn-secondary">Button</button>
        <button className="btn btn-secondary">Button</button>
      </div>
    </section>
  )
}

function Footer({
  theme,
  lang,
  onToggleTheme,
  onChangeLang,
}: {
  theme: Theme
  lang: Lang
  onToggleTheme: (e: React.MouseEvent<HTMLElement>) => void
  onChangeLang: (lang: Lang) => void
}) {
  const t = TEXTS[lang]
  return (
    <footer className="footer">
      <div className="footer-mobile-controls">
        <div className="header-lang">
          <button
            type="button"
            className={lang === 'ru' ? 'header-lang-active' : undefined}
            onClick={() => onChangeLang('ru')}
          >
            Ru
          </button>
          <span> / </span>
          <button
            type="button"
            className={lang === 'en' ? 'header-lang-active' : undefined}
            onClick={() => onChangeLang('en')}
          >
            En
          </button>
        </div>
        <button
          className="theme-btn"
          type="button"
          onClick={onToggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          <img src={IMG_THEME} alt="" className="theme-btn-icon" />
        </button>
      </div>
      <a href="#" className="footer-link text-reveal-body">
        {t.footerDesigned}
        <img src={IMG_ARROW} alt="" className="external-link-icon" />
      </a>
      <p className="footer-text text-reveal-body">©2026. All rights reserved</p>
    </footer>
  )
}

function PageContent({
  theme,
  lang,
  onToggleTheme,
  onChangeLang,
}: {
  theme: Theme
  lang: Lang
  onToggleTheme: (e: React.MouseEvent<HTMLElement>) => void
  onChangeLang: (lang: Lang) => void
}) {
  return (
    <>
      <Header theme={theme} lang={lang} onToggleTheme={onToggleTheme} onChangeLang={onChangeLang} />
      <Hero lang={lang} />
      <Pattern />
      <Skills lang={lang} />
      <Pattern />
      <Projects lang={lang} />
      <Pattern />
      <WorkExperience lang={lang} />
      <Pattern />
      <Education lang={lang} />
      <Pattern />
      <Contacts lang={lang} />
      <Footer theme={theme} lang={lang} onToggleTheme={onToggleTheme} onChangeLang={onChangeLang} />
    </>
  )
}

export function PortfolioPage() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem(THEME_KEY) as Theme | null
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [lang, setLang] = useState<Lang>(() => {
    const stored = localStorage.getItem(LANG_KEY) as Lang | null
    if (stored === 'ru' || stored === 'en') return stored
    if (typeof navigator !== 'undefined') {
      return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en'
    }
    return 'en'
  })

  useLayoutEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  const langMounted = useRef(false)
  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang)
    if (langMounted.current) {
      resetTextReveals()
    }
    langMounted.current = true
  }, [lang])

  const handleToggleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      const nextTheme: Theme = theme === 'light' ? 'dark' : 'light'

      if (!document.startViewTransition) {
        setTheme(nextTheme)
        return
      }

      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      )

      const transition = document.startViewTransition(() => {
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
          },
        )
      })
    },
    [theme],
  )

  const handleChangeLang = useCallback((next: Lang) => {
    setLang(next)
  }, [])

  return (
    <main className="portfolio">
      <PageContent theme={theme} lang={lang} onToggleTheme={handleToggleClick} onChangeLang={handleChangeLang} />
    </main>
  )
}

export default PortfolioPage

