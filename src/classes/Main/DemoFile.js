import DemoFolder from './DemoFolder'

export default class DemoFile {
  path: String = ''
  component: Object = {}
  folder: DemoFolder = null

  constructor (data) {
    Object.assign(this, data)
  }

  openFolder () {
    this.folder.open()
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