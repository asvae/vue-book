// Karma configuration
var path = require('path')
var webpackConfig = require('./src/build/webpack.config.test')

module.exports = function (config) {
  config.set({
    // Paths
    basePath: '',
    exclude: [],
    files: [
      'test/**/*.test.ts',
    ],

    // Module processing
    preprocessors: {
      'test/**/*.ts': ['webpack', 'sourcemap'],
    },

    // Targets
    browsers: ['Chrome'],
    client: {
      captureConsole: true
    },
    mime: {
      'text/x-typescript': ['ts','tsx']
    },

    // Reporters
    reporters: ['dots'],
    logLevel: config.LOG_INFO,
    colors: true,

    // Test framework configuration
    frameworks: ['jasmine'],

    // Runner configuration
    port: 9876,
    autoWatch: true,
    singleRun: false,
    concurrency: Infinity,

    // Webpack config
    webpack: webpackConfig,
    webpackMiddleware: {
      stats: 'errors-only'
    },
  })
}
