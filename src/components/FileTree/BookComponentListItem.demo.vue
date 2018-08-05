<template>
  <div class="demo-container">
    <div class="demo-container__item"
         style="width: 300px"
         v-for="(value, key) in valueList"
    >
      <div class="demo-container__header"
           v-text="key"
      />
      <book-component-list-item :file="value"/>
    </div>
  </div>
</template>

<script>
import BookComponentListItem from './BookComponentListItem'
import DemoNode from '../../classes/Main/DemoFile'
import DemoFileFactory from "../../classes/Factory/DemoFileFactory";

export default {
  components: {
    BookComponentListItem,
  },
  data () {
    return {
      valueList: {
        short: DemoFileFactory.getWithShortPath(),
        long: DemoFileFactory.getWithLongPath(),
      }
    }
  },
}
</script>
