<template>
  <div class="demo-container">
    <div class="demo-container__item"
         style="width: 300px"
         v-for="(value, key) in valueList"
    >
      <div class="demo-container__header"
           v-text="key"
      />
      <BookComponentListItem :file="value"/>
    </div>
  </div>
</template>

<script>
import BookComponentListItem from './BookComponentListItem'
import { TreeFileFactory } from "../../classes/Factory/TreeFileFactory";

export default {
  components: {
    BookComponentListItem,
  },
  data () {
    return {
      valueList: {
        short: TreeFileFactory.getWithShortPath(),
        long: TreeFileFactory.getWithLongPath(),
      }
    }
  },
}
</script>
