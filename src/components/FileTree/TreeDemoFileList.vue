<template>
  <div class="tree-demo-file-list">
    <book-component-list-folder :folder="folder"/>
  </div>
</template>

<script lang="ts">
import BookComponentListFolder from './BookComponentListFolder.vue'
import DemoFolder from '../../classes/Main/DemoFolder'

export default {
  name: 'tree-demo-file-list',
  components: { BookComponentListFolder },
  props: {
    folder: {
      type: DemoFolder,
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
