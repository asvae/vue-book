import { TreeFile } from './TreeFile'

import VueBookRoot from '../../components/DemoPage/VueBookRoot.vue'
import { TreeFileCollection } from './TreeFileCollection'
import { RouteConfig } from 'vue-router'
import { VueBookConfig } from './VueBookConfig'
import { TreeFolder } from './TreeFolder'
import { Component, ComponentOptions, CreateElement } from 'vue'

/**
 * Creates route for vue-router with all necessary boilerplate.
 */
export default class VueBookRouteFactory {
  static createRoute (vueBookConfig: VueBookConfig): RouteConfig {
    const requireContext = vueBookConfig.requireContext
    const path = vueBookConfig.path

    const treeFileCollection = new TreeFileCollection({
      treeFiles: requireContext.keys().map((key: string) => {
        return new TreeFile({
          path: path + key.substr(1),
          component: requireContext(key).default
        })
      })
    })

    return {
      path: path + '*',
      component: VueBookRoot,
      meta: {
        treeFolderDefault: TreeFolder.createFromDemoFileCollection(treeFileCollection),
        treeFileCollection,
        hideFileExtensions: vueBookConfig.hideFileExtensions
      }
    }
  }

  static createComponent (vueBookConfig: VueBookConfig): Component {
    const requireContext = vueBookConfig.requireContext
    const path = vueBookConfig.path

    const treeFileCollection = new TreeFileCollection({
      treeFiles: requireContext.keys().map((key: string) => {
        return new TreeFile({
          path: path + key.substr(1),
          component: requireContext(key).default
        })
      })
    })

    return {
      render: (createElement: CreateElement) => {
        return createElement(
          VueBookRoot,
          {
            props: {
              treeFolderDefault: TreeFolder.createFromDemoFileCollection(treeFileCollection),
              treeFileCollectionDefault: treeFileCollection,
              hideFileExtensionsDefault: vueBookConfig.hideFileExtensions
            }
          }
        )
      }
    }
  }
}
