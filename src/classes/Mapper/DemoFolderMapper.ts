import DemoFolder from '../Main/DemoFolder'
import DemoFileMapper from './DemoFileMapper'

export default class DemoFolderMapper {
  static map ({ name = '', isOpen = false, files = [], folders = [] } = {}): DemoFolder {
    return new DemoFolder({
      name,
      isOpen,
      files: files.map(DemoFileMapper.map),
      folders: folders.map(DemoFolderMapper.map),
    })
  }

  static transform (demoFolder: DemoFolder): any {
    return {
      name: demoFolder.name,
      isOpen: demoFolder.isOpen,
      files: demoFolder.files.map(DemoFileMapper.transform),
      folders: demoFolder.folders.map(DemoFolderMapper.transform),
    }
  }
}