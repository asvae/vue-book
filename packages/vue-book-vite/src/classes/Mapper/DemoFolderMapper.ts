import { TreeFolder } from '../Main/TreeFolder'
import { TreeFileMapper } from './TreeFileMapper'

export default class DemoFolderMapper {
  static map ({ name = '', isOpen = false, files = [], folders = [] } = {}): TreeFolder {
    return new TreeFolder({
      name,
      isOpen,
      files: files.map(TreeFileMapper.toClass),
      folders: folders.map(DemoFolderMapper.map),
    })
  }

  static transform (treeFolder: TreeFolder): any {
    return {
      name: treeFolder.name,
      isOpen: treeFolder.isOpen,
      files: treeFolder.files.map(TreeFileMapper.toComponent),
      folders: treeFolder.folders.map(DemoFolderMapper.transform),
    }
  }
}
