<template>
    <div class="demo-folder">
        <div class="demo-folder__title" @click="folder.toggle()">
            <span class="icon">
                <font-awesome-icon
                        v-if="folder.isOpen"
                        icon="caret-down"
                />
                <font-awesome-icon
                        v-else
                        icon="caret-right"
                />
            </span>
            <font-awesome-icon icon="folder"/>
            <span>{{folder.name}}</span>
        </div>
        <div class="demo-folder__insides"
             v-if="folder.isOpen && ! folder.isEmpty()"
        >
            <vm-folder v-for="child in folder.folders"
                       :key="generateKey()"
                       :folder="child"
                       ref="folders"
            />
            <vm-file v-for="file in folder.files"
                     :key="generateKey()"
                     :file="file"
            />
        </div>
    </div>
</template>

<script lang="ts">
  import vmFile from './File.vue'

  import DemoFolder from '../../classes/Main/DemoFolder'
  import { ObjectHelpers } from 'asva-helpers'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  export default {
    name: 'VmFolder',
    inject: ['foldersStore'],
    props: {
      folder: {
        type: DemoFolder,
      },
    },
    methods: {
      openSelected () {
        const self: any = this
        const foldersChain = ObjectHelpers
          .traverseBranch(self.folder, { path: self.$route.path })
          .filter(item => {
            return (item instanceof DemoFolder)
          })

        if (foldersChain.length) {
          self.folder.isOpen = true
        }

        if (foldersChain.length > 1) {
          setTimeout(() => {
            const folderComponent = self.$refs.folders.find(folderComponent => folderComponent.folder === foldersChain[1])
            folderComponent.openSelected()
          })
        }
      },
      generateKey () {
        return Math.floor(Math.random() * 1e8)
      },
    },
    components: {
      FontAwesomeIcon,
      vmFile,
    },
  }
</script>

<style lang="scss">
    .demo-folder {
        &__title {
            cursor: pointer;
            white-space: nowrap;
        }
        &__insides {
            padding-left: 16px;
        }
    }
</style>
