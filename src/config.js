const baseHost = 'staging.monomi.lt'
const scheme = 'https'
const baseUrl = `${scheme}://client.api.${baseHost}/v1`
const termsAndConditionsUrl = `https://${baseHost}/dokumentai/vartotojo-sutartis`

const languages = [
  {
    id: 'lt-lt',
    title: 'Lietuvių',
    abbr: 'LT',
    code: 'LT',
    dialCodes: ['370'],
    default: true,
  },
  {
    id: 'en-us',
    title: 'English',
    abbr: 'EN',
    code: 'US',
    dialCodes: ['1'],
  },
]

const defaultLanguage = languages.find((language) => language.default)

const pinValidationRegExp =
  /(\d).*\1+.*\1+|(1234|2345|3456|4567|5678|6789|7890|8901|9012|0123|0987|9876|8765|7654|6543|5432|4321|3210|2109|1098)/

const genders = ['m', 'f', 'o']

const profits = ['nonProfit', 'profit']

const fonts = {
  url: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500;1,600',
}

const translationNamespaces = ['common', 'community', 'feed', 'home']

module.exports = {
  baseHost,
  baseUrl,
  termsAndConditionsUrl,
  languages,
  defaultLanguage,
  pinValidationRegExp,
  genders,
  fonts,
  translationNamespaces,
  profits
}
