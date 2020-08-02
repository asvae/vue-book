<template>
  <VbDemo>
    <VbCard>
      <VbMenu style="width: 300px" :config="config"/>
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VbMenu from './VbMenu.vue'
import DemoPageConfig from './DemoPageConfig'

@Component({
  components: { VbMenu },
})
export default class VbMenuDemo extends Vue {
  config = new DemoPageConfig()
}
</script>
