import { TreeFile } from './TreeFile'
import { TreeFileCollection } from './TreeFileCollection'

export class TreeFolder {
  name: string = ''
  isOpen: boolean = false
  folders: TreeFolder[] = []
  files: TreeFile[] = []
  parentFolder: TreeFolder | null = null

  constructor (data: Partial<TreeFolder> = {}) {
    Object.assign(this, data)
  }

  static createFromDemoFileCollection (treeFileCollection: TreeFileCollection): TreeFolder {
    const folderTemporary = new TreeFolder()

    // Add all files to temporary folder.
    const files = treeFileCollection.treeFiles
    files.forEach((node: any) => folderTemporary.addTreeFile(node))

    const rootFolder = folderTemporary.folders[0] || folderTemporary

    // Bind nodes to folders.
    rootFolder.fillParents()
    // Open topmost folder for convenience.
    rootFolder.open()

    return rootFolder
  }

  /**
   * TODO Figure out how is that different from 'addFile'
   */
  addFile (treeFile: TreeFile, relativePath: string): void {
    if (relativePath) {
      const folderNameArray = relativePath.split('/')
      const folderName = <string>folderNameArray.shift()
      this.findOrCreateFolder(folderName)
        .addFile(treeFile, folderNameArray.join('/'))
      return
    }

    this.files.push(treeFile)
  }

  toggle (): void {
    this.isOpen ? this.close() : this.open()
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

  findOrCreateFolder (name: string): TreeFolder {
    const foundFolder = this.folders.find(folder => folder.name === name)
    if (foundFolder) {
      return foundFolder
    }
    const folder = new TreeFolder({ name })
    this.folders.push(folder)
    return folder
  }

  /**
   * Create reverse relations in a tree.
   */
  fillParents () {
    this.files.forEach((treeFile: TreeFile) => {
      treeFile.folder = this
    })
    this.folders.forEach((treeFolder: TreeFolder) => {
      treeFolder.parentFolder = this
      treeFolder.fillParents()
    })
  }

  /**
   * TODO Figure out how is that different from 'addTreeFile'
   */
  addTreeFile (treeFile: TreeFile): void {
    const relativePath = treeFile.getParentFolderPath().split('/').slice(1)
      .join('/')
    this.addFile(treeFile, relativePath)
  }

  isEmpty (): boolean {
    return !(this.folders.length || this.files.length)
  }

  /**
   * Take only open folders from existing tree.
   * This acts as clone and doesn't have files.
   * Intended for saving in storage to keep open folders synced.
   */
  public getOpenFolders (): TreeFolder[] {
    return this.folders.filter(folder => folder.isOpen)
      .map((folder: TreeFolder) => {
        return new TreeFolder({
          name: folder.name,
          folders: folder.getOpenFolders(),
          isOpen: true,
        })
      })
  }

  /**
   * Open all folders from passed structure. Nesting counts.
   */
  mergeWithFolders (folders: TreeFolder[]) {
    folders.forEach((folder: TreeFolder) => {
      const selfFolder = this.folders.find((selfFolder: TreeFolder) => {
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
