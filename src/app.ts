import DemoPage from './classes/Main/DemoPage'
import './scss/app.scss'

// Vue font awesome config.
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faServer,
  faFolder,
  faSearch,
  faBars,
  faExchangeAlt,
  faDotCircle,
  faCaretDown,
  faCaretRight,
  faFile,
  faArrowsAltV,
} from '@fortawesome/free-solid-svg-icons'

library.add(faServer, faFolder, faSearch, faBars, faExchangeAlt, faDotCircle, faCaretDown, faCaretRight, faFile, faArrowsAltV)

export default function (requireContext, path) {
  return DemoPage.create(requireContext, path)
}