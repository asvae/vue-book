module.exports = (api, opts) => {
  api.render('./template')

  const dependencies = {
    'vue-book': '*',
  }

  api.extendPackage({
    dependencies,
    scripts: {
      'serve:book': 'vue-cli-service serve --modules-folder /src/apps/book/book-main.js',
      'build:book': 'vue-cli-service build --modules-folder /src/apps/book/book-main.js',
    },
  })
}
