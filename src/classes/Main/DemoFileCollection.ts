import DemoFile from './DemoFile'

export default class DemoFileCollection {
  demoFiles: DemoFile[] = []

  constructor (data: Partial<DemoFileCollection> = {}) {
    Object.assign(this, data)
  }
}