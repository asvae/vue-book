import DemoPage from './classes/Main/DemoPage'
import './scss/app.scss'

// Vue font awesome config.
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faServer } from '@fortawesome/free-solid-svg-icons'
library.add(faCoffee, faServer)

export default function (requireContext, path)  {
  return DemoPage.create(requireContext, path)
}