import { useState, useLayoutEffect, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { flushSync } from 'react-dom'
import { resetTextReveals } from '../../shared/lib/imageReveal'
import '../../App.css'
import '../../theme-transition.css'

const THEME_KEY = 'portfolio-theme'
const LANG_KEY = 'portfolio-lang'

type Theme = 'dark' | 'light'
type Lang = 'ru' | 'en'

const IMG_AVATAR = '/avatar.png'
const IMG_ARROW = 'https://www.figma.com/api/mcp/asset/85595e10-ea13-44c1-b82d-e5d0aa1b1b88'
const IMG_THEME = 'https://www.figma.com/api/mcp/asset/4a3be44b-9468-4950-8c87-9264e527cec9'
const IMG_COVER = 'https://www.figma.com/api/mcp/asset/f56d3c3e-5aba-4974-9937-5871ced3bcab'
const IMG_SEND = 'https://www.figma.com/api/mcp/asset/eac692e1-edac-4c82-86b6-6a8def63e79c'

const TEXTS = {
  ru: {
    position: 'Фронтенд‑разработчик',
    headerCta: 'Связаться',
    footerDesigned: 'Дизайн — Denis Knyazev',
    notfoundCode: '404',
    notfoundTitle: 'Страница не найдена',
    notfoundDesc: 'Похоже, эта страница не существует или ссылка устарела.',
    homeBtn: 'На главную',
    projectsTitle: 'Посмотрите мои проекты',
    experimentsTitle: 'Или загляните сюда',
    experimentsDesc: 'Здесь вы найдёте скриншоты, концепты и небольшие интерфейсные эксперименты',
    contactsTitle: 'Свяжитесь со мной',
  },
  en: {
    position: 'Frontend developer',
    headerCta: 'Get in touch',
    footerDesigned: 'Designed by Denis Knyazev',
    notfoundCode: '404',
    notfoundTitle: 'Page not found',
    notfoundDesc: 'It appears that this page does not exist or the link is outdated.',
    homeBtn: 'Home',
    projectsTitle: 'Take a look at my projects',
    experimentsTitle: 'Or take a look here',
    experimentsDesc: 'Here you will find screenshots, concepts, and small interface experiments',
    contactsTitle: 'Get in touch with me',
  },
} as const

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
      <Link to="/" className="header-left" style={{ textDecoration: 'none', color: 'inherit' }}>
        <img src={IMG_AVATAR} alt="" className="header-photo" />
        <div>
          <span className="header-name">Korolev Yurii</span>
          <span className="header-position"> {t.position}</span>
        </div>
      </Link>
      <div className="header-right">
        <Link to="/" className="btn btn-primary btn-primary-s header-cta-text" style={{ textDecoration: 'none' }}>
          {t.headerCta}
        </Link>
        <Link to="/" className="btn btn-primary btn-primary-icon header-cta-icon" style={{ textDecoration: 'none' }} aria-label={t.headerCta}>
          <img src={IMG_SEND} alt="" className="header-cta-icon-img" />
        </Link>
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

function NotFoundError({ lang }: { lang: Lang }) {
  const t = TEXTS[lang]
  return (
    <section className="section notfound-error">
      <div className="notfound-message">
        <p className="notfound-code text-reveal-title">{t.notfoundCode}</p>
        <p className="notfound-title text-reveal-title">{t.notfoundTitle}</p>
      </div>
      <p className="notfound-desc text-reveal-body">{t.notfoundDesc}</p>
      <Link to="/" className="btn btn-primary btn-primary-m notfound-btn text-reveal-body">
        {t.homeBtn}
      </Link>
    </section>
  )
}

function Pattern() {
  return <div className="pattern" aria-hidden />
}

function ProjectCard({ name = 'Project Name' }: { name?: string }) {
  return (
    <Link to="/#projects" className="project-card project-card-link">
      <img src={IMG_COVER} alt="" className="project-cover img-reveal" />
      <div className="project-details">
        <div>
          <h3 className="project-name">{name}</h3>
          <div className="project-tags">
            {['Tag', 'Tag', 'Tag', 'Tag', 'Tag'].map((skill, i) => (
              <span key={i} className="project-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <p className="project-description">
          A description of the project in several lines, reflecting the general idea.
        </p>
      </div>
    </Link>
  )
}

function Recommendation({ lang }: { lang: Lang }) {
  const t = TEXTS[lang]
  return (
    <section className="section">
      <div className="notfound-recommendation">
        <p className="section-title" style={{ marginBottom: 24, textTransform: 'none' }}>
          {t.projectsTitle}
        </p>
        <div className="projects-list">
          <ProjectCard />
          <ProjectCard />
        </div>
        <div className="notfound-experiments-block">
          <p className="section-title" style={{ marginBottom: 24, textTransform: 'none' }}>
            {t.experimentsTitle}
          </p>
          <Link to="/#projects" className="notfound-experiments-card">
            <p className="notfound-experiments-title">Experiments</p>
            <p className="notfound-experiments-desc">{t.experimentsDesc}</p>
          </Link>
        </div>
      </div>
    </section>
  )
}

function Contacts({ lang }: { lang: Lang }) {
  const t = TEXTS[lang]
  return (
    <section className="contacts section">
      <p className="contacts-title text-reveal-title">{t.contactsTitle}</p>
      <div className="contacts-buttons text-reveal-body">
        <Link to="/" className="btn btn-primary btn-primary-m">
          Button
        </Link>
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

export function NotFoundPage() {
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
      <Header theme={theme} lang={lang} onToggleTheme={handleToggleClick} onChangeLang={handleChangeLang} />
      <NotFoundError lang={lang} />
      <Pattern />
      <Recommendation lang={lang} />
      <Pattern />
      <Contacts lang={lang} />
      <Footer theme={theme} lang={lang} onToggleTheme={handleToggleClick} onChangeLang={handleChangeLang} />
    </main>
  )
}

export default NotFoundPage
