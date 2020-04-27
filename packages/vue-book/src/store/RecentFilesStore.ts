import { TreeFile } from '../classes/Main/TreeFile'

const STORAGE_KEY = 'recentFiles'


export class RecentFilesStore {
  public files: any[] = []

  formList (recentFile: TreeFile) {
    const storedRecentFile: any = {
      name: recentFile.getFilename(),
      path: recentFile.path,
    }
    const recentFileExist: boolean = this.files.some((file: { name: string, path: string }) => {
      const filesHaveSameName: boolean = file.name === recentFile.getFilename()
      const filesHaveSamePath: boolean = file.path === recentFile.path
      return filesHaveSameName && filesHaveSamePath
    })
    const recentFilesIsFull: boolean = this.files.length >= 50
    if (!recentFileExist) {
      switch (recentFilesIsFull) {
        case true:
          this.files[0] = storedRecentFile
          break
        case false:
          this.files.unshift(storedRecentFile)
          break
      }
    } else {
      this.files = this.files.filter((file: TreeFile) => {
        return file.path !== recentFile.path
      })
      this.files.unshift(storedRecentFile)
    }
    this.save()
  }

  fetch (): string | null {
    return localStorage.getItem(STORAGE_KEY)
  }

  load (): void {
    const data = this.fetch()
    this.files = data ? JSON.parse(data) : []
  }

  save (): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.files))
  }
}
