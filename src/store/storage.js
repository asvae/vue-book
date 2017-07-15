const STORAGE_KEY = 'vue-component-tree'

export default {
  store (key, value): void {
    const all = this.getAll()
    all.key = value
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  },
  fetch (key): any {
    this.getAll()[key]
  },
  getAll (): Object {
    const defaultItems = this.getDefault()
    if (localStorage.getItem(STORAGE_KEY) === undefined) {
      return defaultItems
    }
    const storedItems = JSON.parse(localStorage.getItem(STORAGE_KEY))
    return Object.assign(defaultItems, storedItems)
  },
  getDefault () {
    return {
    }
  }
}