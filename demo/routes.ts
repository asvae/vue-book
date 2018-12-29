import Vue from 'vue'
import Router from 'vue-router'

import { createComponent, createRoute } from '../src/app'
import SeveralInstances from './SeveralInstances.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    createRoute({
      requireContext: require.context('./tree', true, /.vue$/),
      path: '/demo',
      hideFileExtensions: true,
      // hideNavigation: true,
    }),
    {
      path: '/component-mode',
      component: createComponent({
        requireContext: require.context('./tree', true, /.vue$/),
        hideFileExtensions: true,
      }),
    },
    {
      path: '/several-instances',
      component: SeveralInstances,
    },
    createRoute({
      requireContext: require.context('./../src', true, /.demo.vue$/),
      path: '/src',
      hideFileExtensions: true,
    }),
  ],
})

export default router
