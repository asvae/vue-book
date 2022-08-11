import { TreeFolder } from '../Main/TreeFolder'
import { TreeFileFactory } from './TreeFileFactory'

export default class DemoFolderFactory {

  static getEmpty (): TreeFolder {
    return new TreeFolder({
      name: 'name',
    })
  }

  static getWithFiles (): TreeFolder {
    return new TreeFolder({
      files: TreeFileFactory.getWithVariousStatuses(),
      name: 'name',
    })
  }

  static getWithFolders (): TreeFolder {
    return new TreeFolder({
      folders: [
        DemoFolderFactory.getEmpty(),
        DemoFolderFactory.getEmpty(),
      ],
      name: 'name',
    })
  }

  static getWithFoldersAndFiles (): TreeFolder {
    return new TreeFolder({
      folders: [
        DemoFolderFactory.getEmpty(),
        DemoFolderFactory.getEmpty(),
      ],
      files: TreeFileFactory.getWithVariousStatuses(),
      name: 'name',
    })
  }
}
