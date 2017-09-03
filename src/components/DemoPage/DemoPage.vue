<template>
    <div class="root-container">
        <div class="root-container__file-list"
             :style="{'flex-basis': config.width + 'px'}"
        >

            <vm-demo-page-menu :config="config"
                               :currentFile="currentFile"
                               @openFolder="currentFile.openFolder()"
                               @next="next"
            />

            <div>
                <div v-if="config.mode === 'Search'">
                    <vm-search-panel
                            :files="files"
                            @selected="config.mode === 'default'"
                    />
                </div>
                <div v-if="config.mode === 'Default'">
                    <div v-if="isFlat">
                        <vm-file
                                v-for="file in files"
                                @click.native.ctrl="makeSecondComponent(file)"
                                :key="file.path"
                                :file="file"
                        />
                    </div>
                    <vm-folder v-else :folder="tree"/>
                </div>
                <div v-if="config.mode === 'Info' && currentFile">
                    <vm-file-info-panel :file="currentFile"/>
                </div>
            </div>
        </div>
        <vm-resize-line v-model="config.width"/>
        <div class="root-container__right-block">
            <div class="root-container__component" v-if="! secondComponent">
                <component v-if="component" :is="component"/>
            </div>
            <div class="root-container__component" v-if="secondComponent">
                <div style="display: flex">
                    <div style="flex: 1 0 50%"
                         v-for="item in [component, secondComponent]">
                        <component v-if="item" :is="item"/>
                    </div>
                </div>
            </div>
            <div v-if="isShowingInfo" class="root-container__info">
                <vm-info-panel v-if="currentFile" :file="currentFile"/>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
  import foldersStore from '../../store/foldersStore'

  import vmFolder from '../FileTree/Folder.vue'
  import vmFile from '../FileTree/File.vue'

  import DemoFolder from '../../classes/Main/DemoFolder'
  import DemoFile from '../../classes/Main/DemoFile'
  import VmSearchPanel from '../FileTree/SearchPanel.vue'
  import VmInfoPanel from '../FileTree/InfoPanel.vue'
  import VmComponentGraph from '../FileTree/ComponentGraph.vue'
  import {
    componentTreeDemo,
    default as DemoFileOptions,
  } from '../../classes/Main/DemoFileOptions'
  import VmResizeLine from '../Service/ResizeLine.vue'
  import DemoPageConfig from './DemoPageConfig'
  import VmDemoPageMenu from './DemoPageMenu.vue'

  import configStore from '../../store/configStore'

  let lastUpdateTimestamp = 0

  export default {
    name: 'VmDemoPage',
    data () {
      return {
        configStore,
        tree: this.renderTree(),
        mode: 'default', // 'search', 'info', 'hidden'
        secondComponent: null,
        isFlat: false,
        isShowingInfo: true,
        searchText: '',
        foldersStore,
        width: 300,
      }
    },
    watch: {
      currentFile () {
        this.secondComponent = null
      },
      config: {
        deep: true,
        handler (value: DemoPageConfig, oldValue: DemoPageConfig) {
          if (JSON.stringify(value) !== JSON.stringify(oldValue)) {
            // Updated from local storage.
            return
          }
          const update = () => {
            if (lastUpdateTimestamp < Math.floor(Date.now()) - 200) {
              configStore.config = value
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
    components: {
      VmDemoPageMenu,
      VmResizeLine,
      VmComponentGraph,
      VmInfoPanel,
      VmSearchPanel,
      vmFolder,
      vmFile,
    },
    computed: {
      config () {
        return configStore.config
      },
      component () {
        return this.currentFile && this.currentFile.component
      },
      currentFile (): DemoFile | null {
        return this.files.find(file => {
          return this.$route.path === file.path
        }) || null
      },
      files () {
        return this.$route.meta.demoFilesCollection.demoFiles
      },
    },
    methods: {
      makeSecondComponent (file: DemoFile) {
        this.secondComponent = file.component
      },
      next (invert: Boolean = false) {
        const index = this.files.indexOf(this.currentFile)
        const file = this.files[index + (invert ? -1 : 1 )]
        if (!file) {
          return
        }
        this.$router.push(file.path)
        file.openFolder()
      },
      renderTree () {
        const tree = new DemoFolder()
        const files = this.$route.meta.demoFilesCollection.demoFiles
        files.forEach(node => tree.addDemoFile(node))
        return tree.folders[0]
      },
    },
    created () {
      this.tree.fillParents()
      this.tree.open()
      this.tree.mergeWithFolders(foldersStore.openFolders)
    },
  }
</script>