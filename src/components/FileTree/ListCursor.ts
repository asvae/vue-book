import DemoFile from '../../classes/Main/DemoFile'

export class ListCursor {
  preSelectedItem: DemoFile | null = null

  constructor (data: Partial<ListCursor> = {}) {
    Object.assign(this, data)
  }

  clean (): void {
    this.preSelectedItem = null
  }
}