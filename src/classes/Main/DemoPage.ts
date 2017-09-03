import DemoFile from './DemoFile'

import vmDemoPage from '../../components/DemoPage/DemoPage.vue'
import DemoFileCollection from './DemoFileCollection'
import {RouterOptions} from 'vue-router'

/**
 * Creates route for vue-router with all necessary boilerplate.
 */
export default class DemoPage {
  static create (requireContext, path) {
    const demoFilesCollection = new DemoFileCollection({
      demoFiles: requireContext.keys().map(key => {
        return new DemoFile({
          path: path + key.substr(1),
          component: requireContext(key).default,
        }).hydrateOptions()
      })
    }).hydrateGhostDemoFiles().attachRelations()

    return {
      path: path + '*',
      component: vmDemoPage,
      meta: { demoFilesCollection },
    } as RouterOptions
  }
}