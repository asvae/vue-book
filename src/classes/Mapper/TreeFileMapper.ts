import { TreeFile } from '../Main/TreeFile'
import { Vue } from 'vue-class-component'

export class TreeFileMapper {
  static toClass ({ path, component }: { path: string, component: Vue }): TreeFile {
    return new TreeFile({
      path,
      component,
    })
  }

  static toComponent (demoFile: TreeFile) {
    return {
      path: demoFile.path,
      component: {},
    }
  }
}
