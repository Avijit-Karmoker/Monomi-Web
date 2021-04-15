const { defaultLanguage, languages } = require('./src/config')

module.exports = {
  i18n: {
    defaultLocale: defaultLanguage.id,
    locales: languages.map(({ id }) => id),
  },
}
