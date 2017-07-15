import DemoPage from './classes/Main/DemoPage.js'
import './scss/app.sass'

const demoPage = function (requireContext, path) {
  return DemoPage.create(requireContext, path)
}
demoPage.create = DemoPage.create

export default demoPage
