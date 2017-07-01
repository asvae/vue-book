import Vue from 'vue'
import Router from 'vue-router'

import vueComponentTree from '../src/app.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    vueComponentTree.create(require.context('./tree', true, /.vue$/), '/Demo'),
    vueComponentTree.create(require.context('./../src/tree', true, /.vue$/), '/SourceComponents'),
  ]
})

export default router
