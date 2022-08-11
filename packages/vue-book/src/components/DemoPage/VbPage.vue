<template>
  <div class="VbPage">
    <div v-if="!files.length">
      <p>You provided no files in requireContext.</p>
      <p>Please check your path and masks.</p>
    </div>
    <div class="VbPage__left-block-folded"
         v-else-if="isHidden"
    >
      <ComButtonIcon
        @click="isHidden = !isHidden"
        :title="isHidden ? 'Unfold navigation panel' : 'Fold navigation panel'"
        :icon="isHidden ? 'bars' : 'arrow-left'"
        :active="config.mode === DemoPageMode.Tree"
      />
    </div>
    <div
      v-else-if="!hideNavigation"
      class="VbPage__left-block"
      :style="{'flex-basis': config.width + 'px', 'width': config.width + 'px'}"
    >
      <div class="VbPage__menu">
        <VbMenu
          :config="config"
          :currentFile="currentFile"
          @openFolder="currentFile.openFolder()"
        />

        <!-- Why form? See https://github.com/asvae/vue-book/issues/39 -->
        <form autocomplete="off" class="VbPage__menu__search"
              v-if="config.mode === DemoPageMode.Search"
        >
          <VbInput
            class="VbPage__search-input"
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
            class="VbPage__menu__search__icon"
            @click="clearSearch()"
          >
            <font-awesome-icon icon="xmark"/>
          </div>
        </form>
      </div>

      <div class="VbPage__files">
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

        <TreeDemoFileList
          v-if="config.mode === DemoPageMode.Tree"
          :folder="treeFolderLocal"
          :listCursor="listCursor"
        />
      </div>

      <div class="VbPage__left-block-bottom-menu">
        <ComButtonIcon
          @click="isHidden = !isHidden"
          :title="isHidden ? 'Unfold navigation panel' : 'Fold navigation panel'"
          :icon="isHidden ? 'bars' : 'arrow-left'"
          :active="config.mode === DemoPageMode.Tree"
        />
      </div>

      <VueBookResizeLine
        class="VbPage__left-block__resize-line"
        v-model="config.width"
      />
    </div>

    <div class="VbPage__right-block">
      <VbNotFound :files="similarFiles" v-if="!component" />
      <component ref="component" v-else :is="component" />
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
import VbMenu from './VbMenu.vue'
import VbNotFound from './VbNotFound.vue'
import VbInput from './VbInput/VbInput.vue'
import TreeDemoFileList from '../FileTree/TreeDemoFileList.vue'
import { ListCursor } from '../FileTree/ListCursor'
import { TreeFileCollection } from '../../classes/Main/TreeFileCollection'
import {
  VueBookTreeOptions,
  VueBookTreeOptionsInterface,
} from './VueBookTreeOptions'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { ContainerFocusProvideMixin } from '../Exposed/ContainerFocusService'
import { Prop, Watch } from 'vue-property-decorator'
import { screenSizeService } from '../../services/ScreenSizeService'
import ComButtonIcon from './VbButtonIcon/VbButtonIcon.vue'

import { Vue, Options, mixins } from 'vue-class-component'

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

@Options({
  name: 'VbPage',
  components: {
    TreeDemoFileList,
    VbInput,
    VbMenu,
    VueBookResizeLine,
    DemoFileList,
    BookComponentListFolder,
    BookComponentListItem,
    FontAwesomeIcon,
    VbNotFound,
    ComButtonIcon,
  },
  // TODO Use decorators.
  provide () {
    return {
      [VueBookTreeOptionsInterface]: (this as VbPage).vueBookTreeOptions,
    }
  },
  beforeRouteUpdate (to: any, from: any, next: Function) {
    // Demo components are not registered as routes in vue-router, so we have to call route update hooks manually.
    const component = this.$refs.component as any
    if (component?.$options.beforeRouteUpdate) {
      component?.$options.beforeRouteUpdate?.[0]?.call(component, to, from, next)
    } else {
      next()
    }
  },
})
export default class VbPage extends mixins(ContainerFocusProvideMixin) {
  @Prop({
    type: TreeFolder,
    validator (treeFolder: TreeFolder): boolean {
      if (!(treeFolder instanceof TreeFolder)) {
        throw new Error('No treeFolder found: pass it to props or provide via route meta')
      }
      return true
    },
  }) treeFolder!: TreeFolder

