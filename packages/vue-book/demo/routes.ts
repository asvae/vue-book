import Vue from 'vue'
import Router from 'vue-router'

import { createComponent, createRoute, VueBookComponents } from '../src/app'
import SeveralInstances from './SeveralInstances.vue'

Vue.use(Router)
Vue.use(VueBookComponents)

const router = new Router({
  routes: [
    createRoute({
      requireContext: require.context('./tree', true, /.vue$/),
      path: '/demo',
      hideFileExtensions: true,
      // hideNavigation: true,TreeFileFactory
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
    createRoute({
      requireContext: require.context('./../src', true, /.demos.vue$/),
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
