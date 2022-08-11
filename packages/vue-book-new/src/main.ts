import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import VbRoot from './VbRoot.vue'
import { createApp, defineComponent, h } from 'vue'
// import { TreeFolder } from 'vue-book-vite-project/src/classes/Main/TreeFolder'

const glob = import.meta.globEager('./components/**/demo/*.vue')

const VbPageWrapper = defineComponent({
  render () {
    return h(
      VbRoot,
      {
        glob
        // treeFolder: TreeFolder.createFromDemoFileCollection(treeFileCollection),
        // treeFileCollection: treeFileCollection,
        // hideFileExtensions: configFull.hideFileExtensions,
        // hideNavigation: configFull.hideNavigation,
      },
    )
  },
})

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: VbPageWrapper,
    }
  ],
})

const app = createApp(App)

app.use(router)

app.mount('#app')
