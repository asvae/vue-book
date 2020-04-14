import VueBookRouteFactory from './classes/Main/VueBookRouteFactory'
import './scss/app.scss'
import './font-awesome-config'
import { VueBookConfig } from './classes/Main/VueBookConfig'
import VbDemo from './components/Exposed/VbDemo.vue'
import VbCard from './components/Exposed/VbCard.vue'
import VaCheckbox
  from 'vuestic-ui/src/components/vuestic-components/va-checkbox/VaCheckbox.vue'

import iconsFrameworkConfig
  from 'vuestic-ui/src/components/context-test/context-provide/context/va-icons-framework-config'
import { ContextPlugin } from 'vuestic-ui/src/components/context-test/context-provide/ContextPlugin'

const loremString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

export const VueBookComponents = {
  install: (Vue: any) => {
    Vue.component('VbDemo', VbDemo)
    Vue.component('VbCard', VbCard)

    // vuestic-ui components
    Vue.use(ContextPlugin, {
      VaIcon: {
        iconsConfig: {
          defaultFont: 'md',
          icons: iconsFrameworkConfig,
        },
        sizesConfig: {
          defaultSize: 24,
          sizes: {
            small: 16,
            medium: 24,
            large: 32,
          },
        },
      },
    })

    Vue.component('VbCheckbox', VaCheckbox)

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
