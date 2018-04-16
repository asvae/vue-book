var path = require('path')

const resolve = require('./blocks/resolve')
const performance = require('./blocks/performance')

module.exports = {
  mode: 'development',
  resolve,
  performance,
  entry: './demo/app.ts',
  output: {
    path: path.resolve(__dirname, '../public/app/js'),
    publicPath: '/',
    filename: 'app.js'
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
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ]
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
        exclude: /node_modules/,
        use: 'babel-loader',
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
        use: 'url-loader?limit=100000&name=[name].[ext]',
        exclude: path.resolve('./src/assets/svg'),
      },
    ]
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
      errors: true
    },
  },
  devtool: '#eval-source-map'
}
