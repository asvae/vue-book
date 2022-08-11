import { TreeFile } from '../../classes/Main/TreeFile'

export class ListCursor {
  preSelectedItem: TreeFile | null = null

  constructor (data: Partial<ListCursor> = {}) {
    Object.assign(this, data)
  }

  clean (): void {
    this.preSelectedItem = null
  }
}
