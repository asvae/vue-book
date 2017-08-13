import DemoFile from './DemoFile'
import Vue, {ComponentOptions} from 'vue'

const optionsKey = 'componentTree'

export default class DemoFileOptions {
  status: string
  component?: ComponentOptions<Vue>

  constructor (data?) {
    Object.assign(this, data)
  }

  static createFromDemoFile (demoFile: DemoFile) {
    const component = demoFile.component
    const optionsData = component[optionsKey] || {}

    return new this({
      status: optionsData.status || 'default',
      component: optionsData.component || demoFile.guessComponent(),
    })
  }
}