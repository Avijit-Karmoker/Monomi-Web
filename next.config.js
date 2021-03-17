const withTM = require('next-transpile-modules')(['@monomi/rematch'])

module.exports = withTM({
  sassOptions: {
    includePaths: ['node_modules', 'src/styles'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
})
