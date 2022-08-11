<template>
  <div class="VbIcon">
    <component class="VbIcon__svg" :is="icons[props.name]"/>
  </div>
</template>

<script setup lang="ts">
import { icons } from './icons'

const props = defineProps<{
  name: keyof typeof icons,
}>()
</script>

<style lang="scss">
.VbIcon {
  width: 1rem;
  height: 1rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}
.VbIcon__svg {
  max-width: 1rem;
  max-height: 1rem;
}
</style>
