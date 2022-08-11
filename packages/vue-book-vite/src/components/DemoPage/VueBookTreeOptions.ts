import { TreeFile } from '../../classes/Main/TreeFile'

export const VueBookTreeOptionsInterface = 'VueBookTreeOptionsInterface'

export class VueBookTreeOptions {
  noRouter: boolean = false
  selectedTreeFile: TreeFile | null = null
  hideFileExtensions: boolean = false

  constructor (data: Partial<VueBookTreeOptions> = {}) {
    Object.assign(this, data)
  }
}
