import { TreeFile } from '../../src/classes/Main/TreeFile'

describe('TreeFile', () => {
  it('is initialized', () => {
    const node = new TreeFile()
    expect(node.path).toBe('')
  })
  it('getParentFolder', () => {
    const treeFile = new TreeFile({ path: 'one/two/file.js' })
    expect(treeFile.getParentFolderPath()).toBe('one/two')
    const rootTreeFile = new TreeFile({ path: 'file.js' })
    expect(rootTreeFile.getParentFolderPath()).toBe('')
  })
  it('getFileName', () => {
    const treeFile = new TreeFile({ path: 'one/two/file.js' })
    expect(treeFile.getFilename()).toBe('file.js')
    const rootTreeFile = new TreeFile({ path: 'file.js' })
    expect(rootTreeFile.getFilename()).toBe('file.js')
  })
})
