import DemoFolder from '../src/classes/Main/DemoFolder.js'
import DemoNode from '../src/classes/Main/DemoNode.js'

describe('DemoFolder', () => {
  it('is initialized', () => {
    const folder = new DemoFolder()
    expect(folder.name).toBe('')
    expect(folder.folders).toEqual([])
    expect(folder.files).toEqual([])
  })
  it('findOrCreateFolder', () => {
    const folder = new DemoFolder()
    const newFolder = folder.findOrCreateFolder('name')
    expect(newFolder.name).toBe('name')
    const oldFolder = folder.findOrCreateFolder('name')
    expect(oldFolder).toBe(newFolder)
  })
  it('addFile', () => {
    const folder = new DemoFolder()
    folder.addFile(new DemoNode(), 'one/two')
    const folderOne = folder.folders[0]
    expect(folderOne.name).toBe('one')
    const folderTwo = folderOne.folders[0]
    expect(folderTwo.name).toBe('two')
  })
  it('addDemoNode', () => {
    const folder = new DemoFolder()
    folder.addDemoNode(new DemoNode({ path: '/one/two/file.js' }))
    folder.addDemoNode(new DemoNode({ path: '/one/two/file1.js' }))
    folder.addDemoNode(new DemoNode({ path: '/one/file2.js' }))
    const folderOne = folder.folders[0]
    expect(folderOne.name).toBe('one')
    expect(folderOne.files.length).toBe(1)
    const folderTwo = folderOne.folders[0]
    expect(folderTwo.name).toBe('two')
    expect(folderTwo.files.length).toBe(2)
  })
})
