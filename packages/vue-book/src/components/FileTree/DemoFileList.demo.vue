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
import { Component, Vue } from 'vue-property-decorator'
import DemoFileList from './DemoFileList.vue'
import { TreeFileFactory } from '../../classes/Factory/TreeFileFactory'
import { ListCursor } from './ListCursor'

@Component({
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
