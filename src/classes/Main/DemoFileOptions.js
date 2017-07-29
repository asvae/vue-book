import DemoFile from './DemoFile'

const optionsKey = 'componentTree'

export default class DemoFileOptions {
  status: String
  component: ?Object

  constructor (data) {
    Object.assign(this, data)
  }

  static createFromDemoFile (demoFile: DemoFile): this {
    const component = demoFile.component
    const optionsData = component[optionsKey] || {}

    return new this({
      status: optionsData.status || component.status || 'default',
      component: optionsData.component || demoFile.guessComponent(),
    })
  }
}