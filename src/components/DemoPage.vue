<template>
    <div class="root-container">
        <div class="root-container__file-list">
            <div style="text-align: right; min-width: 250px">
                <div v-if="currentFile"
                     class="button-icon"
                     @click="next(true)"
                >
                        <span class="icon">
                            <i class="fa fa-arrow-left"></i>
                        </span>
                </div>

                <div v-if="currentFile"
                     class="button-icon"
                     @click="next(false)"
                >
                        <span class="icon">
                            <i class="fa fa-arrow-right"></i>
                        </span>
                </div>

                <div v-if="currentFile"
                     class="button-icon"
                     @click="currentFile.openFolder()"
                >
                        <span class="icon">
                            <i class="fa fa-dot-circle-o"></i>
                        </span>
                </div>

                <div class="button-icon"
                     @click="tree.close()"
                >
                        <span class="icon">
                            <i class="fa fa-exchange"></i>
                        </span>
                </div>
                &nbsp;
                <div class="button-icon"
                     :class="{'button-icon--active': mode === 'hidden'}"
                     @click="mode = 'hidden'"
                >
                        <span class="icon">
                            <i class="fa fa-bars"></i>
                        </span>
                </div>

                <div class="button-icon"
                     :class="{'button-icon--active': mode === 'default'}"
                     @click="mode = 'default'"
                >
                        <span class="icon">
                            <i class="fa fa-server"></i>
                        </span>
                </div>
                <div class="button-icon"
                     :class="{'button-icon--active': mode === 'search'}"
                     @click="mode = 'search'"
                >
                        <span class="icon">
                            <i class="fa fa-search"></i>
                        </span>
                </div>
                <div class="button-icon"
                     :class="{'button-icon--active': mode === 'info'}"
                     @click="mode = 'info'"
                >
                        <span class="icon">
                            <i class="fa fa-info-circle"></i>
                        </span>
                </div>

                <div class="button-icon"
                     :class="{'button-icon--active': isFlat}"
                     @click="isFlat = !isFlat"
                >
                        <span class="icon">
                            <i class="fa fa-arrows-v"></i>
                        </span>
                </div>
            </div>

            <div>
                <div v-if="mode === 'search'">
                    <vm-search-panel
                            :files="files"
                            @selected="mode === 'default'"
                    />
                </div>
                <div v-if="mode === 'default'">
                    <div v-if="isFlat">
                        <vm-file
                                v-for="file in files"
                                :key="file.path"
                                :file="file"
                        />
                    </div>
                    <vm-folder v-else :folder="tree"/>
                </div>
                <div v-if="mode === 'info' && currentFile">
                    <vm-file-info-panel :file="currentFile"/>
                </div>
            </div>
        </div>

        <div class="root-container__component">
            <component v-if="component" :is="component"/>
        </div>
    </div>
</template>


<script lang="ts">
  import foldersStore from '../store/foldersStore.js'

  import vmFolder from './FileTree/Folder.vue'
  import vmFile from './FileTree/File.vue'

  import DemoFolder from '../classes/Main/DemoFolder'
  import DemoFile from '../classes/Main/DemoFile'
  import VmSearchPanel from './FileTree/SearchPanel.vue'
  import VmFileInfoPanel from './FileTree/FileInfoPanel.vue'

  export default {
    name: 'VmDemoPage',
    data () {
      return {
        tree: this.renderTree(),
        mode: 'default', // 'search', 'info', 'hidden'
        isFlat: false,
        searchText: '',
        foldersStore,
      }
    },
    watch: {
      'tree': {
        deep: true,
        handler (value: DemoFolder, oldValue) {
          if (value !== oldValue) {
            // Updated from local storage.
            return
          }
          foldersStore.openFolders = value.getOpenFolders()
        }
      }
    },
    provide () {
      return {
        foldersStore,
      }
    },
    components: {
      VmFileInfoPanel,
      VmSearchPanel,
      vmFolder,
      vmFile,
    },
    computed: {
      component () {
        return this.currentFile && this.currentFile.component
      },
      currentFile () {
        return this.files.find(file => {
          return this.$route.path === file.path
        }) || null
      },
      files () {
        return this.$route.meta.demoFilesCollection.demoFiles
      },
    },
    methods: {
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
        tree.fillParents()
        return tree.folders[0]
      },
    },
    created () {
      this.tree.open()
      this.tree.mergeWithFolders(foldersStore.openFolders)
    },
  }
</script>