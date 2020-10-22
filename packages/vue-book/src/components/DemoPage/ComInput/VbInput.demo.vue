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
import { Vue, Options } from 'vue-class-component'
import VbInput from './VbInput.vue'

@Options({
  components: { VbInput },
})
export default class VbInputDemo extends Vue {
  normal = ''
}
</script>
