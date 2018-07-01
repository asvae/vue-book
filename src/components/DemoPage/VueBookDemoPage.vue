<template>
  <div class="vue-book-demo-page">
    <div class="vue-book-demo-page__left-block"
         :style="{'flex-basis': config.width + 'px', 'width': config.width + 'px'}"
    >
      <div class="vue-book-demo-page__menu">
        <vue-book-menu
          :config="config"
          :currentFile="currentFile"
          @openFolder="currentFile.openFolder()"
        />
        <div class="vue-book-demo-page__menu__search" v-if="config.mode === DemoPageMode.Search">
          <vue-book-input
            class="vue-book-demo-page__search-input"
            ref="searchInput"
            v-model="config.searchText"
            placeholder="Search..."
            @up="moveCursor(-1)"
            @down="moveCursor(1)"
            @enter="selectFileUnderCursor()"
            @blur="listCursor.clean()"
          />
        </div>
      </div>

      <div class="vue-book-demo-page__files">
        <searchable-demo-file-list
          v-if="config.mode === DemoPageMode.Search"
          :files="filteredFiles"
          :listCursor="listCursor"
        />

        <tree-demo-file-list
          v-if="config.mode === DemoPageMode.Tree"
          :folder="tree"
          :listCursor="listCursor"
        />
      </div>
      <vue-book-resize-line
        class="vue-book-demo-page__left-block__resize-line"
        v-model="config.width"
      />
    </div>
    <div class="vue-book-demo-page__right-block">
      <component v-if="component" :is="component"/>
    </div>
  </div>
</template>

<script lang="ts">
import { foldersStoreInstance } from '../../store/FoldersStore'
import { ConfigStore, configStoreInstance } from '../../store/configStore'

import BookComponentListFolder from '../FileTree/BookComponentListFolder.vue'
import BookComponentListItem from '../FileTree/BookComponentListItem.vue'

import DemoFolder from '../../classes/Main/DemoFolder'
import DemoFile from '../../classes/Main/DemoFile'
import SearchableDemoFileList from '../FileTree/SearchableDemoFileList.vue'
import VueBookResizeLine from '../Service/VueBookResizeLine.vue'
import DemoPageConfig, { DemoPageMode } from './DemoPageConfig'
import VueBookMenu from './VueBookMenu.vue'

import VueBookInput from './ComInput/VueBookInput.vue'
import TreeDemoFileList from '../FileTree/TreeDemoFileList.vue'
import { ListCursor } from '../FileTree/ListCursor'
import { Component, Provide, Vue, Watch } from 'vue-property-decorator'
import DemoFileCollection from '../../classes/Main/DemoFileCollection'

let lastUpdateTimestamp = 0

@Component({
  components: {
    TreeDemoFileList,
    VueBookInput,
    VueBookMenu,
    VueBookResizeLine,
    SearchableDemoFileList,
    BookComponentListFolder,
    BookComponentListItem,
  },
})
export default class DemoPageComponent extends Vue {
  listCursor: ListCursor = new ListCursor()
  configStoreInstance: ConfigStore = configStoreInstance
  tree: DemoFolder | null = null
  foldersStoreInstance = foldersStoreInstance

  $refs!: {
    searchInput: VueBookInput,
  }

  @Watch('config', { deep: true })
  onConfigChanged (value: DemoPageConfig, oldValue: DemoPageConfig) {
    if (value !== oldValue) {
      // Updated from local storage.
      return
    }
    const update = () => {
      if (lastUpdateTimestamp < Math.floor(Date.now()) - 200) {
        this.configStoreInstance.setConfig(value)
        lastUpdateTimestamp = Math.floor(Date.now())
      }
    }
    update()
  }

  @Watch('tree', { deep: true })
  onTreeChanged (value: DemoFolder, oldValue: DemoFolder) {
    if (value !== oldValue) {
      // Updated from local storage.
      return
    }
    foldersStoreInstance.openFolders = value.getOpenFolders()
  }

  @Provide()
  foldersStore = foldersStoreInstance

  get DemoPageMode () {
    return DemoPageMode
  }

