const { defaultLanguage, languages } = require('./src/config')

module.exports = {
  i18n: {
    debug: true,
    defaultLocale: defaultLanguage.id,
    locales: languages.map(({ id }) => id),
    lowerCaseLng: true,
    localeDetection: false,
    ssr: false,
  },
}
