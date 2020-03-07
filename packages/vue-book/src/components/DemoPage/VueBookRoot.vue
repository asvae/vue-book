<template>
  <div class="VueBookRoot">
    <div v-if="!files.length">
      <p>You provided no files in requireContext.</p>
      <p>Please check your path and masks.</p>
    </div>
    <div
      v-else-if="!getHideNavigation()"
      class="VueBookRoot__left-block"
      :style="{'flex-basis': config.width + 'px', 'width': config.width + 'px'}"
    >
      <div class="VueBookRoot__menu">
        <vue-book-menu
          :config="config"
          :currentFile="currentFile"
          @openFolder="currentFile.openFolder()"
        />
        <!-- Why form? See https://github.com/asvae/vue-book/issues/39 -->
        <form autocomplete="off" class="VueBookRoot__menu__search"
              v-if="config.mode === DemoPageMode.Search"
        >
          <vue-book-input
            class="VueBookRoot__search-input"
            ref="searchInput"
            v-model="config.searchText"
            placeholder="Search..."
            @up="moveCursor(-1)"
            @down="moveCursor(1)"
            @enter="selectFileUnderCursor()"
            @blur="listCursor.clean()"
          />
          <div
            v-if="config.searchText"
            class="VueBookRoot__menu__search__icon"
            @click="clearSearch()"
          >
            <font-awesome-icon icon="times"/>
          </div>
        </form>
      </div>

      <div class="VueBookRoot__files">
        <template
          v-if="config.mode === DemoPageMode.Search"
        >
          <template v-if="!filteredFiles.length">
            No files found according to search.
          </template>
          <DemoFileList
            v-else
            :files="filteredFiles"
            :listCursor="listCursor"
          />
        </template>

        <tree-demo-file-list
          v-if="config.mode === DemoPageMode.Tree"
          :folder="treeFolder"
          :listCursor="listCursor"
        />
      </div>
      <VueBookResizeLine
        class="VueBookRoot__left-block__resize-line"
        v-model="config.width"
      />
    </div>

    <div class="VueBookRoot__right-block">
      <component ref="component" v-if="component" :is="component"/>
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
import DemoFileList from '../FileTree/DemoFileList.vue'
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
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ContainerFocusProvideMixin } from '../Exposed/ContainerFocusService'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'

let lastUpdateTimestamp = 0

const hasInFilename = (searchText: string, treeFile: TreeFile) => {
  return treeFile.getFilename().toUpperCase().includes(searchText)
}

const sortByRelevance = (searchText: string, treeFiles: TreeFile[]) => {
  return treeFiles.sort((a, b) => {
    const search = searchText.toUpperCase()
    // Files that have a search in their filename are sent to the top.
    if (hasInFilename(search, a) && !hasInFilename(search, b)) {
      return -1
    }
    if (hasInFilename(search, b) && !hasInFilename(search, a)) {
      return 1
    }
    return 0
  })
}

@Component({
  components: {
    TreeDemoFileList,
    VueBookInput,
    VueBookMenu,
    VueBookResizeLine,
    DemoFileList,
    BookComponentListFolder,
    BookComponentListItem,
    FontAwesomeIcon,
  },
  mixins: [
    ContainerFocusProvideMixin,
  ],
  // TODO Use decorators.
  provide () {
    return {
      [VueBookTreeOptionsInterface]: (this as VueBookRoot).vueBookTreeOptions,
    }
  },
  beforeRouteUpdate (to: any, from: any, next: Function) {
    // Demo components are not registered as routes in vue-router, so we have to call route update hooks manually.
    const component = this.$refs.component as any
    if (component) {
      component?.$options.beforeRouteUpdate?.[0]?.call(component, to, from, next)
    }
    next()
  },
})
export default class VueBookRoot extends Vue {
  @Prop(TreeFolder) treeFolderDefault!: TreeFolder
  @Prop(TreeFileCollection) treeFileCollectionDefault!: TreeFileCollection
  @Prop({ type: Boolean, default: false }) hideFileExtensionsDefault!: boolean
  @Prop({ type: Boolean, default: false }) hideNavigationDefault!: boolean

