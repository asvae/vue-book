import Router from 'vue-router'
import Vue from 'vue'

const something = require('vue-book/dist/js/app.js')
import ContactComponent from './components/tree/ContactComponent'

console.log('something', something)
console.log('something.one', something.one)
console.log('something.four', something.four)
console.log('something.five', something.five)

Vue.use(Router)
Vue.use(VueBookComponents)

export default new Router({
  routes: [
    createRoute({
      requireContext: require.context('./components', true, /.vue$/),
      path: '/demo',
      hideFileExtensions: false, // optional, hides file extensions in list.
    }),
    {
      path: '/path',
      component: ContactComponent,
    },
  ],
})
