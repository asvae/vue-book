import Vue from 'vue'
import Router from 'vue-router'

import DemoPage from '../dist/js/app.js'

Vue.use(Router)

const router = new Router({
  linkActiveClass: 'is-active',
  routes: [
    DemoPage.create(require.context('./components', true, /.vue$/), '/demo'),
  ]
})

export default router
