import { TreeFile } from './TreeFile'

export class TreeFileCollection {
  treeFiles: TreeFile[] = []

  constructor (data: Partial<TreeFileCollection> = {}) {
    Object.assign(this, data)
  }
}
