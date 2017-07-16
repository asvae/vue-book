var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function () {
  return {
    entry: './demo/app.js',
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
            loaders: {
              css: ExtractTextPlugin.extract({
                use: 'css-loader',
                fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
              }),
              // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
              // the "scss" and "sass" values for the lang attribute to the right configs here.
              // other preprocessors should work out of the box, no loader config like this nessessary.
              scss: 'vue-style-loader!css-loader!sass-loader',
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
            }
            // other vue-loader options go here
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
    performance: {
      hints: false
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
