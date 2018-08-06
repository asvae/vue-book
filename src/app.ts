import VueBookRouteFactory from './classes/Main/VueBookRouteFactory'
import './scss/app.scss'
import './font-awesome-config'
import { VueBookConfig } from './classes/Main/VueBookConfig'

export function createRoute (options: Partial<VueBookConfig>) {
  const config = new VueBookConfig(options)

  return VueBookRouteFactory.create(config)
}

/** @deprecated use createRoute instead */
export default function (requireContext: any, path: string | RegExp) {
  return createRoute(new VueBookConfig({
    requireContext,
    path,
    hideFileExtensions: false,
  }))
}
