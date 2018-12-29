<template>
  <div class="tree-demo-file-list">
    <book-component-list-folder :folder="folder"/>
  </div>
</template>

<script lang="ts">
import BookComponentListFolder from './BookComponentListFolder.vue'
import { TreeFolder } from '../../classes/Main/TreeFolder'

export default {
  name: 'tree-demo-file-list',
  components: { BookComponentListFolder },
  props: {
    folder: {
      type: TreeFolder,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import "../../scss/resources";

.tree-demo-file-list {
  height: 100%;
  background-color: $color--white;
  overflow: auto;
  &__node {

  }
}
</style>
