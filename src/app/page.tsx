'use client'

import Image from 'next/image'
import avatarImg from '@/../public/avatar.png'
import mockupImg from '@/../public/mockup.png'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { Pattern } from '@/shared/ui/Pattern'
import { resetTextReveals } from '@/shared/lib/imageReveal'
import { resetTagReveals } from '@/shared/lib/tagReveal'
import { ArrowIcon } from '@/shared/ui/ArrowIcon'

const THEME_KEY = 'portfolio-theme'
const LANG_KEY = 'portfolio-lang'

type Theme = 'dark' | 'light'
type Lang = 'ru' | 'en'

const TEXTS = {
  ru: {
    name: 'Королёв Юрий',
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
    footerDesigned: 'Задизайнил Денис Князев',
  },
  en: {
    name: 'Korolev Yurii',
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

function ExternalLink({ label, href = '#' }: { label: string; href?: string }) {
  return (
    <a href={href} className="external-link">
      {label}
      <ArrowIcon className="external-link-icon" />
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

  const handleContactsClick = () => {
    if (typeof document === 'undefined') return
    const el = document.getElementById('contacts')
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="header">
      <div className="header-left">
        <Image
         src={avatarImg}
         alt="avatar"
         className="header-photo"
         priority
        />
        <div>
          <span className="header-name">{t.name}</span>
          <span className="header-position"> {t.position}</span>
        </div>
      </div>
      <div className="header-right">
        <button className="btn btn-primary btn-primary-s header-cta-text" type="button" onClick={handleContactsClick}>
          {t.headerCta}
        </button>
        <button
          className="btn btn-primary btn-primary-icon header-cta-icon"
          type="button"
          aria-label={t.headerCta}
          onClick={handleContactsClick}
        >
          <img
            src="https://www.figma.com/api/mcp/asset/eac692e1-edac-4c82-86b6-6a8def63e79c"
            alt=""
            className="header-cta-icon-img"
          />
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
          <img
            src="https://www.figma.com/api/mcp/asset/4a3be44b-9468-4950-8c87-9264e527cec9"
            alt=""
            className="theme-btn-icon"
          />
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
        <Image src={avatarImg} alt="" className="hero-photo img-reveal" />
        <div className="hero-info">
          <div className="hero-name-block text-reveal-title">
            <p className="hero-name">{t.name}</p>
            <p className="hero-position">{t.position}</p>
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
  return <span className="tag tag-reveal">{label}</span>
}

function Skills({ lang }: { lang: Lang }) {
  const t = TEXTS[lang]
  const skills20 = Array.from({ length: 20 }, () => 'Skill')

  return (
    <section className="skills section">
      <p className="section-title text-reveal-title">{t.skillsTitle}</p>
      <div className="skills-container">
        <div className="skills-group">
          <p className="skills-group-title text-reveal-body">{t.hardSkills}</p>
          <div className="skills-tags">
            {skills20.map((label, i) => (
              <Tag key={i} label={label} />
            ))}
          </div>
        </div>
        <div className="skills-group">
          <p className="skills-group-title text-reveal-body">{t.softSkills}</p>
          <div className="skills-tags">
            {skills20.map((label, i) => (
              <Tag key={i} label={label} />
            ))}
          </div>
        </div>
        <div className="skills-group">
          <p className="skills-group-title text-reveal-body">{t.languages}</p>
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
      <div className="project-cover">
        <Image src={mockupImg} alt="" className="project-cover-img img-reveal" />
      </div>
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

function ExperimentsCard({ lang }: { lang: Lang }) {
  const t = TEXTS[lang]
  return (
    <article className="experiments-card">
      <p className="experiments-title text-reveal-body">{t.experimentsTitle}</p>
      <p className="experiments-desc text-reveal-body">{t.experimentsDesc}</p>
      <div className="experiments-bg">
        <img
          src="https://www.figma.com/api/mcp/asset/1bbcd1e2-f113-49c7-b8e6-dc9d207ce02d"
          alt="background-mockups"
          className="experiments-bg-img"
        />
      </div>
      <div className="experiments-gradient" />
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
    <section id="contacts" className="contacts section">
      <p className="section-title text-reveal-title">{TEXTS[lang].contactsTitle}</p>
      <p className="contacts-title text-reveal-title">{TEXTS[lang].contactsCta}</p>
      <div className="contacts-buttons">
        <button className="btn btn-primary btn-primary-m tag-reveal">Button</button>
        <button className="btn btn-secondary tag-reveal">Button</button>
        <button className="btn btn-secondary tag-reveal">Button</button>
        <button className="btn btn-secondary tag-reveal">Button</button>
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
          <img
            src="https://www.figma.com/api/mcp/asset/4a3be44b-9468-4950-8c87-9264e527cec9"
            alt=""
            className="theme-btn-icon"
          />
        </button>
      </div>
      <p className="footer-text text-reveal-body">©2026. All rights reserved</p>
      <p className="footer-text text-reveal-body">
        <span className="footer-designed-label">{lang === 'ru' ? 'Задизайнил' : 'Designed by'}</span>
        <a href="#" className="footer-link">
          {lang === 'ru' ? 'Денис Князев' : 'Denis Knyazev'}
          <ArrowIcon className="external-link-icon" />
        </a>
      </p>
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

export default function HomePage() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [lang, setLang] = useState<Lang>('en')

  useLayoutEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  // после гидратации подхватываем тему и язык из браузера/локального хранилища
  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedTheme = localStorage.getItem(THEME_KEY) as Theme | null
    const nextTheme: Theme =
      storedTheme ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(nextTheme)

    const storedLang = localStorage.getItem(LANG_KEY) as Lang | null
    let nextLang: Lang = 'en'
    if (storedLang === 'ru' || storedLang === 'en') {
      nextLang = storedLang
    } else if (typeof navigator !== 'undefined') {
      nextLang = navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en'
    }
    setLang(nextLang)
  }, [])

  const langMounted = useRef(false)
  useEffect(() => {
    if (typeof window === 'undefined') return
    localStorage.setItem(LANG_KEY, lang)
    if (langMounted.current) {
      resetTextReveals()
      resetTagReveals()
    }
    langMounted.current = true
  }, [lang])

  const handleToggleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (typeof document === 'undefined' || typeof window === 'undefined') {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
        return
      }

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

      const transition = (document as any).startViewTransition(() => {
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

