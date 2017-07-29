import DemoFile from './DemoFile'

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

    console.log(componentDemos)

    return this
  }
}