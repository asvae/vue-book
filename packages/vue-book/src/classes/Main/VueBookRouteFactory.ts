import { TreeFile } from './TreeFile'

import VbRoot from '../../components/DemoPage/VbRoot.vue'
import { TreeFileCollection } from './TreeFileCollection'
import { RouteConfig } from 'vue-router'
import { VueBookConfig } from './VueBookConfig'
import { TreeFolder } from './TreeFolder'
import { Component, CreateElement } from 'vue'

/**
 * Creates route for vue-router with all necessary boilerplate.
 */
export default class VueBookRouteFactory {
  static createRoute (vueBookConfig: VueBookConfig): RouteConfig {
    const requireContext = vueBookConfig.requireContext
    const path = vueBookConfig.path

    const treeFileCollection = new TreeFileCollection({
      treeFiles: requireContext.keys().map((key: string) => {

        // requireContext(key).default - webpack 4
        // requireContext(key) - webpack 2
        const component = requireContext(key).default || requireContext(key)

        return new TreeFile({
          path: path + key.substr(1),
          component,
        })
      }),
    })

    return {
      path: path + '*',
      component: VbRoot,
      meta: {
        treeFolder: TreeFolder.createFromDemoFileCollection(treeFileCollection),
        treeFileCollection,
        hideFileExtensions: vueBookConfig.hideFileExtensions,
        hideNavigation: vueBookConfig.hideNavigation,
      },
    }
  }

  static createComponent (vueBookConfig: VueBookConfig): Component {
    const requireContext = vueBookConfig.requireContext
    const path = vueBookConfig.path

    const treeFileCollection = new TreeFileCollection({
      treeFiles: requireContext.keys().map((key: string) => {
        // requireContext(key).default - webpack 4
        // requireContext(key) - webpack 2
        const component = requireContext(key).default || requireContext(key)

        return new TreeFile({
          path: path + key.substr(1),
          component,
        })
      }),
    })

    return {
      render: (createElement: CreateElement) => {
        return createElement(
          VbRoot,
          {
            props: {
              treeFolderDefault: TreeFolder.createFromDemoFileCollection(treeFileCollection),
              treeFileCollectionDefault: treeFileCollection,
              hideFileExtensionsDefault: vueBookConfig.hideFileExtensions,
              hideNavigationDefault: vueBookConfig.hideNavigation,
            },
          },
        )
      },
    }
  }
}
