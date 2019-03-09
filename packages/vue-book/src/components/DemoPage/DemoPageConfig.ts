export enum DemoPageMode {
  Tree = 'Tree',
  Search = 'Search',
  Hidden = 'Hidden',
}

export default class DemoPageConfig {
  mode: DemoPageMode = DemoPageMode.Tree
  isFlat: boolean = false
  searchText: string = ''
  width: number = 300

  constructor (data: Partial<DemoPageConfig> = {}) {
    Object.assign(this, data)
  }
}