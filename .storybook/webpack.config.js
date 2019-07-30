const path = require('path')
const loaderUtils = require('loader-utils')

module.exports = {
  module: {
    rules: []
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, '../src/components'),
      '@compositions': path.resolve(__dirname, '../src/compositions'),
      '@modules': path.resolve(__dirname, '../src/modules'),
      '@hoc': path.resolve(__dirname, '../src/hoc'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@static': path.resolve(__dirname, '../static')
    }
  }
}
