export default class DemoFile {
  path: String = ''
  component: Object = {}

  constructor (data) {
    Object.assign(this, data)
  }

  getFilename (): String {
    return this.path.split('/').pop()
  }

  getParentFolderPath (): String {
    return this.path.split('/').slice(0, -1).join('/')
  }

  toJson () {
    return this.path
  }
}