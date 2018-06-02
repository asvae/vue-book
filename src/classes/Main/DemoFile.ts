import DemoFolder from './DemoFolder'

export default class DemoFile {
  path: string = ''
  component: any | null = null // demo component
  folder: DemoFolder | null = null
  dependsOn: DemoFile[] = []
  dependedBy: DemoFile[] = []

  constructor (data: Partial<DemoFile>) {
    Object.assign(this, data)
  }

  openFolder (): void {
    this.folder && this.folder.open()
  }

  // returns `ComponentDemo.vue`
  getFilename (): string {
    return this.path.split('/').pop() || ''
  }

  getParentFolderPath (): string {
    return this.path.split('/').slice(0, -1).join('/')
  }
}