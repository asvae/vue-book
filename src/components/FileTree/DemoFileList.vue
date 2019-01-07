<template>
  <div class="DemoFileList">
    <div class="DemoFileList__node"
         v-for="file in files"
         :key="file.path"
         :class="{'DemoFileList__node--pre-selected': filePreSelected(file)}"
         @click="$emit('selected')"
    >
      <BookComponentListItem :file="file"/>
    </div>
  </div>
</template>

<script lang="ts">
import { TreeFile } from '../../classes/Main/TreeFile'
import { ListCursor } from './ListCursor'
import BookComponentListItem from './BookComponentListItem.vue'

export default {
  name: 'DemoFileList',
  components: {
    BookComponentListItem,
  },
  props: {
    listCursor: {
      type: ListCursor,
      required: true,
    },
    files: {
      type: Array,
      required: true,
    },
  },
  methods: {
    filePreSelected (file: TreeFile): boolean {
      return this.listCursor.preSelectedItem === file
    },
  },
}
</script>

<style lang="scss">
@import '../../scss/resources';

.DemoFileList {
  height: 100%;
  background-color: $color--white;
  overflow: auto;

  &__node {
    &--pre-selected {
      background-color: $color--main;
    }
  }
}
</style>
