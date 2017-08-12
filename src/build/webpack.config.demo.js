var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const resolve = require('./blocks/resolve')
const performance = require('./blocks/performance')

module.exports = function () {
  return {
    resolve,
    performance,
    entry: './demo/app.ts',
    output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'app.js',
    },
    stats: 'minimal',
    module: {
      rules: [
        {
          test: /\.sass$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader!sass-loader'
          })
        },
        {
          test: /\.sсss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader!sass-loader'
          })
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            options: {
              esModule: true,
              extractCSS: true,
            },
          }
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
          use: 'url-loader?limit=100000&name=[name].[ext]',
          exclude: path.resolve('./src/assets/svg'),
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './demo/index.html'
      }),
      new ExtractTextPlugin('app.css'),
    ],
    devtool: '#source-map'
  }
}
