import DemoPage from './classes/Main/DemoPage'
import './scss/app.sass'

export default function (requireContext, path) {
  return DemoPage.create(requireContext, path)
}