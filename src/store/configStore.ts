import storage from './storage'
import DemoPageConfig, {DemoPageMode} from '../components/DemoPage/DemoPageConfig'

const STORAGE_KEY = 'config'

export default {
  _config: null,

  get config (): DemoPageConfig {
    const data = storage.fetch(STORAGE_KEY) || new DemoPageConfig()
    const config: DemoPageConfig = new DemoPageConfig(data.mode, data.isFlat, data.isShowingInfo, data.searchText, data.width)

    this._config = config
    return this._config
  },
  set config (config: DemoPageConfig) {
    this._config = config

    storage.store(STORAGE_KEY, config)
  },
}