// Vue font awesome config.
import { library } from '@fortawesome/fontawesome-svg-core'
// NOTE Importing them all in one import doesn't trigger webpack tree-shaking.
// As a result - whole file is included, giving additional 600Kb to bundle size.
// See https://github.com/FortAwesome/react-fontawesome/issues/70
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons/faArrowsAltV'
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons/faCaretDown'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons/faCaretRight'
import { faDotCircle } from '@fortawesome/free-solid-svg-icons/faDotCircle'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons/faExchangeAlt'
import { faFile } from '@fortawesome/free-solid-svg-icons/faFile'
import { faFolder } from '@fortawesome/free-solid-svg-icons/faFolder'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faServer } from '@fortawesome/free-solid-svg-icons/faServer'
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync'

library.add(faServer, faFolder, faSearch, faBars, faExchangeAlt, faDotCircle, faCaretDown, faCaretRight, faFile, faArrowsAltV, faSync, faTimes)
