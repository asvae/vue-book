import { createApp, defineComponent } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createVueBookRoute } from './VbPageFactory'
import AnyComponent from './components/FileTree/ListFolder.demo.vue'

const getRequireContextVite = () => {
  const glob = import.meta.globEager('./components/**/*.demo.vue')
  const requireContext: any = function (key: string) {
      return glob[key]
    }
  ;(requireContext as any).keys = () => Object.keys(glob)
  return requireContext
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // {
    //   component: AnyComponent,
    //   path: '/demo'
    // },

    createVueBookRoute({
      requireContext: getRequireContextVite(),
      path: '/demo',
    }),
    // {
    //   path: '/:pathMatch(.*)*',
    //   redirect: '/demo',
    // },
  ], // short for `routes: routes`
})

const app = createApp(App)

app.use(router)

app.mount('#app')
