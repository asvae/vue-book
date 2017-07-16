import DemoFolder from '../Main/DemoFolder'
import DemoFileMapper from './DemoFileMapper'
import DemoFile from '../Main/DemoFile'

export default class DemoFolderMapper {
  static map ({name, isOpen, files = [], folders = []}) {
    return new DemoFolder ({
      name,
      isOpen,
      files: files.map(DemoFileMapper.map),
      folders: folders.map(DemoFolderMapper.map)
    })
  }
  static transform (demoFolder: DemoFolder) {
    return {
      name: demoFolder.name,
      isOpen: demoFolder.isOpen,
      files: demoFolder.files.map(DemoFileMapper.transform),
      folders: demoFolder.folders.map(DemoFolderMapper.transform),
    }
  }
}