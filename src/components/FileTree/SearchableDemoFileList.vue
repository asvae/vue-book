<template>
  <div class="searchable-demo-file-list">
    <div class="searchable-demo-file-list__node"
         v-for="file in filteredFiles"
         :key="file.path"
         :class="{'searchable-demo-file-list__node--pre-selected': filePreSelected(file)}"
         @click="$emit('selected')"
    >
      <book-component-list-item :file="file"/>
    </div>
  </div>
</template>

<script lang="ts">
import DemoFile from '../../classes/Main/DemoFile'
import DemoPageConfig from '../DemoPage/DemoPageConfig'
import { ListCursor } from './ListCursor'
import { Component, Prop, Vue } from 'vue-property-decorator'
import BookComponentListItem from './BookComponentListItem.vue'

@Component({
  components: {
    BookComponentListItem,
  }
})
export default class SearchableDemoFileList extends Vue {

  @Prop({ type: ListCursor, required: true })
  listCursor!: ListCursor

  @Prop({ type: String, required: true })
  search!: string

  @Prop({ type: DemoPageConfig, required: true })
  config!: DemoPageConfig

  @Prop({ type: Array, required: true })
  files!: DemoFile[]

  get filteredFiles (): DemoFile[] {
    if (!this.search) {
      return this.files
    }
    return this.files.filter(file => this.fileSelected(file))
  }

  fileSelected (file: DemoFile) {
    const path = file.path.toUpperCase()
    const text = this.search.toUpperCase()
    const includesFull = path.includes(text)
    if (includesFull) {
      return includesFull
    }
    const upperCaseLetters = file.getFilename().replace(/[a-z.]/g, '')
    return upperCaseLetters.includes(this.search)
  }

  filePreSelected (file: DemoFile) {
    return this.listCursor.preSelectedItem === file
  }
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
