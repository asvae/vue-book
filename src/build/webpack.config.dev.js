const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const resolve = require('./blocks/resolve')
const performance = require('./blocks/performance')

const isDevelop = process.env.NODE_ENV === 'development'

const extractor = new ExtractTextPlugin({
  filename: 'css/[name].[chunkhash].css',
  disable: isDevelop,
})

module.exports = {
  mode: 'development',
  resolve,
  performance,
  entry: './demo/main.ts',
  output: {
    path: path.resolve(__dirname, '../public/app/js'),
    publicPath: '/',
    filename: 'main.js',
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          options: {
            esModule: true,
          },
        },
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        use: 'url-loader?limit=100000&name=[name].[ext]',
        exclude: path.resolve('./src/assets/svg'),
      },
    ],
  },
  devServer: {
    port: 4265,
    inline: true,
    historyApiFallback: {
      disableDotRule: true,
      index: '/dev/index.html',
    },
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  devtool: '#eval-source-map',
  plugins: [
    new VueLoaderPlugin(),
    extractor,
  ],
}
