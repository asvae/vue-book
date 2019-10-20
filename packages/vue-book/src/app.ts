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

export function createRoute (options: Partial<VueBookConfig>) {
  return VueBookRouteFactory.createRoute(new VueBookConfig(options))
}

export function createComponent (options: Partial<VueBookConfig>) {
  return VueBookRouteFactory.createComponent(new VueBookConfig(options))
}
