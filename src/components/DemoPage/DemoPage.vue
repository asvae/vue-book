<template>
  <div class="demo-page">
    <div class="demo-page__left-block"
         :style="{'flex-basis': config.width + 'px', 'width': config.width + 'px'}"
    >
      <div class="demo-page__menu">
        <vm-demo-page-menu
          :config="config"
          :currentFile="currentFile"
          @openFolder="currentFile.openFolder()"
        />
        <div class="demo-page__menu__search" v-if="config.mode === DemoPageMode.Search">
          <vue-book-input
            class="demo-page__search-input"
            ref="searchInput"
            v-model="config.search"
            placeholder="Search..."
          />
        </div>
      </div>

      <div class="demo-page__files">
        <searchable-demo-file-list
          v-if="config.mode === DemoPageMode.Search"
          :search="config.search"
          :files="files"
          :config="config"
          @selected="config.mode === DemoPageMode.Tree"
          :listCursor="listCursor"
        />

        <tree-demo-file-list
          v-if="config.mode === DemoPageMode.Tree"
          :folder="tree"
          :listCursor="listCursor"
        />
      </div>
    </div>
    <vm-resize-line v-model="config.width"/>
    <div class="demo-page__right-block">
      <div class="demo-page__component" v-if="! secondComponent">
        <component v-if="component" :is="component"/>
      </div>
      <div class="demo-page__component" v-if="secondComponent">
        <div style="display: flex">
          <div style="flex: 1 0 50%"
               v-for="item in [component, secondComponent]">
            <component v-if="item" :is="item"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { foldersStoreInstance } from '../../store/FoldersStore'
import { configStoreInstance } from '../../store/configStore'

import BookComponentListFolder from '../FileTree/BookComponentListFolder.vue'
import BookComponentListItem from '../FileTree/BookComponentListItem.vue'

import DemoFolder from '../../classes/Main/DemoFolder'
import DemoFile from '../../classes/Main/DemoFile'
import SearchableDemoFileList from '../FileTree/SearchableDemoFileList.vue'
import VmResizeLine from '../Service/ComResizeLine.vue'
import DemoPageConfig, { DemoPageMode } from './DemoPageConfig'
import VmDemoPageMenu from './DemoPageMenu.vue'

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
    VmDemoPageMenu,
    VmResizeLine,
    SearchableDemoFileList,
    BookComponentListFolder,
    BookComponentListItem,
  },
})
export default class DemoPage extends Vue {
  listCursor: ListCursor = new ListCursor()
  configStoreInstance = configStoreInstance
  tree: DemoFolder = this.renderTree()
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
        configStoreInstance.setConfig(value)
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
    return configStoreInstance.config
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

  renderTree () {
    const tree = new DemoFolder()

    const files = this.demoFilesCollection.demoFiles
    files.forEach(node => tree.addDemoFile(node))
    return tree.folders[0]
  }

  get demoFilesCollection (): DemoFileCollection {
    const demoFilesCollection = this.$route.meta.demoFilesCollection
    if (!(demoFilesCollection instanceof DemoFileCollection)){
      throw new Error('No DemoFileCollection found for current route')
    }
    return demoFilesCollection
  }

  mounted () {
    const input = this.$refs.searchInput
    input && input.$el.focus()
  }

  created () {
    this.tree.fillParents()
    this.tree.open()
    this.tree.mergeWithFolders(foldersStoreInstance.openFolders)
  }
}
</script>

<style lang="scss">
@import "../../scss/resources";

.demo-page {
  // Reset
  &__menu {
    &__search {
      margin-top: 5px;
    }
    background-color: $color--main;
    padding: 5px 0 5px 5px;
  }

  &__search-input {
    background-color: lighten($color--main, 50);
    margin-bottom: 5px;
    border-radius: 4px;
  }

  &__files {
    background-color: $color--main;
    padding: 0 0 5px 5px;
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

  #{&}__left-block {
    * {
      box-sizing: border-box;
    }

    height: 100%;
    flex: 0 0;
    background-color: white;
    border-right: solid 1px $border-color--main;

    display: flex;
    flex-direction: column;
  }

  #{&}__right-block {
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

    #{$root}__info {
      overflow: auto;
      flex: 0 0;
    }
  }
}
</style>