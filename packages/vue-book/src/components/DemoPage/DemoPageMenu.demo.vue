<template>
  <VbDemo>
    <VbCard>
      <VueBookMenu style="width: 300px" :config="config"/>
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VueBookMenu from './VueBookMenu.vue'
import DemoPageConfig from './DemoPageConfig'

@Component({
  components: { VueBookMenu },
})
export default class VueBookMenuDemo extends Vue {
  config = new DemoPageConfig()
}
</script>
