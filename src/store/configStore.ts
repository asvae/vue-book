import storage from './storage'
import DemoPageConfig, { DemoPageMode } from '../components/DemoPage/DemoPageConfig'

const STORAGE_KEY = 'config'

export default {
  _config: null,

  get config (): DemoPageConfig {
    if (!this._config) {
      const data = storage.fetch(STORAGE_KEY) || new DemoPageConfig()
      this._config = new DemoPageConfig(
        data.mode,
        data.isFlat,
        data.searchText,
        data.width,
      )
    }
    return this._config
  },
  setConfig (config: DemoPageConfig) {
    this._config = config
    storage.store(STORAGE_KEY, config)
  },
}
