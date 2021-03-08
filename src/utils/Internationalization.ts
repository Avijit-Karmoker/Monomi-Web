import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { Settings } from 'luxon'
import LanguageDetector from 'i18next-browser-languagedetector'

import commonEN from '@/translations/en-us/common.json'
import pagesEN from '@/translations/en-us/pages.json'
import commonLT from '@/translations/lt-lt/common.json'
import pagesLT from '@/translations/lt-lt/pages.json'
import { defaultLanguage, translationNamespaces } from '@/config'

export const initialize = i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    resources: {
      'en-us': { common: commonEN, pages: pagesEN },
      'lt-lt': { common: commonLT, pages: pagesLT },
    },
    lowerCaseLng: true,
    ns: translationNamespaces,
    fallbackLng: defaultLanguage.id,
    returnEmptyString: false,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n

export const getLanguage = () => i18n.language

export const setLanguage = (language: string) => {
  return new Promise((resolve, reject) => {
    i18n.changeLanguage(language, (error, t) => {
      if (error) {
        reject(error)
      } else {
        Settings.defaultLocale = language

        resolve(t)
      }
    })
  })
}

export const getFixedT = () => i18n.getFixedT(getLanguage())