  treeFolder: TreeFolder | null = null
  listCursor = new ListCursor()
  configStore = new ConfigStore()
  foldersStoreInstance = new FoldersStore()
  vueBookTreeOptions = new VueBookTreeOptions({
    noRouter: this.getNoRouter(),
    selectedTreeFile: null,
    hideFileExtensions: this.getHideFileExtensions(),
  })

  mounted () {
    const input = this.$refs.searchInput as any
    input && (input.$el as HTMLInputElement).focus()
  }

  constructor () {
    super()
    this.foldersStoreInstance.load()
    this.configStore.load()
    const treeFolder = this.getDemoFolder()
    treeFolder.mergeWithFolders(this.foldersStoreInstance.openFolders)
    this.treeFolder = treeFolder
  }

  @Watch('config', { deep: true })
  onConfigChange (value: DemoPageConfig) {
    if (lastUpdateTimestamp < Math.floor(Date.now()) - 200) {
      this.configStore.config = value
      this.configStore.save()
      lastUpdateTimestamp = Math.floor(Date.now())
    }
  }

  @Watch('treeFolder', { deep: true })
  onTreeFolderChange (value: TreeFolder) {
    this.foldersStoreInstance.openFolders = value.getOpenFolders()
    this.foldersStoreInstance.save()
  }

  get DemoPageMode () {
    return DemoPageMode
  }

  get noRouter (): boolean {
    return this.getNoRouter()
  }

  get hideFileExtensions (): boolean {
    return this.getHideFileExtensions()
  }

  get config (): DemoPageConfig {
    if (this.configStore.config === null) {
      throw new Error('configStore is null')
    }
    return this.configStore.config
  }

  get component () {
    return this.currentFile && this.currentFile.component
  }

  get currentFile (): TreeFile | null {
    if (this.noRouter) {
      return this.vueBookTreeOptions.selectedTreeFile
    }

    return this.files.find((file: any) => {
      return this.$route.path === file.path
    }) || null
  }

  get files (): TreeFile[] {
    return this.treeFileCollection.treeFiles
  }

  get treeFileCollection (): TreeFileCollection {
    let treeFileCollection = this.treeFileCollectionDefault
    if (!treeFileCollection) {
      treeFileCollection = this.$route.meta.treeFileCollection
    }

    if (!(treeFileCollection instanceof TreeFileCollection)) {
      throw new Error('No treeFileCollection found: pass it to props or provide via route meta')
    }

    return treeFileCollection
  }

  get filteredFiles (): TreeFile[] {
    if (!this.config.searchText) {
      return this.files
    }
    const treeFiles = this.files.filter((file: any) => this.fileSelected(file))
    return sortByRelevance(this.config.searchText, treeFiles)
  }

  clearSearch (): void {
    this.config.searchText = ''
    ;(this.$refs.searchInput as HTMLInputElement).focus()
  }

  getNoRouter (): boolean {
    return !!(this.treeFolderDefault && this.treeFileCollectionDefault)
  }

  getHideFileExtensions (): boolean {
    if (this.noRouter) {
      return this.hideFileExtensionsDefault
    }

    return this.$route.meta.hideFileExtensions
  }

  getHideNavigation (): boolean {
    if (this.noRouter) {
      return this.hideNavigationDefault
    }

    return this.$route.meta.hideNavigation
  }

  getDemoFolder (): TreeFolder {
    let treeFolder = this.treeFolderDefault
    if (!treeFolder) {
      treeFolder = this.$route.meta.treeFolder
    }

    if (!(treeFolder instanceof TreeFolder)) {
      throw new Error('No treeFolder found: pass it to props or provide via route meta')
    }

    return treeFolder
  }

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

    if (!this.filteredFiles.includes(fileUnderCursor)) {
      return
    }

    if (this.noRouter) {
      this.vueBookTreeOptions.selectedTreeFile = fileUnderCursor
      return
    }

    this.$router.push(fileUnderCursor.path)
  }
}
</script>

<style lang="scss">
@import "../../scss/resources";

.VueBookRoot {
  // Reset
  &__menu {
    &__search {
      position: relative;
      margin-top: 5px;

      &__icon {
        position: absolute;
        right: 6px;
        top: 3px;
        color: $color--icon;
        cursor: pointer;
        opacity: 0.3;
      }
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
