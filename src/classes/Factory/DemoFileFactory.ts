import DemoNode from '../Main/DemoFile'

export default class DemoFileFactory {
  static getWithShortPath (): DemoNode {
    return new DemoNode({ path: '/short/short.path' })
  }

  static getWithLongPath (): DemoNode {
    return new DemoNode({ path: '/short/short.path' })
  }

  static getWithStatus (status): DemoNode {
    const component = { status }
    return new DemoNode({ path: `/${status}.path`, component })
  }

  static getWithVariousStatuses (): Array<DemoNode> {
    return ['wip', 'stable', 'unstable', 'hold'].map(DemoFileFactory.getWithStatus)
  }
}