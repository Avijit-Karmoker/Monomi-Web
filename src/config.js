export const baseHost = 'monomi.lt'
export const baseUrl = `https://client.api.${baseHost}/v1`
export const termsAndConditionsUrl = `https://${baseHost}/dokumentai/vartotojo-sutartis`

export const languages = [
  {
    id: 'lt-lt',
    title: 'Lietuvių',
    abbr: 'LT',
    code: 'LT',
    dialCodes: ['370'],
  },
  {
    id: 'en-us',
    title: 'English',
    abbr: 'EN',
    code: 'US',
    dialCodes: ['1'],
    default: true,
  },
]

export const defaultLanguage = languages.find((language) => language.default)

export const translationNamespaces = ['pages', 'common']

export const pinValidationRegExp = /(\d).*\1+.*\1+|(1234|2345|3456|4567|5678|6789|7890|8901|9012|0123|0987|9876|8765|7654|6543|5432|4321|3210|2109|1098)/

export const genders = ['m', 'f', 'o']

export const fonts = {
  light: 'Poppins-Light',
  bold: 'Poppins-SemiBold',
}
