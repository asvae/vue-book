import { VueBookConfig } from './classes/Main/VueBookConfig'
import { Component, Vue } from 'vue-property-decorator'
import { TreeFileCollection } from './classes/Main/TreeFileCollection'
import { TreeFile } from './classes/Main/TreeFile'
import VbPage from './components/DemoPage/VbPage.vue'
import { TreeFolder } from './classes/Main/TreeFolder'
import { CreateElement } from 'vue'
import { RouteConfig } from 'vue-router'

export const createVueBookComponent = (config: Partial<VueBookConfig>) => {
  const configFull = new VueBookConfig(config)
  const requireContext = configFull.requireContext
  const path = configFull.path

  const treeFileCollection = new TreeFileCollection({
    treeFiles: requireContext.keys().map((key: string) => {
      console.log('key', key)
      // requireContext(key).default - webpack 4
      // requireContext(key) - webpack 2
      const component = requireContext(key).default || requireContext(key)

      return new TreeFile({
        path: path + key.substr(1),
        component,
      })
    }),
  })

  @Component({})
  class VbPageWrapper extends Vue {
    render (h: CreateElement) {
      return h(
        VbPage,
        {
          props: {
            treeFolder: TreeFolder.createFromDemoFileCollection(treeFileCollection),
            treeFileCollection: treeFileCollection,
            hideFileExtensions: configFull.hideFileExtensions,
            hideNavigation: configFull.hideNavigation,
          },
        },
      )
    }
  }

  return VbPageWrapper
}

export const createVueBookRoute  = (config: Partial<VueBookConfig>): RouteConfig => {
  const configFull = new VueBookConfig(config)
  return {
    path: configFull.path + '*',
    component: createVueBookComponent(configFull),
  }
}
