<template>
  <VbDemo>
    <VbCard>
      <VueBookInput
        v-model="normal"
        placeholder="Normal"
      />
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VueBookInput from './VueBookInput.vue'

@Component({
  components: { VueBookInput },
})
export default class VueBookInputDemo extends Vue {
  normal = ''
}
</script>

