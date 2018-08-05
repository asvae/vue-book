import DemoFile from '../Main/DemoFile'
import { Vue } from 'vue-property-decorator'

export default class DemoFileMapper {
  static map ({ path, component }: { path: string, component: Vue }): DemoFile {
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