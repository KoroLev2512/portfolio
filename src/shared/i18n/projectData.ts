import type { Lang } from './index'

export const projectData = {
  title: 'Project Name',
  company: 'Amazing Company',
  sphere: 'B2B, FinTech',
  timeline: 'Oct 2025 — Dec 2025',
  role: 'UX/UI Designer',
  description: {
    ru: 'В описании проекта нужно указать задачу, которая перед вами стояла. Опишите, что вам нужно было сделать и в каком виде задачу передали. Например, было четкое ТЗ или нужно было проводить исследование самостоятельно.',
    en: 'In the project description, state the task you faced. Describe what you needed to do and in what form the task was handed over. For example, whether there was a clear brief or you had to conduct research yourself.',
  },
  links: [
    { label: 'Figma', href: '#' },
    { label: 'Example-site.com', href: '#' },
    { label: 'GitHub', href: '#' },
  ],
} as const

export function getProjectDescription(lang: Lang): string {
  return projectData.description[lang]
}
