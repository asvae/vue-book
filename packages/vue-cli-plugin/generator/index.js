module.exports = (api, opts) => {
  api.render('./template')

  const dependencies = {
    'vue-book': '*',
  }

  api.extendPackage({
    dependencies,
    scripts: {
      'serve:book': 'vue-cli-service serve --cwd /src/apps/book/book-main.js',
      'build:book': 'vue-cli-service build --cwd /src/apps/book/book-main.js',
    },
  })
}
