import { VueBookConfig } from './classes/Main/VueBookConfig'
import { TreeFileCollection } from './classes/Main/TreeFileCollection'
import { TreeFile } from './classes/Main/TreeFile'
import VbPage from './components/DemoPage/VbPage.vue'
import { TreeFolder } from './classes/Main/TreeFolder'
import {
  defineComponent,
  h,
  resolveComponent,
} from 'vue'
import { RouteRecordRaw } from 'vue-router'

export const createVueBookComponent = (config: Partial<VueBookConfig>) => {
  const configFull = new VueBookConfig(config)
  const requireContext = configFull.requireContext
  const path = configFull.path

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

  const VbPageWrapper = defineComponent({
    render () {
      return h(
        VbPage,
        {
          treeFolder: TreeFolder.createFromDemoFileCollection(treeFileCollection),
          treeFileCollection: treeFileCollection,
          hideFileExtensions: configFull.hideFileExtensions,
          hideNavigation: configFull.hideNavigation,
        },
      )
    },
  })

  return VbPageWrapper
}

export const createVueBookRoute = (config: Partial<VueBookConfig>): RouteRecordRaw => {
  const configFull = new VueBookConfig(config)
  const result = {
    path: configFull.path + ':pathMatch(.*)*',
    component: createVueBookComponent(configFull),
  }
  return result
}
