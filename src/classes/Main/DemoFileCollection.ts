import DemoFile from './DemoFile'

export default class DemoFileCollection {
  demoFiles: DemoFile[] = []

  constructor (data) {
    Object.assign(this, data)
  }
}