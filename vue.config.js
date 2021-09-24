module.exports = {
  lintOnSave: false,
  transpileDependencies: [
    'vuestic-ui',
  ],
  configureWebpack: {
    entry: __dirname + '/demo/main.ts',
    devServer: {
      inline: true,
      historyApiFallback: {
        disableDotRule: true,
        index: '/demo/index.html',
      },
      overlay: {
        warnings: true,
        errors: true,
      },
    },
  },
}
