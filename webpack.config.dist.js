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
          test: /\.sсss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.sass$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader?indentedSyntax']
        },
        {
          test: /\.css$/,
          loader: ['style-loader', 'css-loader']
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.svg$/,
          loader: 'vue-svg-loader',
          include: path.resolve('./src/assets/svg'),
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        },
        {
          test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
          loader: 'url-loader?limit=100000&name=[name].[ext]',
          exclude: path.resolve('./src/assets/svg'),
        }
      ]
    },
    performance: {
      hints: false
    },
    devtool: '#source-map'
  }
}
