'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { Pattern } from '@/shared/ui/Pattern'
import { resetTextReveals } from '@/shared/lib/imageReveal'
import { resetTagReveals } from '@/shared/lib/tagReveal'
import { ArrowIcon } from '@/shared/ui/ArrowIcon'
import { SendIcon } from '@/shared/ui/SendIcon'
import { ThemeIcon } from '@/shared/ui/ThemeIcon'
import { ExperimentsCard } from '@/shared/ui/ExperimentsCard'
import avatarImg from '@/../public/avatar.png'
import mockupImg from '@/../public/mockup.png'

const THEME_KEY = 'portfolio-theme'
const LANG_KEY = 'portfolio-lang'

type Theme = 'dark' | 'light'
type Lang = 'ru' | 'en'

const TEXTS = {
  ru: {
    name: 'Королёв Юрий',
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
    name: 'Korolev Yurii',
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

  const handleContactsClick = () => {
    if (typeof document === 'undefined') return
    const el = document.getElementById('contacts')
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <header className="header">
      <Link href="/" className="header-left" style={{ textDecoration: 'none', color: 'inherit' }}>
        <Image src={avatarImg} alt="" className="header-photo" priority />
        <div>
          <span className="header-name">{t.name}</span>
          <span className="header-position"> {t.position}</span>
        </div>
      </Link>
      <div className="header-right">
        <button
          className="btn btn-primary btn-primary-s header-cta-text"
          type="button"
          onClick={handleContactsClick}
        >
          {t.headerCta}
        </button>
        <button
          className="btn btn-primary btn-primary-icon header-cta-icon"
          type="button"
          aria-label={t.headerCta}
          onClick={handleContactsClick}
        >
          <SendIcon className="header-cta-icon-img" />
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
          <ThemeIcon className="theme-btn-icon" />
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
      <div className="notfound-btn-wrap">
        <Link href="/" className="btn btn-primary btn-primary-m notfound-btn tag-reveal">
          {t.homeBtn}
        </Link>
      </div>
    </section>
  )
}

function ProjectCard({ name = 'Project Name' }: { name?: string }) {
  return (
    <Link href="/#projects" className="project-card project-card-link">
      <div className="project-cover">
        <Image src={mockupImg} alt="" className="project-cover-img img-reveal" />
      </div>
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

function Recommendation({ theme, lang }: { theme: Theme; lang: Lang }) {
  const t = TEXTS[lang]
  return (
    <section className="section">
      <div className="notfound-recommendation">
        <p className="section-title" style={{ marginBottom: 0, textTransform: 'none' }}>
          {t.projectsTitle}
        </p>
        <div className="projects-list">
          <ProjectCard />
          <ProjectCard />
          <ExperimentsCard
            theme={theme}
            experimentsTitle={t.experimentsTitle}
            experimentsDesc={t.experimentsDesc}
            href="/#projects"
          />
        </div>
      </div>
    </section>
  )
}

function Contacts({ lang }: { lang: Lang }) {
  const t = TEXTS[lang]
  return (
    <section id="contacts" className="contacts section">
      <p className="contacts-title text-reveal-title">{t.contactsTitle}</p>
      <div className="contacts-buttons">
        <Link href="/" className="btn btn-primary btn-primary-m tag-reveal">
          Button
        </Link>
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
          <ThemeIcon className="theme-btn-icon" />
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

export default function NotFound() {
  const [theme, setTheme] = useState<Theme>('dark')
  const [lang, setLang] = useState<Lang>('en')

  useLayoutEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem(THEME_KEY, theme)
  }, [theme])

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
      <Header theme={theme} lang={lang} onToggleTheme={handleToggleClick} onChangeLang={handleChangeLang} />
      <NotFoundError lang={lang} />
      <Pattern />
      <Recommendation theme={theme} lang={lang} />
      <Pattern />
      <Contacts lang={lang} />
      <Footer theme={theme} lang={lang} onToggleTheme={handleToggleClick} onChangeLang={handleChangeLang} />
    </main>
  )
}

