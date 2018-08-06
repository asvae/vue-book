import storage from './storage'
import DemoPageConfig from '../components/DemoPage/DemoPageConfig'

const STORAGE_KEY = 'config'

export class ConfigStore {
  public config: DemoPageConfig | null = null

  load (): void {
    const data = storage.fetch(STORAGE_KEY) || new DemoPageConfig()
    this.config = new DemoPageConfig(data)
  }

  save (): void {
    storage.store(STORAGE_KEY, this.config)
  }
}

export const configStoreInstance = new ConfigStore()
