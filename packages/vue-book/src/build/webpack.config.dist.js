const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoader = require('vue-loader-v16')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
    },
  },
  performance: {
    hints: false,
  },
  optimization: {
    minimize: true,
  },
  entry: './src/app.ts',
  output: {
    path: path.resolve(__dirname, '../../dist/js'),
    publicPath: '/',
    filename: 'app.js',
    library: 'VueBook',
    libraryTarget: 'umd',
  },
  externals: {
    vue: 'vue',
    tslib: 'tslib',
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
        ],
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader-v16',
            options: {
              'vue-loader': require('vue-loader-v16/package.json').version,
              '@vue/compiler-sfc': require('@vue/compiler-sfc/package.json').version
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
      },
      // {
      //   test: /\.js$/,
      //   use: 'babel-loader',
      //   exclude: /node_modules/,
      // },
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
  plugins: [
    new VueLoader.VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  devtool: '#source-map',
}
