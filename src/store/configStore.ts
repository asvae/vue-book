import storage from './storage'
import DemoPageConfig, {DemoPageMode} from '../components/DemoPage/DemoPageConfig'

const STORAGE_KEY = 'config'

export default {
  _config: <any>null,

  get config (): DemoPageConfig {
    if (! this._config) {
      const data = storage.fetch(STORAGE_KEY) || new DemoPageConfig()
      const config: DemoPageConfig = new DemoPageConfig(data)
      this._config = config
    }
    return this._config
  },
  setConfig (config: DemoPageConfig) {
    this._config = config
    storage.store(STORAGE_KEY, config)
  },
}