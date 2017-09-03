export enum DemoPageMode {
  Default = 'Default',
  Search = 'Search',
  Info = 'Info',
  Hidden = 'Hidden',
}

export default class DemoPageConfig {
  mode: DemoPageMode
  isFlat: boolean
  isShowingInfo: boolean
  searchText: string
  width: number

  constructor (mode?, isFlat?, isShowingInfo?, searchText?, width?) {
    this.mode = mode || DemoPageMode.Default
    this.isFlat = isFlat || false
    this.isShowingInfo = isShowingInfo || true
    this.searchText = searchText || ''
    this.width = width || 300
  }
}