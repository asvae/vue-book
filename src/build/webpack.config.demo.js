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
      path: path.resolve(__dirname, '../../public'),
      filename: 'app.js',
    },
    stats: 'minimal',
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              { loader: 'css-loader' },
              { loader: 'sass-loader' },
            ],
            fallback: 'style-loader'
          })
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: 'css-loader',
            fallback: 'style-loader'
          })
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
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
