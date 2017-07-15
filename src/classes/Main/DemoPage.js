import DemoNode from './DemoFile.js'

import vmDemoPage from './../../components/DemoPage.vue'

export default class DemoPage {
  static create (requireContext, path) {
    const files = requireContext.keys().map(key => {
      return new DemoNode({
        path: path + key.substr(1),
        component: requireContext(key),
      })
    })
    return {
      path: path + '*',
      component: vmDemoPage,
      meta: { files },
    }
  }
}