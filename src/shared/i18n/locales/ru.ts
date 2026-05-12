export const common = {
  name: 'Королёв Юрий',
  position: 'Фронтенд‑разработчик',
  altPortraitNamed: 'Портрет: {name}',
  headerCta: 'Связаться',
  footerDesigned: 'Задизайнил Денис Князев',
  contactsTitle: '[ Контакты ]',
  contactsCta: 'Свяжитесь со мной',
  contactsSectionTitle: '[ Контакты ]',
} as const

export const home = {
  heroBio:
    'Я фронтенд‑разработчик, который любит аккуратные интерфейсы и понятные продукты. Работал с React, TypeScript и дизайн‑системами. Хочу делать интерфейсы, которыми приятно пользоваться каждый день.',
  skillsTitle: '[ Навыки ]',
  hardSkills: 'Технические навыки',
  softSkills: 'Гибкие навыки',
  languages: 'Языки',
  toolsStack: 'Инструменты / стек',
  skillGroupFallback: 'Навыки',
  projectsTitle: '[ Проекты ]',
  experimentsTitle: 'Experiments',
  experimentsDesc:
    'Небольшие проекты, эксперименты и другие мои работы',
  workTitle: '[ Опыт работы ]',
  educationTitle: '[ Образование ]',
  altProjectCoverNamed: 'Обложка проекта «{name}»',
  altProjectCoverSample: 'Пример обложки проекта',
  altExperimentsMockupsBg: 'Декоративные макеты интерфейса на карточке Experiments',
  altExperimentsGradient: 'Декоративный градиент на карточке Experiments',
} as const

export const project = {
  metaCompany: 'Компания / Клиент',
  metaSphere: 'Сфера',
  metaTimeline: 'Сроки проекта',
  metaRole: 'Моя роль',
  metaLinks: 'Ссылки',
  sectionTitle: 'Section Title',
  blockTitle: 'Block Title',
  blockBody:
    "I'm a passionate designer with five years of experience creating user-centered designs that are both beautiful and functional.",
  imageCaption: 'Крупный вид макетов интерфейса по этому проекту',
  subtitle: 'Subtitle',
  prevProject: 'Предыдущий проект',
  nextProject: 'Следующий проект',
  navBackToProjects: 'Все проекты',
  altPageHeroNamed: 'Иллюстрация в шапке страницы проекта «{name}»',
  closeImageModal: 'Закрыть увеличенное изображение',
} as const

/** Нейтральный текст при `NEXT_PUBLIC_SANITY_DISABLE` / `SANITY_DISABLE` (без CMS). */
export const stub = {
  personName: 'Ваше имя',
  personRole: 'Ваша роль',
  heroBio:
    'Заглушка: подключите датасет Sanity, чтобы заменить этот текст. Он показывается только когда контент CMS отключён для приложения Next.js.',
  contactsCta: 'Связаться',
  footerDesignerLabel: 'Дизайнер',
  footerDesignerHref: 'https://example.com',
  heroContacts: [
    { label: 'email@example.com', href: 'mailto:email@example.com' },
    { label: 'example.com', href: 'https://example.com' },
  ],
} as const

export const experiments = {
  pageTitle: 'Эксперименты',
  pageSubtitle:
    'Тут собраны небольшие проекты, исследования и другие мои работы',
  emptyGallery:
    'Пока нет экспериментов — добавьте документы типа «Experiment» в Sanity Studio.',
  imageAltFallback: 'Превью эксперимента',
} as const

export const notfound = {
  footerDesigned: 'Дизайн — Denis Knyazev',
  notfoundCode: '404',
  notfoundTitle: 'Страница не найдена',
  notfoundDesc: 'Похоже, эта страница не существует или ссылка устарела.',
  homeBtn: 'На главную',
  projectsTitle: 'Посмотрите мои проекты',
  experimentsTitle: 'Или загляните сюда',
  experimentsDesc:
    'Небольшие проекты, эксперименты и другие мои работы',
  contactsTitle: 'Свяжитесь со мной',
  altPlaceholderProjectCover: 'Заглушка обложки проекта',
} as const
