<template>
  <VbDemo>
    <VbCard>
      <VbInput
        v-model="normal"
        placeholder="Normal"
      />
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VbInput from './VbInput.vue'

@Component({
  components: { VbInput },
})
export default class VbInputDemo extends Vue {
  normal = ''
}
</script>

