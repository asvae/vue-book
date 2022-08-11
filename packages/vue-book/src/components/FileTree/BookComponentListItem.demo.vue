<template>
  <VbDemo>
    <VbCard
      style="width: 300px"
      v-for="(value, key) in valueList"
      :title="key"
      :key="key"
    >
      <BookComponentListItem :file="value" />
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { TreeFileFactory } from '../../classes/Factory/TreeFileFactory'
import BookComponentListItem from './BookComponentListItem.vue'

@Options({
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
