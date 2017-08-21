import DemoFile from './DemoFile'
import {componentTreeDemo, default as DemoFileOptions} from './DemoFileOptions'

export default class DemoFileCollection {
  demoFiles: DemoFile[]

  constructor (data) {
    Object.assign(this, data)
  }

  /**
   * Form dependencies between `DemoFile`s depending on
   * component relations.
   */
  attachRelations (): this {
    const componentDemos = new Map()
    this.demoFiles.forEach((demoFile: DemoFile) => {
      const mainComponent = demoFile.options.component
      if (!mainComponent) {
        // Demo has no main component.
        return
      }
      componentDemos.set(mainComponent, demoFile)
    })

    componentDemos.forEach((demoFile: DemoFile) => {
      demoFile.getMainComponentDependencies().forEach(dependentComponent => {
        const dependentFile = componentDemos.get(dependentComponent)
        if (dependentFile) {
          dependentFile.dependsOn.push(demoFile)
          demoFile.dependedBy.push(dependentFile)
        }
      })
    })

    return this
  }

  /**
   * Create and get demo file objects for components without demo.
   */
  hydrateGhostDemoFiles (): this {
    const files: DemoFile[] = this.demoFiles
    const ghostDemoFiles: DemoFile[] = []
    files.forEach(file => {
      if (!file.options.component) {
        return
      }
      file.getMainComponentDependencies().forEach((component: any) => {
        if (!component[componentTreeDemo]) {
          const ghostDemoFile = new DemoFile({
            options: new DemoFileOptions({component}),
          })
          ghostDemoFiles.push(ghostDemoFile)
          component[componentTreeDemo] = ghostDemoFile
        }
      })
    })
    this.demoFiles = [...this.demoFiles, ...ghostDemoFiles]

    return this
  }
}