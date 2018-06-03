import DemoNode from '../Main/DemoFile'

export default class DemoFileFactory {
  static getWithShortPath (): DemoNode {
    return new DemoNode({ path: '/short/short.path' })
  }

  static getWithLongPath (): DemoNode {
    return new DemoNode({ path: '/short/short.path' })
  }

  static getWithVariousStatuses (): Array<DemoNode> {
    return ['wip', 'stable', 'unstable', 'hold']
      .map(name => new DemoNode({ path: `/${status}.path` }))
  }
}