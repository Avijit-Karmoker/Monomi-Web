import { Language, Gender } from '@/typings'

declare const baseHost: string
declare const baseUrl: string
declare const termsAndConditionsUrl: string
declare const languages: Language[]
declare const defaultLanguage: Language
declare const translationNamespaces: string[]
declare const pinValidationRegExp: RegExp
declare const genders: Gender[]
declare const fonts: { url: string }
declare const communityTypes: string[]

export {
  baseHost,
  baseUrl,
  termsAndConditionsUrl,
  languages,
  defaultLanguage,
  translationNamespaces,
  pinValidationRegExp,
  genders,
  fonts,
  communityTypes,
}
