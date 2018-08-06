export class VueBookConfig {
  requireContext: any
  path!: string | RegExp
  hideFileExtensions: boolean = false

  constructor (data: Partial<VueBookConfig> = {}) {
    if (!data.requireContext) {
      throw(`'requireContext' is not defined on VueBookConfig`)
    }
    if (!data.path) {
      throw(`'path' is not defined on VueBookConfig`)
    }
    Object.assign(this, data)
  }
}