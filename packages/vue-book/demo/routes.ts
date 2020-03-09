import Vue from 'vue'
import Router from 'vue-router'

import { createComponent, createRoute, VueBookComponents } from '../src/app'
import SeveralInstances from './SeveralInstances.vue'

Vue.use(Router)
Vue.use(VueBookComponents)

const router = new Router({
  routes: [
    // An assortment of components.
    createRoute({
      requireContext: require.context('./tree', true, /.vue$/),
      path: '/demo',
      hideFileExtensions: true,
      // hideNavigation: true,TreeFileFactory
    }),
    // vue-book component mode testing
    {
      path: '/component-mode',
      component: createComponent({
        requireContext: require.context('./tree', true, /.vue$/),
        hideFileExtensions: true,
      }),
    },
    // Test several vue-book instances in one page.
    {
      path: '/several-instances',
      component: SeveralInstances,
    },
    // Internal components
    createRoute({
      requireContext: require.context('./../src', true, /.demo.vue$/),
      path: '/src',
      hideFileExtensions: true,
    }),
    // Test case where no demo files exist.
    createRoute({
      requireContext: require.context('./../src', true, /.test-empty.vue$/),
      path: '/empty',
      hideFileExtensions: true,
    }),
    {
      path: '/*',
      redirect: '/demo',
    },
  ],
})

export default router
