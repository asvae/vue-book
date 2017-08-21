import DemoFile from './DemoFile'
import Vue, {ComponentOptions} from 'vue'

const optionsKey = '$componentTree'

export const componentTreeDemo = Symbol('Component tree demo')

export default class DemoFileOptions {
  status: string
  component?: ComponentOptions<Vue>
  description: ''

  constructor (data?) {
    Object.assign(this, data)
  }

  static createFromDemoFile (demoFile: DemoFile) {
    const optionsData = demoFile.component[optionsKey] || {}
    const description = optionsData.description || ''

    const component = optionsData.component || demoFile.guessComponent()
    if (component){
      component[componentTreeDemo] = demoFile
    }

    return new this({
      status: optionsData.status || 'default',
      component: optionsData.component || demoFile.guessComponent(),
      // Remove line breaks from top and bottom.
      description: description.replace(/^\s*[\n\r]|[\r\n]\s*$/g, ''),
    })
  }
}