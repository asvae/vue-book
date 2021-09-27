<template>
  <VbDemo>
    <VbCard>
      <DemoFileList
        :files="files"
        :listCursor="listCursor"
      />
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import DemoFileList from './DemoFileList.vue'
import { TreeFileFactory } from '../../classes/Factory/TreeFileFactory'
import { ListCursor } from './ListCursor'
import { Vue, Options } from 'vue-class-component'

@Options({
  components: {
    DemoFileList,
  },
})
export default class DemoFileListDemo extends Vue {
  files = [
    TreeFileFactory.getWithShortPath(),
    TreeFileFactory.getWithLongPath(),
  ]

  listCursor = new ListCursor({
    preSelectedItem: this.files[1],
  })
}
</script>
