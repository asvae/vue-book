<template>
    <div class="demo-folder">
        <div class="demo-folder__title" @click="folder.toggle()">
            <span class="icon">
                <i class="fa fa-caret-down" v-if="folder.isOpen"></i>
                <i class="fa fa-caret-right" v-else></i>
            </span>
            <i class="fa fa-folder"></i> <span>{{folder.name}}</span>
        </div>
        <div class="demo-folder__insides" v-if="folder.isOpen && ! folder.isEmpty()">
            <vm-folder v-for="child in folder.folders"
                    :key="child.path"
                    :folder="child"
                    ref="folders"
            />
            <vm-file v-for="file in folder.files"
                     :key="file.name"
                     :file="file"
            />
        </div>
    </div>
</template>

<script>
  import vmFile from './File.vue'

  import DemoFolder from '../../classes/Main/DemoFolder.js'
  import ObjectHelpers from '../../classes/Utility/ObjectHelpers.js'

  export default {
    name: 'VmFolder',
    inject: ['foldersStore'],
    props: {
      folder: {
        type: DemoFolder
      }
    },
    methods: {
      openSelected () {
        const foldersChain = ObjectHelpers
            .traverseBranch(this.folder, { path: this.$route.path })
            .filter(item => {
              return (item instanceof DemoFolder)
            })

        if (foldersChain.length) {
          this.folder.isOpen = true
        }

        if (foldersChain.length > 1) {
          setTimeout(() => {
            const folderComponent = this.$refs.folders.find(folderComponent => folderComponent.folder === foldersChain[1])
            folderComponent.openSelected()
          })
        }
      }
    },
    components: {
      vmFile,
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">

</style>
