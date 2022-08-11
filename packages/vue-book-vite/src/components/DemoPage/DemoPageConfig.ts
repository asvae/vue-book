export enum DemoPageMode {
  Tree = 'Tree',
  Search = 'Search',
}

export default class DemoPageConfig {
  mode: DemoPageMode = DemoPageMode.Search
  isHidden: boolean | null = null
  isFlat: boolean = false
  searchText: string = ''
  width: number = 300

  constructor (data: Partial<DemoPageConfig> = {}) {
    Object.assign(this, data)
  }
}
