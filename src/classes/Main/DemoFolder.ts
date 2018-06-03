import DemoFile from './DemoFile'
import DemoFolderMapper from '../Mapper/DemoFolderMapper'

export default class DemoFolder {
  name: string = ''
  isOpen: Boolean = false

  folders: Array<DemoFolder> = []
  files: Array<DemoFile> = []
  parentFolder: DemoFolder | null = null

  constructor (data?) {
    Object.assign(this, data)
  }

  addFile (node: DemoFile, relativePath: string): void {
    if (relativePath) {
      const folderNameArray = relativePath.split('/')
      const folderName = folderNameArray.shift()
      this.findOrCreateFolder(folderName)
        .addFile(node, folderNameArray.join('/'))
      return
    }

    this.files.push(node)
  }

  open (): void {
    this.isOpen = true
    if (this.parentFolder && !this.parentFolder.isOpen) {
      this.parentFolder.open()
    }
  }

  close (): void {
    this.isOpen = false
    this.folders.forEach(folder => folder.close())
  }

  toggle (): void {
    this.isOpen ? this.close() : this.open()
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

  /**
   * Folder fills parent slots in its children.
   */
  fillParents () {
    this.files.forEach((demoFile: DemoFile) => {
      demoFile.folder = this
    })
    this.folders.forEach((demoFolder: DemoFolder) => {
      demoFolder.parentFolder = this
      demoFolder.fillParents()
    })
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
    return DemoFolderMapper.transform(this)
  }

  /**
   * Basically get structure holding all information about open folders.
   */
  getOpenFolders (): DemoFolder[] {
    return this.folders.filter(folder => folder.isOpen)
      .map((folder: DemoFolder) => {
        return new DemoFolder({
          name: folder.name,
          folders: folder.getOpenFolders(),
          isOpen: true,
        })
      })
  }

  /**
   * Basically open all folders from passed structure.
   */
  mergeWithFolders (folders: DemoFolder[]) {
    folders.forEach((folder: DemoFolder) => {
      const selfFolder = this.folders.find((selfFolder: DemoFolder) => {
        return folder.name === selfFolder.name
      })
      if (!selfFolder) {
        return
      }
      selfFolder.isOpen = true
      selfFolder.mergeWithFolders(folder.folders)
    })
  }
}