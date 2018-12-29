import { TreeFolder } from './TreeFolder'

export class TreeFile {
  path: string = ''
  component: any | null = null // demo component
  folder: TreeFolder | null = null

  constructor (data: Partial<TreeFile> = {}) {
    Object.assign(this, data)
  }

  openFolder (): void {
    this.folder && this.folder.open()
  }

  // returns `ComponentDemo.vue`
  getFilename (): string {
    return this.path.split('/').pop() || ''
  }

  getFilenameWithoutExtension(): string {
    return this.getFilename().split('.')[0]
  }

  getParentFolderPath (): string {
    return this.path.split('/').slice(0, -1).join('/')
  }
}
