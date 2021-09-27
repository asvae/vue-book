import storage from './storage'
import { TreeFolder } from '../classes/Main/TreeFolder'
import DemoFolderMapper from '../classes/Mapper/DemoFolderMapper'

const STORAGE_KEY = 'openFolders'

export class FoldersStore {
  public openFolders: TreeFolder[] = []

  load (): void {
    const data = <any[]>storage.fetch(STORAGE_KEY) || []
    const folders = data.map(DemoFolderMapper.map)

    this.openFolders = folders
  }

  save (): void {
    const data = this.openFolders.map(DemoFolderMapper.transform)
    storage.store(STORAGE_KEY, data)
  }
}
