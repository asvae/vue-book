<template>
    <div class="container">
        <div class="container__item container__item--narrow" style="background-color: rgba(201,223,254,0.37)">
            <div v-show="isHidden">
                <span class="icon" style="cursor: pointer"
                      @click="isHidden = ! isHidden">
                     <i class="fa fa-bars"></i>
                </span>
            </div>
            <div v-show="! isHidden" class="file-structure">
                <div style="text-align: right">
                    <span class="icon" style="cursor: pointer"
                          @click="isHidden = ! isHidden"
                    >
                         <i class="fa fa-bars"></i>
                    </span>
                    <span class="icon" style="cursor: pointer"
                          @click="$refs.folder.openSelected()"
                    >
                         <i class="fa fa-dot-circle-o"></i>
                    </span>
                    <span class="icon" style="cursor: pointer"
                          @click="$refs.folder.isOpen = false">
                         <i class="fa fa-exchange"></i>
                    </span>
                </div>
                <vm-folder ref="folder" :folder="tree"/>
            </div>
        </div>
        <div class="container__item">
            <component
                    v-if="component"
                    :is="component"
            />
        </div>
    </div>
</template>


<script>
  import foldersStore from '../store/foldersStore'

  import vmFolder from './FileTree/Folder.vue'

  import DemoFolder from '../classes/Main/DemoFolder.js'
  import DemoNode from '../classes/Main/DemoFile.js'

  export default {
    name: 'DemoPage',
    data () {
      return {
        isHidden: false,
        foldersStore,
      }
    },
    mounted () {
      this.$refs.folder.openSelected()
    },
    provide () {
      return {
        foldersStore,
      }
    },
    methods: {},
    components: {
      vmFolder,
    },
    computed: {
      component () {
        const file = this.files.find(file => {
          return this.$route.path === file.path
        })
        return file ? file.component : null
      },
      files () {
        return this.$route.meta.files
      },
      tree () {
        const tree = new DemoFolder({})
        this.files.forEach(node => tree.addDemoFile(node))
        return tree.folders[0]
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>