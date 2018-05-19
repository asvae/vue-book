<template>
    <div class="demo-page">
        <div class="demo-page__left-block"
             :style="{'flex-basis': config.width + 'px'}"
        >

            <vm-demo-page-menu
                    :config="config"
                    :currentFile="currentFile"
                    @openFolder="currentFile.openFolder()"
                    @next="next"
            />

            <div>
                <div v-if="config.mode === DemoPageMode.Search">
                    <vm-search-panel
                            :config="config"
                            :files="files"
                            @selected="config.mode === DemoPageMode.Tree"
                    />
                </div>
                <div v-if="config.mode === DemoPageMode.Tree">
                    <div v-if="config.isFlat">
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

  import vmFolder from '../FileTree/Folder.vue'
  import vmFile from '../FileTree/File.vue'

  import DemoFolder from '../../classes/Main/DemoFolder'
  import DemoFile from '../../classes/Main/DemoFile'
  import VmSearchPanel from '../FileTree/SearchPanel.vue'
  import VmResizeLine from '../Service/ResizeLine.vue'
  import DemoPageConfig, { DemoPageMode } from './DemoPageConfig'
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
        searchText: '',
        foldersStore,
      }
    },
    watch: {
      currentFile () {
        this.secondComponent = null
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
    components: {
      VmDemoPageMenu,
      VmResizeLine,
      VmSearchPanel,
      vmFolder,
      vmFile,
    },
    computed: {
      DemoPageMode: () => DemoPageMode,
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
        const file = this.files[index + (invert ? -1 : 1)]
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

<style lang="scss">
    @import "../../scss/resources";

    .demo-page {
        // Reset
        * {
            box-sizing: border-box;
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
            flex: 0 0;
            padding: 10px;
            overflow: auto;
            background-color: white;
            border-right: solid 1px $border-color--main;
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