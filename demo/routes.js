import Vue from 'vue'
import Router from 'vue-router'

// import VueComponentTree from '../src/app.ts'

Vue.use(Router)

const requireContext = require.context('./components')
const children = requireContext.keys().map(key => {
  return {
    path: key.substr(1),
    component: requireContext(key),
  }
})

import VmChild1 from './components/Child1.vue'

console.log(VmChild1)
console.log(children[0].component)

const router = new Router({
  routes: [
    // VueComponentTree(require.context('./tree', true, /.vue$/), '/Demo'),
    // VueComponentTree(require.context('./../src/tree', true, /.vue$/), '/SourceComponents'),
    {
      path: '/parent',
      component: {
        template: '<div>Joyful plays. <router-view></router-view></div>',
      },
      children,
    }
  ]
})

export default router
