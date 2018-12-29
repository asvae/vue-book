<template>
  <div class="vue-book-root">
    <div
      v-if="!getHideNavigation()"
      class="vue-book-root__left-block"
      :style="{'flex-basis': config.width + 'px', 'width': config.width + 'px'}"
    >
      <div class="vue-book-root__menu">
        <vue-book-menu
          :config="config"
          :currentFile="currentFile"
          @openFolder="currentFile.openFolder()"
        />
        <div class="vue-book-root__menu__search"
             v-if="config.mode === DemoPageMode.Search"
        >
          <vue-book-input
            class="vue-book-root__search-input"
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

      <div class="vue-book-root__files">
        <searchable-demo-file-list
          v-if="config.mode === DemoPageMode.Search"
          :files="filteredFiles"
          :listCursor="listCursor"
        />

        <tree-demo-file-list
          v-if="config.mode === DemoPageMode.Tree"
          :folder="treeFolder"
          :listCursor="listCursor"
        />
      </div>
      <vue-book-resize-line
        class="vue-book-root__left-block__resize-line"
        v-model="config.width"
      />
    </div>

    <div class="vue-book-root__right-block">
      <component v-if="component" :is="component"/>
    </div>
  </div>
</template>

<script lang="ts">
import { FoldersStore } from '../../store/FoldersStore'
import { ConfigStore } from '../../store/configStore'

import BookComponentListFolder from '../FileTree/BookComponentListFolder.vue'
import BookComponentListItem from '../FileTree/BookComponentListItem.vue'

import { TreeFolder } from '../../classes/Main/TreeFolder'
import { TreeFile } from '../../classes/Main/TreeFile'
import SearchableDemoFileList from '../FileTree/SearchableDemoFileList.vue'
import VueBookResizeLine from '../Service/VueBookResizeLine.vue'
import DemoPageConfig, { DemoPageMode } from './DemoPageConfig'
import VueBookMenu from './VueBookMenu.vue'

import VueBookInput from './ComInput/VueBookInput.vue'
import TreeDemoFileList from '../FileTree/TreeDemoFileList.vue'
import { ListCursor } from '../FileTree/ListCursor'
import { TreeFileCollection } from '../../classes/Main/TreeFileCollection'
import {
  VueBookTreeOptions,
  VueBookTreeOptionsInterface,
} from './VueBookTreeOptions'

let lastUpdateTimestamp = 0

