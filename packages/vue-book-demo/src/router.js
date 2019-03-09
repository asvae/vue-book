import Vue from 'vue'
import Router from 'vue-router'
// import { createRoute } from 'vue-book'
import ContactComponent from './components/tree/ContactComponent'

Vue.use(Router)

const createRoute = require('vue-book')

export default new Router({
  routes: [
    createRoute.createRoute({
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
