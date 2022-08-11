<template>
  <span class="RefreshCounter">
    {{ refreshCounterComputed }}
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

let refreshCounter = 0

export default defineComponent({
  setup () {
    return {refreshCounterComputed: computed(() => ++refreshCounter)}
  }
})
</script>
