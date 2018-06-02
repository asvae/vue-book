module.exports = {
  lintOnSave: false,
  configureWebpack: {
    entry: __dirname + '/demo/main.ts',
    devServer: {
      historyApiFallback: {
        disableDotRule: true,
        index: '/dev/index.html',
      },
    },
  },
}