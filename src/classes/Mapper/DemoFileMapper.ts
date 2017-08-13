import DemoFile from '../Main/DemoFile'

export default class DemoFileMapper {
  static map ({path, component}): DemoFile {
    return new DemoFile({
      path,
      component,
    })
  }

  static transform (demoFile: DemoFile) {
    return {
      path: demoFile.path,
      component: {},
    }
  }
}