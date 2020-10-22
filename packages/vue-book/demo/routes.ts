import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import { createComponent, createRoute, VueBookComponents } from '../src/app'
import SeveralInstances from './SeveralInstances.vue'

const routes = [
  createRoute({
    requireContext: require.context('./tree', true, /.vue$/),
    path: '/demo',
    hideFileExtensions: true,
    // hideNavigation: true,TreeFileFactory
  }),
  // vue-book component mode testing
  {
    path: '/component-mode/:pathMatch(.*)*',
    component: createComponent({
      path: '/component-mode',
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
    path: '/:pathMatch(.*)*',
    redirect: '/demo',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
