var path = require('path')
var webpack = require('webpack')

module.exports = function () {
  return {
    entry: ['./src/app.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/app.js',
      library: 'VueComponentTree',
      libraryTarget: 'umd'
    },
    stats: 'minimal',
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
      ]
    },
    performance: {
      hints: false
    },
    devtool: '#source-map'
  }
}
