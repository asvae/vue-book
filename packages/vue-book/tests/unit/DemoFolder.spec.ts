import { TreeFolder } from '../../src/classes/Main/TreeFolder'
import { TreeFile } from '../../src/classes/Main/TreeFile'

describe('DemoFolder', () => {
  it('is initialized', () => {
    const folder = new TreeFolder()
    expect(folder.name).toBe('')
    expect(folder.folders).toEqual([])
    expect(folder.files).toEqual([])
  })
  it('findOrCreateFolder', () => {
    const folder = new TreeFolder()
    const newFolder = folder.findOrCreateFolder('name')
    expect(newFolder.name).toBe('name')
    const oldFolder = folder.findOrCreateFolder('name')
    expect(oldFolder).toBe(newFolder)
  })
  it('addFile', () => {
    const folder = new TreeFolder()
    folder.addFile(new TreeFile(), 'one/two')
    const folderOne = folder.folders[0]
    expect(folderOne.name).toBe('one')
    const folderTwo = folderOne.folders[0]
    expect(folderTwo.name).toBe('two')
  })
  it('addTreeFile', () => {
    const folder = new TreeFolder()
    folder.addTreeFile(new TreeFile({ path: '/one/two/file.js' }))
    folder.addTreeFile(new TreeFile({ path: '/one/two/file1.js' }))
    folder.addTreeFile(new TreeFile({ path: '/one/file2.js' }))
    const folderOne = folder.folders[0]
    expect(folderOne.name).toBe('one')
    expect(folderOne.files.length).toBe(1)
    const folderTwo = folderOne.folders[0]
    expect(folderTwo.name).toBe('two')
    expect(folderTwo.files.length).toBe(2)
  })
  it('getOpenFolders', () => {
    const folder = new TreeFolder()
    folder.addTreeFile(new TreeFile({ path: '/one/file1.js' }))
    folder.addTreeFile(new TreeFile({ path: '/two/file2.js' }))
    folder.addTreeFile(new TreeFile({ path: '/three/file3.js' }))
    expect(folder.getOpenFolders().length).toBe(0)
    folder.folders[0].open()
    expect(folder.getOpenFolders().length).toBe(1)
    folder.folders[0].close()
    expect(folder.getOpenFolders().length).toBe(0)
    folder.folders[1].open()
    folder.folders[2].open()
    expect(folder.getOpenFolders().length).toBe(2)
  })
})
