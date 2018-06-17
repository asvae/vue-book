<template>
  <div class="book-component-list-folder">
    <div class="book-component-list-folder__header" @click="folder.toggle()">
      <div class="book-component-list-folder__header__caret">
        <font-awesome-icon
          v-if="folder.isOpen"
          icon="caret-down"
        />
        <font-awesome-icon
          v-else
          icon="caret-right"
        />
      </div>

      <font-awesome-icon class="book-component-list-folder__header__icon" icon="folder"/>

      <div class="book-component-list-folder__title">
        <span>{{folder.name}}</span>
      </div>
    </div>

    <div class="book-component-list-folder__insides"
         v-if="folder.isOpen && ! folder.isEmpty()"
    >
      <book-component-list-folder v-for="child in folder.folders"
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
import vmFile from './BookComponentListItem.vue'

import DemoFolder from '../../classes/Main/DemoFolder'
import { ObjectHelpers } from 'asva-helpers'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

export default {
  name: 'BookComponentListFolder',
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
@import "../../scss/resources";

.book-component-list-folder {

  &__header {
    cursor: pointer;
    display: flex;

    &__caret {
      flex: 0 0 14px;
      width: 14px;
      width: 14px;
      @include flexCenter();
    }
    &__icon {
      flex: 0 0 18px;
      height: 18px;
      width: 18px;
      @include flexCenter();
      color: #656192;
      margin-left: 3px;
      margin-right: 3px;
    }
    &__title {

    }
  }

  &__insides {
    padding-left: 16px;
  }
}
</style>
