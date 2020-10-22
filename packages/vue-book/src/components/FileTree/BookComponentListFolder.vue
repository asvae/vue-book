<template>
  <div class="BookComponentListFolder">
    <div class="BookComponentListFolder__header" @click="folder.toggle()">
      <div class="BookComponentListFolder__header__caret">
        <font-awesome-icon
          v-if="folder.isOpen"
          icon="caret-down"
        />
        <font-awesome-icon
          v-else
          icon="caret-right"
        />
      </div>

      <font-awesome-icon
        class="BookComponentListFolder__header__icon"
        icon="folder"
      />

      <div class="BookComponentListFolder__title">
        <span>{{folder.name}}</span>
      </div>
    </div>

    <div class="BookComponentListFolder__insides"
         v-if="folder.isOpen && ! folder.isEmpty()"
    >
      <BookComponentListFolder
        v-for="child in folder.folders"
        :key="generateKey()"
        :folder="child"
        ref="folders"
      />
      <BookComponentListItem
        v-for="file in folder.files"
        :key="generateKey()"
        :file="file"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Prop } from 'vue-property-decorator'

import BookComponentListItem from './BookComponentListItem.vue'

import { TreeFolder } from '../../classes/Main/TreeFolder'
import { ObjectHelpers } from 'asva-helpers'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
    BookComponentListItem,
    FontAwesomeIcon,
  },
})
export default class BookComponentListFolder extends Vue {
  @Prop({ type: TreeFolder, required: true })
  folder!: TreeFolder

  openSelected (): void {
    const foldersChain = ObjectHelpers
      .traverseBranch(this.folder, { path: (this as any).$route.path })
      .filter(item => {
        return (item instanceof TreeFolder)
      })

    if (foldersChain.length) {
      this.folder.isOpen = true
    }

    if (foldersChain.length > 1) {
      setTimeout(() => {
        const folderComponent =
          (this.$refs.folders as BookComponentListFolder[])
            .find(folderComponent => folderComponent.folder === foldersChain[1])
        folderComponent && folderComponent.openSelected()
      })
    }
  }

  generateKey (): number {
    return Math.floor(Math.random() * 1e8)
  }
}
</script>

<style lang="scss">
@import "../../scss/resources";

.BookComponentListFolder {
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
