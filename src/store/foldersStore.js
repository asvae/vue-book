import storage from './storage'
import DemoFolder from "../classes/Main/DemoFolder";
import DemoFolderMapper from '../classes/Mapper/DemoFolderMapper'

const STORAGE_KEY = 'openFolders'

export default {
  _openFolders: [],

  get openFolders (): DemoFolder[] {
    const data = storage.fetch(STORAGE_KEY) || []
    const folders = data.map(DemoFolderMapper.map)

    this._openFolders = folders
    return this._openFolders
  },
  set openFolders (folders: DemoFolder[]) {
    this._openFolders = folders
    
    const data = folders.map(DemoFolderMapper.transform)
    storage.store(STORAGE_KEY, data)
  },
}