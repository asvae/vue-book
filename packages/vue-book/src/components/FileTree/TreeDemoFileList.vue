<template>
  <div class="TreeDemoFileList">
    <BookComponentListFolder :folder="folder" ref=""/>
  </div>
</template>

<script lang="ts">
import BookComponentListFolder from './BookComponentListFolder.vue'
import { TreeFolder } from '../../classes/Main/TreeFolder'

export default {
  name: 'TreeDemoFileList',
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

.TreeDemoFileList {
  height: 100%;
  background-color: $color--white;
  overflow: auto;

  &__node {

  }
}
</style>
