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
        <div class="vue-book-demo-page__menu__search"
             v-if="config.mode === DemoPageMode.Search">
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
          :folder="demoFolder"
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
import { configStoreInstance } from '../../store/configStore'

import BookComponentListFolder from '../FileTree/BookComponentListFolder.vue'
import BookComponentListItem from '../FileTree/BookComponentListItem.vue'

import { DemoFolder } from '../../classes/Main/DemoFolder'
import DemoFile from '../../classes/Main/DemoFile'
import SearchableDemoFileList from '../FileTree/SearchableDemoFileList.vue'
import VueBookResizeLine from '../Service/VueBookResizeLine.vue'
import DemoPageConfig, { DemoPageMode } from './DemoPageConfig'
import VueBookMenu from './VueBookMenu.vue'

import VueBookInput from './ComInput/VueBookInput.vue'
import TreeDemoFileList from '../FileTree/TreeDemoFileList.vue'
import { ListCursor } from '../FileTree/ListCursor'
import DemoFileCollection from '../../classes/Main/DemoFileCollection'

let lastUpdateTimestamp = 0

export default {
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
      demoFolder: null,
      listCursor: new ListCursor(),
      configStoreInstance: configStoreInstance,
      foldersStoreInstance: foldersStoreInstance,
    }
  },
  watch: {
    'config': {
      handler (value: DemoPageConfig) {
        const update = () => {
          if (lastUpdateTimestamp < Math.floor(Date.now()) - 200) {
            configStoreInstance.config = value
            configStoreInstance.save()
            lastUpdateTimestamp = Math.floor(Date.now())
          }
         }
        update()
      },
      deep: true,
    },
    'demoFolder': {
      handler (value: DemoFolder) {
        foldersStoreInstance.openFolders = value.getOpenFolders()
        foldersStoreInstance.save()
      },
      deep: true,
    },
  },
  provide () {
    return {
      foldersStoreInstance: foldersStoreInstance,
    }
  },
  computed: {
    DemoPageMode () {
      return DemoPageMode
    },

    config () {
      return this.configStoreInstance.config
    },

    component () {
      return this.currentFile && this.currentFile.component
    },

    currentFile (): DemoFile | null {
      return this.files.find((file: any) => {
        return this.$route.path === file.path
      }) || null
    },

    files () {
      return this.demoFileCollection.demoFiles
    },

    demoFileCollection (): DemoFileCollection {
      const demoFileCollection = this.$route.meta.demoFileCollection
      if (!(demoFileCollection instanceof DemoFileCollection)) {
        throw new Error('No demoFileCollection found for current route')
      }

      return demoFileCollection
    },
    filteredFiles (): DemoFile[] {
      if (!this.config.searchText) {
        return this.files
      }
      return this.files.filter((file: any) => this.fileSelected(file))
    },
  },
  methods: {
    getDemoFolder (): DemoFolder {
      const demoFolder = this.$route.meta.demoFolder
      if (!(demoFolder instanceof DemoFolder)) {
        throw new Error('No demoFolder found for current route')
      }

      return demoFolder
    },
    fileSelected (file: DemoFile): boolean {
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
      this.$router.push(fileUnderCursor.path)
    },
  },
  mounted () {
    const input = this.$refs.searchInput
    input && input.$el.focus()
  },
  created () {
    foldersStoreInstance.load()
    configStoreInstance.load()
    const demoFolder = this.getDemoFolder()
    demoFolder.mergeWithFolders(foldersStoreInstance.openFolders)
    this.demoFolder = demoFolder
  },
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
