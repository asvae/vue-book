import Vue from 'vue'
import Router from 'vue-router'

import { createRoute } from '../src/app.ts'

Vue.use(Router)

const router = new Router({
  routes: [
    createRoute({
      requireContext: require.context('./tree', true, /.vue$/),
      path: '/demo',
    }),
    createRoute({
      requireContext: require.context('./../src', true, /.demo.vue$/),
      path: '/src',
    }),
  ],
})

export default router
