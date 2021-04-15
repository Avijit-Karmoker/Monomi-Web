import { languages } from '@/config'
import { Language } from '@/typings'
import { useMemo } from 'react'

export default function useLanguage(locale: Language['id']) {
  return useMemo(() => languages.find(({ id }) => id === locale), [locale])
}
