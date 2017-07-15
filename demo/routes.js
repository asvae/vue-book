import Vue from 'vue'
import Router from 'vue-router'

import VueComponentTree from '../src/app.js'

Vue.use(Router)

const router = new Router({
  // mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    VueComponentTree(require.context('./tree', true, /.vue$/), '/Demo'),
    VueComponentTree(require.context('./../src/tree', true, /.vue$/), '/SourceComponents'),
  ]
})

export default router
