<template>
  <VbDemo>
    <VbCard>
      <button @click="$vb.log('log', 'value')">Trigger log</button>
      <button @click="$vb.alert('alert')">Trigger alert</button>
    </VbCard>
    <VbCard title="slider" width="300px">
      <VbSlider
        v-model="value"
      />
      {{value}}
    </VbCard>
  </VbDemo>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({

})
export default class Demo extends Vue {
  value = 20
}
</script>
