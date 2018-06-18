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
          @next="next"
        />
        <div class="demo-page__menu__search" v-if="config.mode === DemoPageMode.Search">
          <com-input
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
        />

        <tree-demo-file-list
          v-if="config.mode === DemoPageMode.Tree"
          :folder="tree"
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
import foldersStore from '../../store/foldersStore'

import BookComponentListFolder from '../FileTree/BookComponentListFolder.vue'
import BookComponentListItem from '../FileTree/BookComponentListItem.vue'

import DemoFolder from '../../classes/Main/DemoFolder'
import DemoFile from '../../classes/Main/DemoFile'
import SearchableDemoFileList from '../FileTree/SearchableDemoFileList.vue'
import VmResizeLine from '../Service/ComResizeLine.vue'
import DemoPageConfig, { DemoPageMode } from './DemoPageConfig'
import VmDemoPageMenu from './DemoPageMenu.vue'

import configStore from '../../store/configStore'
import ComInput from './ComInput/VueBookInput.vue'
import TreeDemoFileList from '../FileTree/TreeDemoFileList.vue'

let lastUpdateTimestamp = 0

export default {
  name: 'demo-page',
  components: {
    TreeDemoFileList,
    ComInput,
    VmDemoPageMenu,
    VmResizeLine,
    SearchableDemoFileList,
    BookComponentListFolder,
    BookComponentListItem,
  },
  data () {
    const self: any = this

    return {
      configStore,
      tree: self.renderTree(),
      mode: 'default', // 'search', 'info', 'hidden'
      secondComponent: null,
      searchText: '',
      foldersStore,
    }
  },
  mounted () {
    const self: any = this
    const input = self.$refs.searchInput
    input && input.$el.focus()
  },
  watch: {
    currentFile () {
      const self: any = this

      self.secondComponent = null
    },
    config: {
      deep: true,
      handler (value: DemoPageConfig, oldValue: DemoPageConfig) {
        if (value !== oldValue) {
          // Updated from local storage.
          return
        }
        const update = () => {
          if (lastUpdateTimestamp < Math.floor(Date.now()) - 200) {
            configStore.setConfig(value)
            lastUpdateTimestamp = Math.floor(Date.now())
          }
        }
        update()
      },
    },
    tree: {
      deep: true,
      handler (value: DemoFolder, oldValue) {
        if (value !== oldValue) {
          // Updated from local storage.
          return
        }
        foldersStore.openFolders = value.getOpenFolders()
      },
    },
  },
  provide () {
    return {
      foldersStore,
    }
  },
  computed: {
    DemoPageMode: () => DemoPageMode,
    config () {
      return configStore.config
    },
    component () {
      const self: any = this
      return self.currentFile && self.currentFile.component
    },
    currentFile (): DemoFile | null {
      const self: any = this
      return self.files.find(file => {
        return self.$route.path === file.path
      }) || null
    },
    files () {
      const self: any = this
      return self.$route.meta.demoFilesCollection.demoFiles
    },
  },
  methods: {
    makeSecondComponent (file: DemoFile) {
      const self: any = this
      self.secondComponent = file.component
    },
    next (invert: Boolean = false) {
      const self: any = this

      const index = self.files.indexOf(self.currentFile)
      const file = self.files[index + (invert ? -1 : 1)]
      if (!file) {
        return
      }
      self.$router.push(file.path)
      file.openFolder()
    },
    renderTree () {
      const self: any = this
      const tree = new DemoFolder()
      const files = self.$route.meta.demoFilesCollection.demoFiles
      files.forEach(node => tree.addDemoFile(node))
      return tree.folders[0]
    },
  },
  created () {
    const self: any = this

    self.tree.fillParents()
    self.tree.open()
    self.tree.mergeWithFolders(foldersStore.openFolders)
  },
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