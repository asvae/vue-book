import Vue from 'vue'
import Router from 'vue-router'

import vueComponentTree from '../src/app.js'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: [
    vueComponentTree.create(require.context('./components', true, /.vue$/), '/demo'),
  ]
})

export default router
