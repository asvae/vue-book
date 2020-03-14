<template>
  <VbDemo>
    <VbCard>
      <VbCheckbox v-model="value" label="label-text"/>
      {{value}}
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import VbDemo from './VbDemo.vue'
import VbCard from './VbCard.vue'
import VbCheckbox from 'vuestic-ui/src/components/vuestic-components/va-checkbox/VaCheckbox.vue'

@Component({
  components: {
    VbDemo,
    VbCard,
    VbCheckbox,
  },
})
export default class VbCardDemo extends Vue {
  value = true
}
</script>

