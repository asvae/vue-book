export class VueBookConfig {
  requireContext: any
  path: string | RegExp
  hideFileExtensions: boolean = false

  constructor (data: Partial<VueBookConfig> = {}) {
    Object.assign(this, data)
  }
}