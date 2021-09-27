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
import { PropType } from 'vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DemoFileList',
  components: {
    BookComponentListItem,
  },
  emits: ['selected'],
  props: {
    listCursor: {
      type: Object as PropType<ListCursor>,
      required: true,
    },
    files: {
      type: Array as unknown as PropType<TreeFile>,
      required: true,
    }
  },
  methods: {
    filePreSelected (file: TreeFile): boolean {
      return this.listCursor.preSelectedItem === file
    }
  }
})
</script>

<style lang="scss">
@import '../../scss/resources';

.DemoFileList {
  height: 100%;
  background-color: $book-color-darkgray--light;
  overflow: auto;

  &__node {
    &--pre-selected {
      background-color: $book-color-darkgray--dark;
    }
  }
}
</style>
