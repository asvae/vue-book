import DemoFile from './DemoFile'

import VueBookDemoPage from '../../components/DemoPage/VueBookDemoPage.vue'
import DemoFileCollection from './DemoFileCollection'
import { RouteConfig } from 'vue-router'
import { VueBookConfig } from './VueBookConfig'
import { DemoFolder } from './DemoFolder'

/**
 * Creates route for vue-router with all necessary boilerplate.
 */
export default class VueBookRouteFactory {
  static create (vueBookConfig: VueBookConfig): RouteConfig {
    const requireContext = vueBookConfig.requireContext
    const path = vueBookConfig.path

    const demoFileCollection = new DemoFileCollection({
      demoFiles: requireContext.keys().map((key: string) => {
        // requireContext(key).default - webpack 4
        // requireContext(key) - webpack 2
        const component = requireContext(key).default || requireContext(key)

        return new DemoFile({
          path: path + key.substr(1),
          component,
        })
      }),
    })

    return {
      path: path + '*',
      component: VueBookDemoPage,
      meta: {
        demoFolder: DemoFolder.createFromDemoFileCollection(demoFileCollection),
        demoFileCollection,
        hideFileExtensions: vueBookConfig.hideFileExtensions,
      },
    }
  }

}
