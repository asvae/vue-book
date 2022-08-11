<template>
  <VbDemo>
    <VbCard title="type" width="250px">
      <div v-for="(value, key) in valueList"
           class="selectable-item is-small"
           :class="{active: valueSelected === key}"
           @click="valueSelected = key"
           v-text="key"
      />
    </VbCard>
    <VbCard :title="valueSelected" width="250px">
      <BookComponentListFolder :folder="valueList[valueSelected]"/>
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import BookComponentListFolder from './BookComponentListFolder.vue'
import DemoFolderFactory from '../../classes/Factory/DemoFolderFactory'

@Options({
  components: { BookComponentListFolder },
})
export default class BookComponentListFolderDemo extends Vue {
  valueList = {
    empty: DemoFolderFactory.getEmpty(),
    withFolders: DemoFolderFactory.getWithFolders(),
    withFiles: DemoFolderFactory.getWithFiles(),
    withFilesAndFolders: DemoFolderFactory.getWithFoldersAndFiles(),
  }

  valueSelected = 'empty'
}
</script>