  @Prop({
    type: TreeFileCollection,
    validator (treeFileCollection: any): boolean {
      if (!(treeFileCollection instanceof TreeFileCollection)) {
        throw new Error('No treeFileCollection found: pass it to props or provide via route meta')
      }
      return true
    },
  }) treeFileCollection!: TreeFileCollection

  @Prop({ type: Boolean }) hideFileExtensions!: boolean
  @Prop({ type: Boolean }) hideNavigation!: boolean

  treeFolderLocal: TreeFolder | null = null
  listCursor = new ListCursor()
  configStore = new ConfigStore()
  foldersStoreInstance = new FoldersStore()
  vueBookTreeOptions = new VueBookTreeOptions({
    noRouter: this.getNoRouter(),
    selectedTreeFile: null,
    hideFileExtensions: this.hideFileExtensions,
  })

  beforeCreate () {
    this.foldersStoreInstance.load()
    this.configStore.load()
    const treeFolder = this.treeFolder
    treeFolder.mergeWithFolders(this.foldersStoreInstance.openFolders)
    this.treeFolderLocal = treeFolder
  }

  mounted () {
    const input = this.$refs.searchInput as any
    input && (input.$el as HTMLInputElement).focus()
  }

  @Watch('isMobile')
  onIsMobileChange (isMobile: boolean) {
    this.config.isHidden = isMobile
  }

  @Watch('config', { deep: true })
  onConfigChange (value: DemoPageConfig) {
    if (lastUpdateTimestamp < Math.floor(Date.now()) - 200) {
      this.configStore.config = value
      this.configStore.save()
      lastUpdateTimestamp = Math.floor(Date.now())
    }
  }

  @Watch('treeFolderLocal', { deep: true })
  onTreeFolderChange (value: TreeFolder) {
    this.foldersStoreInstance.openFolders = value.getOpenFolders()
    this.foldersStoreInstance.save()
  }

  get isMobile () {
    return screenSizeService.isMobile
  }

  set isHidden (isHidden: boolean) {
    this.config.isHidden = isHidden
  }

  get isHidden (): boolean {
    if (this.config.isHidden === null) {
      return this.isMobile
    }
    return this.config.isHidden
  }

  get DemoPageMode () {
    return DemoPageMode
  }

  get noRouter (): boolean {
    return this.getNoRouter()
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
    return this.files.find((file: any) => {
      return (this as any).$route.path === file.path
    }) || null
  }

  get files (): TreeFile[] {
    return this.treeFileCollection.treeFiles
  }

  get filteredFiles (): TreeFile[] {
    if (!this.config.searchText) {
      return this.files
    }
    const treeFiles = this.files.filter((file: any) => this.fileSearched(file))
    return sortByRelevance(this.config.searchText, treeFiles)
  }

  get currentComponentName (): string | undefined {
    return (this as any).$route.path.split('/').pop()
  }

  get similarFiles (): TreeFile[] {
    const similarFiles: TreeFile[] = []
    this.filteredFiles.forEach((file: TreeFile) => {
      if (file.getFilename() === this.currentComponentName) {
        similarFiles.push(file)
      }
    })
    return similarFiles
  }

  clearSearch (): void {
    this.config.searchText = ''
    ;(this.$refs.searchInput as HTMLInputElement).focus()
  }

  getNoRouter (): boolean {
    return !!(this.treeFolderLocal && this.treeFileCollection)
  }

  fileSearched (file: TreeFile): boolean {
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

    if (this.vueBookTreeOptions.noRouter) {
      this.vueBookTreeOptions.selectedTreeFile = fileUnderCursor
      return
    }

    // eslint-disable-next-line no-unused-expressions
    (this as any).$router?.push(fileUnderCursor.path)
  }
}
</script>

<style lang="scss">
@import "../../scss/resources";

.VbPage {
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
    padding: 0 5px;
    flex: 1 0;
    height: 300px;
  }

  $root: &;

  &__left-block-folded {
    background-color: $color--main;
    position: fixed;
    left: 0;
    bottom: 0;
  }

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

  &__left-block-bottom-menu {

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
