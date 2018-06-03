import DemoFile from './DemoFile'
import Vue, {ComponentOptions} from 'vue'

const optionsKey = '$componentTree'

export const componentTreeDemo = Symbol('Component tree demo')

export default class DemoFileOptions {
  component?: ComponentOptions<Vue>

  constructor (data?) {
    Object.assign(this, data)
  }

  static createFromDemoFile (demoFile: DemoFile): DemoFileOptions {
    const optionsData = demoFile.component[optionsKey] || {}

    const component = optionsData.component
    if (component){
      component[componentTreeDemo] = demoFile
    }

    return new this({
      component: optionsData.component,
    })
  }
}