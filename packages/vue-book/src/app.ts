import VueBookRouteFactory from './classes/Main/VueBookRouteFactory'
import './scss/app.scss'
import './font-awesome-config'
import { VueBookConfig } from './classes/Main/VueBookConfig'
import VbDemo from './components/Exposed/VbDemo.vue'
import VbCard from './components/Exposed/VbCard.vue'

const loremString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export const VueBookComponents = {
  install: (Vue: any) => {
    // Register global components
    Vue.component('VbDemo', VbDemo)
    Vue.component('VbCard', VbCard)

    // Register global helpers
    Vue.prototype.$vb = {
      log: (message?: any, ...optionalParams: any[]): void => {
        // eslint-disable-next-line no-console
        console.log(message, ...optionalParams)
      },
      alert: (message?: any): void => {
        alert(message)
      },
      lorem: (length = loremString.length): string => {
        return [
          ...Array(Math.floor(length / loremString.length)).fill(loremString),
          loremString.slice(0, (length % loremString.length)),
        ].join(' ')
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
