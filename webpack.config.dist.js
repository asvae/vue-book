var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function () {
  return {
    entry: ['./src/app.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/app.js',
    },
    stats: {
      colors: true,
      modules: true,
      reasons: true,
      errorDetails: true
    },
    module: {
      rules: [
        {
          test: /\.sass$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader!sass-loader'
          })
        },
        {
          test: /\.sсss$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader!sass-loader!font-awesome/scss/font-awesome.scss'
          })
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: 'style-loader',
            loader: 'css-loader'
          })
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              css: ExtractTextPlugin.extract({
                loader: 'css-loader',
                fallbackLoader: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
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
          loader: 'babel-loader',
          exclude: /node_modules/
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
    plugins: [
      new ExtractTextPlugin('css/app.css'),
    ],
    devtool: '#source-map'
  }
}
