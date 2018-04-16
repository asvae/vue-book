export enum DemoPageMode {
  Default = 'Default',
  Search = 'Search',
  Hidden = 'Hidden',
}

export default class DemoPageConfig {
  mode: DemoPageMode
  isFlat: boolean
  searchText: string
  width: number
  infoBlockHeight: 200

  constructor (mode?, isFlat?, searchText?, width?, infoBlockHeight?) {
    this.mode = mode || DemoPageMode.Default
    this.isFlat = isFlat || false
    this.searchText = searchText || ''
    this.width = width || 300
    this.infoBlockHeight = infoBlockHeight || 250
  }
}