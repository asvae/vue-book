import DemoFile from './DemoFile'

export default class DemoFolder {
  folders: Array<DemoFolder> = []
  files: Array<DemoFile> = []
  name: String
  path: String

  constructor (data) {
    Object.assign(this, data)
  }

  addFile (node: DemoFile, relativePath: String): void {
    if (relativePath) {
      const folderNameArray = relativePath.split('/')
      const folderName = folderNameArray.shift()
      this.findOrCreateFolder(folderName)
        .addFile(node, folderNameArray.join('/'))
      return
    }

    this.files.push(node)
  }

  findOrCreateFolder (name): DemoFolder {
    const foundFolder = this.folders.find(folder => folder.name === name)
    if (foundFolder) {
      return foundFolder
    }
    const folder = new DemoFolder({name})
    this.folders.push(folder)
    return folder
  }

  addDemoFile (node: DemoFile): void {
    const relativePath = node.getParentFolderPath().split('/').slice(1)
      .join('/')
    this.addFile(node, relativePath)
  }

  isEmpty (): Boolean {
    return !(this.folders.length || this.files.length)
  }

  toJson (): Object {
    return {
      name: this.name,
      folders: this.folders.map(folder => folder.toJson()),
      files: this.files.map(file => file.toJson()),
    }
  }
}