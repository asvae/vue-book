import VueBookRouteFactory from './classes/Main/VueBookRouteFactory'
import './scss/app.scss'
import './font-awesome-config'
import { VueBookConfig } from './classes/Main/VueBookConfig'
import VbDemo from './components/Exposed/VbDemo.vue'
import VbCard from './components/Exposed/VbCard.vue'

export const VueBookComponents = {
  install: (Vue: any) => {
    Vue.component('VbDemo', VbDemo)
    Vue.component('VbCard', VbCard)

    Vue.prototype.$vb = {
      log: (message?: any, ...optionalParams: any[]) => {
        // eslint-disable-next-line no-console
        console.log(message, ...optionalParams)
      },
      alert: (message?: any) => {
        alert(message)
      },
    }
  },
}

export const createRoute =
  (options: Partial<VueBookConfig>) =>
    VueBookRouteFactory.createRoute(new VueBookConfig(options))

export const createComponent =
  (options: Partial<VueBookConfig>) =>
    VueBookRouteFactory.createComponent(new VueBookConfig(options))

/** @deprecated use createRoute instead */
export default function (requireContext: any, path: string | RegExp) {
  return createRoute(new VueBookConfig({
    requireContext,
    path,
  }))
}