export default {
  name: 'vue-book-root',
  components: {
    TreeDemoFileList,
    VueBookInput,
    VueBookMenu,
    VueBookResizeLine,
    SearchableDemoFileList,
    BookComponentListFolder,
    BookComponentListItem,
  },
  data () {
    return {
      treeFolder: null,
      listCursor: new ListCursor(),
      configStore: new ConfigStore(),
      foldersStoreInstance: new FoldersStore(),
      vueBookTreeOptions: new VueBookTreeOptions({
        noRouter: this.getNoRouter(),
        selectedTreeFile: null,
        hideFileExtensions: this.getHideFileExtensions(),
      }),
    }
  },
  props: {
    treeFolderDefault: {
      type: TreeFolder,
    },
    treeFileCollectionDefault: {
      type: TreeFileCollection,
    },
    hideFileExtensionsDefault: {
      type: Boolean,
      default: false,
    },
    hideNavigationDefault: {
      type: Boolean,
      default: false,
    },
  },
  mounted () {
    const input = this.$refs.searchInput
    input && input.$el.focus()
  },
  created () {
    this.foldersStoreInstance.load()
    this.configStore.load()
    const treeFolder = this.getDemoFolder()
    treeFolder.mergeWithFolders(this.foldersStoreInstance.openFolders)
    this.treeFolder = treeFolder
  },
  watch: {
    'config': {
      handler (value: DemoPageConfig) {
        if (lastUpdateTimestamp < Math.floor(Date.now()) - 200) {
          this.configStore.config = value
          this.configStore.save()
          lastUpdateTimestamp = Math.floor(Date.now())
        }
      },
      deep: true,
    },
    'treeFolder': {
      handler (value: TreeFolder) {
        this.foldersStoreInstance.openFolders = value.getOpenFolders()
        this.foldersStoreInstance.save()
      },
      deep: true,
    },
  },
  provide () {
    return {
      [VueBookTreeOptionsInterface]: this.vueBookTreeOptions,
    }
  },
  computed: {
    DemoPageMode: () => DemoPageMode,
    noRouter (): boolean {
      return this.getNoRouter()
    },
    hideFileExtensions (): boolean {
      return this.getHideFileExtensions()
    },
    config () {
      return this.configStore.config
    },
    component () {
      return this.currentFile && this.currentFile.component
    },
    currentFile (): TreeFile | null {
      if (this.noRouter) {
        return this.vueBookTreeOptions.selectedTreeFile
      }

      return this.files.find((file: any) => {
        return this.$route.path === file.path
      }) || null
    },
    files (): TreeFile[] {
      return this.treeFileCollection.treeFiles
    },
    treeFileCollection (): TreeFileCollection {
      let treeFileCollection = this.treeFileCollectionDefault
      if (!treeFileCollection) {
        treeFileCollection = this.$route.meta.treeFileCollection
      }

      if (!(treeFileCollection instanceof TreeFileCollection)) {
        throw new Error('No treeFileCollection found: pass it to props or provide via route meta')
      }

      return treeFileCollection
    },
    filteredFiles (): TreeFile[] {
      if (!this.config.searchText) {
        return this.files
      }
      return this.files.filter((file: any) => this.fileSelected(file))
    },
  },
  methods: {
    getNoRouter (): boolean {
      return !!(this.treeFolderDefault && this.treeFileCollectionDefault)
    },
    getHideFileExtensions (): boolean {
      if (this.noRouter) {
        return this.hideFileExtensionsDefault
      }

      return this.$route.meta.hideFileExtensions
    },
    getHideNavigation (): boolean {
      if (this.noRouter) {
        return this.hideNavigationDefault
      }

      return this.$route.meta.hideNavigation
    },
    getDemoFolder (): TreeFolder {
      let treeFolder = this.treeFolderDefault
      if (!treeFolder) {
        treeFolder = this.$route.meta.treeFolder
      }

      if (!(treeFolder instanceof TreeFolder)) {
        throw new Error('No treeFolder found: pass it to props or provide via route meta')
      }

      return treeFolder
    },
    fileSelected (file: TreeFile): boolean {
      if (this.noRouter) {
        return this.vueBookTreeOptions.selectedTreeFile === file
      }

      const path = file.path.toUpperCase()
      const text = this.config.searchText.toUpperCase()
      const includesFull = path.includes(text)
      if (includesFull) {
        return includesFull
      }
      const upperCaseLetters = file.getFilename().replace(/[a-z.]/g, '')
      return upperCaseLetters.includes(this.config.searchText)
    },
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
    },
    selectFileUnderCursor () {
      const fileUnderCursor = this.listCursor.preSelectedItem

      if (!fileUnderCursor) {
        return
      }

      if (!this.filteredFiles.includes(fileUnderCursor)) {
        return
      }

      if (this.noRouter) {
        this.vueBookTreeOptions.selectedTreeFile = fileUnderCursor
        return
      }

      this.$router.push(fileUnderCursor.path)
    },
  },
}
</script>

<style lang="scss">
@import "../../scss/resources";

.vue-book-root {
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

  &__files {
    background-color: $color--main;
    padding: 0 5px 5px 5px;
    flex: 1 0;
    height: 300px;
  }

  $root: &;

  height: 100%;
  width: 100%;
  position: fixed;
  display: flex;
  top: 0;
  left: 0;

  &__left-block {
    font-family: "Noto Sans", sans-serif;
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
