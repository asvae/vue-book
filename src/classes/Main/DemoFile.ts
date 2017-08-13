import DemoFolder from './DemoFolder'
import DemoFileOptions from './DemoFileOptions'
import Vue, {ComponentOptions} from 'vue'


export default class DemoFile {
  path: string = ''
  component: ComponentOptions<Vue>
  folder: DemoFolder = null
  options: DemoFileOptions = null
  dependsOn: DemoFile[] = []
  dependedBy: DemoFile[] = []

  constructor (data?) {
    Object.assign(this, data)
  }

  hydrateOptions () {
    this.options = DemoFileOptions.createFromDemoFile(this)
    return this
  }

  openFolder () {
    this.folder.open()
  }

  // returns `ComponentDemo.vue`
  getFilename (): string {
    return this.path.split('/').pop()
  }

  // returns `VmComponent`
  guessComponentName (): string {
    let name = this.getFilename()
    // remove extension
    if (/.vue$/.test(name)) {
      name = name.slice(0, -4)
    }
    // remove Demo part
    if (/Demo$/.test(name)) {
      name = name.slice(0, -4)
    }
    return 'Vm' + name
  }

  getComponentName (): string | null {
    return this.options.component && this.options.component.name || null
  }

  /**
   * Guess component on which demo operates from registered ones.
   */
  guessComponent (): Object | null {
    const registeredComponents = this.component.components
    if (!registeredComponents) {
      return null
    }
    const name = this.guessComponentName()
    return Object.values(registeredComponents)
      .find(component => {
        return component.name === name
      }) || null
  }

  getMainComponentDependencies (): Object[] {
    const dependentComponents = this.options.component.components
    if (!dependentComponents) {
      return []
    }
    return Object.values(dependentComponents)
  }

  getParentFolderPath (): string {
    return this.path.split('/').slice(0, -1).join('/')
  }

  toJson () {
    return {
      path: this.path,
    }
  }
}