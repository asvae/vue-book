<template>
  <div class="demo-container">
    <div class="demo-container__item">
      <vue-book-menu style="width: 300px" :config="config"/>
    </div>
  </div>
</template>

<script lang="ts">
import VueBookMenu from './VueBookMenu.vue'
import DemoPageConfig from './DemoPageConfig'

export default {
  components: {
    VueBookMenu,
  },
  data () {
    return {
      config: new DemoPageConfig(),
    }
  },
}
</script>