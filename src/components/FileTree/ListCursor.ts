import DemoFile from '../../classes/Main/DemoFile'

export class ListCursor {
  selectedItem: DemoFile | null = null

  constructor (data: Partial<ListCursor> = {}) {
    Object.assign(this, data)
  }
}