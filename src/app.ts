import DemoPage from './classes/Main/DemoPage'
import './scss/app.scss'
// Vue font awesome config.
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowsAltV,
  faBars,
  faCaretDown,
  faCaretRight,
  faDotCircle,
  faExchangeAlt,
  faFile,
  faFolder,
  faSearch,
  faServer,
} from '@fortawesome/free-solid-svg-icons'

library.add(faServer, faFolder, faSearch, faBars, faExchangeAlt, faDotCircle, faCaretDown, faCaretRight, faFile, faArrowsAltV)

export default function (requireContext, path) {
  return DemoPage.create(requireContext, path)
}