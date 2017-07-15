import storage from './storage'

const STORAGE_KEY = 'openFolders'

export default {
  _openFolders: [],

  get openFolders (): String[] {
    this._openFolders = storage.fetch(STORAGE_KEY) || []
    return this._openFolders
  },
  set openFolders (folders: String[]) {
    return this._openFolders = folders
    return storage.store(STORAGE_KEY, folders)
  },
  push (folder: String): void {
    this.openFolders = [...this.openFolders, folder]
  },
  remove (folder: String): void {
    this.openFolders = this.openFolders.filter((folderCompared: String) => folder !== folderCompared)
  },
}