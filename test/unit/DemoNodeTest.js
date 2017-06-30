import DemoNode from '../../src/classes/Main/DemoNode.js'

describe('DemoNode', () => {
  it('is initialized', () => {
    const node = new DemoNode()
    expect(node.path).toBe('')
  })
  it('getParentFolder', () => {
    const node = new DemoNode({ path: 'one/two/file.js' })
    expect(node.getParentFolderPath()).toBe('one/two')
    const rootNode = new DemoNode({ path: 'file.js' })
    expect(rootNode.getParentFolderPath()).toBe('')
  })
  it('getFileName', () => {
    const node = new DemoNode({ path: 'one/two/file.js' })
    expect(node.getFilename()).toBe('file.js')
    const rootNode = new DemoNode({ path: 'file.js' })
    expect(rootNode.getFilename()).toBe('file.js')
  })
})
