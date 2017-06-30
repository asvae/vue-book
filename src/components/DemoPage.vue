<template>
    <div class="container-1">
        <div class="container-1__item container-1__item--narrow">
            <div v-show="isHidden">
                <span class="icon-1" style="cursor: pointer"
                      @click="isHidden = ! isHidden">
                     <i class="fa fa-bars"></i>
                </span>
            </div>
            <div v-show="! isHidden" class="file-structure-1">
                <div style="text-align: right">
                    <span class="icon-2" style="cursor: pointer"
                          @click="isHidden = ! isHidden"
                    >
                         <i class="fa fa-bars"></i>
                    </span>
                    <span class="icon-2" style="cursor: pointer"
                          @click="$refs.folder.openSelected()"
                    >
                         <i class="fa fa-dot-circle-o"></i>
                    </span>
                    <span class="icon-2" style="cursor: pointer"
                          @click="$refs.folder.isOpen = false">
                         <i class="fa fa-exchange"></i>
                    </span>
                </div>
                <vm-folder ref="folder" :folder="tree"/>
            </div>
        </div>
        <div class="container-1__item">
            <component
                v-if="component"
                :is="component"
            />
        </div>
    </div>
</template>


<script>
  import vmFolder from './Folder.vue'

  import DemoFolder from '../classes/Main/DemoFolder.js'
  import DemoNode from '../classes/Main/DemoNode.js'

  export default {
    data () {
      return {
        isHidden: false,
      }
    },
    mounted () {
      this.$refs.folder.openSelected()
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
        this.files.forEach(node => tree.addDemoNode(node))
        return tree.folders[0]
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>