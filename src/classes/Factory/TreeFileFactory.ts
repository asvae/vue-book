import { TreeFile } from '../Main/TreeFile'

export class TreeFileFactory {
  static getWithShortPath (): TreeFile {
    return new TreeFile({ path: '/short/short.path' })
  }

  static getWithLongPath (): TreeFile {
    return new TreeFile({ path: '/short/short.path' })
  }

  static getWithVariousStatuses (): Array<TreeFile> {
    return ['wip', 'stable', 'unstable', 'hold']
      .map(name => new TreeFile({ path: `/${status}.path` }))
  }
}
