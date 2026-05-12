import type { Lang } from '@/shared/i18n'
import { locales } from '@/shared/i18n'

export function getStubUiStrings(lang: Lang) {
  return locales[lang].stub
}
