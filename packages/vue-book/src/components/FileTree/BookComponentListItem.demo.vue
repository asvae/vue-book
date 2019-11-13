<template>
  <VbDemo>
    <VbCard
      style="width: 300px"
      v-for="(value, key) in valueList"
      :title="key"
      :key="key"
    >
      <BookComponentListItem :file="value"/>
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { TreeFileFactory } from '../../classes/Factory/TreeFileFactory'
import BookComponentListItem from './BookComponentListItem.vue'

@Component({
  components: {
    BookComponentListItem,
  },
})
export default class BookComponentListItemDemo extends Vue {
  valueList = {
    short: TreeFileFactory.getWithShortPath(),
    long: TreeFileFactory.getWithLongPath(),
  }
}
</script>
