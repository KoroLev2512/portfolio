export const common = {
  name: 'Korolev Yurii',
  position: 'Frontend developer',
  altPortraitNamed: 'Portrait of {name}',
  headerCta: 'Get in touch',
  footerDesigned: 'Designed by Denis Knyazev',
  contactsTitle: '[ Contacts ]',
  contactsCta: 'Get in touch with me',
  contactsSectionTitle: '[ Contacts ]',
} as const

export const home = {
  heroBio:
    "I'm a passionate frontend developer who cares about clean interfaces and clear products. I work with React, TypeScript and design systems, and I want to build interfaces people enjoy using every day.",
  skillsTitle: '[ Skills ]',
  hardSkills: 'Hard Skills',
  softSkills: 'Soft Skills',
  languages: 'Languages',
  toolsStack: 'Tools / Stack',
  skillGroupFallback: 'Skills',
  projectsTitle: '[ Projects ]',
  experimentsTitle: 'Experiments',
  experimentsDesc: 'Small projects, experiments and my other work',
  workTitle: '[ Work Experience ]',
  educationTitle: '[ Education ]',
  altProjectCoverNamed: 'Cover image for the project «{name}»',
  altProjectCoverSample: 'Sample project cover',
  altExperimentsMockupsBg: 'Decorative interface mockups behind the Experiments card',
  altExperimentsGradient: 'Decorative gradient behind the Experiments card',
} as const

export const project = {
  metaCompany: 'Company / Client',
  metaSphere: 'Sphere',
  metaTimeline: 'Project timeline',
  metaRole: 'My role',
  metaLinks: 'Links',
  sectionTitle: 'Section Title',
  blockTitle: 'Block Title',
  blockBody:
    "I'm a passionate designer with five years of experience creating user-centered designs that are both beautiful and functional.",
  imageCaption: 'Expanded view of interface mockups for this project',
  subtitle: 'Subtitle',
  prevProject: 'Previous',
  nextProject: 'Next',
  navBackToProjects: 'All projects',
  altPageHeroNamed: 'Hero illustration for the project «{name}»',
  closeImageModal: 'Close enlarged image',
} as const

/** Neutral copy when `NEXT_PUBLIC_SANITY_DISABLE` / `SANITY_DISABLE` is on (no CMS). */
export const stub = {
  personName: 'Your name',
  personRole: 'Your role',
  heroBio:
    'Placeholder bio: connect a Sanity dataset to replace this text. This line is only shown when CMS content is disabled for the Next.js app.',
  contactsCta: 'Contact',
  footerDesignerLabel: 'Designer',
  footerDesignerHref: 'https://example.com',
  heroContacts: [
    { label: 'email@example.com', href: 'mailto:email@example.com' },
    { label: 'example.com', href: 'https://example.com' },
  ],
} as const

export const experiments = {
  pageTitle: 'Experiments',
  pageSubtitle:
    'Small projects, researches and other work collected here',
  emptyGallery: 'No experiments yet — add documents of type «Experiment» in Sanity Studio.',
  imageAltFallback: 'Experiment preview',
} as const

export const notfound = {
  footerDesigned: 'Designed by Denis Knyazev',
  notfoundCode: '404',
  notfoundTitle: 'Page not found',
  notfoundDesc: 'It appears that this page does not exist or the link is outdated.',
  homeBtn: 'Home',
  projectsTitle: 'Take a look at my projects',
  experimentsTitle: 'Or take a look here',
  experimentsDesc: 'Small projects, experiments and my other work',
  contactsTitle: 'Get in touch with me',
  altPlaceholderProjectCover: 'Placeholder project cover',
} as const
