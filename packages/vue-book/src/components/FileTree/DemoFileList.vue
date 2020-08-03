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
import { Component, Vue, Prop } from 'vue-property-decorator'
import { TreeFile } from '../../classes/Main/TreeFile'
import { ListCursor } from './ListCursor'
import BookComponentListItem from './BookComponentListItem.vue'

@Component({
  name: 'DemoFileList',
  components: {
    BookComponentListItem,
  },
})
export default class DemoFileList extends Vue {
  @Prop({ type: ListCursor, required: true }) listCursor!: ListCursor
  @Prop({ type: Array, required: true }) files!: TreeFile

  filePreSelected (file: TreeFile): boolean {
    return this.listCursor.preSelectedItem === file
  }
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
