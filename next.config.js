const { i18n } = require('./next-i18next.config')
const withTM = require('next-transpile-modules')(['@monomi/rematch'])

module.exports = withTM({
  sassOptions: {
    includePaths: ['node_modules', 'src/styles'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  i18n,
})
