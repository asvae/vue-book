import DemoFolder from '../Main/DemoFolder'
import DemoFileFactory from './DemoFileFactory'

export default class DemoFolderFactory {

  static getEmpty (): DemoFolder {
    return new DemoFolder({
      name: 'name',
    })
  }

  static getWithFiles (): DemoFolder {
    return new DemoFolder({
      files: DemoFileFactory.getWithVariousStatuses(),
      name: 'name',
    })
  }

  static getWithFolders (): DemoFolder {
    return new DemoFolder({
      folders: [
        DemoFolderFactory.getEmpty(),
        DemoFolderFactory.getEmpty(),
      ],
      name: 'name',
    })
  }

  static getWithFoldersAndFiles (): DemoFolder {
    return new DemoFolder({
      folders: [
        DemoFolderFactory.getEmpty(),
        DemoFolderFactory.getEmpty(),
      ],
      files: DemoFileFactory.getWithVariousStatuses(),
      name: 'name',
    })
  }

}