import DemoFile from './DemoFile'

import VueBookDemoPage from '../../components/DemoPage/VueBookDemoPage.vue'
import DemoFileCollection from './DemoFileCollection'
import { RouterOptions } from 'vue-router'

/**
 * Creates route for vue-router with all necessary boilerplate.
 */
export default class DemoPage {
  static create (requireContext: any, path: string | RegExp) {

    const demoFilesCollection = new DemoFileCollection({
      demoFiles: requireContext.keys().map((key: string) => {
        return new DemoFile({
          path: path + key.substr(1),
          component: requireContext(key).default,
        })
      }),
    })

    return {
      path: path + '*',
      component: VueBookDemoPage,
      meta: { demoFilesCollection },
    } as RouterOptions
  }
}