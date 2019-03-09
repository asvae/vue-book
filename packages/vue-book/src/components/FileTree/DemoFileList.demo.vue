<template>
  <VbDemo>
    <VbContainer>
      <DemoFileList
        :files="files"
        :listCursor="listCursor"
      />
    </VbContainer>
  </VbDemo>
</template>

<script lang="ts">
import DemoFileList from './DemoFileList.vue'
import { TreeFileFactory } from '../../classes/Factory/TreeFileFactory'
import { ListCursor } from './ListCursor'

export default {
  components: {
    DemoFileList,
  },
  data () {
    const treeFiles = [
      TreeFileFactory.getWithShortPath(),
      TreeFileFactory.getWithLongPath(),
    ]
    return {
      files: treeFiles,
      listCursor: new ListCursor({
        preSelectedItem: treeFiles[1],
      }),
    }
  },
}
</script>