<template>
  <VbDemo>
    <VbCard>
      <VbMenu style="width: 300px" :config="config"/>
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import VbMenu from './VbMenu.vue'
import DemoPageConfig from './DemoPageConfig'
import { Vue, Options } from 'vue-class-component'

@Options({
  components: { VbMenu },
})
export default class VbMenuDemo extends Vue {
  config = new DemoPageConfig()
}
</script>