  get config () {
    return this.configStoreInstance.config
  }

  get component () {
    return this.currentFile && this.currentFile.component
  }

  get currentFile (): DemoFile | null {
    return this.files.find(file => {
      return this.$route.path === file.path
    }) || null
  }

  get files () {
    return this.demoFilesCollection.demoFiles
  }

  get demoFilesCollection (): DemoFileCollection {
    const demoFilesCollection = this.$route.meta.demoFilesCollection
    if (!(demoFilesCollection instanceof DemoFileCollection)) {
      throw new Error('No DemoFileCollection found for current route')
    }

    return demoFilesCollection
  }

  get filteredFiles (): DemoFile[] {
    if (!this.config.searchText) {
      return this.files
    }
    return this.files.filter(file => this.fileSelected(file))
  }

  fileSelected (file: DemoFile): boolean {
    const path = file.path.toUpperCase()
    const text = this.config.searchText.toUpperCase()
    const includesFull = path.includes(text)
    if (includesFull) {
      return includesFull
    }
    const upperCaseLetters = file.getFilename().replace(/[a-z.]/g, '')
    return upperCaseLetters.includes(this.config.searchText)
  }

  renderTree (): DemoFolder {
    const tree = new DemoFolder()

    const files = this.demoFilesCollection.demoFiles
    files.forEach(node => tree.addDemoFile(node))
    return tree.folders[0]
  }

  moveCursor (delta: number) {
    const files = this.filteredFiles

    if (!this.listCursor.preSelectedItem) {
      this.listCursor.preSelectedItem = files[0]
      return
    }

    const fileIndex = files.indexOf(this.listCursor.preSelectedItem)
    if (fileIndex === -1) {
      this.listCursor.preSelectedItem = files[0]
      return
    }
    const nextFileIndex = fileIndex + delta
    if (nextFileIndex === -1) {
      this.listCursor.preSelectedItem = files[0]
      return
    }
    if (nextFileIndex === files.length) {
      this.listCursor.preSelectedItem = files[files.length - 1]
      return
    }
    this.listCursor.preSelectedItem = files[nextFileIndex]
  }

  selectFileUnderCursor () {
    const fileUnderCursor = this.listCursor.preSelectedItem

    if (!fileUnderCursor) {
      return
    }

    console.log('this.filteredFiles.includes(fileUnderCursor)', this.filteredFiles.includes(fileUnderCursor))

    if (!this.filteredFiles.includes(fileUnderCursor)) {
      return
    }
    console.log('fileUnderCursor', fileUnderCursor)
    this.$router.push(fileUnderCursor.path)
  }

  mounted () {
    const input = this.$refs.searchInput
    input && input.$el.focus()
  }

  created () {
    this.tree = this.renderTree()
    this.tree.fillParents()
    this.tree.open()
    this.tree.mergeWithFolders(foldersStoreInstance.openFolders)
  }
}
</script>

<style lang="scss">
@import "../../scss/resources";

.vue-book-demo-page {
  // Reset
  &__menu {
    &__search {
      margin-top: 5px;
    }
    padding: 5px;
  }

  &__search-input {
    background-color: lighten($color--main, 50);
    margin-bottom: 5px;
    border-radius: 4px;
  }

  /*1243*/
  /*244 957*/

  &__files {
    background-color: $color--main;
    padding: 0 5px 5px 5px;
    flex: 1 0;
    height: 300px;
  }

  $root: &;

  font-family: "Noto Sans", sans-serif;
  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;

  &__left-block {
    position: relative;
    &__resize-line {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
    }
    * {
      box-sizing: border-box;
    }
    background-color: $color--main;
    height: 100%;
    flex: 0 0;

    display: flex;
    flex-direction: column;
  }

  &__right-block {
    flex: auto;
    display: flex;
    flex-direction: column;
    overflow: auto;
    height: 100%;

    #{$root}__component {
      overflow: auto;
      flex: auto;
      padding: 10px;

      // This is required for position: absolute children to function properly
      width: 100%;
      height: 100%;
    }
  }
}
</style>