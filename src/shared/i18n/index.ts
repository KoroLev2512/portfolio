import * as ru from './locales/ru'
import * as en from './locales/en'
import { projectData, getProjectDescription } from './projectData'

export type Lang = 'ru' | 'en'

export const locales = { ru, en } as const

export type Namespace = 'home' | 'project' | 'notfound' | 'experiments'

/** Возвращает переводы для страницы: common + указанный namespace. */
export function getTranslations(lang: Lang, namespace: Namespace): Record<string, string> {
  const common = locales[lang].common
  const ns = locales[lang][namespace]
  return { ...common, ...ns } as Record<string, string>
}

/** Подставляет `{name}` в шаблоны alt-текста. */
export function fillNameInAlt(template: string, name: string): string {
  return template.replace(/\{name\}/g, name)
}

/** Данные проекта (контент) и описание по языку */
export { projectData, getProjectDescription }
