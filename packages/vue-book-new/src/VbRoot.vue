<template>
  <div>
    <div
      v-for="(component, path) in glob"
      @click="currentComponent = component"
    >
      {{ path }}
    </div>
    <component v-if="currentComponent" :is="currentComponent.default" />
  </div>
</template>

<script setup lang="ts">

import { ref } from 'vue'

const { glob } = defineProps<{
  glob: any,
}>()

console.log('glob', glob)

const currentComponent = ref(null)
</script>

<style>

</style>
