import VueBookRouteFactory from './classes/Main/VueBookRouteFactory'
import './scss/app.scss'
import './font-awesome-config'
import { VueBookConfig } from './classes/Main/VueBookConfig'

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
