const STORAGE_KEY = 'vue-book'

export default {
  store (key: string, value: any): void {
    const all: { [key: string]: any } = this.getAll()
    all[key] = value
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  },
  fetch (key: string): any {
    return this.getAll()[key]
  },
  getAll (): { [key: string]: any } {
    const defaultItems = this.getDefault()
    if (localStorage.getItem(STORAGE_KEY) === undefined) {
      return defaultItems
    }
    const storedItems = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    return Object.assign(defaultItems, storedItems)
  },
  getDefault () {
    return {}
  },
}
