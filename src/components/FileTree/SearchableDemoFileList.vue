<template>
  <div class="searchable-demo-file-list">
    <div class="searchable-demo-file-list__node"
         v-for="file in files"
         :key="file.path"
         :class="{'searchable-demo-file-list__node--pre-selected': filePreSelected(file)}"
         @click="$emit('selected')"
    >
      <book-component-list-item :file="file"/>
    </div>
  </div>
</template>

<script lang="ts">
import { TreeFile } from '../../classes/Main/TreeFile'
import { ListCursor } from './ListCursor'
import BookComponentListItem from './BookComponentListItem.vue'

export default {
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

.searchable-demo-file-list {
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
