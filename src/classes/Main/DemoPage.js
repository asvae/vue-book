import DemoFile from './DemoFile.js'

import vmDemoPage from './../../components/DemoPage.vue'
import DemoFileCollection from './DemoFileCollection'

/**
 * Creates route for vue-router with all necessary boilerplate.
 */
export default class DemoPage {
  static create (requireContext, path) {

    const demoFilesCollection = new DemoFileCollection({
      demoFiles: requireContext.keys().map(key => {
        return new DemoFile({
          path: path + key.substr(1),
          component: requireContext(key),
        }).hydrateOptions()
      })
    }).attachRelations()
    return {
      path: path + '*',
      component: vmDemoPage,
      meta: { demoFilesCollection },
    }
  }
}